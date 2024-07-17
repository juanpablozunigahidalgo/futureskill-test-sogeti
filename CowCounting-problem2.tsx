// Instructions 

// Cow Counting Overview You are supposed to count cows on a field. The field forms an n times n grid, and the cows are organised and will only stand one by one within a grid square. Your two counting tasks are described below, followed by a description of the available API, the canvas, and how the score is calculated. Make sure to read the entire description before attempting the tasks. Sub-Task 1: Corner Cows (2 points) Your first task is to count the number of shy cows hiding in the corners of the field. Example In this 3 by 3 field, there are 2 cows hiding in the corners. Their (x, y) positions are (0, 0) and (2, 2). Sub-Task 2: Neighbour Cows (8 points) Your second task is to count the number of cows with at least one neighbouring cow. Cows are considered neighbours if they are next to each other in the cardinal directions, but not the diagonals. Example In this 3 by 3 field, there are 4 cows with neighbours. There are 2 cows with neighbours on row y=0, and also 2 cows with neighbours in column x=2. API Description The following data is available for you to access through the API provided. More details about the API functions and the data they provide can be found under the API tab. Get field size - Returns n, the size of the n by n field. The minimum size is 1. Get number of cows - Returns the total number of cows on the field. Get x coordinate for cow - Returns the x-coordinate given a cow index. Starting at 0. Get y coordinate for cow - Returns the y-coordinate given a cow index. Starting at 0. Note: The coordinate functions take cow index as argument and return the x and y values. So if you want to get the (x, y) position for the cow at index 0 you need to call both functions with 0 as the argument. Canvas Description Scoring Focus on getting the correct output, as this is the major part of your score. You can see your points for each level in the bottom left of the screen when you press 'Run code'. Note that your code will be assessed using other test cases than the levels you see below, so please consider how your code would work for these unknown test cases. A minor part of your score is calculated through time-complexity analysis of your solution, so if you have time try to consider how to make your solution as fast as possible. A tip to get started is to press "Run code" to see what happens. NOTES To get started, simply press Run code to see what happens The Future Skill system will initialise and call your code Note that you don't need to initialise the class, add any methods or call any functions A lot of the code you get at the start must remain unchanged: Method, parameter and class names Note that you can press "Reset code" to get back to the initial state What you should change: What you return in the given methods (initially you might see default returns like -2, "foo" etc.) Typically your solution code should be in the methods already provided (where you see the comment "Write your code here") You can create your own methods and call them to calculate your answers. Do not add your own test cases. Each time you press run code several test levels will be evaluated and you can see the result in the canvas and in the score tab.

// API

// self.api.get_field_size() -> int Returns the width and height of the field. The field is always square, and the minimum size is 1. self.api.get_number_of_cows() -> int Returns the total number of cows grazing the field. self.api.get_x_coordinate_for_cow(cow_index: int) -> int Returns the X-coordinate for the given cow index. Starting at index 0 and limited by the total number of cows. self.api.get_y_coordinate_for_cow(cow_index: int) -> int Returns the Y-coordinate for the given cow index. Starting at index 0 and limited by the total number of cows.

// Code 

import * as api from './api';

export class Solution implements api.SolutionInterface {
  private api: api.APICaller;

  constructor(api: api.APICaller) {
    this.api = api;
    console.log('Press run code to see this in the console!')
  }

  /**
   * Task 1: Return the number of cows hiding in corners.
   * 
   * @return {number (integer)}
   */
  getNumberOfCowsInCorners(): number {
    const n = this.api.getFieldSize();
    const totalCows = this.api.getNumberOfCows();
    let cornerCows = 0;

    // Define the corner coordinates
    const corners = new Set([
      `0,0`,
      `0,${n - 1}`,
      `${n - 1},0`,
      `${n - 1},${n - 1}`
    ]);

    for (let i = 0; i < totalCows; i++) {
      const x = this.api.getXCoordinateForCow(i);
      const y = this.api.getYCoordinateForCow(i);
      if (corners.has(`${x},${y}`)) {
        cornerCows++;
      }
    }
    
    return cornerCows;
  }

  /**
   * Task 2: Return the number of cows with neighbours.
   * 
   * @return {number (integer)}
   */
  getNumberOfCowsWithNeighbours(): number {
    const n = this.api.getFieldSize();
    const totalCows = this.api.getNumberOfCows();
    const cowPositions = new Set<string>();

    for (let i = 0; i < totalCows; i++) {
      const x = this.api.getXCoordinateForCow(i);
      const y = this.api.getYCoordinateForCow(i);
      cowPositions.add(`${x},${y}`);
    }

    let cowsWithNeighbours = 0;

    // Check each cow to see if it has at least one neighbor
    for (let i = 0; i < totalCows; i++) {
      const x = this.api.getXCoordinateForCow(i);
      const y = this.api.getYCoordinateForCow(i);
      
      const neighbours = [
        `${x-1},${y}`, // left
        `${x+1},${y}`, // right
        `${x},${y-1}`, // up
        `${x},${y+1}`  // down
      ];

      if (neighbours.some(pos => cowPositions.has(pos))) {
        cowsWithNeighbours++;
      }
    }

    return cowsWithNeighbours;
  }
}