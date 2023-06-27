export const USER_INFO = {
  cardNumber: '1234 1234 1234 1234',
  name: 'Tunir Saha',
  cardPin: '123456',
  balance: 1235,
};

export class UserInfo {
  cardNumber: string;
  name: string;
  cardPin: string;
  balance: number;
  constructor(data?: UserInfo) {
    this.cardNumber = data?.cardNumber || '';
    this.name = data?.name || '';
    this.cardPin = data?.cardPin || '';
    this.balance = data?.balance || 0;
  }
}
