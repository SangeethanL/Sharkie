class MovableObject extends DrawableObject {

    jellyFish;
    pufferFish;

    coin;
    poison;
    groundPoison;

    speed;
    speedX;
    speedY;

    otherDirection = false;
    maxReached;
    turnPoint;

    energy;
    lastHit;

    gameRunning;
    killed;

    hitWithPufferFish;
    hasGrown;
    moveIsFinished;

    finalDeadImg;

    /**
     * Here the energyloss to sharkie or the endboss are defined.
     */
    isHit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Here the time, for how long the hurt animation should last, is defined for sharkie only.
     * @returns - puts out the time.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; //Difference in ms
        timepassed = timepassed / 1000; // Difference in s
        return timepassed < 0.3;
    }

    /**
     * Here the time, for how long the hurt animation should last, is defined for the endboss only.
     * @returns - puts out the time.
     */
    endbossIsHurt() {
        let timepassed = new Date().getTime() - this.lastHit; //Difference in ms
        timepassed = timepassed / 1000; // Difference in s
        return timepassed < 1.5;
    }

    /**
     * Here it's checked if sharkie or the endboss are dead.
     * @returns - Checks out if the energy is 0.
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * Here it's asked if something is colliding with another element. The sizes are fit to sharkie frame size.
     * @param {element} mo - Element which is asked to be colliding with.
     */
    isColliding(mo) {
        if (this.killedBy == 'jellyFish' || this.killedBy == 'pufferFish|Endboss') {
            return false;
        } else {
            return (this.x + 30) + (this.width - 60) > mo.x &&
                (this.x + 30) < mo.x + mo.width &&
                (this.y + 80) < mo.y + mo.height &&
                (this.y + 80) + (this.height - 120) > mo.y
        }
    }

    /**
     * Here it's asked if something is colliding with another element from the left side.
     * @param {string} animal - Animal is defined to be colliding with.
     * @param {element} mo - Element of animal which is asked to be colliding with.
     */
    isCollidingFromLeft(animal, mo) {
        if (this.killedBy == 'jellyFish' || this.killedBy == 'pufferFish|Endboss') {
            return false;
        } else {
            if (animal == 'enemy') {
                return (this.x + 30) + (this.width - 60) > mo.x &&
                    (this.x + 30) + (this.width - 60) < mo.x + 15
            } else if (animal == 'endboss') {
                return (this.x + 30) + (this.width - 60) > mo.x &&
                    (this.x + 30) + (this.width - 60) < mo.x + 75
            }

        }
    }

    /**
     * Here it's asked if something is colliding with another element from the right side.
     * @param {string} animal - Animal is defined to be colliding with.
     * @param {element} mo - Element of animal which is asked to be colliding with.
     */
    isCollidingFromRight(animal, mo) {
        if (this.killedBy == 'jellyFish' || this.killedBy == 'pufferFish|Endboss') {
            return false;
        } else {
            if (animal == 'enemy') {
                return (this.x + 30) > mo.x + mo.width - 15 &&
                    (this.x + 30) < mo.x + mo.width
            } else if (animal == 'endboss') {
                return (this.x + 30) > mo.x + mo.width - 75 &&
                    (this.x + 30) < mo.x + mo.width
            }
        }
    }

    /**
     *  Here it's asked if bubbles are colliding with another element.
     * @param {element} mo - Element which is asked to be colliding with.
     */
    isBubbleColliding(mo) {
        if (this.killedBy == 'jellyFish' || this.killedBy == 'pufferFish|Endboss') {
            return false;
        } else {
            return this.x + this.width > mo.x &&
                this.x < mo.x + mo.width &&
                this.y < mo.y + mo.height &&
                this.y + this.height > mo.y
        }
    }

    /*-----------------------------------------------------------------------------------------------------------------------------*/

    /**
     * Here the animations and settings for the puffer fishes are defined.
     * @param {array} images - Array with normal swimming images.
     * @param {array} images_dead - Array with dying images.
     * @param {array} imgs_collision_grow - Array with growing images.
     * @param {array} imgs_collision_move - Array with moving images after growing.
     * @param {array} imgs_collision_return - Array with returning images after moving.
     */
    animatePufferFish(images, images_dead, imgs_collision_grow, imgs_collision_move, imgs_collision_return) {
        let pufferFishSettingsInterval = setInterval(() => {
            if (this.gameRunning == true) {
                this.settingsForPufferFish();
            } else { }
        }, 1000 / 60);
        let pufferFishAnimationsInterval = setInterval(() => {
            if (this.gameRunning == true) {
                if (this.killed == true) {
                    this.animateDeadPufferFish(images_dead);
                }
                else if (this.hitWithPufferFish == true) {
                    this.animationCollisionWithPufferFish(imgs_collision_grow, imgs_collision_move, imgs_collision_return);
                } else {
                    this.playAnimation(images);
                }
            } else { }
        }, 185);
        this.pushInterval(pufferFishSettingsInterval);
        this.pushInterval(pufferFishAnimationsInterval);
    }

    /**
     * Here the settings for the puffer fish are defined if he's killed or he collides with sharkie.
     */
    settingsForPufferFish() {
        if (this.killed == true) {
            this.settingsWhenKilled();
        }
        else if (this.hitWithPufferFish == true) {
            this.settingsWhenCollides();
        }
        else {
            this.x -= this.speed;
        }
    }

    /**
     * Here are the setting if the puffer fish has been killed.
     */
    settingsWhenKilled() {
        if (this.otherDirection == false) {
            this.x += 4;
        } else {
            this.x -= 4;
        }
        if (this.width <= 0 || this.height <= 0) {
        } else {
            this.width -= 0.7;
            this.height -= 0.7;
        }
    }

    /**
     * Here are the setting if the puffer fish collides with sharkie.
     */
    settingsWhenCollides() {
        if (this.moveIsFinished == true) {
            this.settingsForReturn();
        }
        else if (this.hasGrown == true) {
            this.settingsForMove();
        }
        else {
            this.settingsForGrow();
        }
    }

    /**
     * Here are the setting for the puffer fish to grow.
     */
    settingsForGrow() {
        if (this.width >= 80) {
            this.hasGrown = true;
        } else {
            this.width += 0.7;
            this.height += 0.7;
        }
    }

    /**
     * Here are the setting for the puffer fish to move.
     */
    settingsForMove() {
        this.x -= 0.5;
        let movingTimer = setTimeout(() => {
            this.moveIsFinished = true;
            this.hasGrown = null;
        }, 6000);
    }

    /**
     * Here are the setting for the puffer fish to return.
     */
    settingsForReturn() {
        if (this.width <= 60) {
            this.moveIsFinished = null;
            this.hitWithPufferFish = null;
        } else {
            this.width -= 0.7;
            this.height -= 0.7;
        }
    }

    /**
     * Here is the animation if the puffer fish dies.
     * @param {array} imagesDead - Array with dying images.
     */
    animateDeadPufferFish(imagesDead) {
        if (this.finalDeadImg == true) {
            this.showOnePicture(imagesDead[2]);
            this.finalDeadImg = null;
        } else {
            this.playPufferFishDeadAnimation(imagesDead);
        }
    }

    /**
     * Here are the animations for the puffer fish when it collides with sharkie.
     * @param {array} imgsGrow - Array with growing images.
     * @param {array} imgsMove - Array with moving images after growing.
     * @param {array} imgsReturn - Array with returning images after moving.
     */
    animationCollisionWithPufferFish(imgsGrow, imgsMove, imgsReturn) {
        if (this.moveIsFinished == true && this.width >= 60) {
            this.playAnimation(imgsReturn);
        }
        else if (this.hasGrown == true) {
            this.playAnimation(imgsMove);
        } else {
            if (this.width <= 80) {
                this.playAnimation(imgsGrow);
            }
        }
    }

    /*-----------------------------------------------------------------------------------------------------------------------------*/

    /**
     * Here are the animations and settings for the jelly fishes.
     * @param {function} jellyFishMoveFunction - Function for each jelly fish to move.
     * @param {array} images - Array with moving images.
     * @param {array} images_dead - Array with dying images.
     */
    animateJellyFish(jellyFishMoveFunction, images, images_dead) {
        jellyFishMoveFunction;
        let jellyFishAnimationsInterval = setInterval(() => {
            if (this.gameRunning == true) {
                if (this.killed == true) {
                    this.animateDeadJellyFish(images_dead);
                } else {
                    this.playAnimation(images);
                }
            } else { }
        }, 185);
        this.pushInterval(jellyFishAnimationsInterval);
    }

    /**
     * Here are the settings for jelly fishes if they die.
     * @param {array} imagesDead - Array with dying images.
     */
    animateDeadJellyFish(imagesDead) {
        this.playAnimation(imagesDead);
        if (this.otherDirection == false) {
            this.x += 40;
            this.y -= 40;
        } else {
            this.x -= 40;
            this.y -= 40;
        }
    }

    /**
     * Here are the settings if the jelly fish moves up and down only.
     */
    moveJellyFishUpDown() {
        let jellyFishUpDownInterval = setInterval(() => {
            if (this.gameRunning == true) {
                if (this.y <= 10 || this.maxReached == null) {
                    this.maxReached = null;
                    this.y += this.speedY;
                }
                if (this.y >= 450 || this.maxReached == 'moveUpward') {
                    this.maxReached = 'moveUpward';
                    this.y -= this.speedY;
                }
            } else { }
        }, 1000 / 60);
        this.pushInterval(jellyFishUpDownInterval);
    }

    /*-----------------------------------------------------------------------------------------------------------------------------*/

    /**
     * Here the bubble and poison shots are defined (The direction, the speed and the growth of the bubbles).
     * @param {varibale} xCoordinate - X Coordinte of sharkie.
     * @param {variable} yCoordinate - Y Coordinte of sharkie.
     * @param {variable} shootingDirection - Direction in which sharkie is swimming.
     */
    shoot(xCoordinate, yCoordinate, shootingDirection) {
        this.bubblePosition(xCoordinate, shootingDirection);
        this.y = yCoordinate;
        let bubblesShotInterval = setInterval(() => {
            if (shootingDirection == false) {
                this.x += 20;
            }
            else if (shootingDirection == true) {
                this.x -= 20;
            }
            if (this.width && this.height >= 25) {
            } else {
                this.width += 3;
                this.height += 3;
            }
        }, 40);
        this.pushInterval(bubblesShotInterval);
    }

    /**
     * Here the starting position of the bubble shot is defined.
     * @param {variable} xCoordinate - X Coordinte of sharkie.
     * @param {variable} shootingDirection - Direction in which sharkie is swimming.
     */
    bubblePosition(xCoordinate, shootingDirection) {
        if (shootingDirection == false) {
            this.x = xCoordinate + 180;
        }
        else if (shootingDirection == true) {
            this.x = xCoordinate;
        }
    }

    /*-----------------------------------------------------------------------------------------------------------------------------*/

    /**
     * Here images are animated with one specific time speed.
     * @param {array} images - Array from which the images should be loaded.
     */
    animateOnPoint(images) {
        let animationOnPointInterval = setInterval(() => {
            this.playAnimation(images);
        }, 185);
        this.pushInterval(animationOnPointInterval);
    }

    /**
     * Here the images are animated normally.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Here just one picture is displayed.
     */
    showOnePicture(image) {
        let path = image;
        this.img = this.imageCache[path];
    }

    /**
     * Here the long idle animation is played. If "i" has gone through all images the image in position 10 should last.
     */
    playAnimationLongIdle(images) {
        let i = this.currentImage % images.length;
        if (i == images.length - 1) {
            this.currentImage = 10;
        } else {
            let path = images[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }
    }

    /**
     * Here the fin slap animation is played. If "i" has gone through all images, the variable finSlapEnd is set to "true", so that just
     * the last picture will be shown. After that has been loaded, the same variable is set to reset, the variable currentImage 
     * is set to 0 and the variable finSlapEnd back to null so that the animation can be displayed again when space button is pressed.
     */
    playFinSlapAnimation(images) {
        if (this.finSlapEnd == 'reset') {
            this.currentImage = 0;
            this.finSlapEnd = null;
        }
        let i = this.currentImage % images.length;
        if (i == images.length - 1) {
            this.finSlapEnd = true;
        } else {
            let path = images[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }
    }

    /**
     * Here the bubble attack animation is played. If "i" has gone through all images, the variable bubbleAttackEnd is set to true, 
     * so that just the last picture will be shown. After that has been loaded, the same variable is set to reset, 
     * the variable currentImage is set to 0 and the variable bubbleAttackEnd back to null.
     */
    playAnimationBubbleAttack(images) {
        if (this.bubbleAttackEnd == 'reset') {
            this.currentImage = 0;
            this.bubbleAttackEnd = null;
        }
        let i = this.currentImage % images.length;
        if (i == images.length - 1) {
            this.bubbleAttackEnd = true;
        } else {
            let path = images[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }
    }

    /**
     * Here the animation is played if the puffer fish is dead. If all images have been loaded the variable finalDeadImg is set to true
     * so that the last picture will be shown.
     */
    playPufferFishDeadAnimation(images) {
        let i = this.currentImage % images.length;
        if (i == images.length - 1) {
            this.finalDeadImg = true;
        } else {
            let path = images[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }
    }

    /*-----------------------------------------------------------------------------------------------------------------------------*/

    /**
     * With this function each interval can be pushed to the intervals array. This is used to end the intervals when the game is repeated.
     * @param {variable} interval - Name of interval
     */
    pushInterval(interval) {
        intervals.push(interval)
    }
}