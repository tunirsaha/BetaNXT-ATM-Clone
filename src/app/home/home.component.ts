import { Component, OnInit } from '@angular/core';
import { MENU_ITEMS } from '../shared/constants/home-menu';
import { UtilityService } from '../shared/services/utility.service';
import { MenuItems, SingleMenuItem } from '../shared/models/navigation-menu';
import { MARQUEE_MSGS } from '../shared/constants/system-ui';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  marqueeMsgs = MARQUEE_MSGS;
  menuItems: MenuItems = MENU_ITEMS;
  constructor(private utilityService: UtilityService) {}

  ngOnInit(): void {}

  goToRoute(item: SingleMenuItem) {
    const redirect = 'user/' + (item?.allow ? item?.route : '');
    this.utilityService.navigate(redirect);
  }
}
