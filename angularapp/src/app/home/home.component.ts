import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  allFoods: any;
  constructor(
    private _http: HttpService,
    private _route: ActivatedRoute, 
    private _router: Router) { }

  ngOnInit() {
    this.sendallFoods();
  }

  sendallFoods() {
    let observable = this._http.getFoods();
    observable.subscribe(data => {
      // console.log(" All pets", data)
      // this will parse through the data
      this.allFoods = data
      console.log("all the Foods: ", this.allFoods)
    })
  }

  onClickDelete(id) {
    console.log(id)
    let observable = this._http.deleteById(id)
    observable.subscribe(data => {
      console.log(data, "is deleted.");
      this.sendallFoods()
    })
  }
}