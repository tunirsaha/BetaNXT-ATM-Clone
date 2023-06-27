export interface MenuItems {
  left: Array<SingleMenuItem>;
  right: Array<SingleMenuItem>;
}

export interface SingleMenuItem {
  name: string;
  route: string;
  allow: boolean;
}
