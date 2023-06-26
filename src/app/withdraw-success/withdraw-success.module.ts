import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WithdrawSuccessComponent } from './withdraw-success.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: WithdrawSuccessComponent,
  },
];

@NgModule({
  declarations: [WithdrawSuccessComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class WithdrawSuccessModule {}
