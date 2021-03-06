import {getImageWithId} from '../utility/Images'

/**
 * Takes in the basic generated map and generates the final map tiles to use as image indexes
 * @param map the 2D array of basic map
 * @return the map with the correct tiles.
 */
export const assignImageNumbers = (map: number[][]): number[][] => {
    let finalMap: number[][] = Array.from(Array(map.length), _ => Array(map[0].length).fill(10));

    for (let i: number = 0; i < map.length; i++) { //Rows
        for (let j: number = 0; j < map[i].length; j++) { //Col

            if (map[i][j] == 0) {
                //Create bool statements to find walls
                let compass: string = "";

                //Check which directions have walls, or edge of the grid
                if (i == 0 || map[i - 1][j] == 0) {
                    compass += "N"
                }
                if (j == map[0].length - 1 || map[i][j + 1] == 0) {
                    compass += "E"
                }
                if (i == map.length - 1 || map[i + 1][j] == 0) {
                    compass += "S"
                }
                if (j == 0 || map[i][j - 1] == 0) {
                    compass += "W";
                }

                //Assign an image based on wall directions
                switch (compass) {
                    case "N": // Only north
                        finalMap[i][j] = 13;
                        break;
                    case "S": // Only south
                        finalMap[i][j] = 12;
                        break;
                    case "W": // Only west
                        finalMap[i][j] = 10;
                        break;
                    case "E": // Only east
                        finalMap[i][j] = 11;
                        break;
                    case "NW": // north & west
                        finalMap[i][j] = 6;
                        break;
                    case "NE": // north & east
                        finalMap[i][j] = 7;
                        break;
                    case "SW": // south & west
                        finalMap[i][j] = 8;
                        break;
                    case "ES": // south & east
                        finalMap[i][j] = 9;
                        break;
                    case "NS": // vertical wall
                        finalMap[i][j] = 19;
                        break;
                    case "EW": // horizontal wall
                        finalMap[i][j] = 18;
                        break;
                    case "NEW": // north & east & west
                        finalMap[i][j] = 5;
                        break;
                    case "NSW": // north & west & south
                        finalMap[i][j] = 2;
                        break;
                    case "NES": // north & east & south
                        finalMap[i][j] = 3;
                        break;
                    case "ESW": // west & south & east
                        finalMap[i][j] = 4;
                        break;
                    default: // Solid wall, checks if its an inverted corner
                        //Create corner booleans
                        let cornerCompass: string = "";

                        //Check which directions have walls
                        if (i != 0 && j != 0 && map[i - 1][j - 1] == 0) {
                            cornerCompass += "NW";
                        }
                        if (i != 0 && j != map[0].length - 1 && map[i - 1][j + 1] == 0) {
                            cornerCompass += "NE";
                        }
                        if (i != map.length - 1 && j != 0 && map[i + 1][j - 1] == 0) {
                            cornerCompass += "SW";
                        }
                        if (i != map.length - 1 && j != map[0].length - 1 && map[i + 1][j + 1] == 0) {
                            cornerCompass += "SE";
                        }

                        switch (cornerCompass) {
                            case "NWNESW": // All but SE
                                finalMap[i][j] = 14;
                                break;
                            case "NWNESE": // All but SW
                                finalMap[i][j] = 15;
                                break;
                            case "NWSWSE": // All but NE
                                finalMap[i][j] = 16;
                                break;
                            case "NESWSE": // All but NW
                                finalMap[i][j] = 17;
                                break;
                            default:
                                finalMap[i][j] = 20;
                                break;

                        }
                }

                // Tile is a floor, grab floor image
            } else if (map[i][j] == 3) {
                finalMap[i][j] = 22
            } else if (map[i][j] == 4) {
                finalMap[i][j] = 23
            } else if (map[i][j] == 5) {
                finalMap[i][j] = 24;
            } else if (map[i][j] == 6) {
                finalMap[i][j] = 25;
            } else {
                finalMap[i][j] = 21;
            }
        }
    }
    return finalMap;
}

/**
 *
 * @param map The final map where the number contained in the 2D array is the index of the image to use.
 * @param visibility The 2D array representing the visibility of the map.
 */
export const makeImageArray = (map: number[][], visibility: number[][], userClick: React.MouseEventHandler<HTMLImageElement>, showFog: boolean, mapTheme: string, width: number, height: number, showOverlay: boolean): JSX.Element[][] => {

    //todo update the visibility JSX element when visibility is implemented.
    let imageArray: JSX.Element[][] = [];

    for (let row = 0; row < map.length; row++) {
        let imageRow: JSX.Element[] = [];
        for (let col = 0; col < map[row].length; col++) {
            const id: string = `${row},${col}`;
            if (row == 0 && col == 0 && showOverlay) {
                const image: JSX.Element = getImageWithId(id, 27, userClick, mapTheme, width, height)
                imageRow.push(image)
            } else if (row == 0 && col == 10 && showOverlay) {
                const image: JSX.Element = getImageWithId(id, 28, userClick, mapTheme, width, height)
                imageRow.push(image)
            } else if (row == 0 && col == 20 && showOverlay) {
                const image: JSX.Element = getImageWithId(id, 29, userClick, mapTheme, width, height)
                imageRow.push(image)
            } else if (row == 0 && col == 30 && showOverlay) {
                const image: JSX.Element = getImageWithId(id, 30, userClick, mapTheme, width, height)
                imageRow.push(image)
            } else if (row == 10 && col == 0 && showOverlay) {
                const image: JSX.Element = getImageWithId(id, 31, userClick, mapTheme, width, height)
                imageRow.push(image)
            } else if (row == 10 && col == 10 && showOverlay) {
                const image: JSX.Element = getImageWithId(id, 32, userClick, mapTheme, width, height)
                imageRow.push(image)
            } else if (row == 10 && col == 20 && showOverlay) {
                const image: JSX.Element = getImageWithId(id, 33, userClick, mapTheme, width, height)
                imageRow.push(image)
            } else if (row == 10 && col == 30 && showOverlay) {
                const image: JSX.Element = getImageWithId(id, 34, userClick, mapTheme, width, height)
                imageRow.push(image)
            } else if (row == 20 && col == 0 && showOverlay) {
                const image: JSX.Element = getImageWithId(id, 35, userClick, mapTheme, width, height)
                imageRow.push(image)
            } else if (row == 20 && col == 10 && showOverlay) {
                const image: JSX.Element = getImageWithId(id, 27, userClick, mapTheme, width, height)
                imageRow.push(image)
            } else if (row == 20 && col == 11 && showOverlay) {
                const image: JSX.Element = getImageWithId(id, 26, userClick, mapTheme, width, height)
                imageRow.push(image)
            } else if (row == 20 && col == 20 && showOverlay) {
                const image: JSX.Element = getImageWithId(id, 27, userClick, mapTheme, width, height)
                imageRow.push(image)
            } else if (row == 20 && col == 21 && showOverlay) {
                const image: JSX.Element = getImageWithId(id, 27, userClick, mapTheme, width, height)
                imageRow.push(image)
            } else if (row == 20 && col == 30 && showOverlay) {
                const image: JSX.Element = getImageWithId(id, 27, userClick, mapTheme, width, height)
                imageRow.push(image)
            } else if (row == 20 && col == 31 && showOverlay) {
                const image: JSX.Element = getImageWithId(id, 28, userClick, mapTheme, width, height)
                imageRow.push(image)
            } else {
                if (visibility[row][col] == 0 || !showFog) {
                    const image: JSX.Element = getImageWithId(id, map[row][col], userClick, mapTheme, width, height)
                    imageRow.push(image)
                } else { // black fog tile
                    const image: JSX.Element = getImageWithId(id, 0, userClick, mapTheme, width, height)
                    imageRow.push(image)
                }
            }


        }
        imageArray.push(imageRow);
    }

    return imageArray;
}
