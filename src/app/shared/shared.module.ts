import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { NumbersOnlyDirective } from './directives/number-only.directive';
import { FooterComponent } from './components/footer/footer.component';
import { TimeTickerComponent } from './components/time-ticker/time-ticker.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, NumbersOnlyDirective, TimeTickerComponent],
  imports: [RouterModule, CommonModule],
  exports: [HeaderComponent, FooterComponent, NumbersOnlyDirective],
})
export class SharedModule {}
