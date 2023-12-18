class Chicken extends MovableObject{

    y = 350;
    speedY = 0.5;
    height = 80;
    width = 60;
    playSound = true;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ]

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
    ]

    chicken_sound = new Audio('audio/chicken.mp3')


    constructor(){
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png')

            this.x = 200 + Math.random()*2200;
            this.loadImages(this.IMAGES_WALKING);
            this.loadImages(this.IMAGES_DEAD);
            this.speed = 0.15 + Math.random() * 0.5
            this.animate();
            }

    animate(){

        setStopableInterval(this.chickenMovesLeft, 1000/60);
        setStopableInterval(this.checkChickenAnimation, 200);

    }

    chickenMovesLeft = () => {
        this.moveleft();
    }

    checkChickenAnimation = () => {
        if (this.energy == 100) {
            this.playAnimation(this.IMAGES_WALKING);
        } else {
            this.playAnimation(this.IMAGES_DEAD);
            this.speed = 0;
            setInterval(() => {
                this.y += this.speedY;
                this.playChickenSound()
            })  

        }
    }

    playChickenSound(){
        if(this.playSound){
            this.chicken_sound.play();
            this.playSound = false;
        }
    }
}