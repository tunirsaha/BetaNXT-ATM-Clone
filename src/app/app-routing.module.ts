import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAuthGuardService } from './core/guards/user.guard';
import { AdminAuthGuardService } from './core/guards/admin.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'user', redirectTo: 'home', pathMatch: 'full' },
  { path: 'admin', redirectTo: 'admin/login', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'user',
    children: [
      {
        path: 'card-insert',
        loadChildren: () =>
          import('./user/card-insert/card-insert.module').then(
            (m) => m.CardInsertModule
          ),
      },
      {
        path: 'cash-withdrawal',
        canLoad: [UserAuthGuardService],
        loadChildren: () =>
          import('./user/cash-withdrawal/cash-withdrawal.module').then(
            (m) => m.CashWithdrawalModule
          ),
      },
      {
        path: 'fast-cash',
        canLoad: [UserAuthGuardService],
        loadChildren: () =>
          import('./user/fast-cash/fast-cash.module').then(
            (m) => m.FastCashModule
          ),
      },
      {
        path: 'balance-enquiry',
        canLoad: [UserAuthGuardService],
        loadChildren: () =>
          import('./user/balance-enquiry/balance-enquiry.module').then(
            (m) => m.BalanceEnquiryModule
          ),
      },
      {
        path: 'wrong-pin',
        canLoad: [UserAuthGuardService],
        loadChildren: () =>
          import('./user/wrong-pin/wrong-pin.module').then(
            (m) => m.WrongPinModule
          ),
      },
      {
        path: 'withdraw-success',
        canLoad: [UserAuthGuardService],
        loadChildren: () =>
          import('./user/withdraw-success/withdraw-success.module').then(
            (m) => m.WithdrawSuccessModule
          ),
      },
      {
        path: 'support',
        loadChildren: () =>
          import('./user/support/support.module').then((m) => m.SupportModule),
      },
    ],
  },
  {
    path: 'admin',
    children: [
      {
        path: 'login',
        loadChildren: () =>
          import('./admin/admin-login/admin-login.module').then(
            (m) => m.AdminLoginModule
          ),
      },
      {
        path: 'dashboard',
        canLoad: [AdminAuthGuardService],
        loadChildren: () =>
          import('./admin/admin-dashboard/admin-dashboard.module').then(
            (m) => m.AdminDashboardModule
          ),
      },
    ],
  },
  { path: '**', redirectTo: 'user', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
