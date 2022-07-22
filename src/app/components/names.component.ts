import { Component, ElementRef, Input, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { Names, Validate } from '../modules/main.model';
import { MainService } from '../modules/main.service';
import { Notify } from '../modules/notify';

@Component({
  selector: 'names-root',
  templateUrl: './names.component.html',
  styleUrls: ['./names.component.css']
})
export class NamesComponent implements OnInit {
  @Input() sizeDisplay: string;
  public subscriptions: Subscription[] = [];
  public params:Names;
  public msgError:{name:string,firstLastname:string};
  public fullData:boolean=false;
  public passNames:boolean=false;
  public validate:Validate;
    
  constructor(private dom: ElementRef, private notify: Notify, private mainService: MainService) {
    this.params = new Names();
    this.validate = new Validate();
    this.msgError = {name:"",firstLastname:""};
   } 


  ngOnInit(): void {
    this.params.name = "";
    this.params.secondName = "";
    this.params.firstLastName = "";
    this.params.secondLastName = "";
  }

  eventHandler(event,type){
    if(event.keyCode == 13 && type == "secN"){
      setTimeout(() => {
        this.dom.nativeElement.querySelector('#secN').focus();
      },1000);
    }else if(event.keyCode == 13 && type == "lastN"){
      setTimeout(() => {
        this.dom.nativeElement.querySelector('#lastN').focus();
      },200);
    }else if(event.keyCode == 13 && type == "lastNS"){
      setTimeout(() => {
        this.dom.nativeElement.querySelector('#lastNS').focus();
      },200);
    }else{
      if(this.params.name != '' && this.params.firstLastName != ''){
        this.fullData = true;
      }
    }
  }

  sendNames(){
    if(this.params.name == ""){
      this.msgError.name = "El campo de nombre es obligatorio";
    }else if(this.params.firstLastName == ""){
      this.msgError.firstLastname = "El campo del primer apellido es obligatorio";
    }else{
      const subscribe = this.mainService.sendNames(this.params).subscribe(
        res => {
          if(res.name == this.params.name){
            const subscribe = this.mainService.getProfile().subscribe(
              res => {
                if(res.name == this.params.name){
                  this.validate = res;
                  this.passNames = true;
                }
              }, error => {
                this.notify.setNotification("Error",error.code,"error");
          });
          this.subscriptions.push(subscribe);
          }
        }, error => {
          this.notify.setNotification("Error",error.code,"error");
    });
    this.subscriptions.push(subscribe);
    }
  }

}
