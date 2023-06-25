import { Component, OnInit } from '@angular/core';
import {
  MENU_ITEMS,
  MenuItems,
  SingleMenuItem,
} from '../shared/constants/home-menu';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  menuItems: MenuItems = MENU_ITEMS;
  constructor(private router: Router) {}

  ngOnInit(): void {}

  goToRoute(item: SingleMenuItem) {
    let redirect = item?.allow ? item?.route : '#';
    this.router.navigateByUrl(redirect);
  }
}
