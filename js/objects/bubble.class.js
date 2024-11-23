class Bubble extends MovableObject {


    constructor(x, y, otherDirection) {
        super();
        this.originalX = x;
        this.width = 15;
        this.height = 15;
        this.otherDirection;

        this.loadImage('img/1.Sharkie/4.Attack/Bubble trap/Bubble.png');

        this.shoot(x, y, otherDirection);
    }


}
