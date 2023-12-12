class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;


    applyGravity(){
            setInterval(() => {
                if(this.isAboveGround() || this.speedY > 0){
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
                }
            },1000/25)
    }

    isAboveGround(){
        if(this instanceof ThrowableObject){
            return true;
        }else{
            return this.y < 180
        }

        }

    moveRight(){
        this.x += this.speed;
    }

    moveleft(){
            this.x -= this.speed;
    }

    playAnimation(imgArray){

            let i = this.currentImage % imgArray.length;
            let path = imgArray[i];
            this.img = this.imageCache[path]
            this.currentImage++;
    }

    jump(){
        this.speedY = 30;
    }

    hit(imgArray){
        this.energy -= 5;
        this.playAnimation(imgArray)
        if(this.energy < 0){
            this.energy = 0;
        }else{
            this.lastHit = new Date().getTime();
        }
    }

    isHurt(){
        let timepassed = new Date().getTime() - this.lastHit
        timepassed = timepassed / 1000 
        return timepassed < 1
    }

    isDead(){
        return this.energy == 0;
    }

    isColliding(mo){
        return  this.x + this.width > mo.x && // kontrolle kollision character vorderkante mit enemy 
                this.y + this.height > mo.y && // kontrolle kollision Y-Achse
                this.x < mo.x && this.y < mo.y + mo.height
    }

}