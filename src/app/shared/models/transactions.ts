export class Transactions {
  timeStamp: Date;
  userCard: string;
  amount: number;
  constructor(data?: Transactions) {
    this.timeStamp = data?.timeStamp || new Date();
    this.userCard = data?.userCard || '';
    this.amount = data?.amount || 0;
  }
}
