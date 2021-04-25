import {Directive, ElementRef, forwardRef, HostListener, Input} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {NG_VALUE_ACCESSOR} from '@angular/forms';

// import {numberWithCommas} from './helpers';

@Directive({
  selector: '[displayRupee]'
})
export class CustomRupeeStyleDirective {

  // / tslint:disable-next-line:variable-name
  private _value: string | null;

  constructor(private elementRef: ElementRef<HTMLInputElement>,
  ) {
  }


  get value(): string | null {
    return this._value;
  }

  @Input('value')
  set value(value: string | null) {
    this._value = value;
    this.formatValue(value);
  }

  private formatValue(value: string | null) {
    if (value !== null) {
      this.elementRef.nativeElement.value = this.numberWithCommas(value);
    } else {
      this.elementRef.nativeElement.value = '';
    }
  }

  private numberWithCommas(value){
    value=value.toString();
    var lastThree = value.substring(value.length-3);
    var otherNumbers = value.substring(0,value.length-3);
    if(otherNumbers != '')
        lastThree = ',' + lastThree;
    var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    return res
  }


  private unFormatValue() {
    const value = this.elementRef.nativeElement.value;
    this._value = value.replace(/[^\d.-]/g, '');
    if (value) {
      this.elementRef.nativeElement.value = this._value;
    } else {
      this.elementRef.nativeElement.value = '';
    }
  }

  @HostListener('input', ['$event.target.value'])
  onInput(value) {
    // here we cut any non numerical symbols    
    this._value = value.replace(/[^\d.-]/g, '');
  }

  @HostListener('blur')
  _onBlur() {
    this.formatValue(this._value); // add commas
  }

  @HostListener('focus')
  onFocus() {
    this.unFormatValue(); // remove commas for editing purpose
  }

}
