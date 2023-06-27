import { Component, OnInit } from '@angular/core';
import { MACHINE_INFO } from '../../shared/constants/system-ui';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss'],
})
export class SupportComponent implements OnInit {
  machineInfo = MACHINE_INFO;
  constructor() {}

  ngOnInit(): void {}
}
