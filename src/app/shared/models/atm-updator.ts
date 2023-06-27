import { Bills } from './money';

export interface PreUpdate {
  checkSum: number;
  updatedBillCount: Bills;
}
