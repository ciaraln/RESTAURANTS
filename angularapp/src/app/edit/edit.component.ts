import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  allFoods: any;
  editFood: any;
  id: any;

  constructor(
    private _http: HttpService,
    private _route: ActivatedRoute,
    private _appcomponent: AppComponent,
    private _router: Router) { }

  ngOnInit() {
    this._route.params.subscribe(params => {
      console.log(params['id'])
      this.id = params['id'];   /* stored the id*/
      this.singleFood(this.id)
    })
  }

  sendallFoods() {
    let observable = this._http.getFoods();
    observable.subscribe(data => {
      console.log(" All Foods in Edit", data)
      // console.log(data);
      // this will parse through the data
      this.allFoods = data
    })
  }

  updateSubmit() {
    console.log('updated by submit button')
    let observable = this._http.updateById(this.editFood._id, this.editFood)
    observable.subscribe(foods => {
      console.log(this.editFood)
      this.sendallFoods();
      this.goHome();
    });
  }

  /* in charge of getting one,*/
  singleFood(id) {
    let observable = this._http.getFoodById(id);
    observable.subscribe(foods => {
      console.log("Showing One Food/Restaurant.", foods)
      this.editFood = foods;
    })
  }

  goHome() {
    this._router.navigate(['/home/']);
  }
}
