import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { NumberDirective } from './directives/number-only.directive';
import { NgxTranslateModule } from '../translate/translate.module';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, NumberDirective],
  imports: [RouterModule, CommonModule, NgxTranslateModule],
  exports: [
    HeaderComponent,
    FooterComponent,
    NumberDirective,
    NgxTranslateModule,
  ],
})
export class SharedModule {}
