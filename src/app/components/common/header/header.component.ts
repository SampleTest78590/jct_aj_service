import {
  Component,
  ViewEncapsulation,
  OnInit
} from '@angular/core';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit {

  ngOnInit(): void {
    
  }
}