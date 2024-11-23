class LilaPufferFish extends MovableObject {

    lilaPufferFishImages = lilaPufferFishImagesSource;

    constructor(x, y) {
        super();
        this.width = 60;
        this.height = 40;
        this.x = x;
        this.y = y;
        this.pufferFish = true;
        this.speed = 0.65 + Math.random() * 0.25;

        this.loadImage(this.lilaPufferFishImages.IMAGES_PUFFERFISH[0]);
        this.loadImages(this.lilaPufferFishImages.IMAGES_PUFFERFISH);
        this.loadImages(this.lilaPufferFishImages.IMAGES_PUFFERFISH_COLLIDING);
        this.loadImages(this.lilaPufferFishImages.IMAGES_PUFFERFISH_BUBBLESWIM);
        this.loadImages(this.lilaPufferFishImages.IMAGES_PUFFERFISH_RETURN);
        this.loadImages(this.lilaPufferFishImages.IMAGES_PUFFERFISH_DEAD);

        this.animatePufferFish(this.lilaPufferFishImages.IMAGES_PUFFERFISH,
            this.lilaPufferFishImages.IMAGES_PUFFERFISH_DEAD,
            this.lilaPufferFishImages.IMAGES_PUFFERFISH_COLLIDING,
            this.lilaPufferFishImages.IMAGES_PUFFERFISH_BUBBLESWIM,
            this.lilaPufferFishImages.IMAGES_PUFFERFISH_RETURN);
    }
}