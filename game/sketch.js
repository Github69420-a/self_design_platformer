var cnv;
var gGameSystem;
var gPreloadDone = false;
var assetList = [
  "./assets/sfx/player_jump.wav",
  "./assets/sfx/player_killed.wav",
  "./assets/sfx/crabocop_killed.wav",
  "./assets/sfx/door_open.wav",
  './assets/sprites/player.png',
  "./assets/sprites/crabocop.png",
  './assets/sprites/vantus.png'
];
var c64Font = null;
var player_anim_left_pre;
var player_anim_right_pre;
var pal;
var par;
function preload() { // will need it for loading textures, sounds and other files
  player_anim_right_pre = loadAnimation("./assets/sprites/player_animation_right/1.png", "./assets/sprites/player_animation_right/2.png", "./assets/sprites/player_animation_right/3.png", "./assets/sprites/player_animation_right/4.png");
  player_anim_left_pre = loadAnimation("./assets/sprites/player_animation_left/1.png", "./assets/sprites/player_animation_left/2.png", "./assets/sprites/player_animation_left/3.png","./assets/sprites/player_animation_left/4.png");
  c64Font = loadFont("./c64.ttf");
}

function setup() {
  cnv = createCanvas(WID, HEI);
  pal = addAnimation(player_anim_left_pre);
  par = addAnimation(player_anim_right_pre);
  frameRate(MAX_FPS);
  centerCanvas();
  console.log(window.location.href);
  gAssetLoader.load(assetList, (asset) => {
    console.log("loaded");
    gPreloadDone = true;
  });

  //textFont("Courier New");
  textFont(c64Font);
  gDrawHelper.setAppendingPath('./');

  gGameSystem = new GameSystem();
  restartSketch();
}

function centerCanvas() {
  let x = (windowWidth - width) / 2;
  let y = (windowHeight - height) / 2;
  cnv.position(x, y);
}

function windowResized() {
  centerCanvas();
}

function restartSketch() {
    gGameSystem.setStartLevel('tutorial/01');
}

function draw() {
  if (gPreloadDone) {
    gGameSystem.animateFrame();
  } else {
    drawLoadingScreen();
  }
}


function drawLoadingScreen() {
  background(20,0,40);
  textAlign(CENTER);
  textSize(32);
  fill(255);
  text("Loading...", width/2, height/2);
}
