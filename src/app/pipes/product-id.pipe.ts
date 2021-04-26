import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productId'
})
export class ProductIdPipe implements PipeTransform {

  // custom type to display productId in two ways using pipe
  transform(value: string, ...args: string[]): unknown {
    if(args[0]=='complete' && value){
      return value
    }
    if(args[0]=='medium' && value){
      return value.slice(2)
    }
    return null;
  }

}
