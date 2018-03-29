import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})

export class ReviewsComponent implements OnInit {
  allReviews: any;
  id:any;
  oneRestaurant: any;
  
  constructor(
    private _http: HttpService, 
    private _route: ActivatedRoute, 
    private _router: Router) { }

  ngOnInit() {
    this._route.params.subscribe(params => { console.log(params['id'])
    this.id = params['id'];
    this.sendallReviews();
    this.singleRestaurant(this.id);
  })
}

  sendallReviews() {
    let observable = this._http.getReviews();
    observable.subscribe(data => {
      // console.log(" All pets", data)
      console.log(data, "show data ");
      // this will parse through the data
      this.allReviews = data
      console.log("all the Reviews: ", this.allReviews)
    })
  }

  singleRestaurant(id) {
    let observabele = this._http.getFoodById(id);
    observabele.subscribe(data => {
      console.log(" Show the id to get Restaurant Name", data);
      this.oneRestaurant = data;
    })
  }
}

