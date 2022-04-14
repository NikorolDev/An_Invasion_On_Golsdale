/*This JavaScript file controls every state in the game*/

//get ids of these elements, which will be update based on the win or lose state
var EndLevelTitle = document.getElementById("EndLevelTitle");
var EndLevelText = document.getElementById("EndLevelText");

//This function will start the level, by allowing all the methods in the function to update
function StartLevel() {
    DeltaTime = GameTime.getDelta()
    ElapsedTime = GameTime.getElapsedTime();
			
	//Check if controls are enabled
    if (ControlsEnabled) {
        //If Space bar is down, start updating
        if (currentKey == 32 && isSpaceDown) {
            hasGameStarted = true;
        }

        if (hasGameStarted == true) {
            for (var i = 0; i < PowerUps.length; i++) {
                PowerUps[i].UpdatePowerUp();
            }

            Paddle.MovePaddle(DeltaTime);
            Ball.UpdateBall(DeltaTime);
            WinLevelState();
            LoseLevelState(1);
            UpdateTimer();
			
            if (SelectedScreen == 6) {
                LoadNextBrickMap();
            }
            
        }
    }
}

//This will reset level, if ball goes out of bounds
function ResetLevel() {
    hasGameStarted = false;
    ResetPositions();
    UpdateLives(1);
}

//This function controls the win state of the game. It will stop updating and display the Win window.
function WinLevelState() {

    switch (SelectedScreen)
    {
        case 4:
            if (NumberOfBricksTracker == 0)
            {
                ControlsEnabled = false;
                hasGameStarted = false;
                hasLevelEnded = true;
                EndLevelWindow.style.display = "block";
                Paddle.PaddleMesh.position.set(2.8, -20, 1);
                EndLevelTitle.innerHTML = "Victory!";
                EndLevelText.innerHTML = "The wall is down! Your men are charging forward to the city of Golsdale!";
                document.getElementById("FinalScore").innerHTML = "Score: " + GameScore;
                PlayVictoryTrack();
            }
            break;
        case 5:
            if (NumberOfBricksTracker == 0) {
                ControlsEnabled = false;
                hasGameStarted = false;
                hasLevelEnded = true;
                EndLevelWindow.style.display = "block";
                Paddle.PaddleMesh.position.set(2.8, -20, 1);
                EndLevelTitle.innerHTML = "Victory!";
                EndLevelText.innerHTML = "The wall is down! The wizard has been defeated! Our men are moving in to capture Malhazar";
                document.getElementById("FinalScore").innerHTML = "Score: " + GameScore;
                PlayVictoryTrack();
            }
            break;
        case 6:
            if (BrickMap == 4) {
                ControlsEnabled = false;
                hasGameStarted = false;
                hasLevelEnded = true;
                EndLevelWindow.style.display = "block";
                Ball.BallMesh.position.set(2.8, -17, 1);
                Paddle.PaddleMesh.position.set(2.8, -20, 1);
                EndLevelTitle.innerHTML = "Victory!";
                EndLevelText.innerHTML = "The 'Great' wall is down! Your men are marching forward to The City of Golsdale!";
                document.getElementById("FinalScore").innerHTML = "Score: " + GameScore;
                PlayVictoryTrack();
            }
            break;
    }
}

//This function controls the lose state of the game. It will will stop updating and display the Lose window
function LoseLevelState(lossType) {
    switch (lossType) {
        case 1:
            if (GameLives <= 0) {
                ControlsEnabled = false;
                hasGameStarted = false;
                hasLevelEnded = true;
                EndLevelWindow.style.display = "block";
                Ball.BallMesh.position.set(2.8, -17, 1);
                Paddle.PaddleMesh.position.set(2.8, -20, 1);
                EndLevelTitle.innerHTML = "Defeat!";
                EndLevelText.innerHTML = "You ran out of attack balls. Your men start retreating, but not all have managed to return.";
                document.getElementById("FinalScore").innerHTML = "Score: " + GameScore;
                PlayDefeatLevelMusic();
            }
            break;
        case 2:
            ControlsEnabled = false;
            hasGameStarted = false;
            hasLevelEnded = true;
            EndLevelWindow.style.display = "block";
            Ball.BallMesh.position.set(2.8, -17, 1);
            Paddle.PaddleMesh.position.set(2.8, -20, 1);
            EndLevelTitle.innerHTML = "Retreat!";
            EndLevelText.innerHTML = "You command your men to retreat. You realised that Golsdale is too strong for your men.";
            document.getElementById("FinalScore").innerHTML = "Score: " + GameScore;
            PlayDefeatLevelMusic();
            break;
    }
}

//Reset positions of the paddle and ball
function ResetPositions() {
    Ball.BallMesh.position.set(2.8, -17, 1);
    Paddle.PaddleMesh.position.set(2.8, -20, 1);
}