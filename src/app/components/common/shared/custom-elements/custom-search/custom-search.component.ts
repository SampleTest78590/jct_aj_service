import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-custom-search',
  templateUrl: './custom-search.component.html',
  styleUrls: ['./custom-search.component.scss'],
})
export class CustomSearchComponent implements OnInit {
  @Input() label: string;
  @Input() IconSrc: string;
  @Input() IconClr: string;
  @Input() disabled: boolean = false;
  @Input() iconSize: string = '';
  @Input() kind: string = '';
  @Output() outputText: any = new EventEmitter();
  textInput: any = '';
  private searchDecouncer$: Subject<string> = new Subject();

  constructor() {}

  ngOnInit(): void {
    this.searchDecouncer$
      .pipe(debounceTime(300),distinctUntilChanged())
      .subscribe((term: string) => {
        this.outputText.emit(term)
      });
  }

  onSearchInputChange(term:string):void{
    this.searchDecouncer$.next(term);
  }

  resetInputText(): void {
    this.textInput = '';
  }
  
  onCancelIconClick(event: Event): void {
    event.stopPropagation();
    this.resetInputText();
    this.onSearchInputChange(this.textInput);
  }
}
