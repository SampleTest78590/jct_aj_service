import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-custom-accordion',
  templateUrl: './custom-accordion.component.html',
  styleUrls: ['./custom-accordion.component.scss'],
  encapsulation :  ViewEncapsulation.None
})
export class CustomAccordionComponent implements OnInit {
  options = { multi: false };
  
  menus = [
    { 
      name: 'Front-end',
      iconClass: 'fa fa-code',
      active: true,
      submenu: [
        { name: 'HTML', url: '#' },
        { name: 'CSS', url: '#' },
        { name: 'Javascript', url: '#' }
      ]
    },
    { 
      name: 'Responsive web',
      iconClass: 'fa fa-mobile',
      active: false,
      submenu: [
        { name: 'Tablets', url: '#' },
        { name: 'Mobiles', url: '#' },
        { name: 'Desktop', url: '#' }
      ]
    },
    { 
      name: 'Web Browser',
      iconClass: 'fa fa-globe',
      active: false,
      submenu: [
        { name: 'Chrome', url: '#' },
        { name: 'Firefox', url: '#' },
        { name: 'Desktop', url: '#' }
      ]
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }
  toggle(index: number) {
    // if (!this.multi) {
      this.menus.filter(
        (menu, i) => i !== index && menu.active
      ).forEach(menu => menu.active = !menu.active);
    // }
    this.menus[index].active = !this.menus[index].active;
  }
}
