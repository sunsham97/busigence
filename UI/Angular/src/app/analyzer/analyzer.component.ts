import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-analyzer',
  templateUrl: './analyzer.component.html',
  styleUrls: ['./analyzer.component.css']
})
export class AnalyzerComponent implements OnInit {

flag1:boolean=false;
flag2:boolean=false;
filePath:string;

databaseArray= [{
  database:"d1",
  collection:["c1","c2","c3"]
}, 
{
  database:"d2",
  collection:["c4","c5","c6"]
},
{
  database:"d3",
  collection:["c7","c8","c9"]
}

]

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
