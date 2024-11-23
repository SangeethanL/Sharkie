class BackgroundLayer extends MovableObject {

    constructor(imagePath, x) {
        super();
        this.width = 920;
        this.height = 540;
        this.x = x;
        this.y = 540 - this.height;

        this.loadImage(imagePath);
    }
}