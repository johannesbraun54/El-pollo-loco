class World{

    character = new Character();
    level = level1;
    camera_x = 0;
    canvas;
    ctx;
    keyboard;
    statusBar = new StatusBar();
    statusBarCoin = new StatusbarCoin();
    statusBarBottle = new StatusBarBottle();
    throwableObject = [];
    collectedCoins = [];
    useableBottle = 0;
    bottle = new ThrowableObject();
    endscreen;
 

    constructor(canvas,keyboard){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld(){
        this.character.world = this;
    }

    run(){
        setInterval(() => {
            this.checkCollision();
            this.collectCoins();
            this.collectBottles();
            this.checkThrowObjects();
            this.jumpOnEnemies();
            this.checkGameEnd();
            this.checkDead();
        }, 150);
    }

    jumpOnEnemies(){
        this.level.enemies.forEach(enemy => {
            if (this.character.isColliding(enemy) && this.character.isAboveGround()){
                enemy.energy -= 100;
            }
        })

    }

    checkDead(){

        if(this.character.isDead()){
            for (let i = 0; i < this.character.IMAGES_DEATH.length; i++) {
                this.character.playAnimation(this.character.IMAGES_DEATH);
            }
           
        }
    }

    checkThrowObjects(){
 
        if (this.keyboard.D && this.useableBottle != 0) { 
            this.bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100,this.keyboard.D);
            this.throwableObject.push(this.bottle);
            this.useableBottle--;
            console.log('useablebottles:', this.useableBottle)
            this.statusBarBottle.setPercentage(this.useableBottle);
        }
    }

    checkCollision(){
        this.level.enemies.forEach(enemy => {
            if(this.character.isColliding(enemy) && !(this.character.isAboveGround()) && !(this.character.isDead())){
                this.character.hit(this.character.IMAGES_HURT);
                this.statusBar.setPercentage(this.character.energy)
            }
        });
    }

    collectCoins() {

        for (let i = 0; i < this.level.coins.length; i++) {
            const coin = this.level.coins[i];  
            if (this.character.isColliding(coin)) {
                this.level.coins.splice(i, 1); 
                this.collectedCoins.push(coin);
                this.statusBarCoin.setPercentage(this.collectedCoins.length);
            }
        }
    }

    collectBottles() {

        for (let i = 0; i < this.level.bottles.length; i++) {
            const collectedbottle = this.level.bottles[i];  
            if (this.character.isColliding(collectedbottle)) {
                this.level.bottles.splice(i, 1); // flasche wird nicht mehr angezeigt
                this.useableBottle++;
                console.log('useableBottle:', this.useableBottle);
                this.statusBarBottle.setPercentage(this.useableBottle);
            }
        }
    }

    checkGameEnd(){
        if(this.character.isDead()){
          this.endscreen = new BackgroundObject('img/9_intro_outro_screens/game_over/oh no you lost!.png',0);
          this.addToMap(this.endscreen);
        }
    }
    
    
    draw(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addToMap(this.character);
        this.addObjectsToMap(this.throwableObject);
        if(this.character.isDead()){
            this.endscreen = new BackgroundObject('img/9_intro_outro_screens/game_over/oh no you lost!.png',this.character.x - 100);
            this.addToMap(this.endscreen);
        }

        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBar);
        this.addToMap(this.statusBarCoin)
        this.addToMap(this.statusBarBottle)

        let self = this;
        requestAnimationFrame(function() {
        self.draw();
        });
    }



    addObjectsToMap(objects){
        objects.forEach(o => {
            this.addToMap(o)
        });
    }
    
    addToMap(mo) {
        if(mo.otherDirection){
            this.flipImage(mo);
        }    
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);
   
        if(mo.otherDirection){
            this.flipImageBack(mo)
        }
    }


    flipImage(mo){
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1,1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo){
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}