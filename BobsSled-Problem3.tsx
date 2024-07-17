// Instructions 

// Bob's Sled Can you help Bob get the best possible sledding experience? In this exercise you are given an array of values that represent the different heights of a snow-covered hill. Bob's sled is old and torn, so he can only go between two values if there is a downwards slope. He cannot go between two values horizontally, nor uphill. The array always start and end with a zero, representing the ground. The rest of the values are positive integers. Array index start from 0. Make sure to read this entire description carefully before attempting the tasks. Sub-Task 1: The farthest distance (4 points) Your first task is to find the farthest distance Bob can travel sideways from a given starting point in the array. Example: Given the array [0,2,2,4,5,1,0] and the starting point 3, Bob can travel at most 1 step by going 4 -> 2. In the next step he cannot go 2 -> 2 because he can only go downhill. Sub-Task 2: The optimal starting point (6 points) Your second task is to find the best starting point for Bob if he wants to go as far as possible sideways on his sled. If there are more than one starting point with the same optimal distance, return the one with the lowest index. Example: Given the array [0,4,8,6,4,2,0], the optimal starting point is index 2 from which Bob can travel 4 steps sideways. Running the code: There are four public test cases which are automatically run when you press the "Run code" button. You can see a visualization of each case by selecting the tabs marked Level 1 - 4 below. Layout explanation: Scoring Focus on getting the correct output, as this is the major part of your score. You can see your points for each level in the bottom left of the screen when you press 'Run code'. Note that your code will be assessed using other test cases than the levels you see below, so please consider how your code would work for these unknown test cases. A minor part of your score is calculated through time-complexity analysis of your solution, so if you have time try to consider how to make your solution as fast as possible. A tip to get started is to press "Run code" to see what happens. Constraints: 0 <= hill height <= 1000000 2 <= number of values <= 25000 values[0] = 0 values[n-1] = 0 NOTES To get started, simply press Run code to see what happens The Future Skill system will initialise and call your code Note that you don't need to initialise the class, add any methods or call any functions A lot of the code you get at the start must remain unchanged: Method, parameter and class names Note that you can press "Reset code" to get back to the initial state What you should change: What you return in the given methods (initially you might see default returns like -2, "foo" etc.) Typically your solution code should be in the methods already provided (where you see the comment "Write your code here") You can create your own methods and call them to calculate your answers. Do not add your own test cases. Each time you press run code several test levels will be evaluated and you can see the result in the canvas and in the score tab.

// CODE

import * as api from './api';

export class Solution implements api.SolutionInterface {
  private api: api.APICaller;

  constructor(api: api.APICaller) {
    this.api = api;
    console.log('Press run code to see this in the console!')
    // You can initiate and calculate things here
  }

  /**
   * Task 1: Return the farthest distance Bob can travel through the values
   * from a given starting point.
   * 
   * @param {values} Array<number>
   * @param {startingPoint} number (integer)
   * 
   * @return {number (integer)}
   */
  farthestDistance(values: Array<number>, startingPoint: number): number {
    let maxDistance = 0;
    let currentDistance = 0;

    for (let i = startingPoint; i < values.length - 1; i++) {
      if (values[i] > values[i + 1]) {
        currentDistance++;
      } else {
        break;
      }
    }

    maxDistance = Math.max(maxDistance, currentDistance);
    currentDistance = 0;

    for (let i = startingPoint; i > 0; i--) {
      if (values[i] > values[i - 1]) {
        currentDistance++;
      } else {
        break;
      }
    }

    maxDistance = Math.max(maxDistance, currentDistance);

    return maxDistance;
  }

  /**
   * Task 2: Return the optimal starting point for Bob if he wants to go as
   * far through the values as possible on his sled. If there are several
   * starting points which gives the same distance, return the one with the
   * lowest index. The values used are the same as those provided in task
   * 1.
   * 
   * @param {values} Array<number>
   * 
   * @return {number (integer)}
   */
  optimalStartingPoint(values: Array<number>): number {
    let bestStartingPoint = 0;
    let maxDistance = 0;

    for (let i = 1; i < values.length - 1; i++) {
      const distance = this.farthestDistance(values, i);
      if (distance > maxDistance) {
        maxDistance = distance;
        bestStartingPoint = i;
      }
    }

    return bestStartingPoint;
  }
}