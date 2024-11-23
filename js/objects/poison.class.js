class Poison extends MovableObject {

    IMAGES_POSION = [
        'img/4. Marcadores/Posión/Animada/1.png',
        'img/4. Marcadores/Posión/Animada/3.png',
        'img/4. Marcadores/Posión/Animada/5.png',
        'img/4. Marcadores/Posión/Animada/7.png',
        'img/4. Marcadores/Posión/Animada/2.png',
        'img/4. Marcadores/Posión/Animada/4.png',
        'img/4. Marcadores/Posión/Animada/6.png',
        'img/4. Marcadores/Posión/Animada/8.png'
    ];

    constructor(x, y) {
        super();
        this.width = 40;
        this.height = 50;
        this.x = x;
        this.y = y;
        this.poison = true;
        
        this.loadImage(this.IMAGES_POSION[0]);
        this.loadImages(this.IMAGES_POSION);

        this.animateOnPoint(this.IMAGES_POSION);
    }
}