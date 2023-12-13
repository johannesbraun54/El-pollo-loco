class StatusbarEndboss extends DrawableObject {


    IMAGES = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
    ]

    percentage = 100;



    constructor(){
        super().otherDirection = true;
        this.loadImages(this.IMAGES);
        this.x = 500;
        this.y = 20;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
        //this.loadHealthImage();
    }

    //setPercentage(50)
    setPercentage(percentage){
        this.percentage = percentage; 
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    loadHealthImage(){
        this.otherDirection = false;
        this.loadImage('img/7_statusbars/3_icons/icon_health_endboss.png');
        this.height = 60;
        this.width = 60;
        this.x = 500;
        this.y = 20;
    }

    resolveImageIndex(){
        if (this.percentage == 100 || this.percentage >= 81){
            return 5
        }else if (this.percentage == 80 || this.percentage >= 61 ){
            return 4
        } else if (this.percentage == 60 || this.percentage >= 41){
            return 3
        } else if (this.percentage == 40 || this.percentage >= 21){
            return 2
        } else if (this.percentage == 20 || this.percentage >= 1){
            return 1
        } else {
            return 0
        };
        }

}