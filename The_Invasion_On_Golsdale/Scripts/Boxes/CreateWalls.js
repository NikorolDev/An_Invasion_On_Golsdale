//This function will be creating walls to act as borders for the game
function CreateWalls()
{
    //Feilds
    var m_wallMesh1, m_wallMesh2, m_wallMesh3; //Mesh for each wall

    //Make 3 instances of the BoxClass to create 3 walls
    m_wallMesh1 = new BoxClass(23.45, -5, 0, 1, 40, 4).returnBoxMesh();
    m_wallMesh2 = new BoxClass(-17.45, -5, 0, 1, 40, 4).returnBoxMesh();
    m_wallMesh3 = new BoxClass(3, 12, 0, 40, 1, 4).returnBoxMesh();

    //Set the colour for the walls, which is black
    m_wallMesh1.material.color.setRGB(0, 0, 0);
    m_wallMesh2.material.color.setRGB(0, 0, 0);
    m_wallMesh3.material.color.setRGB(0, 0, 0);

    //Add them to the scene
    Scene.add(m_wallMesh1);
    Scene.add(m_wallMesh2);
    Scene.add(m_wallMesh3);
}