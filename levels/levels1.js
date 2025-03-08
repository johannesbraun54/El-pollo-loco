let level1;
/**
 * the variable "level1 gets its value"
 */
function initLevel(){
    
     level1 = new Level(

        [   new Chicken(),
            new SmallChicken(),
            new SmallChicken(),
            new Chicken(),
            new SmallChicken(),
            new SmallChicken(),
            new Chicken(),
            new Endboss(),
        ],
    
        [new Cloud],
    
        [   
            new Coins(),
            new Coins(),
            new Coins(),
            new Coins(),
            new Coins(),
            new Coins(),
        ],
    
        [
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
        ],
    
        [
            new BackgroundObject('img/5_background/layers/air.png', -719),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png',-719),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png',-719),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719), 
        
            new BackgroundObject('img/5_background/layers/air.png', 0),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png',0),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png',0),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0), 
        
            new BackgroundObject('img/5_background/layers/air.png', 719),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png',719),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png',719),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719),  
        
            new BackgroundObject('img/5_background/layers/air.png', 719*2),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png',719*2),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png',719*2),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719*2), 
        
            new BackgroundObject('img/5_background/layers/air.png', 719*3),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png',719*3),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png',719*3),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719*3),  

            new BackgroundObject('img/5_background/layers/air.png', 719*4),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png',719*4),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png',719*4),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719*4), 

            
        ]
    
    );
    
    
}

