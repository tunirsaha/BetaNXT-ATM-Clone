import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { filter, of, take, tap } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  showFooter = true;

  constructor(private authService: AuthService, private router: Router) {
    this.router.events
      .pipe(
        take(1),
        filter((event: any) => !!event),
        tap((event: any) => {
          if (['/support'].includes(event.url)) {
            this.showFooter = false;
          }
          return of(null);
        })
      )
      .subscribe();
  }

  exit() {
    this.authService.logOut();
  }
}
