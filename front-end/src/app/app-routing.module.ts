import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'card-insert',
    loadChildren: () =>
      import('./card-insert/card-insert.module').then(
        (m) => m.CardInsertModule
      ),
  },
  {
    path: 'cash-withdrawal',
    canLoad: [AuthGuardService],
    loadChildren: () =>
      import('./cash-withdrawal/cash-withdrawal.module').then(
        (m) => m.CashWithdrawalModule
      ),
  },
  {
    path: 'fast-cash',
    loadChildren: () =>
      import('./fast-cash/fast-cash.module').then((m) => m.FastCashModule),
  },
  {
    path: 'balance-enquiry',
    loadChildren: () =>
      import('./balance-enquiry/balance-enquiry.module').then(
        (m) => m.BalanceEnquiryModule
      ),
  },
  {
    path: 'wrong-pin',
    loadChildren: () =>
      import('./wrong-pin/wrong-pin.module').then((m) => m.WrongPinModule),
  },
  {
    path: 'withdraw-success',
    loadChildren: () =>
      import('./withdraw-success/withdraw-success.module').then(
        (m) => m.WithdrawSuccessModule
      ),
  },
  {
    path: 'support',
    loadChildren: () =>
      import('./support/support.module').then((m) => m.SupportModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
