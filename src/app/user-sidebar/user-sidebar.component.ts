import { Component, OnInit } from "@angular/core";
declare var $: any;

export interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  id: string;
  array: Nav[];
  subclass: string;
}

interface Nav {
  path: string;
  title: string;
  id: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  {
    path: "analytics",
    subclass: "",
    title: "Analytics",
    icon: "categorize.svg",
    class: "",
    id: "analytics",
    array: [],
  },
  {
    path: "delivarables",
    subclass: "",
    title: "Delivarable Management",
    icon: "delivarable.svg",
    class: "",
    id: "del",
    array: [],
  },
  {
    path: "activities",
    subclass: "",
    title: "Activity Implementaion",
    icon: "activity.svg",
    class: "",
    id: "act",
    array: [],
  },
  {
    path: "settings",
    subclass: "",
    title: "Setting",
    icon: "settings.svg",
    class: "",
    id: "settings",
    array: [],
  },
];

@Component({
  selector: "app-user-sidebar",
  templateUrl: "./user-sidebar.component.html",
  styleUrls: ["./user-sidebar.component.css"],
})
export class UserSidebarComponent implements OnInit {
  public menuItems: any[];
  ngOnInit(): void {
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
  }
}
