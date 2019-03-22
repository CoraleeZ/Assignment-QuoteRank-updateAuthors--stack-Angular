import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.css']
})
export class QuoteComponent implements OnInit {
  quotes:any=[];
  authors:any={};

  constructor(
    private _showqoute: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
    ){};

    ngOnInit() {
      this.quotes=[];
      
      this._route.params.subscribe((params: Params) => {
        console.log(params['id']);

        this._showqoute.getOneTask(params['id'])
        .subscribe(data=>{

          this.authors=data[0];
          console.log('get an author----:',this.authors);

          let getallquote:any=this.authors['quo'];
          console.log('getallquote is:',getallquote)

          //sort alphabetically
          let temp={};
          let forsort=[];
    
          for(let x=0;x<getallquote.length;x++){
            temp[getallquote[x].quote]=getallquote[x];
          };
          console.log('temp is:',temp)

          for(let key in temp){
            forsort.push(key);
          }

          forsort.sort();
          console.log('forsort is:',forsort)

          for(let y=0;y<forsort.length;y++){
            let key=forsort[y];
            let val=temp[key];
            this.quotes.push(val);
          };
          console.log('quote is:',this.quotes)
          //
        });  
      });
    }

    voteup(id:any){
      for(let x=0;x<this.authors['quo'].length;x++){
        if (this.authors['quo'][x]['_id']==id){
          var newquote={vote:parseInt(this.authors.quo[x].vote)+1}
        };
        console.log('newquote is:',newquote)
      };
      this._showqoute.updateQuote(this.authors['_id'],id,newquote)
      .subscribe(data=>{
        console.log('updata a voteup',data)
        this.ngOnInit();
      });
    };

    votedown(id:any){
      for(let x=0;x<this.authors['quo'].length;x++){
        if (this.authors['quo'][x]['_id']==id){
          var newquote={vote:parseInt(this.authors.quo[x].vote)-1}
        };
        console.log('newquote is:',newquote)
      };
      this._showqoute.updateQuote(this.authors['_id'],id,newquote)
      .subscribe(data=>{
        console.log('updata a votedown',data)
        this.ngOnInit();
      });
    };

    deletequote(id:any){
      this._showqoute.deleteQuote(this.authors['_id'],id)
      .subscribe(data=>{
        console.log('delete one quote:',data);
        this.ngOnInit();
      });
    }

}
