import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({ providedIn: 'root' })
export class EmployeeService {

    APIURL = 'http://localhost:3000';

    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get(`${this.APIURL}/employees`);
    }

    getbyID(id: any) {
      return this.http.get(`${this.APIURL}/employees/${id}`);
    }

    addEmployee(Item: any) {
        return this.http.post(`${this.APIURL}/employees`, Item);
    }

    updateEmployee(id: any, Item: any) {
        return this.http.put(`${this.APIURL}/employees/${id}`, Item);
    }

    delete(id: number) {
        return this.http.delete(`${this.APIURL}/employees/${id}`);
    }
}