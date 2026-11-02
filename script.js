// Variables that remember player actions
let hasFlashlight = false;
let hasMap = false;
let foundCode = false;
let gameEnded = false;

// Change between scenes
function showScene(number) {
    let scenes = document.querySelectorAll(".scene");

    scenes.forEach(function(scene) {
        scene.classList.add("hidden");
    });

    document.getElementById("scene" + number)
        .classList.remove("hidden");
}


// Scene 1: Search backpack
function searchBackpack() {
    hasFlashlight = true;

    document.getElementById("forestResult").innerHTML =
        "You found a flashlight! It might be useful later.";
}


// Scene 2: Choose path
function choosePath(path) {
    if (path === "cabin") {
        showScene(3);
    } else {
        showScene(4);
    }
}


// Scene 3: Examine note
function examineNote() {
    foundCode = true;

    document.getElementById("cabinResult").innerHTML =
        "The note reveals a secret code: 1947.";
}


// Scene 3: Open drawer
function openDrawer() {
    if (foundCode) {
        hasMap = true;

        document.getElementById("cabinResult").innerHTML =
            "You unlocked the drawer and found a map!";
    } else {
        document.getElementById("cabinResult").innerHTML =
            "The drawer is locked. Find the code first!";
    }
}


// Scene 4: Use map
function useMap() {
    if (hasMap) {
        endGame(
            "You follow the map and find a safe way out! YOU SURVIVED!"
        );
    } else {
        returnToCrossroads(
            "You don't have a map! Explore the cabin first."
        );
    }
}


// Scene 4: Use flashlight
function useFlashlight() {
    if (hasFlashlight) {
        endGame(
            "You signal the helicopter with your flashlight! YOU ARE RESCUED!"
        );
    } else {
        returnToCrossroads(
            "You don't have a flashlight! Search for supplies first."
        );
    }
}


// Return to crossroads if player lacks an item
function returnToCrossroads(message) {
    document.getElementById("riverResult").innerHTML =
        message + " Returning to the crossroads...";

    setTimeout(function() {
        if (!gameEnded) {
            document.getElementById("riverResult").innerHTML = "";
            showScene(2);
        }
    }, 1800);
}


// Show ending and restart button
function endGame(message) {
    gameEnded = true;

    document.getElementById("riverResult").innerHTML =
        message;

    document.getElementById("restartButton")
        .classList.remove("hidden");

    // Hide river choices after ending
    let buttons = document.querySelectorAll("#scene4 button");

    buttons.forEach(function(button) {
        if (button.id !== "restartButton") {
            button.classList.add("hidden");
        }
    });
}


// Restart game
function restartGame() {
    hasFlashlight = false;
    hasMap = false;
    foundCode = false;
    gameEnded = false;

    document.getElementById("forestResult").innerHTML = "";
    document.getElementById("cabinResult").innerHTML = "";
    document.getElementById("riverResult").innerHTML = "";

    document.getElementById("restartButton")
        .classList.add("hidden");

    let buttons = document.querySelectorAll("#scene4 button");

    buttons.forEach(function(button) {
        if (button.id !== "restartButton") {
            button.classList.remove("hidden");
        }
    });

    showScene(1);
}
