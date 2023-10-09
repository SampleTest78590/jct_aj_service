import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberFormat'
})
export class NumberformatDirective implements PipeTransform {

  constructor() { }

   transform(number : any){
    let hasMinus = String(number).charAt(0) === '-' ? true:false;
    number =  String(number).charAt(0) === '-' ?
            + String(number).substring(1, number.length)  : number;
        // hundreds
        if(number <= 99999){
          number = number ;
        }
        // thousands
        else if(number >= 100000 && number <= 9999999){
          number = (number / 100000).toFixed(1) + 'Lakh';
        }
        // millions
        else if(number >= 10000000){
          number = (number / 10000000).toFixed(1) + 'Cr';
        }
        if(hasMinus){
          return '-'+number;
        }else
        {
          return number;
        }
    }

}