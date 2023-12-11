class ThrowableObject extends MovableObject{


    height = 60;
    width = 50;
    speedY = 50;
    speedX = 30;

    IMAGES_FLYINGBOTTLE = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ]

    constructor(x,y){
        super().loadImage(this.IMAGES_FLYINGBOTTLE[0])
        this.loadImages(this.IMAGES_FLYINGBOTTLE);

        this.x = x;
        this.y = y;
        this.trow();
    }



    trow(){
        this.speedY = 30;
        this.applyGravity();
        setInterval(() => {
            this.x += 10;
            this.playAnimation(this.IMAGES_FLYINGBOTTLE);
        },25)
    }

}