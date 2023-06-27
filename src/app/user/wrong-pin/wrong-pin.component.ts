import { Component, OnInit } from '@angular/core';
import { DELAYS } from '../../shared/constants/system-ui';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';

@Component({
  selector: 'app-wrong-pin',
  templateUrl: './wrong-pin.component.html',
  styleUrls: ['./wrong-pin.component.scss'],
})
export class WrongPinComponent implements OnInit {
  constructor(private userAuthService: UserAuthService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.userAuthService.killSession();
    }, DELAYS.WRONG_PIN_REDIRECT * 1000);
  }
}
