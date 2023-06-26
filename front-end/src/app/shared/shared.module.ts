import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { NumbersOnlyDirective } from './directives/number-only.directive';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, NumbersOnlyDirective],
  imports: [RouterModule, CommonModule],
  exports: [HeaderComponent, FooterComponent, NumbersOnlyDirective],
})
export class SharedModule {}
