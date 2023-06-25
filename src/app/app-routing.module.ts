import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
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
    loadChildren: () =>
      import('./cash-withdrawal/cash-withdrawal.module').then(
        (m) => m.CashWithdrawalModule
      ),
  },
  {
    path: 'fast-cash',
    loadChildren: () =>
      import('./fast-cash/fast-cash.module').then(
        (m) => m.FastCashModule
      ),
  },
  {
    path: 'balance-enquiry',
    loadChildren: () =>
      import('./balance-enquiry/balance-enquiry.module').then(
        (m) => m.BalanceEnquiryModule
      ),
  },
  {
    path: 'support',
    loadChildren: () =>
      import('./support/support.module').then(
        (m) => m.SupportModule
      ),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
