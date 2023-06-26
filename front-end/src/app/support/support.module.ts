import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupportComponent } from './support.component';

const routes: Routes = [
  {
    path: '',
    component: SupportComponent,
  },
];

@NgModule({
  declarations: [SupportComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class SupportModule {}
