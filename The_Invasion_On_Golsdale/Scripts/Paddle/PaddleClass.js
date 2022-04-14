//This class is will be creating the paddle and adding controls for the player
function PaddleClass()
{
    //Feilds
    var m_paddleMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });

    //Properties
    this.PaddleGeometry = new THREE.BoxGeometry(5, 1, 1);
    this.PaddleMesh = new THREE.Mesh(this.PaddleGeometry, m_paddleMaterial);
    this.PaddleMovementSpeed = 50;

    //Setting the paddle to the scene, by positioning it, casting shadow, and giving it a name
    this.PaddleMesh.position.set(2.8, -20, 1);
    this.PaddleMesh.material.color.setRGB(0.557, 0.388, 0.329);
    this.PaddleMesh.name = "Paddle";
    Scene.add(this.PaddleMesh);

    //This function will allow the paddle to move, but along the x axis only
    //We are using delta time so that paddle movement is frame rate independent
    this.MovePaddle = function (deltaTime)
    {
        //Check if the paddle hasn't gone outside of the left wall
        if (this.PaddleMesh.position.x > -14.48)
        {
            //if A key is down
            if (currentKey == 65 && isADown)
            {
                //Move paddle to the left
                this.PaddleMesh.position.set(this.PaddleMesh.position.x - (deltaTime * this.PaddleMovementSpeed), this.PaddleMesh.position.y, this.PaddleMesh.position.z);
            }
        }

        //Check if the paddle hasn't gone outside of the right wall
        if (this.PaddleMesh.position.x < 20.47)
        {
            //if D is down
            if (currentKey == 68 && isDDown)
            {
                //Move paddle to the right
                this.PaddleMesh.position.set(this.PaddleMesh.position.x + (deltaTime * this.PaddleMovementSpeed), this.PaddleMesh.position.y, this.PaddleMesh.position.z);
            }
        }
    }
}