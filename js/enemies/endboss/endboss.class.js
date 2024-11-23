class Endboss extends MovableObject {

    endbossImages = endbossImagesSource;

    attacking = false;
    introEnd = false;

    won;

    soundOff = false;
    isHurt_sound = new Audio('../Sharkie/audio/endboss_hurt.mp3');

    constructor() {
        super();
        this.width = 400;
        this.height = 400;
        this.x = 914 * 4 + 350;
        this.y = 0;
        this.endboss;
        this.otherDirection;
        this.energy = 100;
        this.lastHit;
        this.gameRunning;
        this.killed = null;

        this.loadImage(this.endbossImages.IMAGES_ENDBOSS_INTRODUCE[0]);
        this.loadImages(this.endbossImages.IMAGES_ENDBOSS_INTRODUCE);
        this.loadImages(this.endbossImages.IMAGES_ENDBOSS_FLOATING);
        this.loadImages(this.endbossImages.IMAGES_ENDBOSS_ATTACK);
        this.loadImages(this.endbossImages.IMAGES_ENDBOSS_HURT);
        this.loadImages(this.endbossImages.IMAGES_ENDBOSS_DEAD);

        this.animateEndboss();
    }

    /**
     * Here is the main function to animate the endboss(e.g. if he's moving, attacking or dying)
     */
    animateEndboss() {
        setTimeout(() => {
            let endbossInterval = setInterval(() => {
                if (this.gameRunning == true && this.endboss == true) {
                    if (this.won == true) { this.win(); }
                    else if (this.isDead()) { this.lost(); }
                    else if (this.endbossIsHurt()) {
                        this.playAnimation(this.endbossImages.IMAGES_ENDBOSS_HURT);
                        if (this.soundOff == false) { this.isHurt_sound.play(); }
                    }
                    else if (this.attacking == true) { this.attacks(); }
                    else if (this.introEnd == true) { this.moves(); }
                    else if (this.introEnd == false) { this.playAnimationEndboss(this.endbossImages.IMAGES_ENDBOSS_INTRODUCE); }
                }
            }, 150);
            this.pushInterval(endbossInterval);
        }, 2000);
    }

    /**
     * Here is the animation for which the endboss has won. All other functions are shut by setting their parameters to null.
     */
    win() {
        this.attacking = null;
        this.introEnd = null;
        this.playAnimation(this.endbossImages.IMAGES_ENDBOSS_FLOATING);
    }

    /**
     * Here is the animation for which the endboss has lost and moves the endboss to the ground.
     * All other functions are shut by setting their parameters to null.
     */
    lost() {
        this.introEnd = null;
        this.attacking = null;
        this.killed = true;
        this.playAnimation(this.endbossImages.IMAGES_ENDBOSS_DEAD);
        this.y += 10;
        if (this.y >= 330) {
            this.y = 330;
            this.playAnimation(this.endbossImages.IMAGES_ENDBOSS_DEAD);
            this.showOnePicture(this.endbossImages.IMAGES_ENDBOSS_DEAD[5]);
        }
    }

    /**
     * Here is the animation for which the endboss attacks sharkie. It also increases the speed of the endboss 
     * while attacking and defines the direction to attack. All other functions are shut by setting their parameters to null.
     */
    attacks() {
        this.introEnd = null;
        this.playAnimation(this.endbossImages.IMAGES_ENDBOSS_ATTACK);
        if (this.otherDirection == false) {
            this.x -= 10;
        }
        else if (this.otherDirection == true) {
            this.x += 10;
        }
        this.introEnd = true;
        this.attacking = null;
    }

    /**
     * Here is the animation for which the endboss moves. It also fits the width and height of the endboss 
     * inside the canvas because of the difference in image size (introduction images <=> moving images). 
     */
    moves() {
        this.width = 350;
        this.height = 200;
        if (this.x > (914 * 4 + 320)) {
            this.y = 150;
        }
        this.playAnimation(this.endbossImages.IMAGES_ENDBOSS_FLOATING);
        if (this.otherDirection == false) {
            this.x -= 15;
        }
        else if (this.otherDirection == true) {
            this.x += 15;
        }
    }

     /**
     * Here the animation for the endboss intro is defined. If "i" reaches the picture in array-position 8 
     * the variable introEnd is set to true and the animation is set to end.
     */
     playAnimationEndboss(images) {
        if (this.introEnd == true) {
            return false;
        }
        let i = this.currentImage;
        if (i === 8) {
            this.introEnd = true;
            return;
        } else {
            let path = images[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }
    }
} 