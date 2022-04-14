/*This JavaScript manages the playing, stopping and switching the audio within the game */

//Get ids of all audio files
var MainMenuTrack = document.getElementById("MenuTrack");
var LevelTrack1 = document.getElementById("LevelTrack1");
var LevelTrack2 = document.getElementById("LevelTrack2");
var LevelTrack3 = document.getElementById("LevelTrack3");
var DefeatTrack = document.getElementById("DefeatTrack");
var VictoryTrack = document.getElementById("VictoryTrack");

var TrackCounter; //This will identify the song the game will play

//When the window is loaded play menu music
window.onload = function ()
{
    PlayMenuMusic();
}

//This function will play the main menu theme
function PlayMenuMusic()
{
    MainMenuTrack.play();
}

//This function will pick a random track to play when a level is selected
function PlayLevelMusic() {
    //Stop playing the main menu theme
    MainMenuTrack.pause();
    MainMenuTrack.currentTime = 0;

    //Generate a random number to play a track for the level and play it
    TrackCounter = Math.floor(Math.random() * 3); 
    switch (TrackCounter)
    {
        case 0:
            LevelTrack1.play();
            break;
        case 1:
            LevelTrack2.play();
            break;
        case 2:
            LevelTrack3.play();
            break;
    }
}

//This function will change the track when the prior track has finished
function ChangeTrack() {
    switch (TrackCounter) {
        case 0:
            //play Track1
            LevelTrack1.play();
            //When its finished, stop the track and increment the track counter
            LevelTrack1.onended = function () {
                LevelTrack1.pause();
                LevelTrack1.currentTime = 0;
                TrackCounter++;
            }
            break;
        case 1:
            LevelTrack2.play();
            LevelTrack2.onended = function () {
                LevelTrack2.pause();
                LevelTrack2.currentTime = 0;
                TrackCounter++;
            }
            break;
        case 2:
            LevelTrack3.play();
            LevelTrack3.onended = function () {
                LevelTrack3.pause();
                LevelTrack3.currentTime = 0;
                TrackCounter = 0; //This will go back to Track 1, making it a looping playlist
            }
            break;
    }
}

//This function will stop all of the level music tracks
function StopPlayingLevelMusic()
{
    TrackCounter = 3;
    LevelTrack1.pause();
    LevelTrack1.currentTime = 0;
    LevelTrack2.pause();
    LevelTrack2.currentTime = 0;
    LevelTrack3.pause();
    LevelTrack3.currentTime = 0;
}

//This function will play the victory theme, once the win state is called
function PlayVictoryTrack()
{
    //First stop all of the level music tracks, then play the victory theme
    StopPlayingLevelMusic();
    VictoryTrack.play();
}

//This function will play the defeat theme, once the lose state is called
function PlayDefeatLevelMusic()
{
    //First stop all of the level music tracks, then play the defeat theme
    StopPlayingLevelMusic();
    DefeatTrack.play();
}
