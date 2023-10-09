import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-breadcrumb-card",
  templateUrl: "./breadcrumb-card.component.html",
  styleUrls: ["./breadcrumb-card.component.css"],
})
export class BreadcrumbCardComponent implements OnInit {
  @Input() breadcrumb: any = [];

  constructor(private route: Router) {}

  ngOnInit(): void {}

  routeTo(item:any) {
    if (item.link && item.param) {
      this.route.navigate([item.link], { queryParams: { tab: item.param } });
    } else if (item.link) {
      this.route.navigate([item.link]);
    }
  }
}
