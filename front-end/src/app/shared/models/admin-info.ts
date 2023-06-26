export const ADMIN_INFO = {
  username: 'admin',
  password: '123',
};

export class AdminInfo {
  username: string;
  password: string;
  constructor(data?: AdminInfo) {
    this.username = data?.username || '';
    this.password = data?.password || '';
  }
}
