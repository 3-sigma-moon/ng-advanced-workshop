import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'countryDescription'
})
export class CountryDescriptionPipe implements PipeTransform {

  transform(control: string = '', filter: string = ''): string {
    let i = control.toLowerCase().indexOf(filter.toLowerCase())
    if (i >= 0) {
      let match_start = i;
      let match_end = filter.length + i;
      return control.substring(0, match_start) +
        '<b>' + control.substring(match_start, match_end) + '</b>'
        + control.substring(match_end + match_start)
    }
    return control
  }

}
