import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-addquotes',
  templateUrl: './addquotes.component.html',
  styleUrls: ['./addquotes.component.css']
})
export class AddquotesComponent implements OnInit {
  aut:any={};
  quo={quote:null};
  validations:any;

  constructor(
    private _addquote: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
    ){};

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      console.log(params['id']);
      this._addquote.getOneTask(params['id'])
      .subscribe(data=>{
        this.aut=data[0];
        console.log('get one :', this.aut)
      });
    });
  }
  
  addquote(){
    this._addquote.createQuote(this.aut._id,this.quo)
    .subscribe(data=>{
      console.log("**********",data);
      if(data['errors']){
        
        this.validations=data;
      }
      else{
        this._router.navigate(['/quotes/'+this.aut['_id']]);
      }
    });     
  }


}
