class Character extends MovableObject{

    height = 250;
    y = 10;
    speed = 10;
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];
    world;
    walking_sound = new Audio('audio/running.mp3')
    
    constructor(){
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING)
        this.applyGravity();
        this.animate();
    }

    animate(){

        //change position
        setInterval(() => {
            this.walking_sound.pause();

            if(this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x){
                this.moveRight();
                this.otherDirection = false;
                this.walking_sound.play();
            }

            if(this.world.keyboard.LEFT && this.x > 0){
                this.moveleft();
                this.otherDirection = true;
                this.walking_sound.play();
            }


            if(this.world.keyboard.SPACE && !this.isAboveGround()){
              this.jump();
            }

            this.world.camera_x = -this.x +100;
        },1000/60)

        
     //walk animation
        setInterval(()=> {
            if(this.world.keyboard.RIGHT || this.world.keyboard.LEFT ){
                this.playAnimation(this.IMAGES_WALKING);
            }
        },20)
    }
}