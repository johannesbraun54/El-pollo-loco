class Cloud extends MovableObject{
    y = 20
    width = 500;
    height = 250;

    constructor(){
        super().loadImage('img/5_background/layers/4_clouds/1.png')
        this.x = Math.random() * 500;
        this.animate();
    }

    /**
     * moves the clouds to left side
     */
    animate(){
        setStopableInterval( this.moveClouds, 1000/25);
    }

    /**
     * calls the movefunction
     */
    moveClouds = () => {
        this.moveleft();
    }
}