class DrawableObject {
    img;

    width = 100;
    height = 100;

    x = 0;
    y = 100;
    originalX;

    imageCache = [];
    currentImage = 0;

    percentage;

    /**
     * Here an image is loaded in a short way which would be equal to: this.img = document.getElementById('image') <img id="image" src="">
     * @param {string} path - The image source is defined as e.g. 'img/test.png'.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Here every image from an array is loaded into the imageCache.
     * @param {array} arr - Array with images.
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        })
    }

    /**
     * Here every single image is drawn into the canvas.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Here a frame is drawn for every character and object. For Sharkie there's an extra size because of the fitting of its images.
     * @param {element} ctx - Element of Character, Objects, Endboss.
     */
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof GreenJellyFish || this instanceof LilaJellyFish || this instanceof PinkJellyFish ||
            this instanceof YellowJellyFish || this instanceof GreenPufferFish || this instanceof LilaPufferFish || this instanceof PinkPufferFish
            || this instanceof Coins || this instanceof Poison || this instanceof DarkPoisonLeft || this instanceof DarkPoisonRight ||
            this instanceof LightPoisonLeft || this instanceof LightPoisonRight || this instanceof Bubble || this instanceof PoisonedBubble
            || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = '0';
            ctx.strokeStyle = 'transparent';

            if (this instanceof Character) {
                ctx.rect(this.x + 30, this.y + 80, this.width - 65, this.height - 120);
            } else {
                ctx.rect(this.x, this.y, this.width, this.height);
            }
            ctx.stroke();
        }
    }

    /**
     * Here the percentages and the images of the status bars are refreshed.
     * @param {var} percentage - Percentage variable of status bars.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.outputImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Here the life status bar pictures are put out for sharkie.
     */
    outputImageIndex() {
        if (this.percentage >= 100) {
            return 5;
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1;
        } else {
            return 0;
        }
    }

     /**
      * Here the percentages and the images of the status bars are refreshed only for the endboss.
     * @param {var} percentage - Percentage variable of status bars.
     */
    setPercentageForEndboss(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.outputImageIndexEndboss()];
        this.img = this.imageCache[path];
    }

     /**
     * Here the life status bar pictures are put out for the endboss.
     */
    outputImageIndexEndboss() {
        if (this.percentage >= 80) {
            return 5;
        } else if (this.percentage >= 60) {
            return 4;
        } else if (this.percentage >= 40) {
            return 3;
        } else if (this.percentage >= 20) {
            return 2;
        } else if (this.percentage >= 5) {
            return 1;
        } else if (this.percentage == 0) {
            return 0;
        }
    }

    /**
     * Here the coin and poison status bars are increased when an object is collected.
     */
    collected() {
        if (this.percentage < 100) {
            this.percentage += 20;
        }
    }
}