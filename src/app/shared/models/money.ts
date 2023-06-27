export const INITIAL_ATM_BALANCE = {
  bill_100: 10,
  bill_50: 10,
  bill_20: 10,
  bill_10: 10,
  bill_5: 10,
  bill_1: 10,
};

export class Bills {
  bill_100: number;
  bill_50: number;
  bill_20: number;
  bill_10: number;
  bill_5: number;
  bill_1: number;
  constructor(data?: Bills) {
    this.bill_100 = data?.bill_100 || 0;
    this.bill_50 = data?.bill_50 || 0;
    this.bill_20 = data?.bill_20 || 0;
    this.bill_10 = data?.bill_10 || 0;
    this.bill_5 = data?.bill_5 || 0;
    this.bill_1 = data?.bill_1 || 0;
  }
}
