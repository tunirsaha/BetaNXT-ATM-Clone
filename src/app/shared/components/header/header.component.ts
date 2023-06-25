import { Component, OnInit } from '@angular/core';
import { MACHINE_INFO } from 'src/app/shared/constants/machine-info';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  machineInfo: any = MACHINE_INFO;
  siteLanguage = 'English';
  languageList = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'Hindi' },
  ];

  constructor(private translate: TranslateService) {}

  changeSiteLanguage(localeCode: string): void {
    const selectedLanguage = this.languageList
      .find((language) => language.code === localeCode)
      ?.label.toString();
    if (selectedLanguage) {
      this.siteLanguage = selectedLanguage;
      this.translate.use(localeCode);
    }
    const currentLanguage = this.translate.currentLang;
    console.log('currentLanguage', currentLanguage);
  }

  ngOnInit(): void {}
}
