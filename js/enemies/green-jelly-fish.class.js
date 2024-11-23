class GreenJellyFish extends MovableObject {

    IMAGES_GREENJELLYFISH = [
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Green 1.png',
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Green 2.png',
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Green 3.png',
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Green 4.png'];

    IMAGES_GREENJELLYFISH_DEAD = [
        'img/2.Enemy/2 Jelly fish/Dead/green/g1.png',
        'img/2.Enemy/2 Jelly fish/Dead/green/g2.png',
        'img/2.Enemy/2 Jelly fish/Dead/green/g3.png',
        'img/2.Enemy/2 Jelly fish/Dead/green/g4.png'
    ];


    constructor(x, y) {
        super();
        this.width = 60;
        this.height = 60;
        this.x = x;
        this.y = y;
        this.jellyFish = true;
        this.speedY = 0.05;
        this.otherDirection;
        this.turnPoint;
        this.killed;

        this.loadImage(this.IMAGES_GREENJELLYFISH[0]);
        this.loadImages(this.IMAGES_GREENJELLYFISH);
        this.loadImages(this.IMAGES_GREENJELLYFISH_DEAD);
        
        this.animateJellyFish(this.moveJellyFishUpDown(), this.IMAGES_GREENJELLYFISH, this.IMAGES_GREENJELLYFISH_DEAD);
    }
}