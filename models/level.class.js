class Level{
    enemies;
    clouds;
    coins;
    bottles;
    backgroundObjects;
    level_end_x = 2200; 

    constructor(enemies, clouds, coins, bottle, backgroundObjects){
        this.enemies = enemies;
        this.clouds = clouds;
        this.coins = coins;
        this.bottles = bottle;
        this.backgroundObjects = backgroundObjects;
    }
}