import {Injectable, Inject} from "@angular/core";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";
import { HubConnection } from "@aspnet/signalr";

/**
 * When SignalR runs it will add functions to the global $ variable 
 * that you use to create connections to the hub. However, in this
 * class we won't want to depend on any global variables, so this
 * class provides an abstraction away from using $ directly in here.
 */
export class SignalrWindow extends Window {
    $: any;
}

export enum ConnectionState {
    Connecting = 1,
    Connected = 2,
    Reconnecting = 3,
    Disconnected = 4
}

export class ChannelConfig {
    url: string;
    hubName: string;
    channel: string;
}

export class ChannelEvent {
    channelName: string;
    Timestamp: Date;
    data: any;

    constructor() {
        this.Timestamp = new Date();
    }
}

class ChannelSubject {
    channel: string;
    subject: Subject<ChannelEvent>;
}

/**
 * ChannelService is a wrapper around the functionality that SignalR
 * provides to expose the ideas of channels and events. With this service
 * you can subscribe to specific channels (or groups in signalr speak) and
 * use observables to react to specific events sent out on those channels.
 */
@Injectable()
export class ChannelService {

    /**
     * starting$ is an observable available to know if the signalr 
     * connection is ready or not. On a successful connection this
     * stream will emit a value.
     */
    starting$: Observable<any>;

    /**
     * connectionState$ provides the current state of the underlying
     * connection as an observable stream.
     */
    connectionState$: Observable<void>;

    /**
     * error$ provides a stream of any error messages that occur on the 
     * SignalR connection
     */
    error$: Observable<string>;

    // These are used to feed the public observables 
    //
    private connectionStateSubject = new Subject<void>();
    private startingSubject = new Subject<any>();
    private errorSubject = new Subject<any>();

    // These are used to track the internal SignalR state 
    //
    private hubConnection: any;

    // An internal array to track what channel subscriptions exist 
    //
    private subjects = new Array<ChannelSubject>();

    constructor( ) {

        // Set up our observables
        //
        this.connectionState$ = this.connectionStateSubject.asObservable();
        this.error$ = this.errorSubject.asObservable();
        this.starting$ = this.startingSubject.asObservable();

        this.hubConnection = new HubConnection("http://localhost:49369/game");

        // Define handlers for the connection state events
        //
        // this.hubConnection.start().then(() => {
        //     this.connectionStateSubject.next(console.log(`signalr state has changed to : ${this.hubConnection.state}`));
        // })

        // this.hubConnection.disconnected = () => {
        //     this.connectionStateSubject.next(console.log(`signalr state has changed to : ${this.hubConnection.state}`));
        // };

        // this.hubConnection.reconnecting().then(() => {
        //     this.connectionStateSubject.next(console.log(`signalr state has changed to : ${this.hubConnection.state}`));
        // });

        // this.hubConnection.connecting().then(() => {
        //     this.connectionStateSubject.next(console.log(`signalr state has changed to : ${this.hubConnection.state}`));
        // });
        
        // // Define handlers for any errors
        // //
        // this.hubConnection.error((error: any) => {
        //     // Push the error on our subject
        //     //
        //     this.errorSubject.next(error);
        // });
        
        this.hubConnection.on("onEvent", (ev: ChannelEvent) => {
            console.log(`onEvent - ${ev.data} channel`, ev);

            // This method acts like a broker for incoming messages. We 
            //  check the interal array of subjects to see if one exists
            //  for the channel this came in on, and then emit the event
            //  on it. Otherwise we ignore the message.
            //
            let channelSub = this.subjects.find((x: ChannelSubject) => {
                return x.channel === ev.channelName;
            }) as ChannelSubject;

            // If we found a subject then emit the event on it
            //
            if (channelSub !== undefined) {
                return channelSub.subject.next(ev);
            }
        });
    }

    /**
     * Start the SignalR connection. The starting$ stream will emit an 
     * event if the connection is established, otherwise it will emit an
     * error.
     */
    start(): void {
        // Now we only want the connection started once, so we have a special
        //  starting$ observable that clients can subscribe to know know if
        //  if the startup sequence is done.
        //
        // If we just mapped the start() promise to an observable, then any time
        //  a client subscried to it the start sequence would be triggered
        //  again since it's a cold observable.
        //
        this.hubConnection.start()
            .then(() => {
                this.startingSubject.next(console.log('connected to signalr server successful.'));
            });
            // .fail((error: any) => {
            //     this.startingSubject.error(error);
            // });
    }

    /** 
     * Get an observable that will contain the data associated with a specific 
     * channel 
     * */
    sub(channel: string): Observable<ChannelEvent> {

        // Try to find an observable that we already created for the requested 
        //  channel
        //
        let channelSub = this.subjects.find((x: ChannelSubject) => {
            return x.channel === channel;
        }) as ChannelSubject;

        // If we already have one for this event, then just return it
        //
        if (channelSub !== undefined) {
            console.log(`Found existing observable for ${channel} channel`)
            return channelSub.subject.asObservable();
        }

        //
        // If we're here then we don't already have the observable to provide the
        //  caller, so we need to call the server method to join the channel 
        //  and then create an observable that the caller can use to received
        //  messages.
        
        // Now we just create our internal object so we can track this subject
        //  in case someone else wants it too
        
        channelSub = new ChannelSubject();
        channelSub.channel = channel;
        channelSub.subject = new Subject<ChannelEvent>();
        this.subjects.push(channelSub);

        return channelSub.subject.asObservable();
    }

    // Not quite sure how to handle this (if at all) since there could be
    //  more than 1 caller subscribed to an observable we created
    //
    // unsubscribe(channel: string): Rx.Observable<any> {
    //     this.observables = this.observables.filter((x: ChannelObservable) => {
    //         return x.channel === channel;
    //     });
    // }
    /** publish provides a way for calles to emit events on any channel. In a 
     * production app the server would ensure that only authorized clients can
     * actually emit the message, but here we're not concerned about that.
     */
    publish(ev: ChannelEvent): void {
        this.hubConnection.invoke(ev.channelName, ev);
    }

}