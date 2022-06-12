import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './core/guards/admin.guard';
import { BuyerGuard } from './core/guards/buyer.guard';
import { SellerGuard } from './core/guards/seller.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'admin',
    canActivate: [AdminGuard],
    loadChildren: () =>
      import('./features/admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'buyer',
    canActivate: [BuyerGuard],
    loadChildren: () =>
      import('./features/buyer/buyer.module').then((m) => m.BuyerModule),
  },
  {
    path: 'seller',
    canActivate: [SellerGuard],
    loadChildren: () =>
      import('./features/seller/seller.module').then((m) => m.SellerModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
