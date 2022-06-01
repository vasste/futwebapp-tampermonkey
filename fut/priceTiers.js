/* global UTCurrencyInputControl */
export default {
  roundValueToNearestPriceTiers(value) {
    /* const tier = utils.JS.find(UTCurrencyInputControl.PRICE_TIERS, i => value > i.min); */
    const tier = UTCurrencyInputControl.PRICE_TIERS.find(i => value > i.min);

    const diff = value % tier.inc;

    if (diff === 0) {
      return value;
    } else if (diff < tier.inc / 2) {
      return value - diff;
    }
    return value + (tier.inc - diff);
  },

  roundDownToNearestPriceTiers(value) {
    const tier = UTCurrencyInputControl.PRICE_TIERS.find(i => value > i.min);

    const diff = value % tier.inc;

    if (diff === 0) {
      return value - tier.inc;
    }
    return value - diff;
  },

  determineListPrice(start, buyNow) {
    const tier = UTCurrencyInputControl.PRICE_TIERS.find(i => buyNow > i.min);

    const startPrice = this.roundValueToNearestPriceTiers(start);
    let buyNowPrice = this.roundValueToNearestPriceTiers(buyNow);

    if (startPrice === buyNowPrice) {
      buyNowPrice += tier.inc;
    }

    return {
      start: startPrice,
      buyNow: buyNowPrice,
    };
  },
};
