class LightPoisonRight extends MovableObject {

    IMAGE_LIGHTPOSIONRIGHT ='img/4. Marcadores/Posión/LightRight.png';

    constructor(x, y) {
        super();
        this.width = 40;
        this.height = 55;
        this.x = x;
        this.y = y;
        this.groundPoison = true;
        this.loadImage(this.IMAGE_LIGHTPOSIONRIGHT);
    }
}