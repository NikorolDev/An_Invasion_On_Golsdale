//This ball class will creating the ball object, updating the movement and checking for collsion
function BallClass(ballRadius)
{
    //Feilds
    var m_ballGeometry = new THREE.SphereGeometry(ballRadius, 32, 32); 
    var m_ballMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
    var m_ballRandomDirectionX = (Math.random() * 2) - 1; //Set random direction on the x at the start of the game
    var m_ballDirection = new THREE.Vector3(m_ballRandomDirectionX, 0.1, 0).normalize(); //Set direction for the ball to go

    //Properties
    this.BallMesh = new THREE.Mesh(m_ballGeometry, m_ballMaterial);
    this.BallSpeed = 45;

    //Set position and color to the ball mesh
    this.BallMesh.position.set(2.8, -17, 1);
    this.BallMesh.material.color.setRGB(0, 0, 0.18);
    Scene.add(this.BallMesh);

    //This function will update the diretion and run the collision function
    this.UpdateBall = function(deltaTime)
    {
        //If the ball is fallen passed the paddle
        if (this.BallMesh.position.y < -26 || this.BallMesh.position.y > 15)
        {
            //Reset random Direction
            m_ballRandomDirectionX = (Math.random() * 2) - 1; 
            m_ballDirection = new THREE.Vector3(m_ballRandomDirectionX, 0.1, 0).normalize();
            ResetLevel(); //This function will reset positioning of the ball and paddle.
        }
		
		if(hasGameStarted == true){
			this.BallMesh.translateOnAxis(m_ballDirection, this.BallSpeed* deltaTime); //Move the ball uing the direction and velocity, which the value is called in the scene builder update function
			this.BallCollision(); //Run the collsion function
		}
    }

    //This function will check for collisions of all objects
    this.BallCollision = function()
    {
        //Create a raycaster and set it to the ball and direction the ball is going
        var m_ballRaycaster = new THREE.Raycaster();
        m_ballRaycaster.set(this.BallMesh.position, m_ballDirection);

        //Create an array that will store all objects of the scene that the raycaster will collide with
        var m_objectsToCollide = m_ballRaycaster.intersectObjects(Scene.children, true);

        //Check if there are any objects in the scene
        if (m_objectsToCollide.length > 0)
        {
            //Create the varaible of the object that is about to be collided
            var m_objectCollided = m_objectsToCollide[0];

            //Check if the distance of the object is less than the ball radius
            if (m_objectCollided.distance < ballRadius)
            {
                //Create a varaible to store object names
                var m_objectNames = m_objectCollided.object.name;

                //swtich collsion type that corresponds to the name of the object
                switch (m_objectNames)
                {
                    case "Paddle": //paddle collision
                        m_ballDirection.x = (m_objectCollided.point.x - Paddle.PaddleMesh.position.x) / (Paddle.PaddleGeometry.parameters.width - Paddle.PaddleGeometry.parameters.width * 0.5) / 2; //Reflect the x axis. Help from Eddie.
                        m_ballDirection.y = m_ballDirection.y * -1; //Reflect on the y to go back up
                        break;

                    case "Brick": //brick collision
                        if (InstaBreakerEnabled == false) {
                            m_ballDirection.reflect(m_objectCollided.face.normal); //Reflect direction of the ball
                        }

                        //This loop is for giving an ID for each brick
                        for (var i = 0; i < BricksID.length; i++)
                        {
                            //Check if the object id matches the id of the brick in the brick array
                            if (m_objectCollided.object.id == BricksID[i].BrickMesh.id)
                            {
                                BricksID[i].KillBrick(); //Run the function that wil either kill the brick or reduce health
                            }
                        }
                        break;

                    case "PowerUp": //PowerUp collision, which turns collsion off
                        break;

                    default: //Every other object
                        m_ballDirection.reflect(m_objectCollided.face.normal); //Reflect direction
                }
            }
        }
    }
}