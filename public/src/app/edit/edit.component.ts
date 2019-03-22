import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  ed:any={name:null,id:null};
  err:any;
  errmess:string;
  validations:any;

  constructor(
    private _editauthor: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
    ){};

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      console.log(params['id']);
      this._editauthor.getOneTask(params['id'])
      .subscribe(data=>{
        console.log('get one :',data);
        let dataall=data;
        console.log('get dataall :',data);
        if(data['name']=='CastError'){
          this.errmess=data['message'];
          this.err=1;
        }else{
          this.ed.name=dataall[0].name;
          this.ed.id=params['id'];
          this.err=0;
        }
      });
    });  
  }

  editauthor(id:any){
    this._editauthor.updateOneTask(id,this.ed)
      .subscribe(data=>{
        console.log('edit author:', data)
        if(data['errors']){
          this.validations=data;
        }
        else{
          this._router.navigate(['/']);       
        }
      });
  }

  }
