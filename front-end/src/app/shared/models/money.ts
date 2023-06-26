export const INITIAL_ATM_BALANCE = {
  d100: 1,
  d50: 1,
  d20: 1,
  d10: 1,
  d5: 1,
  d1: 1,
};

export class Denominations {
  d100: number;
  d50: number;
  d20: number;
  d10: number;
  d5: number;
  d1: number;
  constructor(data?: Denominations) {
    this.d100 = data?.d100 || 0 || 0;
    this.d50 = data?.d50 || 0;
    this.d20 = data?.d20 || 0;
    this.d10 = data?.d10 || 0;
    this.d5 = data?.d5 || 0;
    this.d1 = data?.d1 || 0;
  }
}
