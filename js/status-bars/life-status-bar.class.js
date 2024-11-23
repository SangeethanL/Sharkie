class LifeStatusBar extends DrawableObject {
    IMAGES =  [
        'img/4. Marcadores/orange/0_  life.png',
        'img/4. Marcadores/orange/20_ life.png',
        'img/4. Marcadores/orange/40_  life.png',
        'img/4. Marcadores/orange/60_  life.png',
        'img/4. Marcadores/orange/80_  life.png',
        'img/4. Marcadores/orange/100_  life.png'
    ];


    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.width = 200;
        this.height = 60;
        this.x = 0;
        this.y = 0;
        this.percentage = 100;
        this.setPercentage(this.percentage);
    }
}