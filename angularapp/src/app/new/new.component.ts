import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})

export class NewComponent implements OnInit {
  newFood: any;
  allFoods: any;
  err = "";
  constructor(
    private _http: HttpService, 
    private _route: ActivatedRoute, 
    private _router: Router) { }

  ngOnInit() {
    this.newFood = { name: "", type: "" }
  }

  sendallFoods() {
    let observabele = this._http.getFoods();
    observabele.subscribe(data => {
      // console.log(" All the Foods", data)
      this.allFoods = data
    })
  }

  onSubmit() {
    let observable = this._http.addFood(this.newFood);
    // console.log(" Tried to submit")
    observable.subscribe(response => {
      // console.log("we got a response")
      if (response == "Food validation failed: name: Food name required") {
        this.err = "Food name must have at least 3 characters, come you can do it! Chilli's, Taco Bell, etc...";
        this.refresh();
        // console.log("logic 1");
      } else if (response == "You failed your Food! Validations Foodname must have at least 3 characters") {
        this.err = "Really, Food name must have at least 3 characters";
        // console.log(" logic 2 ")
        this.refresh();
      } else {
        // console.log(response);
        this.newFood = response;
        this.goHome();
        // console.log(" went home ")
      }
    })
  }

  goHome() {
    this._router.navigate(['/home']);
  }

  refresh() {
    this._router.navigate(['/new']);
  }
}
