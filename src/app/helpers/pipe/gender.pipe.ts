import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gender'
})
export class GenderPipe implements PipeTransform {

  transform(value: any, ...args:any): string {
    let result=''
    if(value == "true"){
      result="Nam"
    }else{
      result="Nữ"
    }
   return result
  }

}
