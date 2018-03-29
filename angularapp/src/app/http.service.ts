import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HttpService {

  constructor(private _http: HttpClient) {
    this.getFoods();
    // console.log("I'm the constructor");
  }

  getFoods() {
    return this._http.get('/foods')
  }

  getFoodById(id) {
    let observable = this._http.get('/foods/' + id);
    observable.subscribe(data => console.log('Pull one Restaurant', data));
    return this._http.get('/foods/' + id)
  }

  sendallFoods() {
    let observable = this.getFoods();
    observable.subscribe(data => console.log("All Foods!", data));
  }

  addFood(newFood) {
    // posting data to our route.
    return this._http.post('/foods', newFood)
  }

  addReview(id, newReview) {
    // posting data to our route.
    console.log("add review in service")
    return this._http.post('/foods/write/'+ id, newReview)
  }

  getReviews() {
    return this._http.get('/foods/reviews')
  }

  updateById(id, editFood) {
    return this._http.post('/foods/edit/' + id, editFood)
  }

  deleteById(id) {
    // console.log(" Service delete by id. " + id)
    return this._http.delete("/foods/" + id)
  }
}
