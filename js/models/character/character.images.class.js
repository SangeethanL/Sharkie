class CharacterImages {
    IMAGES_SWIMMING;
    IMAGES_ELECTRIC_HURT;
    IMAGES_NORMAL_HURT;
    IMAGES_ELECTRIC_DEAD;
    IMAGES_NORMAL_DEAD;
    IMAGES_BUBBLE_ATTACK;
    IMAGES_FIN_SLAP;
    IMAGES_IDLE;
    IMAGES_LONG_IDLE;

    constructor(s, eH, nH, eD, nD, bA, fS, idle, long_idle) {
        this.IMAGES_SWIMMING = s;
        this.IMAGES_ELECTRIC_HURT = eH;
        this.IMAGES_NORMAL_HURT = nH;
        this.IMAGES_ELECTRIC_DEAD = eD;
        this.IMAGES_NORMAL_DEAD = nD;
        this.IMAGES_BUBBLE_ATTACK = bA;
        this.IMAGES_FIN_SLAP = fS;
        this.IMAGES_IDLE = idle;
        this.IMAGES_LONG_IDLE = long_idle;
    }
}