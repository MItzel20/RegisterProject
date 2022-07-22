import { HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { MainService } from '../modules/main.service';
import { Notify } from '../modules/notify';

@Component({
  selector: 'register-root',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Input() sizeDisplay: string;
  public subscriptions: Subscription[] = [];
  public data:{email:string,password:string};
  public passC:string;
  public paramsPass:{p1:boolean,p2:boolean,p3:boolean,p4:boolean,p5:boolean,p6:boolean};
  public msgError:{email:string,passwd:string};
  public mailV:boolean;
  public passV:boolean;
  public passV1:boolean;
  public watch:boolean = false;
  public watchC:boolean = false;
    
  constructor(private dom: ElementRef, private notify: Notify, private mainService: MainService) {
    this.msgError = {email:"",passwd:""};
    this.data = {email:"",password:""};
    this.passC = "";
    this.paramsPass = {p1:false,p2:false,p3:false,p4:false,p5:false,p6:false};
    this.mailV = false;
    this.passV = false;
    this.passV1 = false;
   } 


  ngOnInit(): void {
    
  }

  eventHandler(event,type){
    if(event.keyCode == 13 && type == "mail"){
      var reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      var regOficial = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      if(reg.test(this.data.email) && regOficial.test(this.data.email)){
        this.mailV = true;
        this.msgError.email = "";
        setTimeout(() => {
          this.dom.nativeElement.querySelector('#pass').focus();
        },200);
      }else{
        this.msgError.email = "El formato del correo es inválido...";
      }
    }else if(event.keyCode == 13 && type == "pass"){
      this.validatePass();
      if(!this.paramsPass.p1 || !this.paramsPass.p2 || !this.paramsPass.p3 || !this.paramsPass.p4 || !this.paramsPass.p5 || !this.paramsPass.p6){
        this.msgError.passwd = "El formato del password es incorrecto...";
      }else{
        this.msgError.passwd = "";
        setTimeout(() => {
          this.dom.nativeElement.querySelector('#passC').focus();
        }, 200);
      }
    }else if(event.keyCode == 13 && type == "passC"){
      if(this.data.password == this.passC){
        this.passV1 = true;
        this.msgError.passwd = "";
        setTimeout(() => {
          this.dom.nativeElement.querySelector('#next').focus();
        }, 200);
      }else{
        this.msgError.passwd = "Las constraseñas no coinciden...";
      }
    }else{
     this.validatePass();
    }
  }

  validatePass(){
    this.paramsPass.p1= this.data.password.length >= 6 ? true:false;
    this.paramsPass.p2= /[0-9]/.test(this.data.password) ? true:false;
    this.paramsPass.p3= /(([@$?¡_!”#$%&/()=?¿^*,[\]\(\):_>,.\-|`\+]){1})/.test(this.data.password) ? true:false;
    this.paramsPass.p4= !this.data.password.includes("100Ladrillos") ? true:false;
    this.paramsPass.p5= !/([a-z]|[A-Z])\1{2}/g.test(this.data.password) ? true:false;
    this.paramsPass.p6= !/([0-9])\1{2}/g.test(this.data.password) ? true:false;
  }

  hideOrShowPassword(type){
    if(type == "watch"){
      const input = document.getElementById('pass') as HTMLInputElement | null;
      if(!this.watch){
        input.type = "text";
        this.watch = true;
      }else{
        input.type = "password";
        this.watch = false;
      }
    }else if(type == "watchC"){
      const input = document.getElementById('passC') as HTMLInputElement | null;
      if(!this.watchC){
        input.type = "text";
        this.watchC = true;
      }else{
        input.type = "password";
        this.watchC = false;
      }
    }
  }

  registerMail(){
    const subscribe = this.mainService.registerMail(this.data).subscribe(
        res => {
          this.passV =  true;
          localStorage.setItem("token",res.token);
        }, error => {
        if(error.code.includes("EMAIL")){
          this.msgError.email = error.code;
        }else if(error.code.includes("PASSWORD")){
          this.msgError.passwd = error.code;
        }else{
          this.notify.setNotification("Error",error.code,"error");
        }
    });
    this.subscriptions.push(subscribe);
  }

}
