# Cee-lo

Play the dice game cee-lo (four-five-six) against a computer opponent. This app has multiple instant win/lose combinations that you need to roll in order to win. If there's no instant win or pairs, then the winner is the highest non-paired number.

<p align="center">
<img src ="https://user-images.githubusercontent.com/104634518/182951532-7231d98d-2bd7-4698-9358-a1b27e19b5a7.png">

  </p>

## How It's Made:

Tech used: React, JavaScript, Node, Express, HTML, CSS

The app uses React functional components to keep track of state and update the dice. There are many winning/losing combinations that can be rolled, so for each roll, the CPU and User's dice is passed to functions to check if the winning/losing combination is held. If there is no instant win/lose, then it checks for the value of the non-paired die.

## Optimizations:

Because of how many different ways to win or lose there are, it was important that I added a module that pops up to explain instructions. I also added a scoreboard to keep track of each round. 
