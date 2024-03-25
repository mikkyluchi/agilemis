import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customCurrency'
})
export class CustomCurrencyPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    if (value == 'Naira' || value == 'NGN' || value == 'naira') {
      return '₦'
    }
    if (value == 'Dollar' || value == 'USD' || value == 'Dollars') {
      return '$'
    }
    if (value == 'Euro' || value == 'Euro') {
      return '£'
    }
    return value;
  }

}
