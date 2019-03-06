import { map, catchError } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { Observable } from "rxjs/index";

export class UserService {

private apiUrl = 'https://5be2c0e0d53daf0013250eb5.mockapi.io/api/v1';
    constructor(){}
    getUsers() {
            return ajax.get(`${this.apiUrl}/users`);
    };
}