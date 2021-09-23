import React from 'react';
import {db} from "../firebaseConfig";

/**
 * Checks whether a game with a matching Game code exists in the Firebase Realtime Database
 *
 * @param gameCode is the game code of the game to look for
 * @param creatingNewGame is whether a new game is being created or not
 * @returns true if the Game code exists or the gamecode a new game is being created. returns false if no game with a matching game code exists
 */

export default async function isGameCodeValid(gameCode : string, creatingNewGame : boolean) : Promise<boolean> {
    if (gameCode.length > 1 && creatingNewGame) { return true; }
    else {
        //Check if the gamecode is a valid path in Firebase (i.e., has length > 1, and does not have invalid characters like '$')
        if (gameCode.length < 1 || gameCode.includes(".") || gameCode.includes("#") || gameCode.includes("$") || gameCode.includes("[")
            || gameCode.includes("]")) { return false; }

        // Check if a GameCode matches an existing game
        let isValidCode : boolean = false;
        await gamecodeExists(gameCode).then((exists) => { isValidCode = exists; });
        return Promise.resolve(isValidCode);
    }
}

async function gamecodeExists(gameCode : string){
    let codeExists : boolean = false;
    try {
        // Check whether the GameCode exists in the Firebase Realtime Database
        //todo change to use the db thing
        const snapshot = await db.database().ref().get();
        codeExists = snapshot.hasChild(gameCode);
    }
    catch (error) {
        alert(error);
    }
    return Promise.resolve(codeExists);
}
