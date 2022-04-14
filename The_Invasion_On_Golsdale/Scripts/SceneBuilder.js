/*This JavaScript file is controlling how the renderer will each scene*/

//feilds
///Scene set up
var Scene = new THREE.Scene();
Scene.background = new THREE.Color(0.529,0.808,0.922); //Sky blue background colour

///Camera set up
var cameraZoom = 41; //This is to zoom the orthographic camera closer to the objects created as it will be too far away.
//We create an orthographic camera so that we can remove the D perspective and make it look more as a top down view.
var Camera = new THREE.OrthographicCamera(window.innerWidth / - cameraZoom, window.innerWidth / cameraZoom, window.innerHeight / cameraZoom, window.innerHeight / - cameraZoom, 0.1, 1000);
Camera.position.set(0, 0, 20); //

///Renderer set up
var Renderer = new THREE.WebGLRenderer();
Renderer.setSize(window.innerWidth, window.innerHeight);
Game.appendChild(Renderer.domElement);

///Event listeners set up
document.addEventListener("keydown", onKeyDown, false);
document.addEventListener("keyup", onKeyReleased, false);
var isADown = false, isDDown = false, isSpaceDown = false; //These are to check if a key is pressed and released
var currentKey; //This is to pass the "keyCode" out of the eventListener function to be for movement, for example.

///GLTF loader set up, for loading our object from blender
var GLTFLoader = new THREE.GLTFLoader();
var CastleWall; //A reference to the castle mesh in blender
var CastleBanner; //A reference to the banner mesh in blender

///Time set up
var GameTime = new THREE.Clock();
var DeltaTime, ElapsedTime;


var hasGameStarted = false, hasLevelEnded = false; //This checks if the game started to run the updater function.
var NumberOfBricksTracker = 78;
var UpdateRequest;

///Reference to classes
var Paddle = new PaddleClass();
var Ball = new BallClass(0.5);

//These functions will setup keys on down and release.
function onKeyDown(event) {
    var keyCode = event.which;
    if (keyCode == 32) { isSpaceDown = true; } //if spacebar is down
    if (keyCode == 65) { isADown = true; } //if A is down
    if (keyCode == 68) { isDDown = true; } //if D is down
    currentKey = keyCode; //pass keyCode of the button pressed into the currentKey global variable
};

function onKeyReleased(event) {
    var keyCode = event.which;
    if (keyCode == 32) { isSpaceDown = false; } //if spacebar is released
    if (keyCode == 65) { isADown = false; } //if A is released
    if (keyCode == 68) { isDDown = false; } //if D is released
    currentKey = keyCode;
};

//This function will run when the game starts running
function Initialise()
{
    //Use the GLTF loader to load my blender model
    GLTFLoader.load('Models/CastleWall.glb', function (GLTF)
    {
        Scene.add(GLTF.scene);
        CastleWall = GLTF.scene.getObjectByName('Cube');
        CastleWall.position.set(3, -6.4, -0.1);
        CastleWall.rotation.set(0, -1.5708, 0);
        CastleWall.scale.set(1, 18, 20);

        CastleBanner = GLTF.scene.getObjectByName('Banner');
        CastleBanner.position.set(-32, -6, 10);
        CastleBanner.rotation.set(1.5708, -1.5708, 0);
        CastleBanner.scale.set(15, 1, 10);
    });

    //Setup a directional light
    var DirectionalLight = new THREE.DirectionalLight(0xffffff, 1.25);
    DirectionalLight.position.set(0, 5, 20);
    Scene.add(DirectionalLight);
};

//This function will load other objects to the scene when a level is selected
function Load() {
    hasLevelEnded = false; //Level has started
    GameTime.start(); //Start clock

    //Create walls and bricks
    CreateWalls(); 
    CreateBrickGrid(78);

    //Check if screen is 5, which will run the the debuff function every 10 seconds in the level
    if (SelectedScreen == 5) {
        if (ImmunityEnabled == false) {
            setInterval(function () {
                Debuff();
            }, 10000)
        }
    }

    Update(); //Run the update function
}

//this function will unload objects from the scene and reset values
function Unload()
{
    //This will completely remove all bricks from the scene, which will free memory of unused geometries and materials (garbage collection)
    for (var i = 0; i < BricksID.length; i++) {
        BricksID[i].BrickMesh.geometry.dispose();
        BricksID[i].BrickMesh.material.dispose();
        Scene.remove(BricksID[i].BrickMesh);
    }

    //This will completely remove all powerups from the scene
    for (var i = 0; i < PowerUps.length; i++) {
        PowerUps[i].PowerUpMesh.geometry.dispose();
        PowerUps[i].PowerUpMesh.material.dispose();
        Scene.remove(PowerUps[i].PowerUpMesh);
    }

    //Remove every value in these arrays
    BricksID.splice(0, BricksID.length);
    PowerUps.splice(0, PowerUps.length);

    //Reset values
    GameTime.stop();
    UpdateScores();
    UpdateLives(2);
    UpdateTimer();
    ResetPositions();
    NumberOfBricksTracker = 78;
    SwitchMenu(2);
}

//This function will update everything in runtim of the game
function Update() {
    UpdateRequest = requestAnimationFrame(Update);

    //Run these methods
    StartLevel();
    if (hasLevelEnded == false) {
        ChangeTrack();
    }
    else
    {
        cancelAnimationFrame(UpdateRequest);
    }

    Renderer.render(Scene, Camera); //This will constantly render the scene and camera
};
Initialise();