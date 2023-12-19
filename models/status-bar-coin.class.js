class StatusbarCoin extends DrawableObject{


        IMAGES = [
           'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
           'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
           'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
           'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
           'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
           'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
        ]
    
        percentage = 100;
    
    
        constructor(){
            super();
            this.loadImages(this.IMAGES);
            this.x = 20;
            this.y = 100;
            this.width = 200;
            this.height = 60;
            this.setPercentage(0);
        }
    
        percentage = 0;
    /**
     * gets the current progress for the status bar and shows the right picture
     * @param {integer} percentage 
     */
        setPercentage(percentage){
            this.percentage = percentage; 
            let path = this.IMAGES[this.resolveImageIndex()];
            this.img = this.imageCache[path];
        }
    /**
     * 
     * @returns the right value for getting the right index from the img array
     */
        resolveImageIndex(){
            if (this.percentage == 5){
                return 5
            }else if (this.percentage == 4){
                return 4
            } else if (this.percentage == 3){
                return 3
            } else if (this.percentage == 2){
                return 2
            } else if (this.percentage == 1){
                return 1
            } else {
                return 0
            };
            }
}