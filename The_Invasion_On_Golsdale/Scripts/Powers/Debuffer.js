/*This JavaScript holds the Debuff function, which will give debuffs for the player when the player selects the "Wizard's Keep"*/
function Debuff()
{
    //Check if the "Immunity" power up is disabled
    if (ImmunityEnabled == false)
    {
        //set the debuff id with a random number
        var m_debuffID = Math.floor(Math.random() * 4);

        //Pick a debuff
        switch (m_debuffID)
        {
            //Just like the power ups. First debuff the attribute, then delay it by 5 seconds, which will return it bakc to default
            case 0: //Smaller paddle
                Paddle.PaddleMesh.scale.x = 0.5;
                setTimeout(function()
                {
                    Paddle.PaddleMesh.scale.x = 1;
                }, 5000);
                break;

            case 1: //Slow paddle
                Paddle.PaddleMovementSpeed = 20;
                setTimeout(function()
                {
                    Paddle.PaddleMovementSpeed = 50;
                }, 5000);
                break;

            case 2: //Small ball
                Ball.BallMesh.scale.set(0.5, 0.5, 0.5);
                setTimeout(function()
                {
                    Ball.BallMesh.scale.set(1, 1, 1);
                }, 5000);
                break;

            case 3: //Slow ball
                Ball.BallSpeed = 15;
                setTimeout(function()
                {
                    Ball.BallSpeed = 45;
                }, 5000);
                break;
        }
    }
}