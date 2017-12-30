import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mysearchFilter'
})
export class MysearchFilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args){
       return value;
    }else{
      args = args.toLowerCase();
      return value.filter(function (el: any) {
          return el.pollqtn.toLowerCase().indexOf(args) > -1;
      });
    }
  }

}
