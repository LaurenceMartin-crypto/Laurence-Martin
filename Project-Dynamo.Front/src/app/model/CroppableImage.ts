

export class CroppableImage {
    //Image corners
    img_Left:number;
    img_Right:number;
    img_Bottom:number;
    img_Top:number;

    // Canvas Corners
    can_Left:number;
    can_Right:number;
    can_Top:number;
    can_Bottom:number;

    Image: HTMLImageElement;
    Context: CanvasRenderingContext2D;

    constructor(container: HTMLCanvasElement, img: HTMLImageElement){
        this.Image = img;
        var area = container.getBoundingClientRect();
        this.can_Top = area.top;
        this.can_Bottom = area.bottom;
        this.can_Left = area.left;
        this.can_Right = area.right;



    }

    isInBoundsMouse(e: MouseEvent):boolean{
        // TODO: make sure that we are within the visible bounds of this image 
        // if the image is further left than the edge of the canvas then use the canvas edge to determine this
        // if the image is further right then the edge of the canvas then use the canvas edge.

        // if(this.img_topLeft < this.can_Left || this.img_topLeft >)
        // e.clientX > this.can_Left && e.clientX > this.img_topLeft
        // e.clientX < this.can_Right && e.clientX < this.img_btmRight
        // if(e.clientX)
        return false;
    }

    isInBoundsTouch(e: TouchEvent):boolean{
        return false;
    }
}