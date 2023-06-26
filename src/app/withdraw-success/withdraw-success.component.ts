import { Component, OnInit } from '@angular/core';
import { UtilityService } from '../shared/services/utility.service';
import { AuthService } from '../shared/services/auth.service';
import { DELAYS } from '../shared/constants/system-ui';

@Component({
  selector: 'app-withdraw-success',
  templateUrl: './withdraw-success.component.html',
  styleUrls: ['./withdraw-success.component.scss'],
})
export class WithdrawSuccessComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.authService.killSession();
    }, DELAYS.FLOW_END_REDIRECT * 1000);
  }
}
