class PinkJellyFish extends MovableObject {

    IMAGES_PINKJELLYFISH = [
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 1.png',
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 2.png',
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 3.png',
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 4.png'];

    IMAGES_PINKJELLYFISH_DEAD = [
        'img/2.Enemy/2 Jelly fish/Dead/Pink/P1.png',
        'img/2.Enemy/2 Jelly fish/Dead/Pink/P2.png',
        'img/2.Enemy/2 Jelly fish/Dead/Pink/P3.png',
        'img/2.Enemy/2 Jelly fish/Dead/Pink/P4.png'
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

        this.loadImage(this.IMAGES_PINKJELLYFISH[0]);
        this.loadImages(this.IMAGES_PINKJELLYFISH);
        this.loadImages(this.IMAGES_PINKJELLYFISH_DEAD);

        this.animateJellyFish(this.moveJellyFishUpDown(), this.IMAGES_PINKJELLYFISH, this.IMAGES_PINKJELLYFISH_DEAD);
    }
}