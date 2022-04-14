/*This JavaScript stores all of the health maps to be used for creating a brick grid*/

//This variable will be used to switch to different brick maps that are below
var BrickMap = 1;

//These mapped arrays hold the health for each brick, which will allow us to set colours to the bricks and apply damage to them.
var BrickHealthMap1 =
    [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    ];

var BrickHealthMap2 =
    [
        4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
        3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
        2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
        2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    ];

var BrickHealthMap3 =
    [
        4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
        3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
        2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
        3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
        2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2,
        2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
    ];

var BrickHealthMap4 =
    [
        4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
        4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4,
        4, 3, 1, 1, 3, 3, 3, 3, 3, 1, 1, 3, 4,
        4, 3, 3, 1, 3, 3, 3, 3, 3, 1, 3, 3, 4,
        4, 4, 3, 3, 2, 2, 2, 2, 2, 3, 3, 4, 4,
        4, 4, 4, 3, 3, 2, 2, 2, 3, 3, 4, 4, 4,
    ];