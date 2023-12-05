class MovableObject {
    x = 120;
    y = 280;
    img;
    height = 150;
    width = 100;
    imageCache = {};
    currentImage = 0;    
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;



    applyGravity(){
            setInterval(() => {
                if(this.isAboveGround() || this.speedY > 0){
                this.y -= this.speedY;
                console.log('current Y', this.y)
                console.log('current speedY', this.speedY)
                this.speedY -= this.acceleration;
                }
            },1000/25)
    }

    isAboveGround(){
        return this.y < 180
    }


    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr){

        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    moveRight(){
        console.log('moving right')
    }

    moveleft(){
        setInterval(()=> {
            this.x -= this.speed;
        },1000/60)
    }

    playAnimation(images){
        let i = this.currentImage % this.IMAGES_WALKING.length;
        let path = this.IMAGES_WALKING[i];
        this.img = this.imageCache[path]
        this.currentImage++;
    }


}