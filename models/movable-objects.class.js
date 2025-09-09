class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    lastJump = 0;
    thisJumped = false;


    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    }

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
        this.energy -= 3;
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
        return timepassed < 0.6;
    }

    /**
     * 
     * @returns the healty status  
     */
    isNotHurt(){
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000; 
        return timepassed > 0.6;
    }

    /**
     * 
     * @returns the jump status
     */
    isJumped(){
        if(this.y <= 10){
            this.thisJumped = true;
        }
        return this.thisJumped
    }

    /**
     * returns if the character is landed
     */
    onGroundAgain(){
        if(this.y >= 150){
            this.thisJumped = false;
        }
    }


    /**
     * checks the energy status and 
     * @returns true or false
     */
    isDead(){
        return this.energy == 0;
    }

    /**
     * checks collision for  movabale objects
     * @param {object} mo 
     * @returns true if collsion is happend
     */
    isColliding(mo){
        return  this.x + this.width - this.offset.right > mo.x + mo.offset.left && // check collision: character front edge with enemy
                this.y + this.height - this.offset.bottom > mo.y + mo.offset.top && // check collision on Y-axis: character bottom edge with enemy top
                this.x + this.offset.left < mo.x + mo.width - mo.offset.right && // check collision: character back edge with enemy
                this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom // check collision on Y-axis: character top edge with enemy bottom
    }

}