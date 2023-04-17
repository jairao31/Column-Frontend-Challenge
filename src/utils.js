export const BY_WORD = "BY_WORD";
export const DEFAULT_TEMPLATE = "DEFAULT TEMPLATE";

export const getNewspaperContext = () => {
  return {
    rate: {
      type: BY_WORD,
      amount: 2, // price in dollars
    },

    // Don't worry about yet!
    template: DEFAULT_TEMPLATE,
  };
};

export const render = (text) => {
  return {
    image: `https://via.placeholder.com/400?text=${text}`,
    words: text ? text.split(" ").length : 0,
    width: 500,
    height: 500,
  };
};

export const computePrice = (rate, words) => {
  if (rate.type === BY_WORD) return rate.amount * words;

  throw new Error(`Unknown rate type: ${rate.type}`);
};
