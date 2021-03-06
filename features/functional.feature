Feature: Functional Support
  As a user of ham-script
  I want to be able to use the awesome functional features
  So that my code can stay simple and awesome

  Scenario: I need a simple lambda
    Given `|x, y| { x + y }`
    Then applying `[3, 2]` will yield `5`

  Scenario: Mapping a list
    Given `[1..5].map |x| { x + 1 }`
    Then the result should be `[2, 3, 4, 5, 6]`

  Scenario: Filtering a list
    Given `[1..50].filter |x| { x % 10 is 0}`
    Then the result should be `[10, 20, 30, 40, 50]`

  Scenario: Reducing a list
    Given `[1..10].reduce |acc, x| { acc + x }`
    Then the result should be `55`

  Scenario: I want to pass a lambda with out stupid parenthesis
    Given `var i = 0; 5.times { i += 1 }; return i;`
    Then the result should be `5` 

  Scenario: I want to use function guards
    Given `| x < 3 && x > 1 | { x + 3 }`
    Then applying `[3]` will yield `undefined`
    Then applying `[1]` will yield `undefined`
    Then applying `[2]` will yield `5`

  Scenario: I want to use a guard on two variables
    Given `| x < y | { x + y }`
    Then applying `[1, 2]` will yield `3`
    Then applying `[2, 1]` will yield `undefined`