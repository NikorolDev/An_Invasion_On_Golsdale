//This is a base class to create box geometric meshes, which will use the position and scale to create an instance of a box. 
//This, so we can minimise repeating the same code for creating a new box.
function BoxClass(boxPositionX, boxPositionY, boxPositionZ, boxScaleX, boxScaleY, boxScaleZ)
{
    //Feilds
    //Creating a box mesh
    var m_boxGeometry = new THREE.BoxGeometry(boxScaleX, boxScaleY, boxScaleZ);
    var m_boxMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
    var m_boxMesh = new THREE.Mesh(m_boxGeometry, m_boxMaterial);
    m_boxMesh.position.set(boxPositionX, boxPositionY, boxPositionZ);

    //Return a box mesh
    this.returnBoxMesh = function ()
    {
        return m_boxMesh;
    };
};