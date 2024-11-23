class Level {
    enemies;
    endboss;
    light;
    objects;
    level_end_x = 919 * 4;

    constructor(e, E, l, o) {
        this.enemies = e;
        this.endboss = E,
        this.light = l;
        this.objects = o;
    }
}