class LilaJellyFish extends MovableObject {

    IMAGES_LILAJELLYFISH = [
        'img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Lila 2.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Lila 3.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Lila 4.png'];

    IMAGES_LILAJELLYFISH_DEAD = [
        'img/2.Enemy/2 Jelly fish/Dead/Lila/L1.png',
        'img/2.Enemy/2 Jelly fish/Dead/Lila/L2.png',
        'img/2.Enemy/2 Jelly fish/Dead/Lila/L3.png',
        'img/2.Enemy/2 Jelly fish/Dead/Lila/L4.png'
    ];


    constructor(x, y) {
        super();
        this.width = 60;
        this.height = 60;
        this.x = x;
        this.y = y;
        this.jellyFish = true;
        this.speedX = 0.15;
        this.speedY = 0.30;
        this.otherDirection;
        this.killed;

        this.loadImage(this.IMAGES_LILAJELLYFISH[0]);
        this.loadImages(this.IMAGES_LILAJELLYFISH);
        this.loadImages(this.IMAGES_LILAJELLYFISH_DEAD);

        this.animateJellyFish(this.moveLilaJellyFish(), this.IMAGES_LILAJELLYFISH, this.IMAGES_LILAJELLYFISH_DEAD);
    }

    /**
     * This function animates the lila jelly fish up and down and to the left side at the same time in the canvas.
     * It also defines and sets the maximum and minimum reachpoints of the animal.
     */

    moveLilaJellyFish() {
        let lilaJellyFishInterval = setInterval(() => {
            if (this.gameRunning == true) {
                if (this.y <= 10 || this.turnPoint == null) {
                    this.turnPoint = null;
                    this.x -= this.speedX;
                    this.y += this.speedY;
                }
                if (this.y >= 450 || this.turnPoint == 'turnUpWard') {
                    this.turnPoint = 'turnUpWard';
                    this.x -= this.speedX;
                    this.y -= this.speedY;
                }
            } else { }
        }, 1000 / 60);
        this.pushInterval(lilaJellyFishInterval);
    }
}