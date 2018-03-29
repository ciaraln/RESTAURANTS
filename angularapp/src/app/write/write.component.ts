import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.css']
})
export class WriteComponent implements OnInit {

  newReview: any;
  allReviews: any;
  err = "";
  id: any;
  oneRestaurant: any;
  name: any;
  
  constructor(
    private _http: HttpService, 
    private _route: ActivatedRoute, 
    private _router: Router) { }

  ngOnInit() {
    this.oneRestaurant = { name: ""};
    this.newReview = { customer: "", stars:"", review: "" },
    this._route.params.subscribe(params => {
        // console.log(params['id'])
        this.id = params['id'];
        this.singleRestaurant(this.id);
  })}

  sendallReviews() {
    let observabele = this._http.getReviews();
    observabele.subscribe(data => {
      console.log(" All the Reviews", data)
      this.allReviews = data
    })
  }

  singleRestaurant(id) {
    let observabele = this._http.getFoodById(id);
    observabele.subscribe(data => {
      console.log( " Show the id to get Restaurant Name", data);
      this.oneRestaurant = data;
    })
  }

  onSubmit() {
    console.log("i am the submit button in writing.")
    let observable = this._http.addReview(this.id,this.newReview);
    observable.subscribe(response => {
      console.log("begin response")
      if (response == "Review validation failed: name: Review name required") {
        console.log("step 1, response.")
        this.err = "Review name must have at least 3 characters, come you can do it! Chilli's was awesome. etc...";
        this.refresh();
      } else if (response == "You failed your Review! Validations Review must have at least 3 characters") {
        this.err = "Really, Review must have at least 3 characters";
        this.refresh();
      } else {
        console.log(response);
        this.newReview= response;
        this.goHome();
        console.log(" Tried to go home.")
      }
    })
  }

  goHome() {
    this._router.navigate(['/home']);
  }

  refresh() {
    this._router.navigate(['/write/:id']);
  }
}