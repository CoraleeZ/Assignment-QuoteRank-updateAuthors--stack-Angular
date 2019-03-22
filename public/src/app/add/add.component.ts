import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  aut={name:null};
  validations:any;

  constructor(
    private _addauthor: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
    ){};

  ngOnInit() {
  }

  addauthor(){
    this._addauthor.createOneTask(this.aut)
      .subscribe(data=>{
        console.log('add an author:', data)
      if(data['errors']){
        this.validations=data;
      }
      else{
          this._router.navigate(['/']);
      }
    });
  }

}
