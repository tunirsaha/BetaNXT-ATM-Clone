import { Component, OnInit } from '@angular/core';
import { MACHINE_INFO } from 'src/app/shared/constants/machine-info';

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

  constructor() {}

  ngOnInit(): void {}
}
