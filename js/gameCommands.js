let instructionsOpened;
let gameWhileMenu;
let fullscreenOpened;

/**
 * Here the sound image of an HTML-Element is being changed.
 * @param {string} source - Id of element where the image has to be changed.
 */
function turnSoundOnOff(source) {
    if (world.soundOff == false) {
        world.soundOff = true;
        world.endboss.soundOff = true;
        document.getElementById(source).src = 'img/6.Botones/soundOff.png';
    } else if (world.soundOff == true) {
        world.soundOff = false;
        world.endboss.soundOff = false;
        document.getElementById(source).src = 'img/6.Botones/soundOn.png';
    }
}

/**
 * Here the images of the elements are refreshed to the sound mode.
 */
function isSoundOnOrOff() {
    if (world.soundOff == false) {
        document.getElementById('soundStart').src = 'img/6.Botones/soundOn.png';
        document.getElementById('soundNavbar').src = 'img/6.Botones/soundOn.png';
    } else if (world.soundOff == true) {
        document.getElementById('soundStart').src = 'img/6.Botones/soundOff.png';
        document.getElementById('soundNavbar').src = 'img/6.Botones/soundOff.png'
    }
}

/**
 *  Here the play and pause images of the element are being changed.
 */
function pauseAndContinue() {
    if (world.startGame == true) {
        world.startGame = false;
        document.getElementById('pauseContinueNavbar').src = 'img/6.Botones/play.png';
    }
    else if (world.startGame == false) {
        world.startGame = true;
        document.getElementById('pauseContinueNavbar').src = 'img/6.Botones/pause.png';
    }
}

/**
 * Here the images of the elements are refreshed to the play and pause mode.
 */
function pauseOrContinue() {
    if (world.startGame == true) {
        document.getElementById('pauseContinueNavbar').src = 'img/6.Botones/pause.png';
    }
    else if (world.startGame == false) {
        document.getElementById('pauseContinueNavbar').src = 'img/6.Botones/play.png';
    }
}

/**
 * Here the informations in the start screen are being opened.
 */
function openInformations() {
    document.getElementById('gameInformations').style = ''
    document.getElementById('icons').style = 'pointer-events: none;';
    document.getElementById('mainStartScreen').style = 'pointer-events: none;'
    if (instructionsOpened == true) {
        document.getElementById('instructions').style = 'pointer-events: none;'
        document.getElementById('mainStartScreen').style = 'display:none;'
    }
    else { }
}


/**
 * Here the informations in the Start Screen are being closed.
 */
function closeInformations() {
    document.getElementById('gameInformations').style = 'display:none;'
    document.getElementById('icons').style = '';
    document.getElementById('mainStartScreen').style = '';
    if (instructionsOpened == true) {
        document.getElementById('instructions').style = ''
        document.getElementById('mainStartScreen').style = 'display:none;'
    }
    else { }
}

/**
 * Here the instructions in the start screen are being opened.
 */
function openInstructions() {
    instructionsOpened = true;
    document.getElementById('mainStartScreen').style = "display:none";
    document.getElementById('instructions').style = '';
}

/**
 * Here the instructions in the start screen are being closed.
 */
function goBackToStartScreen() {
    instructionsOpened = false;
    document.getElementById('mainStartScreen').style = '';
    document.getElementById('instructions').style = 'display:none;';
}

/**
 * Here the game is being started.
 */
function startPlaying() {
    if (world == undefined) { } else {
        document.getElementById('logo').style = 'display:none;';
        document.getElementById('StartScreen').style = 'display:none;';
        document.getElementById('navbar').style = '';
        document.getElementById('CanvasScreen').style = '';
        document.getElementById('canvas').style = '';
        world.startGame = true;
        pauseOrContinue();
        isSoundOnOrOff();
        world.groundPosionsColor();
    }
}

/**
 * Here the menu is being opened while playing.
 */
function openMenu() {
    if (world.startGame == false) {
        gameWhileMenu = 'stop';
        openMenuCommands();
    } else if (world.startGame == true) {
        world.startGame = false;
        gameWhileMenu = 'running';
        openMenuCommands();
    }
}

/**
 * Here are the commands for opening the menu.
 */
function openMenuCommands() {
    document.getElementById('pauseContinueNavbar').style = 'pointer-events: none;';
    document.getElementById('menuNavbar').style = 'pointer-events: none;';
    document.getElementById('overlayContainer').style = '';
    document.getElementById('menu').style = '';
    document.getElementById('mainMenu').style = '';
    document.getElementById('menuInstructions').style = "display:none;";
    document.getElementById('menuInformations').style = "display:none;";
}

/**
 * Here the instructions in the menu are being opened.
 */
function openMenuInstructions() {
    document.getElementById('mainMenu').style = "display:none";
    document.getElementById('menuInstructions').style = '';
    document.getElementById('returnButton').style = '';
}

/**
 * Here the informations in the menu are being opened.
 */
function openMenuInformations() {
    document.getElementById('mainMenu').style = "display:none";
    document.getElementById('menuInformations').style = '';
    document.getElementById('returnButton').style = '';
}

/**
 * Here are the commands to return to the menu.
 */
function goBackToMenu() {
    document.getElementById('menuInstructions').style = "display:none;";
    document.getElementById('menuInformations').style = "display:none;";
    document.getElementById('returnButton').style = "display:none;";
    document.getElementById('mainMenu').style = '';
}

/**
 * Here the menu is being closed.
 */
function closeMenu() {
    if (gameWhileMenu == 'stop') {
        world.startGame = false;
        closeMenuCommands();
    } else if (gameWhileMenu == 'running') {
        world.startGame = true;
        closeMenuCommands();
    }
}

/**
 * Here are the commands for closing the menu.
 */
function closeMenuCommands() {
    document.getElementById('pauseContinueNavbar').style = '';
    document.getElementById('menuNavbar').style = '';
    document.getElementById('overlayContainer').style = "display:none;";
    document.getElementById('menu').style = "display:none;";
    document.getElementById('mainMenu').style = "display:none;";
    document.getElementById('menuInstructions').style = "display:none;";
    document.getElementById('menuInformations').style = "display:none;";
    document.getElementById('returnButton').style = "display:none;";
}

/**
 * Here is the command for returning to the start screen while playing.
 */
function home() {
    location.reload();
}

/**
 * Here is the array for the enemies for refresh.
 */
function enemies() {
    ENEMIES = [
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
    ];
}

/**
 * Here is the variable for the endboss for refresh.
 */
function endboss() {
    ENDBOSS = new Endboss();
}

/**
 * Here is the array for the objects for refresh.
 */
function newObjects() {
    OBJECTS = [
        new Poison(1120, 245),
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
    ]
}

/**
 * Here are the variables for the status bars for refresh.
 */
function bars() {
    LIFESTATUSBAR = new LifeStatusBar();
    COINSSTATUSBAR = new CoinsStatusBar();
    POISONSTATUSBAR = new PoisonStatusBar();
    ENDBOSSLIFESTATUSBAR = new EndbossLifeStatusBar();
}

/**
 * Here the variables in the world.js are set to null.
 */
function setWorldVarsNull() {
    world.character = null;
    world.enemies = null;
    world.endboss = null
    world.objects = null;
    world.lifeStatusBar = null;
    world.coinsStatusBar = null;
    world.poisonStatusBar = null;
    world.endbossLifeStatusBar = null;
}

/**
 * Here the variables in the world.js are being newly referred.
 */
function defineWorldVarsNew() {
    CHARACTER = new Character();
    world.character = CHARACTER;
    world.enemies = ENEMIES;
    world.endboss = ENDBOSS;
    world.objects = OBJECTS;
    world.character.world = world;
    world.lifeStatusBar = LIFESTATUSBAR;
    world.coinsStatusBar = COINSSTATUSBAR;
    world.poisonStatusBar = POISONSTATUSBAR;
    world.endbossLifeStatusBar = ENDBOSSLIFESTATUSBAR;
}

/**
 * Here is the function to start the game again.
 */
function tryAgain() {
    setTimeout(() => {
        intervals.forEach(clearInterval);
        intervals = [];
        setWorldVarsNull()
        enemies();
        endboss();
        newObjects();
        bars();
        defineWorldVarsNew();
        world.groundPosionsColor();
        document.getElementById('won').style = "display:none;";
        document.getElementById('lost').style = "display:none;";
        world.winner = null;
        gameWhileMenu = 'running';
        closeMenu();
        pauseOrContinue();
    }, 1500)
}

/**
 * Here is the function to enter the fullscreen.
 */
function fullScreen() {
    if (fullscreenOpened == null) {
        fullscreenOpened = true;
        let fullScreen = document.getElementById('body');
        enterFullscreen(fullScreen);
    } else if (fullscreenOpened == true) {
        fullscreenOpened = null;
        closeFullscreen();
    }
}


/**
 * Here are the commands to enter the fullscreen.
 * @param {element} element - Area to be displayed in the fullscreen.
 */
function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {      // for IE11 (remove June 15, 2022)
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {  // iOS Safari
        element.webkitRequestFullscreen();
    }
}

/**
 * Here are the commands to exit the fullscreen.
 */
function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
    }
}