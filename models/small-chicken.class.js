class SmallChicken extends MovableObject {

    y = 350;
    speedY = 0.5;
    height = 80;
    width = 60;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ]

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png',
    ]


    constructor(){
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png')
        this.x = 200 + Math.random()*2200;
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.speed = 0.15 + Math.random() * 4
        this.animate();
    }

    animate(){
        setInterval(() => {
            this.moveleft();
        },1000/60);

        setInterval(()=> {
            if (this.energy == 100) {
                this.playAnimation(this.IMAGES_WALKING);
            } else {
                this.playAnimation(this.IMAGES_DEAD);
                this.speed = 0;
                setInterval(() => {
                    this.y += this.speedY;
                })  
            }
        },200);
    }
}