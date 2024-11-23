class DarkPoisonRight extends MovableObject {

    IMAGE_DARKPOSIONRIGHT ='img/4. Marcadores/Posión/DarkRight.png';

    constructor(x, y) {
        super();
        this.width = 40;
        this.height = 55;
        this.x = x;
        this.y = y;
        this.groundPoison = true;
        this.loadImage(this.IMAGE_DARKPOSIONRIGHT);
    }
}