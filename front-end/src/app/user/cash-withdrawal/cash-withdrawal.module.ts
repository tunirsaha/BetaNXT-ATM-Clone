import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CashWithdrawalComponent } from './cash-withdrawal.component';

const routes: Routes = [
  {
    path: '',
    component: CashWithdrawalComponent,
  },
];

@NgModule({
  declarations: [CashWithdrawalComponent],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
})
export class CashWithdrawalModule {}
