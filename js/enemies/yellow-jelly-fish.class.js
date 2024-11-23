class YellowJellyFish extends MovableObject {

    IMAGES_YELLOWJELLYFISH = [
        'img/2.Enemy/2 Jelly fish/Regular damage/Yellow 1.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Yellow 2.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Yellow 3.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Yellow 4.png'];

    IMAGES_YELLOWJELLYFISH_DEAD = [
        'img/2.Enemy/2 Jelly fish/Dead/Yellow/y1.png',
        'img/2.Enemy/2 Jelly fish/Dead/Yellow/y2.png',
        'img/2.Enemy/2 Jelly fish/Dead/Yellow/y3.png',
        'img/2.Enemy/2 Jelly fish/Dead/Yellow/y4.png'
    ];


    constructor(x, y) {
        super();
        this.width = 60;
        this.height = 60;
        this.x = x;
        this.y = y;
        this.jellyFish = true;
        this.speedY = 0.30;
        this.otherDirection;
        this.turnPoint;
        this.killed;

        this.loadImage(this.IMAGES_YELLOWJELLYFISH[0]);
        this.loadImages(this.IMAGES_YELLOWJELLYFISH);
        this.loadImages(this.IMAGES_YELLOWJELLYFISH_DEAD);

        this.animateJellyFish(this.moveJellyFishUpDown(), this.IMAGES_YELLOWJELLYFISH, this.IMAGES_YELLOWJELLYFISH_DEAD);
    }
}