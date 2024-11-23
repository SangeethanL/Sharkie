class CoinsStatusBar extends DrawableObject {
    IMAGES =  [
        'img/4. Marcadores/orange/0_  coins.png',
        'img/4. Marcadores/orange/20_  coins.png',
        'img/4. Marcadores/orange/40_  coins.png',
        'img/4. Marcadores/orange/60_  coins.png',
        'img/4. Marcadores/orange/80_  coins.png',
        'img/4. Marcadores/orange/100_ coins.png'
    ];


    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.width = 200;
        this.height = 60;
        this.x = 0;
        this.y = 100;
        this.percentage = 0;
        this.setPercentage(this.percentage);
    }
}