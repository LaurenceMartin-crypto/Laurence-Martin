import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ChannelService } from '../services/channel.service';
import { GameService } from '../services/game.service';
import { ComponentBase } from '../model/ComponentBase';
import { CroppableImage } from '../model/CroppableImage';


@Component({
  selector: 'app-image-select',
  templateUrl: './image-select.component.html',
  styleUrls: ['./image-select.component.css']
})
export class ImageSelectComponent extends ComponentBase implements OnInit  {

  _imgUrl : string = null;
  public get imgUrl() : string {
    return this._imgUrl;
  }

  public set imgUrl(v : string) {

    // need to do some validation here to make sure that this value is legit
    if(v.indexOf('.jpg') == -1 && v.indexOf('.png') == -1){
      // Then we need to go america all over their asses. 
      this.imgError = true;
      this.errorMsg = 'please enter a URL with .jpg or .png on the end of it.'
    }else{
      this.game.instance.imageUrl = v;
      this._imgUrl = v;
      this.imgError = !this.imgError;
    }
      
  }
  
  dragging: boolean = false;
  errorMsg: string;
  imgError : boolean;
  http : HttpClient;
  fileInfo : any;
  imgBlob : Blob;
  imgUpload : any;
  canvas: HTMLCanvasElement;
  context : CanvasRenderingContext2D;
  //imagObj : HTMLImageElement;
  /**
   * source image measurements for canvas translation
   */
  sx:number;
  sy:number;
  sWidth:number;
  sHeight:number;

   /**
   * destination measurements for canvas translation
   */
  dx:number;
  dy:number;
  dWidth: number;
  dHeight:number;
  imggg:CroppableImage;

  /**
   * variables for tracking mouse position within the canvas so we can draw the image correctly.
   */
  xLast:number;
  yLast:number;
  xDisplacement:number;
  yDisplacement:number;

  constructor(private signalr: ChannelService, private chref: ChangeDetectorRef, private gameSrv : GameService) {
    super(signalr,chref, gameSrv);
  }

  ngOnInit() {
    this.canvas = <HTMLCanvasElement>document.getElementById('image-holder');
    this.imggg = new CroppableImage(this.canvas, <HTMLImageElement>document.getElementById('image-of-interest'));
    this.imggg.Context = this.canvas.getContext('2d');
    this.context = this.imggg.Context;
    
    this.imggg.Image.onload = () => {
      console.log('image.onload executing.');
      this.imggg.Context.drawImage(this.imggg.Image,0,0, this.canvas.width, this.canvas.height);
    }
    
    /**
     * mouse event tracking
     */
    Observable.fromEvent(this.canvas,'mousedown').subscribe((e: MouseEvent) => { 
      this.dragging = true;
      this.xLast = e.clientX; 
      this.yLast = e.clientY;
    })
    Observable.fromEvent(this.canvas,'mouseup').subscribe((e: MouseEvent) => { 
      this.dragging = false; 
      this.xLast = e.clientX; 
      this.yLast = e.clientY;
      // We only need to set x and y last if we are withing the bounds of the canvas
    })
    Observable.fromEvent(this.canvas,'mouseleave').subscribe((e: MouseEvent) => { this.dragging = false;})

    Observable.fromEvent(this.canvas,'touchstart').subscribe((e: TouchEvent) => { this.dragging = true;})
    Observable.fromEvent(this.canvas,'touchend').subscribe((e: TouchEvent) => { 
      this.dragging = false; 
      this.xLast = e.touches[0].clientX
      this.yLast = e.touches[0].clientY;
      // We only need to set x and y last if we are withing the bounds of the canvas
    })
  
    // setup the canvas mouse tracking
    Observable.fromEvent(this.canvas,'touchmove')
    .subscribe( (e: TouchEvent) => {
        // while the mouse is down we need to translate all its movements to the image loaded on the canvas
        // this.context.drawImage(this.imagObj, e.clientX ,e.clientY, this.canvas.width, this.canvas.height);
        if(this.dragging ){
          //TODO: also need to determine if we are inside the image.
          this.xDisplacement = (e.touches[0].clientX - this.xLast);
          this.yDisplacement = (e.touches[0].clientY - this.yLast);
          this.xLast = e.touches[0].clientX;
          this.xLast = e.touches[0].clientY;
          console.log(this.xDisplacement, this.yDisplacement);
          this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
          this.context.drawImage(this.imggg.Image,this.xDisplacement,this.yDisplacement, this.canvas.width, this.canvas.height);
          // this.context.drawImage(this.imagObj,0,0,this.canvas.width, this.canvas.height,this.xDisplacement,this.yDisplacement,this.canvas.width, this.canvas.height);
        }
      })


      Observable.fromEvent(this.canvas,'mousemove')
      .subscribe( (e: MouseEvent) => {
          // while the mouse is down we need to translate all its movements to the image loaded on the canvas
          // this.context.drawImage(this.imagObj, e.clientX ,e.clientY, this.canvas.width, this.canvas.height);
          if(this.dragging){
  
            // if we are here then we need to know the following:
            //sx,sy: where did we click in the original image so that it can be moved based on that point in the reference frame
            // what we need to do here is look at the mouses position within the canvas compared to its last position and just move it that far
            // however its important to remember the last displacement values because that will determine where the image is painted on the canvas.
            this.xDisplacement = (e.clientX - this.xLast);
            this.yDisplacement = (e.clientY - this.yLast);
            this.xLast = e.clientX;
            this.xLast = e.clientY;
            console.log(this.xDisplacement, this.yDisplacement);
            this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
            this.context.drawImage(this.imggg.Image,this.xDisplacement,this.yDisplacement, this.canvas.width, this.canvas.height);
            // this.context.drawImage(this.imagObj,0,0,this.canvas.width, this.canvas.height,this.xDisplacement,this.yDisplacement,this.canvas.width, this.canvas.height);
          }
        })
  }

  zoomImage(option : String) : void {
    this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
    if(option.toLowerCase() == "in") {
      this.context.scale(1.1, 1.1);
      // this.context.drawImage(this.imggg.Image,this.xDisplacement,this.yDisplacement, this.canvas.width, this.canvas.height);
    }
    else if (option.toLowerCase() == "out") {
      this.context.scale(.9, .9);
      // this.context.drawImage(this.imggg.Image,this.xDisplacement,this.yDisplacement, this.canvas.width, this.canvas.height);
    } 
    else {
      //reset the scale
      this.context.scale(1,1);
      // this.context.drawImage(this.imggg.Image,0,0, this.canvas.width, this.canvas.height);
    }
    this.context.drawImage(this.imggg.Image,0,0, this.canvas.width, this.canvas.height);
  }  

  drawBoundingBox() : void {
    this.context.beginPath();
    this.context.lineWidth = 5;
    this.context.strokeStyle = "White";
    this.context.rect(25, 25, 100, 100);
    this.context.stroke();
  }
  
  lookupImage() :  void {
    // this should move image over to the canvas and let me crop it
    // this.context.strokeRect(20,20,this.canvas.width/2,this.canvas.height/2);
    // this.context.drawImage(this.imagObj,this.sx,this.sy,this.sWidth,this.sHeight, this.dx, this.dy,this.dWidth,this.dHeight);
  }
}


