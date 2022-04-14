//This array will store power up objects. This is so we control the behaviour of a specific power up object
var PowerUps = [];

//These will check if the power up is enabled so that we can use them for:
var ImmunityEnabled = false; //Turning on/off the Debuff function
var InstaBreakerEnabled = false; //Turning on/off InstaBreaker power up

//This power up class will be updating the position and collsion detection and applying power ups to the player.
//The class is using the the object and the power up ID that has been pushed from the power up creation function.
function PowerUpClass(powerUpMesh, powerUpID)
{
    //Properties
    this.PowerUpMesh = powerUpMesh;
    this.PowerUpID = powerUpID;

    //This function will update the the movement and detect collision
    this.UpdatePowerUp = function()
    {
        //Move the obejct downwards
        this.PowerUpMesh.position.y -= 0.1;

        //Create a bounding boxes for the paddle and the power up object
        m_paddleBoundingBox = new THREE.Box3().setFromObject(Paddle.PaddleMesh);
        m_powerUpBoundingBox = new THREE.Box3().setFromObject(this.PowerUpMesh);

        //Set boolean to check if the 2 bounding box have collided
        var m_boundingBoxCollsion = m_paddleBoundingBox.intersectsBox(m_powerUpBoundingBox);

        //if paddle and power up object collided
        if (m_boundingBoxCollsion == true)
        {
            //Remove it from scene and activate the power up
            Scene.remove(this.PowerUpMesh);
            this.CollectedPowerUp();
        }

        //if power up object goes off the screen
        if (this.PowerUpMesh.position.y < -26)
        {
            Scene.remove(this.PowerUpMesh); //Remove it from scene
        }
    };

    //This function will perform a power up method that has been collected
    this.CollectedPowerUp = function()
    {
        //Set the duration of a power up
        var m_powerUpTime = 0;

        switch (this.PowerUpID)
        {
            case 0: //Bigger Paddle
                m_powerUpTime += 5000; //set time to 5 seconds. If the power up is alreay active, it will extend the duration of it.
                Paddle.PaddleMesh.scale.x = 2; //Scale width of the paddle by 2
                setTimeout(function() //This will set the time of duration of power up before going back to normal
                {
                    Paddle.PaddleMesh.scale.x = 1;
                }, m_powerUpTime);
                break;
            case 1: //Faster Paddle
                m_powerUpTime += 5000; //5 seconds
                Paddle.PaddleMovementSpeed = 100; //double the speed of the paddle
                setTimeout(function()
                {
                    Paddle.PaddleMovementSpeed = 50;
                }, m_powerUpTime);
                break;
            case 2: //if the player has selected Level 5, then run Faster Ball power Up
                if (SelectedScreen == 5) {
                    m_powerUpTime = 5000; //5 seconds
                    Ball.BallSpeed = 0.6;
                    setTimeout(function () {
                        Ball.BallSpeed = 0.4;
                    }, m_powerUpTime);
                }
                else
                {
                    Debuff(); //else, run the debuff function
                };
                break;
            case 3:
                //If the Player is in Level 5, run Immunity power up
                if (SelectedScreen == 5)
                {
                    m_powerUpTime += 20000; //20 seconds
                    ImmunityEnabled = true;
                    setTimeout(function()
                    {
                        ImmunityEnabled = false;
                    }, m_powerUpTime);
                }
                else //if not
                {
                    m_powerUpTime = 5000; //5 seconds
                    Ball.BallSpeed = 65; //Faster Ball
                    setTimeout(function()
                    {
                        Ball.BallSpeed = 45;
                    }, m_powerUpTime);
                };
                break;
            case 4: //Bigger Ball
                m_powerUpTime += 5000; //5 seconds
                Ball.BallMesh.scale.set(2, 2, 2);
                setTimeout(function()
                {
                    Ball.BallMesh.scale.set(1, 1, 1);
                }, m_powerUpTime);
                break;
            case 5: //Instant Brick Breaker
                console.log("InstaBreaker");
                m_powerUpTime += 5000; //5 seconds
                InstaBreakerEnabled = true;
                setTimeout(function()
                {
                    InstaBreakerEnabled = false;
                }, m_powerUpTime);
                break;
            case 6: //Reset Lives to 3
                UpdateLives(2);
                break;
        }
    }
};

//This function will create the power up object by using the position of the bricks
function CreatePowerUp(powerUpPositionX, powerUpPositionY)
{
    var m_powerUpSpawnRate = Math.random() * 100; //The spawn rate is used to give a rarity of spawning a power up
    if (m_powerUpSpawnRate <= 25) //A power up has a 1 in 4 chances to spawn
    {
        m_powerUpMesh = new BoxClass(powerUpPositionX, powerUpPositionY, 1, 0.5, 0.5, 0.5).returnBoxMesh(); //Create a power up object by instantiating the box class
        m_powerUpID = Math.floor(Math.random() * 7); //Randomly pick a power up, this will assign colour and the power up method

        //Assign colour to the object, which will match the power up method
        switch (m_powerUpID)
        {
            case 0:
                m_powerUpMesh.material.color.setRGB(0, 0, 1); //blue
                break;
            case 1:
                m_powerUpMesh.material.color.setRGB(1, 0, 0); //red
                break;
            case 2:
                m_powerUpMesh.material.color.setRGB(1, 0.4, 0); //orange
                break;
            case 3:
                m_powerUpMesh.material.color.setRGB(1, 1, 0); //yellow
                break;
            case 4:
                m_powerUpMesh.material.color.setRGB(0, 1, 1); //cyan
                break;
            case 5:
                m_powerUpMesh.material.color.setRGB(1, 0, 1); //pink
                break;
            case 6:
                m_powerUpMesh.material.color.setRGB(0, 1, 0); //orange
                break;
        }
        PowerUps.push(new PowerUpClass(m_powerUpMesh, m_powerUpID)); //Add it to the array
        Scene.add(m_powerUpMesh); //Add it to the scene
        m_powerUpMesh.name = "PowerUp"; //Give it a name. This is so we can trun off collision with the ball
    }
};