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
    collectedBottles = [];
 

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
            this.checkThrowObjects();
            this.checkCollision();
            this.collectCoins();
            this.collectBottles();
        }, 200);
    }

    checkThrowObjects(){

        if(this.keyboard.D && this.collectedBottles.length != 0 ){
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObject.push(bottle)
            this.collectedBottles.splice(1);

        }
    }

    checkCollision(){
        this.level.enemies.forEach(enemy => {
            if(this.character.isColliding(enemy)){
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
            const bottle = this.level.bottles[i];  
            if (this.character.isColliding(bottle)) {
                this.level.bottles.splice(i, 1); 
                this.collectedBottles.push(bottle);
                //console.log('collected Bottles:', this.collectedBottles.length);
                this.statusBarBottle.setPercentage(this.collectedBottles.length);
            }
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