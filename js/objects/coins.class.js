class Coins extends MovableObject {

    IMAGES_COINS = [
        'img/4. Marcadores/1. Coins/1.png',
        'img/4. Marcadores/1. Coins/2.png',
        'img/4. Marcadores/1. Coins/3.png',
        'img/4. Marcadores/1. Coins/4.png'
    ];

    constructor(x, y) {
        super();
        this.width = 40;
        this.height = 40;
        this.x = x;
        this.y = y;
        this.coin = true;
        
        this.loadImage(this.IMAGES_COINS[0]);
        this.loadImages(this.IMAGES_COINS);

        this.animateOnPoint(this.IMAGES_COINS);
    }
}