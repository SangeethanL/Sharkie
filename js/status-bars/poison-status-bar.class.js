class PoisonStatusBar extends DrawableObject {
    IMAGES =  [
        'img/4. Marcadores/orange/0_ posion.png',
        'img/4. Marcadores/orange/20_ posion.png',
        'img/4. Marcadores/orange/40_ posion.png',
        'img/4. Marcadores/orange/60_ posion.png',
        'img/4. Marcadores/orange/80_ posion.png',
        'img/4. Marcadores/orange/100_ posion.png'
    ];


    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.width = 200;
        this.height = 60;
        this.x = 0;
        this.y = 50;
        this.percentage = 0;
        this.setPercentage(this.percentage);
    }
}