class DrawableObject{

    x = 120;
    y = 280;
    img;
    height = 150;
    width = 100;
    imageCache = {};
    currentImage = 0;

    /**
     * draws the current image
     * @param {object} ctx 
     */
    draw(ctx){
        ctx.drawImage(this.img, this.x, this.y,this.width,this.height);
    }

    /**
     * Draws a frame at the objects
     * @param {Object} ctx 
     */
    drawFrame(ctx){
        if(this instanceof Character || this instanceof Chicken || this instanceof Coins || this instanceof Bottle || this instanceof Endboss){
            ctx.beginPath();
            ctx.lineWidth = "5";
            ctx.strokeStyle = "blue";
            ctx.rect(this.x, this.y,this.width,this.height);
            ctx.stroke();  
        }
    }

    /**
     * gets the src for the image
     * @param {string} path 
     */
    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * is loading the images for the accorldingly array 
     * @param {array} arr 
     */
    loadImages(arr){
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

}