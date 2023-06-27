import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardInsertComponent } from './card-insert.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: CardInsertComponent,
  },
];

@NgModule({
  declarations: [CardInsertComponent],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
})
export class CardInsertModule {}
