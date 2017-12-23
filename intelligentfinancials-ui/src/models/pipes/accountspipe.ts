import {PipeTransform, Pipe} from '@angular/core';
import {Account} from '../account';

@Pipe({name: 'accountlist'})
export class AccountsPipe implements PipeTransform {
transform(value:Map<string, Account>, args:string[] = null) : any {
        return Object.keys(value).map(key => value[key]);
    }
}