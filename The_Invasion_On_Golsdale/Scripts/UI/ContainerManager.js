/*This JavaScript file handles with displaying and hiding html containers and elements*/

//These are references to all html containers
var MainMenu = document.getElementById("MainMenu");
var LevelSelectMenu = document.getElementById("LevelSelectMenu");
var CreditsMenu = document.getElementById("CreditsMenu");
var TransitionWindow = document.getElementById("TransitionWindow");
var Game = document.getElementById("Game");
var EndLevelWindow = document.getElementById("EndLevelWindow");

//These are html elements for the game window
var LevelName = document.getElementById("LevelName");
var LevelInformation = document.getElementById("LevelInformation");
var PowerUpsText = document.getElementById("PowerUps")

//SelectedScreen keeps track of the html container the player is on.
//WindowType keeps track of what game window to display.
//Controls Enabled checks if the controls are enabled, this is so when the player has any window open, they won't be able to use controls.
var SelectedScreen, WindowType, ControlsEnabled = false;

//This function will switch between html containers based on the button clicked
function SwitchMenu(screen)
{
    SelectedScreen = screen;
    switch (screen)
    {
        case 1: //Display Main Menu
            //Hide all containers that has been displayed through pressing the buttons on the main menu container and display the main menu
            MainMenu.style.display = "block";
            LevelSelectMenu.style.display = "none";
            CreditsMenu.style.display = "none";
            break;
        case 2: //Display Level Select Menu
            MainMenu.style.display = "none";
            LevelSelectMenu.style.display = "block";
            Game.style.display = "none";
            break;
        case 3: //Display Credits Menu
            MainMenu.style.display = "none";
            LevelSelectMenu.style.display = "none";
            CreditsMenu.style.display = "block";
            break;
        case 4: //Display Level 1 of the game
            LevelSelectMenu.style.display = "none";
            TransitionWindow.style.display = "block";
            Game.style.display = "block";
            LevelName.innerHTML = "Main Gate";
            LevelInformation.innerHTML = "You decided to attack The Main Gate of Golsdale. The walls are weaker on this side of the wall. Once you break through this wall, your army will be able to attack the city.";
            PowerUpsText.innerHTML = "Blue  -   Double paddle size<br>Red  -   Double paddle speed<br>Orange    -   Debuffs<br>Yellow   -  Double ball speed<br>Cyan    -   Double ball size<br>Pink    -   Instabreaker<br>Green   -   Reset Lives";
            Load();
            PlayLevelMusic();
            break;
        case 5: //Display Level 2 of the game
            LevelSelectMenu.style.display = "none";
            TransitionWindow.style.display = "block";
            Game.style.display = "block";
            LevelName.inner = "The Wizard's Keep";
            LevelInformation.innerHTML = "Golsdale is famously known to have the biggest library in The Holy Eagle Empire. This is why the wizard, Malhazar from The Sky Cities, has resided here to carry out his studies. We need to withstand his magic if you want to see our men infiltrate the city";
            PowerUpsText.innerHTML = "Blue  -   Double paddle size<br>Red  -   Double paddle speed<br>Orange    -   Double Ball Speed<br>Yellow   -  Immunity<br>Cyan    -   Double ball size<br>Pink    -   Instabreaker<br>Green   -   Reset Lives";
            Load();
            PlayLevelMusic();
            break;
        case 6: //Display Level 3 of the game
            LevelSelectMenu.style.display = "none";
            TransitionWindow.style.display = "block";
            Game.style.display = "block";
            LevelName.inner = "The Great Eastern Wall";
            LevelInformation.innerHTML = "This wall is almost impenetrable. It is filled with 3 layers of thick stones. If we manage to passed this, we will go down as legends, as the armies before failed to infiltrate the city.";
            PowerUpsText.innerHTML = "Blue  -   Double paddle size<br>Red  -   Double paddle speed<br>Orange    -   Debuffs<br>Yellow   -  Double ball speed<br>Cyan    -   Double ball size<br>Pink    -   Instabreaker<br>Green   -   Reset Lives";
            Load();
            PlayLevelMusic();
            break;
    }
}

//This function is to display Game window
function CloseWindow(WindowType)
{
    switch (WindowType)
    {
        case 1: //When level selected it will just close the window and enabled controls
            TransitionWindow.style.display = "none";
            ControlsEnabled = true;
            break;
        case 2: //When level is completed, just close the game container and the window to display main menu
            EndLevelWindow.style.display = "none";
            Game.style.display = "none";
            MainMenu.style.display = "block";
            Unload();
            DefeatTrack.pause();
            DefeatTrack.currentTime = 0;
            VictoryTrack.pause();
            VictoryTrack.currentTime = 0;
            PlayMenuMusic();
            
            break;
    }
}
