import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-format',
  templateUrl: './format.component.html',
  styleUrls: ['./format.component.css']
})
export class FormatComponent implements OnInit {

  flag1:boolean=false;
  flag2:boolean=false;
  filePath:string;
  
  tabBoolean2:boolean=false;
  
  
    constructor() { }
  
    ngOnInit() {
    
    }
  
   click1(){
     console.log(this.flag1)
   }
   click2(){
    console.log(this.flag2)
  }
  
  handleUpload(e){
    this.filePath=e.target.value
    console.log(this.filePath)
  }
  
  submit(){
    this.tabBoolean2=true;
  }
  
}
