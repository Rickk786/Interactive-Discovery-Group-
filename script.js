// State Variables
let hasFlashlight = false;
let hasMap = false;
let foundCode = false;
let battery = 5;
let chosenPath = "";

// Show distinct scene
function showScene(number) {
    let scenes = document.querySelectorAll(".scene");
    scenes.forEach(function(scene) {
        scene.classList.add("hidden");
    });

    document.getElementById("scene" + number).classList.remove("hidden");
}

// Scene 1 Actions
function searchBackpack() {
    hasFlashlight = true;
    document.getElementById("inv-flashlight").classList.remove("hidden");
    document.getElementById("forestResult").innerHTML = "You found a flashlight! It is added to your backpack.";
}

function checkPhone() {
    if (battery >= 2) {
        battery -= 2;
        document.getElementById("forestResult").innerHTML = "No signal! But you receive a strange message: 'Find the river.'";
    } else {
        document.getElementById("forestResult").innerHTML = "Your phone battery is dead!";
    }
    document.getElementById("battery").innerHTML = "Phone Battery: " + battery + "%";
}

// Scene 2 Actions
function choosePath(path) {
    chosenPath = path;
    if (path === "cabin") {
        showScene(3);
    } else {
        showScene(4);
    }
}

// Scene 3 Actions
function examineNote() {
    foundCode = true;
    document.getElementById("inv-code").classList.remove("hidden");
    document.getElementById("cabinResult").innerHTML = "The note reveals a secret code: 1947.";
}

function openDrawer() {
    if (foundCode) {
        hasMap = true;
        document.getElementById("inv-map").classList.remove("hidden");
        document.getElementById("cabinResult").innerHTML = "You unlocked the drawer using code 1947 and found a map!";
    } else {
        document.getElementById("cabinResult").innerHTML = "The drawer is locked. Find the code first!";
    }
}

// Scene 4 & Ending State Logic
function useMap() {
    if (hasMap) {
        document.getElementById("rescuedText").innerHTML = "You follow the secret paths on the map and safely reach the rescue team. YOU SURVIVED!";
        showScene(5);
    } else {
        document.getElementById("riverResult").innerHTML = "You don't have a map! Explore the cabin first to find one.";
    }
}

function useFlashlight() {
    if (hasFlashlight) {
        document.getElementById("rescuedText").innerHTML = "You signal the helicopter with your flashlight! They spot you and lower a cable. YOU ARE RESCUED!";
        showScene(5);
    } else {
        document.getElementById("riverResult").innerHTML = "You don't have a flashlight! You couldn't signal in the dark.";
    }
}

function crossBridge() {
    document.getElementById("gameOverText").innerHTML = "The fragile bridge breaks under your weight! You fall into the raging river. GAME OVER!";
    showScene(6);
}

// Reset Game
function restartGame() {
    hasFlashlight = false;
    hasMap = false;
    foundCode = false;
    battery = 5;
    chosenPath = "";

    // Reset UI
    document.getElementById("battery").innerHTML = "Phone Battery: 5%";
    document.getElementById("inv-flashlight").classList.add("hidden");
    document.getElementById("inv-map").classList.add("hidden");
    document.getElementById("inv-code").classList.add("hidden");

    document.getElementById("forestResult").innerHTML = "";
    document.getElementById("cabinResult").innerHTML = "";
    document.getElementById("riverResult").innerHTML = "";

    showScene(1);
}
