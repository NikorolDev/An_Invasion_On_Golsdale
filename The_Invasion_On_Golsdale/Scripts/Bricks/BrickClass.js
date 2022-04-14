var BricksID = []; //This array will hold all of the bricks once they are created.

//This class will be creating and controlling the behaviour of bricks, such as when taken damage
//This class will be using positions of x and y to position the bricks on the scene and apply health for damage and setting the colour of a brick
function BrickClass(brickPositionX, brickPositionY, health)
{
    //Properties
    this.BrickHealth = health; //Health of a brick from the BrickHealth array
    this.BrickMesh = new BoxClass(brickPositionX, brickPositionY, 1, 3, 2, 1).returnBoxMesh(); //Mesh of a brick that is an instance of the box class

    this.BrickMesh.name = "Brick"; //Give a name of each brick, which will be used for collision detection
    Scene.add(this.BrickMesh); //Add a brick to the scene.

    //This local function will apply colours to each brick
    this.SettingBrickColour = function()
    {
        //Based on the brick's health, which is the case of this switch, it apply the colour based on that value
        switch (this.BrickHealth)
        {
            case 1:
                this.BrickMesh.material.color.setRGB(0.5, 0.5, 0.5); //grey
                break;
            case 2:
                this.BrickMesh.material.color.setRGB(0.651, 0.349, 0.349); //grey, red
                break;
            case 3:
                this.BrickMesh.material.color.setRGB(0.349, 0.349, 0.651); //grey, blue
                break;
            case 4:
                this.BrickMesh.material.color.setRGB(0.349, 0.651, 0.349); //grey, green
                break;
            case 5:
                this.BrickMesh.material.color.setRGB(0.651, 0.651, 0.349); //grey, green
                break;
        }
    }

    //This local function will control the damage of a brick
    this.KillBrick = function ()
    {
        //Check if health is equal to 1
        if (this.BrickHealth == 1 || InstaBreakerEnabled) {
            //Once the ball hits a brick that has health value of 1, then 
            Scene.remove(this.BrickMesh); //it will remove it from the scene
            CreatePowerUp(this.BrickMesh.position.x, this.BrickMesh.position.y); //Creates a powerUp
            NumberOfBricksTracker -= 1; //Decrement the tracker of the amount of bricks in the scene
        }
        else //Otherwise, it will decrement the brick's health by 1, then set the colour of the brick again to indicate the damage.
        {
            this.BrickHealth -= 1;
            this.SettingBrickColour();
        }
        UpdateScores();
    }
}

//This function will create a grid of bricks.
//The function will get the amount of bricks we need, from the initialise function in SceneBuilder file.
function CreateBrickGrid(maxNumberOfBricks)
{
    //Origin positions for creating the brick grid
    var m_brickPositionX = -18;
    var m_brickPositionY = 8;

    //For every brick health map, create a copy of the array, by slicing each value from the array.
    //This is important, so that the original array will not lose any values, so it will use the coppied array to add health to the bricks 
    var brickMap1 = BrickHealthMap1.slice(0);
    var brickMap2 = BrickHealthMap2.slice(0);
    var brickMap3 = BrickHealthMap3.slice(0);
    var brickMap4 = BrickHealthMap4.slice(0);

    //Start creating a grid with a for loop create individual bricks
    for (var i = 0; i < maxNumberOfBricks; i++)
    {
        m_brickPositionX += 3; //Increment by the bricks width

        //Check if the position of the brick is bigger than 21 on the x
        if (m_brickPositionX > 21)
        {
            m_brickPositionX = -15; //Set it to the origin position, but move it forward by as that the bricks are in line with each other
            m_brickPositionY -= 2.1; //Increment the y position. This will also create a space in between the bricks
        }

        //Based on the screen the player selected, selected it will,
        switch (SelectedScreen) {
            case 4: 
            case 5:
                BricksID.push(new BrickClass(m_brickPositionX, m_brickPositionY, brickMap1.shift())); //Create a new brick by instantiating the brick class using the positions of the x and y and take the next value of the health array and push it to the array of bricks
                BricksID[i].SettingBrickColour(); //For every individual brick, apply colour
                break;
            case 6:
                //On Screen 6/Level3, it will switch to different 
                switch (BrickMap) {
                    case 1:
                        BricksID.push(new BrickClass(m_brickPositionX, m_brickPositionY, brickMap2.shift()));
                        BricksID[i].SettingBrickColour();
                        break;
                    case 2:
                        BricksID.push(new BrickClass(m_brickPositionX, m_brickPositionY, brickMap3.shift())); 
                        BricksID[i].SettingBrickColour();
                        break;
                    case 3:
                        BricksID.push(new BrickClass(m_brickPositionX, m_brickPositionY, brickMap4.shift()));
                        BricksID[i].SettingBrickColour();
                        break;
                }
                break;
        }
    }
}

function LoadNextBrickMap()
{
    //Only do it on Screen 6
    if (SelectedScreen == 6)
    {
        //If there are no bricks in the scene
        if (NumberOfBricksTracker == 0)
        {
            //Increment BrickMap to load the next map
            BrickMap++;

            //Reset the tracker, Lives. Remove every brick class from the array and create a new set of bricks
            NumberOfBricksTracker = 78;
            UpdateLives(2);
            BricksID.splice(0, BricksID.length);
            CreateBrickGrid(78);

            //Set game started to false, to pause the game and reset positions of the ball and paddle
            hasGameStarted = false;
            ResetPositions();
        }
    }
}