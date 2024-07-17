// Instructions
// Currency Exchange Overview You are writing software for a cash register, and are given two separate tasks to solve. Your tasks are described below, followed by a description of the available API, the canvas, and how the score is calculated. Make sure to read the entire description before attempting the tasks. Sub-Task 1: Smallest Unreachable (4 points) Your first task is to fetch the available bill denominations from the API and calculate the minimum amount that is unreachable using at most one bill of each denomination. Example Given the denominations $1 and $2, the minimum unreachable amount is $4. You can reach $3 with $1 + $2. But to reach $4 you need either $1 + $1 + $1 + $1, or $1 + $1 + $2, or $2 + $2; each way requiring more than one bill of at least one denomination. Sub-Task 2: Minimum Bills (6 points) Your second task is to calculate the minimum number of bills that can be used to give a customer their change when they purchase an item. To solve this task use the same list of bill denominations as in Task 1, but also fetch the price of the item and the amount the customer paid. For this task there are always enough bills of each denomination. If there is no solution return -1. Example﻿ Given the denominations $1 and $5, the price $43, and the payment $50; the change is $50 - $43 = $7, and the minimum amount of bills is 3 ($1 + $1 + $5). API Description The following data is available for you to access through the API provided. Details about the API functions and the data they provide can be found under the API tab. Get number of bills - The total number of denominations available. Get bill - The value of a denomination, they are ordered from smallest to largest starting at index 0. Get price - The price of the item (for Task 2). Get payment - The payment of the customer (for Task 2). Canvas Description The canvas shows a breakdown of the available data and correct solutions for the tasks, and you can use the tabs to switch between the four public levels. Once you run your code it will also show your solution, and indicate whether or not it was correct. Scoring Focus on getting the correct output, as this is the major part of your score. You can see your points for each level in the bottom left of the screen when you press 'Run code'. Note that your code will be assessed using other test cases than the levels you see below, so please consider how your code would work for these unknown test cases. A minor part of your score is calculated through time-complexity analysis of your solution, so if you have time try to consider how to make your solution as fast as possible. A tip to get started is to press "Run code" to see what happens. NOTES To get started, simply press Run code to see what happens The Future Skill system will initialise and call your code Note that you don't need to initialise the class, add any methods or call any functions A lot of the code you get at the start must remain unchanged: Method, parameter and class names Note that you can press "Reset code" to get back to the initial state What you should change: What you return in the given methods (initially you might see default returns like -2, "foo" etc.) Typically your solution code should be in the methods already provided (where you see the comment "Write your code here") You can create your own methods and call them to calculate your answers. Do not add your own test cases. Each time you press run code several test levels will be evaluated and you can see the result in the canvas and in the score tab.

// API instructions

// this.api.getNumBills(): number
// Returns the total number of denominations available.

// this.api.getBill(index: number): number
// Returns the value of a denomination, they are ordered from smallest to largest starting at index 0.

// this.api.getPrice(): number
// Returns the price of the item (for Task 2).

// this.api.getPayment(): number
// Returns the payment of the customer (for Task 2).

// Code answer
import * as api from './api';

export class Solution implements api.SolutionInterface {
  private api: api.APICaller;

  constructor(api: api.APICaller) {
    this.api = api;
    console.log('Press run code to see this in the console!');
    // You can initiate and calculate things here
  }

  /**
   * Sub-Task 1: Returns the minimum amount unreachable using at most one
   * bill of each denomination.
   * 
   * @return {number (integer)}
   */
  smallestUnreachable(): number {
    const numBills = this.api.getNumBills();
    const denominations = [];
    
    for (let i = 0; i < numBills; i++) {
      denominations.push(this.api.getBill(i));
    }
    
    let unreachable = 1;
    
    for (const bill of denominations) {
      if (bill > unreachable) {
        break;
      }
      unreachable += bill;
    }
    
    return unreachable;
  }

  /**
   * Sub-Task 2: Returns the minimum number of bills needed to give a
   * customer their change when purchasing an item.
   * 
   * @return {number (integer)}
   */
  minBills(): number {
    const numBills = this.api.getNumBills();
    const denominations = [];
    
    for (let i = 0; i < numBills; i++) {
      denominations.push(this.api.getBill(i));
    }
    
    const price = this.api.getPrice();
    const payment = this.api.getPayment();
    const change = payment - price;
    
    if (change < 0) {
      return -1;  // Impossible to give change if payment is less than price
    }
    
    const dp = Array(change + 1).fill(Infinity);
    dp[0] = 0;
    
    for (let i = 1; i <= change; i++) {
      for (const bill of denominations) {
        if (i >= bill) {
          dp[i] = Math.min(dp[i], dp[i - bill] + 1);
        }
      }
    }
    
    return dp[change] === Infinity ? -1 : dp[change];
  }
}