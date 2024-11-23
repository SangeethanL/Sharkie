
const level1 = new Level(
    [
        new GreenJellyFish(500, 200),
        new LilaJellyFish(850, 400),
        new YellowJellyFish(1100, 0),
        new LilaJellyFish(1550, 100),
        new PinkJellyFish(1800, 150),
        new YellowJellyFish(2600, 180),
        new GreenJellyFish(3100, 150),
        new LilaJellyFish(3600, 100),
        new GreenPufferFish(1400, 225),
        new PinkPufferFish(2400, 250),
        new LilaPufferFish(3200, 125),
    ],
    new Endboss(),
    [new FirstLight(),
    new SecondLight()],
    [new Poison(1120, 245),
    new Poison(1690, 300),
    new Poison(1920, 290),
    new Poison(2650, 310),
    new Poison(2920, 250),
    new Poison(3410, 295),

    new Coins(850, 100),
    new Coins(1550, 350),
    new Coins(2025, 100),

    new Coins(2200, 350),
    new Coins(2260, 325),
    new Coins(2320, 300),
    new Coins(2380, 300),
    new Coins(2440, 325),
    new Coins(2500, 350),

    new Coins(3025, 100),
    new Coins(3525, 350)
    ]);

const darkBackgroundLayer =
    [
        new BackgroundLayer('img/3. Background/Layers/5. Water/D2.png', -919),
        new BackgroundLayer('img/3. Background/Layers/4.Fondo 2/D2.png', -919),
        new BackgroundLayer('img/3. Background/Layers/3.Fondo 1/D2.png', -919),
        new BackgroundLayer('img/3. Background/Layers/2. Floor/D2.png', -919),

        new BackgroundLayer('img/3. Background/Layers/5. Water/D1.png', 0),
        new BackgroundLayer('img/3. Background/Layers/4.Fondo 2/D1.png', 0),
        new BackgroundLayer('img/3. Background/Layers/3.Fondo 1/D1.png', 0),
        new BackgroundLayer('img/3. Background/Layers/2. Floor/D1.png', 0),
        new BackgroundLayer('img/3. Background/Layers/5. Water/D2.png', 919),
        new BackgroundLayer('img/3. Background/Layers/4.Fondo 2/D2.png', 919),
        new BackgroundLayer('img/3. Background/Layers/3.Fondo 1/D2.png', 919),
        new BackgroundLayer('img/3. Background/Layers/2. Floor/D2.png', 919),

        new BackgroundLayer('img/3. Background/Layers/5. Water/D1.png', 919 * 2),
        new BackgroundLayer('img/3. Background/Layers/4.Fondo 2/D1.png', 919 * 2),
        new BackgroundLayer('img/3. Background/Layers/3.Fondo 1/D1.png', 919 * 2),
        new BackgroundLayer('img/3. Background/Layers/2. Floor/D1.png', 919 * 2),
        new BackgroundLayer('img/3. Background/Layers/5. Water/D2.png', 919 * 3),
        new BackgroundLayer('img/3. Background/Layers/4.Fondo 2/D2.png', 919 * 3),
        new BackgroundLayer('img/3. Background/Layers/3.Fondo 1/D2.png', 919 * 3),
        new BackgroundLayer('img/3. Background/Layers/2. Floor/D2.png', 919 * 3),

        new BackgroundLayer('img/3. Background/Layers/5. Water/D1.png', 919 * 4),
        new BackgroundLayer('img/3. Background/Layers/4.Fondo 2/D1.png', 919 * 4),
        new BackgroundLayer('img/3. Background/Layers/3.Fondo 1/D1.png', 919 * 4),
        new BackgroundLayer('img/3. Background/Layers/2. Floor/D1.png', 919 * 4)
    ]


const lightBackgroundLayer =
    [
        new BackgroundLayer('img/3. Background/Layers/5. Water/L2.png', -919),
        new BackgroundLayer('img/3. Background/Layers/4.Fondo 2/L2.png', -919),
        new BackgroundLayer('img/3. Background/Layers/3.Fondo 1/L2.png', -919),
        new BackgroundLayer('img/3. Background/Layers/2. Floor/L2.png', -919),

        new BackgroundLayer('img/3. Background/Layers/5. Water/L1.png', 0),
        new BackgroundLayer('img/3. Background/Layers/4.Fondo 2/L1.png', 0),
        new BackgroundLayer('img/3. Background/Layers/3.Fondo 1/L1.png', 0),
        new BackgroundLayer('img/3. Background/Layers/2. Floor/L1.png', 0),
        new BackgroundLayer('img/3. Background/Layers/5. Water/L2.png', 919),
        new BackgroundLayer('img/3. Background/Layers/4.Fondo 2/L2.png', 919),
        new BackgroundLayer('img/3. Background/Layers/3.Fondo 1/L2.png', 919),
        new BackgroundLayer('img/3. Background/Layers/2. Floor/L2.png', 919),

        new BackgroundLayer('img/3. Background/Layers/5. Water/L1.png', 919 * 2),
        new BackgroundLayer('img/3. Background/Layers/4.Fondo 2/L1.png', 919 * 2),
        new BackgroundLayer('img/3. Background/Layers/3.Fondo 1/L1.png', 919 * 2),
        new BackgroundLayer('img/3. Background/Layers/2. Floor/L1.png', 919 * 2),
        new BackgroundLayer('img/3. Background/Layers/5. Water/L2.png', 919 * 3),
        new BackgroundLayer('img/3. Background/Layers/4.Fondo 2/L2.png', 919 * 3),
        new BackgroundLayer('img/3. Background/Layers/3.Fondo 1/L2.png', 919 * 3),
        new BackgroundLayer('img/3. Background/Layers/2. Floor/L2.png', 919 * 3),

        new BackgroundLayer('img/3. Background/Layers/5. Water/L1.png', 919 * 4),
        new BackgroundLayer('img/3. Background/Layers/4.Fondo 2/L1.png', 919 * 4),
        new BackgroundLayer('img/3. Background/Layers/3.Fondo 1/L1.png', 919 * 4),
        new BackgroundLayer('img/3. Background/Layers/2. Floor/L1.png', 919 * 4)
    ]

DARKGROUNDPOISONS =
    [new DarkPoisonLeft(1350, 420),
    new DarkPoisonRight(2900, 420)];

LIGHTGROUNDPOISONS =
    [new LightPoisonLeft(1350, 420),
    new LightPoisonRight(2800, 420)];