import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
  authors:any=[];
  //////use for date munipulation
  d:any;
  date:any;
  d2:any;
  date2:any;
  fa:boolean;
  /////

  constructor(
    private _display: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
    ){};

  ngOnInit() {
    this.authors=[];
    this._display.getAllTask()
    .subscribe(data=>{
      console.log('get all:',data);

      //----//munipulate date(format,compare which one is later)
      this.d=data[0]['createdAt']
      // this.date=new Date(this.d).toDateString()
      let r:any=new Date(this.d)
      this.date=Date.parse(r)
      this.d2=data[2]['createdAt']
      // this.date2=new Date(this.d2).toDateString()
      let y:any=new Date(this.d2)
      this.date2=Date.parse(y)
      if(this.date2>this.date){
        this.fa=true
      }
      //----//

      let getallauthors:any=data;
      //sort alphabetically
      let temp={name:{}};
      let forsort=[];

      for(let x=0;x<getallauthors.length;x++){
        temp[getallauthors[x].name]=getallauthors[x];
        forsort.push(getallauthors[x].name);
      };

      forsort.sort();

      for(let y=0;y<forsort.length;y++){
        let key=forsort[y];
        let val=temp[key];
        this.authors.push(val);
      };
      //
    });
    /////////////////////////
 
  //////////////////////////
  }

  deleteauthor(id:any){
    this._display.deleteOneTask(id)
    .subscribe(data=>{
      console.log('delete one:',data);
      this.ngOnInit();
    });
  }

}
