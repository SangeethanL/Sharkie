class Character extends MovableObject {
    world;

    characterImages = characterImagesSource;
    speedCharacter = 13;

    idlePermitter = 0;
    idleCounter = 0;

    finSlapEnd;
    limitHitsToEndboss = 0;

    bubbleAttackEnd;

    swimming_sound = new Audio('audio/swimming.mp3');
    snoring_sound = new Audio('audio/snoring.mp3');
    electricShock_sound = new Audio('audio/electric_shock.mp3');
    pufferFish_sound = new Audio('audio/puffer_fish.mp3');
    throw_sound = new Audio('audio/throw.mp3');

    constructor() {
        super();
        this.width = 180;
        this.height = 180;
        this.otherDirection;
        this.energy = 100;
        this.lastHit;
        this.gameRunning;
        this.killedBy;

        this.loadImage(this.characterImages.IMAGES_SWIMMING[0]);
        this.loadImages(this.characterImages.IMAGES_SWIMMING);
        this.loadImages(this.characterImages.IMAGES_ELECTRIC_HURT);
        this.loadImages(this.characterImages.IMAGES_NORMAL_HURT);
        this.loadImages(this.characterImages.IMAGES_ELECTRIC_DEAD);
        this.loadImages(this.characterImages.IMAGES_NORMAL_DEAD);
        this.loadImages(this.characterImages.IMAGES_BUBBLE_ATTACK);
        this.loadImages(this.characterImages.IMAGES_FIN_SLAP);
        this.loadImages(this.characterImages.IMAGES_IDLE);
        this.loadImages(this.characterImages.IMAGES_LONG_IDLE);

        this.animateCharacter();

        this.animateCharacterWhenHurt();
        this.animateCharacterWhenDead();

        this.animateFinSlap();

        this.animateShots();
    }

    /**
     * Here is a request function for multiple use.
     * @returns - requests if sharkie or the endboss have been killed or if the game was paused.
     */
    gameIsNotInRun() {
        return this.killedBy == 'jellyFish' || this.killedBy == 'pufferFish|Endboss' || this.world.endboss.killed == true ||
            this.gameRunning == false;
    }

    /**
     * Here is the main animation function of sharkie. It contains the moving settings as well as the animations.
     */
    animateCharacter() {
        let settingsInterval = setInterval(() => {
            if (this.gameIsNotInRun()) {
                this.swimming_sound.pause();
                return false;
            } else {
                this.swimming_sound.pause();
                this.moveSettingsRightAndLeft();
                this.moveSettingsUpAndDown();
                this.world.camera_x = -this.x + 190;
            }
        }, 1000 / 60);
        let animationsInterval = setInterval(() => {
            this.moveAnimations();
        }, 100);
        this.pushInterval(settingsInterval);
        this.pushInterval(animationsInterval);
    }

    /**
     * Here are the settings to move sharkie to the left and right side. 
     * It contains maximum reach points, speed of moving and sound for moving.
     */
    moveSettingsRightAndLeft() {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.x += this.speedCharacter;
            this.otherDirection = false;
            if (this.world.soundOff == false) {
                this.swimming_sound.play();
            }
        }
        if (this.world.keyboard.LEFT && this.x > -660) {
            this.x -= this.speedCharacter;
            this.otherDirection = true;
            if (this.world.soundOff == false) {
                this.swimming_sound.play();
            }
        }
    }

    /**
     * Here are the settings to move sharkie to up and down. 
     * It contains maximum reach points, speed of moving.
     */
    moveSettingsUpAndDown() {
        if (this.world.keyboard.UP) {
            if (this.y <= -50) {
            } else {
                this.y -= this.speedCharacter;
            }
        }
        if (this.world.keyboard.DOWN) {
            if (this.y >= 370) {
            } else {
                this.y += this.speedCharacter;
            }
        }
    }

    /**
     * Here sharkie is animated for every move. It has an under function for idle animation.
     * Everytime sharkie is moved, is been hurt or is dead the idleCounter is set to 0. The idleCounter counts the time til when sharkie
     * is going to sleep.
     * @returns - prints out false, if the request above is not fulfilled.
     */
    moveAnimations() {
        if (this.gameIsNotInRun()) {
            return false;
        } else {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.UP || this.world.keyboard.DOWN) {
                this.idleCounter = 0;
                this.playAnimation(this.characterImages.IMAGES_SWIMMING);
            } else {
                if (this.isHurt() || this.isDead()) {
                    this.idleCounter = 0;
                } else {
                    this.idleAnimationsAndSettings();
                }
            }
        }
    }

    /**
     * Here the settings and animations for idle and long idle are defined. If the idleCounter is below 50 the animations for idle
     * are played, if it's above 50 the long idle animations are played. The idlePermitter is used to create a space 
     * after sharkie executed an attack. 
     * After each attack the idlePermitter is count up til 15 and then the idleCounter counts from beginning.
     */
    idleAnimationsAndSettings() {
        this.snoring_sound.pause();
        if (this.idlePermitter == 0 || this.idlePermitter >= 15) {
            this.idleCounter += 1;
            if (this.idleCounter > 0 && this.idleCounter <= 50) {
                this.playAnimation(this.characterImages.IMAGES_IDLE);
            } else {
                this.longIdleAnimation();
            }
        }
        else if (this.idlePermitter >= 1 && this.idlePermitter <= 15) {
            this.idlePermitter += 1;
        }
    }

    /**
     * Here the long idle Animation is defined and sharkie is moving to the ground.
     */
    longIdleAnimation() {
        this.playAnimationLongIdle(this.characterImages.IMAGES_LONG_IDLE);
        if (this.world.soundOff == false) {
            this.snoring_sound.play();
        }
        if (this.y >= 350) { }
        else {
            this.y += 2;
        }
    }

    /*-----------------------------------------------------------------------------------------------------------------------------*/


    /**
     * Here sharkie is animated when he's hurt. His energy is reduced in an under function.
     */
    animateCharacterWhenHurt() {
        let isHurtInterval = setInterval(() => {
            if (this.isHurt() && this.gameRunning == true) {
                this.electricShock_sound.pause();
                this.pufferFish_sound.pause();
                this.checkEnemyWhichHurts();
                if (this.isColliding(this.world.endboss) && !this.world.endboss.endbossIsHurt()
                    && !this.world.endboss.isDead() && this.world.endboss.endboss == true) {
                    this.animateHurtNormal();
                }
            }
        }, 90);
        this.pushInterval(isHurtInterval);
    }

    /**
     * Here it is checked, by which enemy sharkie has been hit.
     */
    checkEnemyWhichHurts() {
        this.world.enemies.forEach((enemy) => {
            if (this.isColliding(enemy)) {
                if (enemy.jellyFish == true) {
                    this.animateHurtByJellyFish();
                } else if (enemy.pufferFish == true) {
                    this.animateHurtNormal();
                }
            }
        });
    }

    /**
     * Here is the animation if sharkie has been hit by a jelly fish. It's also defined when it has been killed by that animal. 
     * The associated sound is turned on too.
     */
    animateHurtByJellyFish() {
        this.playAnimation(this.characterImages.IMAGES_ELECTRIC_HURT);
        if (this.energy == 0) {
            this.killedBy = 'jellyFish';
            this.world.endboss.won = true;
        }
        if (this.world.soundOff == false) {
            this.electricShock_sound.play();
        }
    }

    /**
     * Here is the animation if sharkie has been hit by a puffer fish.
     */
    animateHurtNormal() {
        this.playAnimation(this.characterImages.IMAGES_NORMAL_HURT);
        if (this.energy == 0) {
            this.killedBy = 'pufferFish|Endboss';
            this.world.endboss.won = true;
        }
        if (this.world.soundOff == false) {
            this.pufferFish_sound.play();
        }
    }

    /*-----------------------------------------------------------------------------------------------------------------------------*/

    /**
     * Here it's checked, by which enemy sharkie has been killed and the associated animation is being played.
     */
    animateCharacterWhenDead() {
        let isDeadInterval = setInterval(() => {
            if (this.isDead() && this.gameRunning == true) {
                if (this.killedBy == 'jellyFish') {
                    this.animateKilledByJellyFish();
                } else if (this.killedBy == 'pufferFish|Endboss') {
                    this.animateKilledByPufferFish();
                };
            }
        }, 90);
        this.pushInterval(isDeadInterval);
    }

    /**
     * Here is the animation, if sharkie has been killed by a jelly fish and moves to the ground.
     */
    animateKilledByJellyFish() {
        this.playAnimation(this.characterImages.IMAGES_ELECTRIC_DEAD);
        this.y += 10;
        if (this.y >= 360) {
            this.y = 360;
            this.playAnimation(this.characterImages.IMAGES_ELECTRIC_DEAD);
            this.showOnePicture(this.characterImages.IMAGES_ELECTRIC_DEAD[9]);
        }
    }

    /**
     * Here is the animation, if sharkie has been killed by a puffer fish or the endboss and moves to the ground.
     */
    animateKilledByPufferFish() {
        this.playAnimation(this.characterImages.IMAGES_NORMAL_DEAD);
        this.y += 10;
        if (this.y >= 360) {
            this.y = 360;
            this.playAnimation(this.characterImages.IMAGES_NORMAL_DEAD);
            this.showOnePicture(this.characterImages.IMAGES_NORMAL_DEAD[7]);
        }
    }

    /*-----------------------------------------------------------------------------------------------------------------------------*/

    /**
     * Here is the main function of the fin slap when the space button is pressed.
     * It also sets the limitHitsToEndboss parameter to 5 when no button is pressed. 
     * This number is needed later to reset the same parameter.
     */
    animateFinSlap() {
        let finSlapInterval = setInterval(() => {
            if (this.gameIsNotInRun()) {
                return false;
            } else {
                if (this.world.keyboard.SPACE && this.x > -598 && this.x < this.world.level.level_end_x) {
                    this.finSlapWhenSpacePressed();
                }
                else {
                    this.limitHitsToEndboss = 5;
                }
            }
        }, 90);
        this.pushInterval(finSlapInterval);
    }

    /**
     * Here some request-barriers are set and also a leading to the fin slap execution function is included.
     * - If the limitHitsToEndboss parameter is 5 it is reset to 0. This is needed later to damage an enemy.
     * - If sharkie tries to hit within the endboss, no fin slap should be executed. 
     */
    finSlapWhenSpacePressed() {
        if (this.limitHitsToEndboss == 5) {
            this.limitHitsToEndboss = 0;
        }
        if (this.isColliding(this.world.endboss)) {
            if (!this.isCollidingFromLeft('endboss', this.world.endboss) && !this.isCollidingFromRight('endboss', this.world.endboss)) {
                return false;
            }
        }
        /*if (this.limitHitsToEndboss == 1 && this.isHurt()) {
            return false;
        }*/
        this.executeFinSlap();
        this.idleCounter = 0;
        this.idlePermitter = 1;
    }

    /**
     * Here the fin slap is animated as well as the end stadium of the fin slap animation.
     * @returns - If the parameter "limitHitsToEndboss" is 1 nothing more should be animated.
     */
    executeFinSlap() {
        if (this.limitHitsToEndboss == 1) {
            return false;
        } else {
            let finSlapExecutionInterval = setInterval(() => {
                if (this.finSlapEnd == true) {
                    this.showOnePicture(this.characterImages.IMAGES_FIN_SLAP[0]);
                    this.finSlapEnd = 'reset';
                    clearInterval(finSlapExecutionInterval);
                }
                else {
                    this.finSlapAnimationAndSettings();
                }
            }, 50);
            this.pushInterval(finSlapExecutionInterval);
        }
    }

    /**
     * Here the finslap animation is being played. The moving speed of sharkie while the fin slap is defined too.
     */
    finSlapAnimationAndSettings() {
        this.playFinSlapAnimation(this.characterImages.IMAGES_FIN_SLAP);
        if (this.otherDirection == false || this.otherDirection == null) {
            this.x += 3;
        }
        if (this.otherDirection == true) {
            this.x -= 3;
        }
        this.checkIfSlapHit();
    }

    /**
     * Here it's being checked which enemy has been hit by sharkie. If a fish was hit, it defines the setting for being killed
     * by sharkie and the direction where it should disappear.
     */
    checkIfSlapHit() {
        this.world.enemies.forEach((enemy) => {
            if (this.isColliding(enemy)) {
                if (this.isCollidingFromLeft('enemy', enemy) || this.isCollidingFromRight('enemy', enemy)) {
                    enemy.killed = true;
                    enemy.otherDirection = this.otherDirection;
                }
            }
        });
        this.slapHitToEndboss();
    }

    /**
     * Here it's being checked if the endboss has been hit by sharkie. If yes the limitHitsToEndboss parameter is set from 0 to 1, so that
     * the endboss can only be hurt once and not several times while pressing the space button. When the function is being requested again
     * and the parameter has the value 1, no hit to the endboss should happen.
     */
    slapHitToEndboss() {
        if (this.limitHitsToEndboss == 1) {
        } else {
            if (this.isColliding(this.world.endboss)) {
                if (this.isCollidingFromLeft('endboss', this.world.endboss) || this.isCollidingFromRight('endboss', this.world.endboss)) {
                    this.limitHitsToEndboss += 1;
                    if (this.limitHitsToEndboss == 1) {
                        this.world.endboss.otherDirection = this.otherDirection;
                        this.world.endboss.isHit();
                        this.world.endbossLifeStatusBar.setPercentageForEndboss(this.world.endboss.energy);
                    }
                }
            }
        }
    }

    /*-----------------------------------------------------------------------------------------------------------------------------*/

    /**
     * Here the bubble and poison attack animation happens by first of all checking which button was pressed.
     */
    animateShots() {
        let shotInterval = setInterval(() => {
            if (this.gameIsNotInRun()) {
                return false;
            } else {
                if (this.world.keyboard.V && this.world.endboss.endboss == true) {
                    this.animatePoisonShoot();
                } else if (this.world.keyboard.D && !this.isHurt()) {
                    this.animateBubbleShoot();
                }
            }
        }, 90);
        this.pushInterval(shotInterval);
    }

    /**
     * Here is the animation function as well as the settings for the poison attacks.
     * The idleCounter is set to 0 and the idlePermitter is set to 10.
     * @returns - If there are no collected poison bottles, no poison attack should happen.
     */
    animatePoisonShoot() {
        if (this.world.poisonStatusBar.percentage <= 0) {
            return false;
        } else {
            this.shotAnimationInterval();
            this.createShoot('poison');
            this.idleCounter = 0;
            this.idlePermitter = 10;
        }
    }

     /**
     * Here is the animation function as well as the settings for the bubble attacks.
     * The idleCounter is set to 0 and the idlePermitter is set to 10.
     * @returns - If there are no collected coins, no bubble attack should happen.
     */
    animateBubbleShoot() {
        if (this.world.coinsStatusBar.percentage <= 0) {
            return false;
        } else {
            this.shotAnimationInterval();
            this.createShoot('bubble');
            this.idleCounter = 0;
            this.idlePermitter = 10;
        }
    }

    /**
     * Here the bubble and poison attacks are animated.
     */
    shotAnimationInterval() {
        let shootExecutionInterval = setInterval(() => {
            if (this.bubbleAttackEnd == true) {
                this.showOnePicture(this.characterImages.IMAGES_BUBBLE_ATTACK[0]);
                this.bubbleAttackEnd = 'reset';
                clearInterval(shootExecutionInterval);
            } else {
                this.playAnimationBubbleAttack(this.characterImages.IMAGES_BUBBLE_ATTACK);
            }
        }, 2);
        this.pushInterval(shootExecutionInterval);
    }

    /**
     * Here the attacks are created.
     * @param {string} kind - This parameter contains the kind of bubble attack, bubble or poison.
     */
    createShoot(kind) {
        let statusBar;
        let newBubble;
        let bubbleArray;
        if (kind == 'poison') {
            statusBar = this.world.poisonStatusBar;
            newBubble = new PoisonedBubble(this.x, this.y + 100, this.otherDirection);
            bubbleArray = this.world.poisonedBubbles;
        } else if (kind == 'bubble') {
            statusBar = this.world.coinsStatusBar;
            newBubble = new Bubble(this.x, this.y + 100, this.otherDirection);
            bubbleArray = this.world.bubbles;
        }
        this.shootCreation(statusBar, newBubble, bubbleArray);
    }

    /**
     * Here new bubbles are created and the status bar also decreases.
     * @param {var} statusBar  - Status bar from which the energy should be decreased.
     * @param {element} newBubble - New created bubble.
     * @param {array} bubbleArray - Array with the created bubble.
     */
    shootCreation(statusBar, newBubble, bubbleArray) {
        if (statusBar.percentage > 0) {
            let bubble = newBubble;
            bubbleArray.push(bubble);
            if (this.world.soundOff == false) {
                this.throw_sound.play();
            }
            statusBar.percentage = statusBar.percentage - 20;
            statusBar.setPercentage(statusBar.percentage);
        }
    }
}