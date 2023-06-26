import { Component, OnInit } from '@angular/core';
import { UtilityService } from '../../shared/services/utility.service';
import { DELAYS } from '../../shared/constants/system-ui';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-wrong-pin',
  templateUrl: './wrong-pin.component.html',
  styleUrls: ['./wrong-pin.component.scss'],
})
export class WrongPinComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.authService.killSession();
    }, DELAYS.WRONG_PIN_REDIRECT * 1000);
  }
}
