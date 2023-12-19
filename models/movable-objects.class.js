class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    lastJump = 0;
    offsetY = 0;

    /**
     * calculates the gravity in the world
     */
    applyGravity(){
            setInterval(() => {
                if(this.isAboveGround() || this.speedY > 0){
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
                }
            },1000/25)
    }

    /**
     * checks the status from the moveable object if it is above ground
     * @returns 
     */
    isAboveGround(){
        if(this instanceof ThrowableObject){
            return true;
        }else{
            return this.y < 180
        }
    }

    /**
     * moves the object right
     */
    moveRight(){
        this.x += this.speed;
    }

    /**
     * moves the object left
     */
    moveleft(){
            this.x -= this.speed;
    }

    /**
     * gets the accordingly imgArray and increases the "variable" currentImage
     * @param {array} imgArray 
     */
    playAnimation(imgArray){
            let i = this.currentImage % imgArray.length;
            let path = imgArray[i];
            this.img = this.imageCache[path]
            this.currentImage++;
    }

    /**
     * let the object jumping 
     */
    jump(){
        this.speedY = 30;
    }

    /**
     * hits the object and reduces the energy
     */
    hit(){
        this.energy -= 10;
        if(this.energy < 0){
            this.energy = 0;
        }else{
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * sets the timepoint for hurt the object
     * @returns 
     */
    isHurt(){
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000; 
        return timepassed < 1;
    }


    /**
     * checks the energy status and 
     * @returns true or false
     */
    isDead(){
        return this.energy == 0;
    }

    /**
     * checks collision for objects
     * @param {object} mo 
     * @returns true if collsion is happend
     */
    isColliding(mo){
        return  this.x + this.width > mo.x && // kontrolle kollision character vorderkante mit enemy 
                this.y  + this.height > mo.y && // kontrolle kollision Y-Achse
                this.x < mo.x && this.y < mo.y + mo.height
    }

    /*isColliding(mo) {
        return  (this.X + this.width) >= mo.X && this.X <= (mo.X + mo.width) && 
                (this.Y + this.offsetY + this.height) >= mo.Y &&
                (this.Y + this.offsetY) <= (mo.Y + mo.height); 
               // mo.onCollisionCourse; // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.
    }*/


}