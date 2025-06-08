// Card Images
export const RED_CARDS = {
  red_0: require("@/assets/images/card-images/red/red-0.png"),
  red_1: require("@/assets/images/card-images/red/red-1.png"),
  red_2: require("@/assets/images/card-images/red/red-2.png"),
  red_3: require("@/assets/images/card-images/red/red-3.png"),
  red_4: require("@/assets/images/card-images/red/red-4.png"),
  red_5: require("@/assets/images/card-images/red/red-5.png"),
  red_6: require("@/assets/images/card-images/red/red-6.png"),
  red_7: require("@/assets/images/card-images/red/red-7.png"),
  red_8: require("@/assets/images/card-images/red/red-8.png"),
  red_9: require("@/assets/images/card-images/red/red-9.png"),
  red_reverse: require("@/assets/images/card-images/red/red-reverse.png"),
  red_skip: require("@/assets/images/card-images/red/red-skip.png"),
  red_plus_2: require("@/assets/images/card-images/red/red-plus-2.png"),
};

export const BLUE_CARDS = {
  blue_0: require("@/assets/images/card-images/blue/blue-0.png"),
  blue_1: require("@/assets/images/card-images/blue/blue-1.png"),
  blue_2: require("@/assets/images/card-images/blue/blue-2.png"),
  blue_3: require("@/assets/images/card-images/blue/blue-3.png"),
  blue_4: require("@/assets/images/card-images/blue/blue-4.png"),
  blue_5: require("@/assets/images/card-images/blue/blue-5.png"),
  blue_6: require("@/assets/images/card-images/blue/blue-6.png"),
  blue_7: require("@/assets/images/card-images/blue/blue-7.png"),
  blue_8: require("@/assets/images/card-images/blue/blue-8.png"),
  blue_9: require("@/assets/images/card-images/blue/blue-9.png"),
  blue_reverse: require("@/assets/images/card-images/blue/blue-reverse.png"),
  blue_skip: require("@/assets/images/card-images/blue/blue-skip.png"),
  blue_plus_2: require("@/assets/images/card-images/blue/blue-plus-2.png"),
};

export const GREEN_CARDS = {
  green_0: require("@/assets/images/card-images/green/green-0.png"),
  green_1: require("@/assets/images/card-images/green/green-1.png"),
  green_2: require("@/assets/images/card-images/green/green-2.png"),
  green_3: require("@/assets/images/card-images/green/green-3.png"),
  green_4: require("@/assets/images/card-images/green/green-4.png"),
  green_5: require("@/assets/images/card-images/green/green-5.png"),
  green_6: require("@/assets/images/card-images/green/green-6.png"),
  green_7: require("@/assets/images/card-images/green/green-7.png"),
  green_8: require("@/assets/images/card-images/green/green-8.png"),
  green_9: require("@/assets/images/card-images/green/green-9.png"),
  green_reverse: require("@/assets/images/card-images/green/green-reverse.png"),
  green_skip: require("@/assets/images/card-images/green/green-skip.png"),
  green_plus_2: require("@/assets/images/card-images/green/green-plus-2.png"),
};

export const YELLOW_CARDS = {
  yellow_0: require("@/assets/images/card-images/yellow/yellow-0.png"),
  yellow_1: require("@/assets/images/card-images/yellow/yellow-1.png"),
  yellow_2: require("@/assets/images/card-images/yellow/yellow-2.png"),
  yellow_3: require("@/assets/images/card-images/yellow/yellow-3.png"),
  yellow_4: require("@/assets/images/card-images/yellow/yellow-4.png"),
  yellow_5: require("@/assets/images/card-images/yellow/yellow-5.png"),
  yellow_6: require("@/assets/images/card-images/yellow/yellow-6.png"),
  yellow_7: require("@/assets/images/card-images/yellow/yellow-7.png"),
  yellow_8: require("@/assets/images/card-images/yellow/yellow-8.png"),
  yellow_9: require("@/assets/images/card-images/yellow/yellow-9.png"),
  yellow_reverse: require("@/assets/images/card-images/yellow/yellow-reverse.png"),
  yellow_skip: require("@/assets/images/card-images/yellow/yellow-skip.png"),
  yellow_plus_2: require("@/assets/images/card-images/yellow/yellow-plus-2.png"),
};

export const WILD_CARDS = {
  wild: require("@/assets/images/card-images/wild-cards/wild-change-color.png"),
  wild_plus_4: require("@/assets/images/card-images/wild-cards/wild-plus-4.png"),
};

export const BACKSIDE = require("@/assets/images/card-images/backside.png");

// Helper function to get random card
export const getRandomCard = () => {
  const allCards = [
    ...Object.values(RED_CARDS),
    ...Object.values(BLUE_CARDS),
    ...Object.values(GREEN_CARDS),
    ...Object.values(YELLOW_CARDS),
    ...Object.values(WILD_CARDS),
  ];
  return allCards[Math.floor(Math.random() * allCards.length)];
}; 