import { Component, OnInit } from '@angular/core';
import { MENU_ITEMS } from '../shared/constants/home-menu';
import { UtilityService } from '../shared/services/utility.service';
import { MenuItems, SingleMenuItem } from '../shared/models/navigation-menu';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  menuItems: MenuItems = MENU_ITEMS;
  constructor(private utilityService: UtilityService) {}

  ngOnInit(): void {}

  goToRoute(item: SingleMenuItem) {
    let redirect = item?.allow ? item?.route : '#';
    this.utilityService.navigate(redirect);
  }
}
