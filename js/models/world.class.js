class World {
    ctx;
    canvas;
    keyboard;

    startGame = null;

    camera_x = 0;

    character = new Character();
    level = level1;
    lightMode = false;
    enemies = this.level.enemies;
    endboss = this.level.endboss;
    light = this.level.light;
    objects = this.level.objects;
    backgroundLayers;

    lifeStatusBar = new LifeStatusBar();
    coinsStatusBar = new CoinsStatusBar();
    poisonStatusBar = new PoisonStatusBar();
    endbossLifeStatusBar = new EndbossLifeStatusBar();

    bubbles = [];
    poisonedBubbles = [];

    winner;

    soundOff = false;
    background_music = new Audio('audio/background_music.mp3');
    poisonCollected_sound = new Audio('audio/posion.mp3');
    coinCollected_sound = new Audio('audio/coin.mp3');

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkCollisions();
        this.deleteBubbles();
        this.eliminateEnemiesIfKilled();
        this.activateEndboss();
        this.checkWinner();
    }

    /**
     * Here all the elements (sharkie, enemies, objects, backgroundlayer, etc.) all drawn to the canvas repeatedly.
     * It's also defining, if the game is paused or played.
     */
    draw() {
        this.setBackgroundMusic();
        if (this.startGame == true) {
            this.drawGame();
            this.setGameRunningTrue();
        } else {
            this.setGameRunningFalse();
        }
        //Draw() wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    /**
     * Here the background music is played or paused.
     */
    setBackgroundMusic() {
        if (this.startGame == null || this.soundOff == true) {
            this.background_music.pause();
            this.endboss.soundOff == true;
        } else {
            this.background_music.play();
            this.endboss.soundOff == false;
        }
    }

    /**
     * Here for the enemies, character and endboss it's defined, that the game is playing.
     */
    setGameRunningTrue() {
        this.enemies.forEach((enemy) => {
            enemy.gameRunning = true;
        });
        this.character.gameRunning = true;
        this.endboss.gameRunning = true;
    }

    /**
     * Here for the enemies, character and endboss it's defined, that the game is paused.
     */
    setGameRunningFalse() {
        this.enemies.forEach((enemy) => {
            enemy.gameRunning = false;
        });
        this.character.gameRunning = false;
        this.endboss.gameRunning = false;
    }

    /**
     * Here the the colors of the ground poisons are defined by the chosen light mode.
     */
    groundPosionsColor() {
        if (this.lightMode == false) {
            this.objects.push(DARKGROUNDPOISONS[0]);
            this.objects.push(DARKGROUNDPOISONS[1]);
        }
        else if (this.lightMode == true) {
            this.objects.push(LIGHTGROUNDPOISONS[0]);
            this.objects.push(LIGHTGROUNDPOISONS[1]);
        }
    }

    /**
     * Here the objects, character, enemies, endboss and the statusbars are drawn.
     */
    drawGame() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);

        this.gameObjects();
        this.gameLifeObjects();

        this.ctx.translate(-this.camera_x, 0);
    }

    /**
     * Split under function from above.
     */
    gameObjects() {
        if (this.lightMode == false) {
            this.backgroundLayers = darkBackgroundLayer;
        }
        else if (this.lightMode == true) {
            this.backgroundLayers = lightBackgroundLayer;
        }
        this.addObjectsToMap(this.backgroundLayers);
        this.addObjectsToMap(this.light);
        this.addObjectsToMap(this.objects);
        this.addToMap(this.endboss);
        this.addObjectsToMap(this.enemies);
    }

    /**
     * Split under function from above.
     */
    gameLifeObjects() {
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.lifeStatusBar);
        this.addToMap(this.coinsStatusBar);
        this.addToMap(this.poisonStatusBar);
        if (this.endboss.endboss == true) {
            this.addToMap(this.endbossLifeStatusBar);
        }
        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.character);
        this.addObjectsToMap(this.bubbles);
        this.addObjectsToMap(this.poisonedBubbles);
    }

    /**
     * Here every element from an array is loaded to the canvas.
     * @param {array} objects - Name of the array.
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        })
    }

    /**
     * Here every element from a variable is loaded to the canvas.
     * @param {variable} mo - Name of the variable.
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            if (mo.pufferFish) {
            } else {
                this.flipImage(mo);
            }
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
     * Here the image of the element is flipped.
     * @param {variable} mo - Name of the variable.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Here the image of the element is flipped back.
     * @param {variable} mo - Name of the variable.
     */
    flipImageBack(mo) {
        if (mo.pufferFish) {
        } else {
            mo.x = mo.x * -1;
            this.ctx.restore();
        }
    }

    /**
     * Here the attribut world in the character.class.js is defined to this document.
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * Here the collision are checked with the enemies, the endboss, with the objects.
     * The bubble collisions with the enemies and the endboss are also checked here.
     */
    checkCollisions() {
        this.poisonCollected_sound.pause();
        this.coinCollected_sound.pause();
        let collisionsInterval = setInterval(() => {
            this.checkCollisionWithEnemies();
            this.checkCollisionWithObjects();
            this.checkBubbleCollisions();
        }, 200);
    }

    /*-----------------------------------------------------------------------------------------------------------------------------*/

    /**
     * Here it's checked if the collision is with an enemy or the endboss.
     */
    checkCollisionWithEnemies() {
        if (this.startGame == true) {
            this.isCollisionEnemy();
            this.isCollisionEndboss();
        } else { }
    };

    /**
     * Here the enemy which hurts sharkie is defined and sharkie is being hurt. If the enemy is a puffer fish the animation therefor
     * is activated too.
     */

    isCollisionEnemy() {
        this.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                if (enemy.killed == true || this.endboss.killed == true) {
                    return false;
                }
                else if (enemy.pufferFish == true) {
                    enemy.hitWithPufferFish = true;
                    this.character.isHit();
                    this.lifeStatusBar.setPercentage(this.character.energy);
                }
                else {
                    this.character.isHit();
                    this.lifeStatusBar.setPercentage(this.character.energy);
                }
            }
        });
    }

    /**
     * Here sharkie is being hit by the endboss.
     */
    isCollisionEndboss() {
        if (this.character.isColliding(this.endboss)) {
            if (this.endboss.killed == true || this.endboss.endbossIsHurt()) {
                return false;
            }
            else {
                this.endboss.attacking = true;
                this.character.isHit();
                this.lifeStatusBar.setPercentage(this.character.energy);
            }
        }
    }

    /*-----------------------------------------------------------------------------------------------------------------------------*/

    /**
     * Here it's defined, which object is collected.
     */

    checkCollisionWithObjects() {
        this.objects.forEach((object) => {
            if (this.character.isColliding(object)) {
                if (object.poison == true) {
                    this.collectObject(this.poisonStatusBar, object, this.poisonCollected_sound);
                }
                else if (object.groundPoison == true) {
                    this.collectObject(this.poisonStatusBar, object, this.poisonCollected_sound);
                }
                else if (object.coin == true) {
                    this.collectObject(this.coinsStatusBar, object, this.coinCollected_sound);
                }
            }
        });
    }

    /**
     * Here the object is collected.
     * @param {var} statusBar - Status bar for the object.
     * @param {element} indexOfObject - Index of the object inside its array.
     * @param {var} audio - Variable of the audio
     */
    collectObject(statusBar, indexOfObject, audio) {
        if (statusBar.percentage < 100) {
            statusBar.collected();
            statusBar.setPercentage(statusBar.percentage);
            this.objects.splice(this.objects.indexOf(indexOfObject), 1);
            if (this.soundOff == false) {
                audio.play();
            }
        }
    }

    /*-----------------------------------------------------------------------------------------------------------------------------*/

    /**
     * Here it's checked if a bubble hits an enemy or the endboss.
     */
    checkBubbleCollisions() {
        this.bubbles.forEach((bubble) => {
            this.enemies.forEach((enemy) => {
                if (bubble.isBubbleColliding(enemy) && enemy.killed == null) {
                    this.bubbles.splice(bubble, 1);
                    enemy.killed = true;
                    enemy.otherDirection = this.character.otherDirection;
                }
            });
            this.checkBubbleCollisionsWithEndboss(this.bubbles, bubble);
        });
        this.poisonedBubbles.forEach((poisonedBubble) => {
            this.checkBubbleCollisionsWithEndboss(this.poisonedBubbles, poisonedBubble);
        });
    }

    /**
     * Here the endboss is hit by a bubble.
     * @param {array} array - Array of the bubbles
     * @param {element} object - Index of the element
     */
    checkBubbleCollisionsWithEndboss(array, object) {
        if (object.isBubbleColliding(this.endboss) && this.endboss.killed == null && this.endboss.x < 914 * 4 + 350) {
            array.splice(object, 1);
            this.endboss.isHit();
            this.endbossLifeStatusBar.setPercentageForEndboss(this.endboss.energy);
            this.endboss.otherDirection = this.character.otherDirection;
        }
    }

    /*-----------------------------------------------------------------------------------------------------------------------------*/

    /**
     * Here it's checked in which direction the bubbles are shot.
     */
    deleteBubbles() {
        let spliceBubblesInterval = setInterval(() => {
            if (world.character.otherDirection == false) {
                this.spliceBubbleFalseDirection();
            } else if (world.character.otherDirection == true) {
                this.spliceBubbleTrueDirection();
            }
        }, 90);
    }

    /**
     * Here the bubbles are spliced when they overreach 650px in false direction.
     */
    spliceBubbleFalseDirection() {
        this.bubbles.forEach((bubble) => {
            if ((bubble.x - bubble.originalX) > 650) {
                this.bubbles.splice(this.bubbles.indexOf(bubble), 1);
            }
        });
        this.poisonedBubbles.forEach((poisonedBubble) => {
            if ((poisonedBubble.x - poisonedBubble.originalX) > 650) {
                this.poisonedBubbles.splice(this.poisonedBubbles.indexOf(poisonedBubble), 1);
            }
        });
    }

    /**
     * Here the bubbles are spliced when they overreach 650px in true direction.
     */
    spliceBubbleTrueDirection() {
        this.bubbles.forEach((bubble) => {
            if ((bubble.originalX - bubble.x) > 650) {
                this.bubbles.splice(this.bubbles.indexOf(bubble), 1);
            }
        });
        this.poisonedBubbles.forEach((poisonedBubble) => {
            if ((poisonedBubble.originalX - poisonedBubble.x) > 650) {
                this.poisonedBubbles.splice(this.poisonedBubbles.indexOf(poisonedBubble), 1);
            }
        });
    }

    /*-----------------------------------------------------------------------------------------------------------------------------*/

    /**
     * Here the enemies are spliced if the are killed.
     */
    eliminateEnemiesIfKilled() {
        let spliceEnemiesInterval = setInterval(() => {
            this.enemies.forEach((enemy) => {
                if (enemy.killed == true && (enemy.width <= 0 || enemy.height <= 0 || enemy.y <= 0)) {
                    this.enemies.splice(this.enemies.indexOf(enemy), 1);
                }
            });
        }, 90);
    }

    /*-----------------------------------------------------------------------------------------------------------------------------*/

    /**
     * Here the endboss is activated if sharkie reaches the end of level1. The objects are then spliced too.
     */
    activateEndboss() {
        let activateEndbossInterval = setInterval(() => {
            if (this.startGame == true) {
                if (this.character.x >= (914 * 4 - 100)) {
                    this.enemies.forEach((enemy) => {
                        this.enemies.splice(this.enemies.indexOf(enemy), 11);
                    });
                    this.endboss.endboss = true;
                }
                if (this.endboss.introEnd == true) {
                    this.endbossFollowsSharkie();
                }
            } else { }
        }, 90);
    }

    /**
     * Here is the function for the endboss to follow sharkie.
     */
    endbossFollowsSharkie() {
        let followSharkieY;
        if (this.endboss.x < 914 * 4 + 350) {
            if (this.character.y > this.endboss.y && (this.endboss.y + this.endboss.height) < 540) {
                followSharkieY = ((this.character.y - this.endboss.y) / 540);
                this.endboss.y += (followSharkieY + 2);
            }
            else if (this.character.y < this.endboss.y && this.endboss.y > 0) {
                followSharkieY = ((this.endboss.y - this.character.y) / 540);
                this.endboss.y -= (followSharkieY + 2);
            }
        }
        if ((this.character.x + this.character.width) > (this.endboss.x + this.endboss.width)) {
            this.endboss.otherDirection = true;
        } else {
            this.endboss.otherDirection = false;
        }
    }


    /*-----------------------------------------------------------------------------------------------------------------------------*/

    /**
     * Here the winner of the game is checked.
     */
    checkWinner() {
        let checkWinnerInterval = setInterval(() => {
            if (this.endboss.isDead() && this.endboss.y == 330) {
                this.winner = 'character';
                this.winnerIsSharkie();
            } else if (this.character.isDead() && this.character.y == 360) {
                this.winner = 'endboss';
                this.winnerIsEndboss();
            }
        }, 90);
    }

    /**
     * Here the screen is activated if sharkie looses.
     */
    winnerIsEndboss() {
            document.getElementById('overlayContainer').style = '';
            document.getElementById('menu').style = 'display: none;';
            document.getElementById('lost').style = '';
            world.startGame = false;
            document.getElementById('fullScreenNavbar').style = 'pointer-events: none;';
            document.getElementById('menuNavbar').style = 'pointer-events: none;';
            document.getElementById('pauseContinueNavbar').style = 'pointer-events: none;';
    }

    /**
     * Here the screen is activated if sharkie wins.
     */
    winnerIsSharkie() {
            document.getElementById('overlayContainer').style = '';
            document.getElementById('menu').style = 'display: none;';
            document.getElementById('won').style = '';
            world.startGame = false;
            document.getElementById('fullScreenNavbar').style = 'pointer-events: none;';
            document.getElementById('menuNavbar').style = 'pointer-events: none;';
            document.getElementById('pauseContinueNavbar').style = 'pointer-events: none;';
    }
}