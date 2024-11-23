class GreenPufferFish extends MovableObject {

    greenPufferFishImages = greenPufferFishImagesSource;


    constructor(x, y) {
        super();
        this.width = 60;
        this.height = 40;
        this.x = x;
        this.y = y;
        this.pufferFish = true;
        this.speed = 0.65 + Math.random() * 0.25;

        this.loadImage(this.greenPufferFishImages.IMAGES_PUFFERFISH[0]);
        this.loadImages(this.greenPufferFishImages.IMAGES_PUFFERFISH);
        this.loadImages(this.greenPufferFishImages.IMAGES_PUFFERFISH_COLLIDING);
        this.loadImages(this.greenPufferFishImages.IMAGES_PUFFERFISH_BUBBLESWIM);
        this.loadImages(this.greenPufferFishImages.IMAGES_PUFFERFISH_RETURN);
        this.loadImages(this.greenPufferFishImages.IMAGES_PUFFERFISH_DEAD);

        this.animatePufferFish(this.greenPufferFishImages.IMAGES_PUFFERFISH,
            this.greenPufferFishImages.IMAGES_PUFFERFISH_DEAD,
            this.greenPufferFishImages.IMAGES_PUFFERFISH_COLLIDING,
            this.greenPufferFishImages.IMAGES_PUFFERFISH_BUBBLESWIM,
            this.greenPufferFishImages.IMAGES_PUFFERFISH_RETURN);
    }

}