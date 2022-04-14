/*This JavaScrip file handles and controls HUD in the game*/

//Feilds that store the HUD information
var GameScore = 0;
var GameScoreAdder = 10;
var GameLives = 3;
var Minutes = 0;

//References to the html text elements that are in the Game container
var TextScores = document.getElementById("GameScore");
var TextLives = document.getElementById("GameLives");
var TextTimer = document.getElementById("GameTimer");

//This function will update the scores
function UpdateScores()
{
    //Check if the level has ended
    if (hasLevelEnded == true) {
        GameScore = 0; //reset scores
    }
    else {
        GameScore += GameScoreAdder; //Increment scores
    }
    //Update it to the text element
    TextScores.innerHTML = "Score: " + GameScore;
}

//This function will update player lives using operators
function UpdateLives(operator)
{
    //The operator either decrements the player lives or resets it to the default value
    switch (operator) {
        case 1:
            GameLives -= 1;
            break;
        case 2:
            GameLives = 3;
            break;
    }
    //Update it to the text element
    TextLives.innerHTML = "Lives: " + GameLives;
}

//This function will update the Timer
function UpdateTimer()
{
    //Reset Timer if level has ended
    if (hasLevelEnded == true) {
        Minutes = 0;
        TextTimer.innerHTML = "Timer: 00:00";
        
    }
    else //if not, update the timer
    {
        //Check if elapsed time has reached 60 seconds, restart the clock and increment minutes
        if (ElapsedTime >= 60) {
            GameTime.stop();
            GameTime.start();
            Minutes += 1;
        }
        //format mintes and text to look like an actual timer, and update it
        var formattedMinutes = ("0" + Minutes).slice(-2);
        var formattedSeconds = ("0" + Math.floor(ElapsedTime)).slice(-2);
        TextTimer.innerHTML = "Timer: " + formattedMinutes + ":" + formattedSeconds;
    }
}

