import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'calculator';
  input:string='0';
  result:number=0;
  temporary:any[]=[];
  operators:string[]=["x","/","X","-","+"];
  operator:string='';
  opClicked:boolean=false;
  desClicked:boolean=false;

  onInput(num:string){
    this.input=this.input.concat(num);
  }
  
  onInputDes(num:string){
    if(this.desClicked){
      return;
    }
    this.desClicked=true;
    this.onInput(num);
  }

  onInputOp(op:string){
    this.desClicked=false;

    if(this.operators.some(x => x == this.input.charAt(this.input.length-1))){
      this.input=this.input.substring(0,this.input.length-1);
      this.opClicked=false;
    }

    if(this.opClicked){
      this.onResult();
      this.operator=op;     
    }

    if(!this.opClicked){
      this.input=this.input.concat(op);
      this.operator=op;
      this.opClicked=true;
    }
  }

  onResult(){
    this.opClicked=false;   
    this.temporary=this.input.split(this.operator);

    if(this.temporary[0]===''){
      this.temporary.splice(0,1);
      this.temporary[0]=this.temporary[0]* -1;
    }

    switch (this.operator) {
      case "x":
        this.result=+this.temporary[0] * +this.temporary[1];
           break;
      case "/":
        this.result=+this.temporary[0] / +this.temporary[1];
          break;
      case "X":
        this.result=+this.temporary[0] * +this.temporary[1];
          break;
      case "-":
        this.result=+this.temporary[0] - +this.temporary[1];
          break;
      case  "+":
        this.result=+this.temporary[0] + +this.temporary[1];
          break;
      default:
        this.result=+this.temporary[0];
        break;    
      } 
      this.result=Math.round(this.result*100000000)/100000000;
      this.input=this.result.toString();

      if(!this.input.includes('.')){
        this.desClicked=false;
      }
  }

  onClear(){
    this.input='0';
    this.result=0;
    this.temporary=[];
    this.operator='';
    this.opClicked=false;
    this.desClicked=false; 
  }

  onChangeSign(){
    this.onResult()
    this.result=this.result * -1;
    this.input=this.result.toString();
  }
  deleteLastDigit(){
    this.input=this.input.substring(0,this.input.length-1);
  }
}
