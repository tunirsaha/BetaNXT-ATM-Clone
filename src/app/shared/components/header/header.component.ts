import { Component, OnInit } from '@angular/core';
import { MACHINE_INFO } from 'src/app/shared/constants/system-ui';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  machineInfo = MACHINE_INFO;

  constructor() {}

  ngOnInit(): void {}
}
