let canvas;
let world;
let keyboard = new Keyboard();


/**
 * Here is the init function which is being called everytime the webpage is opened.
 * After 1.5 seconds the webpage is clickable (preventing errors). The users color decision is defined, 
 * the landscape mode in mobile mode and the buttons are constantly checked.
 */
function init() {
    setTimeout(() => {
        document.getElementById('HTMLbody').style = "";
    }, 1500);
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    selectMode();
    forceLandscape();
    checkButtons();
}

/**
 * Here it's checked which color has been chosen.
 */
function selectMode() {
    var toggleSwitch = document.getElementById('toggleswitch');
    toggleSwitch.addEventListener('change', function () {
        setMode(toggleSwitch);
    });
    setMode(toggleSwitch);
}

/**
 * Here the color mode is being checked.
 * @param {element} toggle - Input area where the toggle button is.
 */
function setMode(toggle) {
    if (toggle.checked) {
        world.lightMode = true;
        mode.innerHTML = 'Light Mode';
    } else {
        world.lightMode = false;
        mode.innerHTML = 'Dark Mode';
    }
}

/**
 * Here are the functions to alert the switching to landscape mode.
 */
function forceLandscape() {
    forceToLandscapeFromBeginning();
    forceToLandscapeFromPortrait();
    forceToLandscapeFromLandscape()
}

/**
 * Here is the function which alerts or activates if the user is in landscape mode or not at the beginning.
 */
function forceToLandscapeFromBeginning() {
    if (window.screen.width < 1024 && window.innerHeight > window.innerWidth) {
        document.getElementById('switchOrientation').style = "";
        document.getElementById('body').style = "display:none;";
        world.startGame = false;
        pauseOrContinue();
    }

    if (window.screen.width < 1024 && window.innerWidth > window.innerHeight) {
        document.getElementById('switchOrientation').style = "display:none;";
        document.getElementById('body').style = "";
        pauseOrContinue();
    }
}

/**
 * Here is the function which alerts if the user is not in landscape mode while using.
 */
function forceToLandscapeFromPortrait() {
    window.matchMedia("(orientation: portrait)").addEventListener("change", e => {
        const portrait = e.matches;

        if (portrait) {
            document.getElementById('switchOrientation').style = "";
            document.getElementById('body').style = "display:none;";
            world.startGame = false;
            pauseOrContinue();
        }
    });
}

/**
 * Here is the function which activates if the user is in landscape mode while using.
 */
function forceToLandscapeFromLandscape() {
    window.matchMedia("(orientation: landscape)").addEventListener("change", e => {
        const landscape = e.matches;

        if (landscape) {
            document.getElementById('switchOrientation').style = "display:none;";
            document.getElementById('body').style = "";
            pauseOrContinue();
        }
    });
}

/**
 * Here it is being checked if a keyboard button is being pressed.
 */
window.addEventListener("keydown", (e) => {
    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if (e.keyCode == 38) {
        keyboard.UP = true;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = true;
    }

    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }
    if (e.keyCode == 68) {
        keyboard.D = true;
    }
    if (e.keyCode == 86) {
        keyboard.V = true;
    }
});

/**
 * Here it is being checked if a keyboard button is being unpressed after pressing.
 */

window.addEventListener("keyup", (e) => {
    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if (e.keyCode == 38) {
        keyboard.UP = false;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }
    if (e.keyCode == 68) {
        keyboard.D = false;
    }
    if (e.keyCode == 86) {
        keyboard.V = false;
    }
});

/**
 * Here it is being checked if a button in responsive mode is being pressed or unpressed.
 */
function checkButtons() {
    left_right_responsive();
    up_down_responsive();
    space_responsive();
    d_v_responsive();
}


function left_right_responsive() {
    document.getElementById('leftResponsive').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    });
    document.getElementById('leftResponsive').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    });
    document.getElementById('rightResponsive').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    });
    document.getElementById('rightResponsive').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    });
}

function up_down_responsive() {
    document.getElementById('upResponsive').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.UP = true;
    });
    document.getElementById('upResponsive').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.UP = false;
    });
    document.getElementById('downResponsive').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.DOWN = true;
    });
    document.getElementById('downResponsive').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.DOWN = false;
    });
}

function space_responsive() {
    document.getElementById('spaceResponsive').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
    });
    document.getElementById('spaceResponsive').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
    });
}

function d_v_responsive() {
    document.getElementById('dResponsive').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.D = true;
    });
    document.getElementById('dResponsive').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.D = false;
    });
    document.getElementById('vResponsive').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.V = true;
    });
    document.getElementById('vResponsive').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.V = false;
    });
}