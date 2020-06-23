import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  dataGrid: Value[];
  title = 'ng6App';
  restItems: any;
  restItemsUrl = 'https://localhost:5004/api/Values';
  constructor(private http: HttpClient) {
    this.getRestItems();
  }
  ngOnInit() {
  }
  getRestItems(): void {
    this.restItemsServiceGetRestItems().subscribe(
      restItems => {
        this.dataGrid = restItems;
        console.log(restItems);
      });
  }
  onClickMe() {
    this.restItemsServicePostRestItems();
  }
  onClickMeUpdate() {
    this.restItemsServiceUpdateRestItems();
  }
  restItemsServiceGetRestItems() {
    return this.http.get<any[]>(this.restItemsUrl).pipe(map(data => data));
  }
  restItemsServicePostRestItems() {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    this.http.post(this.restItemsUrl, { name : 'zakki'}, httpOptions)
      .toPromise()
      .then((data: any) => {
        alert('Success');
        this.getRestItems();
      })
      .catch(error => { alert(error)});
  }
  restItemsServiceUpdateRestItems() {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    this.http.put(this.restItemsUrl + '?id=1',{id: 1 , name : 'zakkiBangets'}, httpOptions)
      .toPromise()
      .then((data: any) => {
        alert('Success');
        this.getRestItems();
      })
      .catch(error => { console.log(error)});
  }

}
export class Value {
  id: number ;
  name: string;

}
