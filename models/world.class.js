class World{

    character = new Character();
    camera_x = 0;
    canvas;
    ctx;
    keyboard;
    statusBar = new StatusBar();
    statusBarCoin = new StatusbarCoin();
    statusBarBottle = new StatusBarBottle();
    statusBarEndboss = new StatusbarEndboss();
    healthImg = new HealthImg();
    throwableObject = [];
    collectedCoins = [];
    useableBottle = 0;
    bottle = new ThrowableObject();
    startscreen = new Startscreen();
    endscreen;
    gamestart = false;
    characterDied = false;
    endbossDied = false;
    gameover = false;
    space = 0;
    gameEnded = false;

    constructor(canvas,keyboard){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard
        this.setWorld();
        this.draw();
        setStopableInterval(this.checkForRunning, 100);
        setStopableInterval(this.checkBottleHit, 1200);
    }  
    

    checkForGameStart(){
            if(this.gamestart){
                initLevel();
                this.level = level1;
                this.level.enemies[4].energy= 100
                this.character.energy = 100
            }
    }

    checkForRunning = () => {
            if(this.gamestart){
                this.run();
            }
    }

    setWorld(){
        this.character.world = this;
    }

    run(){
            this.checkCollision();
            this.collectCoins();
            this.collectBottles();
            this.checkThrowObjects();
            this.jumpOnEnemies();
            this.checkDeadOfCharacter();
            this.checkForEndbossAttack();
            this.checkBottleHit();
            this.checkDeadOfEndboss();
    }

    jumpOnEnemies(){

        for (let i = 0; i < this.level.enemies.length -1; i++) {
            const enemy = this.level.enemies[i];
            if (this.character.isColliding(enemy) && this.character.isAboveGround()){
                this.character.jump();
                enemy.energy -= 100;
            }
        }

    }

    checkForEndbossAttack(){
        this.space = this.level.enemies[this.level.enemies.length -1].x - this.character.x 
    } 

    checkBottleHit = () => {

        if(this.gamestart){
            this.level.enemies.forEach((enemy) => {
                if(this.bottle.isColliding(enemy)){
                    enemy.hit();
                    this.statusBarEndboss.setPercentage(enemy.energy)
                    this.bottle.trow(0,2,this.bottle.IMAGES_SPLASH);
                }
            })
        }

    }

    checkDeadOfCharacter(){

        if(this.character.isDead()){
            this.characterDied = true;
            for (let i = 0; i < this.character.IMAGES_DEATH.length; i++) {
                this.character.playAnimation(this.character.IMAGES_DEATH);
            }
        }
    }

    checkDeadOfEndboss(){
        if(this.level.enemies[this.level.enemies.length -1].isDead()){
            this.endbossDied = true;
        }
    }

    checkThrowObjects(){
 
        if (this.keyboard.D && this.useableBottle != 0) { 
            this.bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100, 30, 30,this.bottle.IMAGES_FLYINGBOTTLE);
            this.throwableObject.push(this.bottle);
            this.useableBottle--;
            console.log('useablebottles:', this.useableBottle)
            this.statusBarBottle.setPercentage(this.useableBottle);
        }
    }

    checkCollision(){

       this.level.enemies.forEach(enemy => {
            if(this.character.isColliding(enemy) && !(this.character.isAboveGround()) && !(this.character.isDead())){
                this.character.hit();
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
    
    draw(){
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.translate(this.camera_x, 0);
            this.addToMap(this.startscreen);  
            this.ctx.translate(-this.camera_x, 0); 

            if(this.gamestart){
                this.ctx.translate(this.camera_x, 0);
                this.addObjectsToMap(this.level.backgroundObjects);
                this.addObjectsToMap(this.level.enemies);
                this.addObjectsToMap(this.level.clouds);
                this.addObjectsToMap(this.level.coins);
                this.addObjectsToMap(this.level.bottles);
                this.addToMap(this.character);
                this.addObjectsToMap(this.throwableObject);

               
                if(this.characterDied){
                    this.endscreen = new BackgroundObject('img/9_intro_outro_screens/game_over/oh no you lost!.png',this.character.x - 100);
                    this.addToMap(this.endscreen);
                    stopGame();
                    showRestartBtn();
                    this.gameEnded = false;
                }
                if(this.endbossDied){
                    this.endscreen = new BackgroundObject('img/9_intro_outro_screens/game_over/game over.png',this.character.x - 100);
                    this.addToMap(this.endscreen);
                    stopGame();
                    showRestartBtn();
                }  
        
                this.ctx.translate(-this.camera_x, 0);
                this.addToMap(this.statusBar);
                this.addToMap(this.statusBarCoin);
                this.addToMap(this.statusBarBottle);
                this.addToMap(this.statusBarEndboss);
                this.addToMap(this.healthImg);
                

            }
           
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