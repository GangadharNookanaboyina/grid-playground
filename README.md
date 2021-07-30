# grid-playground
Grid playground in HTML + css + javascript 

## Tech stack used
- HTML
- CSS
- Javascript

## How to run?
open ```index.html``` to run the project.

## Core logic
Core logic is implemented in javascript. Used a class ```Playground``` to initilize the rendered playground visible inside the canvas element.
#### Playground Class
Playground class require ```width: number, height: number, cells: Array<number>```. It has several method: 
- ```getIndex(row: number, col: number)``` - returns the cell index.
- ```liveNeighboursCount(row: number, col: number)``` - return count of alive cells.
- ```next()``` - returns nothing. Advances the cells as per the rules.
