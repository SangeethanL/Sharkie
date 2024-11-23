class PinkPufferFish extends MovableObject {

    pinkPufferFishImages = pinkPufferFishImagesSource;


    constructor(x, y) {
        super();
        this.width = 60;
        this.height = 40;
        this.x = x;
        this.y = y;
        this.pufferFish = true;
        this.speed = 0.65 + Math.random() * 0.25;

        this.loadImage(this.pinkPufferFishImages.IMAGES_PUFFERFISH[0]);
        this.loadImages(this.pinkPufferFishImages.IMAGES_PUFFERFISH);
        this.loadImages(this.pinkPufferFishImages.IMAGES_PUFFERFISH_COLLIDING);
        this.loadImages(this.pinkPufferFishImages.IMAGES_PUFFERFISH_BUBBLESWIM);
        this.loadImages(this.pinkPufferFishImages.IMAGES_PUFFERFISH_RETURN);
        this.loadImages(this.pinkPufferFishImages.IMAGES_PUFFERFISH_DEAD);

        this.animatePufferFish(this.pinkPufferFishImages.IMAGES_PUFFERFISH, 
            this.pinkPufferFishImages.IMAGES_PUFFERFISH_DEAD, 
            this.pinkPufferFishImages.IMAGES_PUFFERFISH_COLLIDING,
            this.pinkPufferFishImages.IMAGES_PUFFERFISH_BUBBLESWIM, 
            this.pinkPufferFishImages.IMAGES_PUFFERFISH_RETURN);
    }
}