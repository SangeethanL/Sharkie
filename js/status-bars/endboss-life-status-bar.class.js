class EndbossLifeStatusBar extends DrawableObject {
    IMAGES = [
        'img/4. Marcadores/green/Life/0.png',
        'img/4. Marcadores/green/Life/20.png',
        'img/4. Marcadores/green/Life/40.png',
        'img/4. Marcadores/green/Life/60.png',
        'img/4. Marcadores/green/Life/80.png',
        'img/4. Marcadores/green/Life/100.png',
    ];


    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.width = 200;
        this.height = 60;
        this.x = 700;
        this.y = 0;
        this.percentage = 100;
        this.setPercentageForEndboss(this.percentage);
    }
}