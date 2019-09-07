import { ajax } from 'rxjs/ajax';

export class ChartService {

private apiUrl = '//5d73c8cf214da600148f5b70.mockapi.io/api/v1';
    constructor(){}
    getChart() {
            return ajax.get(`${this.apiUrl}/chart`)
    };
}