import { Component, ElementRef, Injectable, Input, OnInit, TemplateRef} from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { MainService } from '../modules/main.service';
import { Notify } from '../modules/notify';

@Component({
  selector: 'phone-root',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.css']
})
@Injectable()
export class PhoneComponent implements OnInit {
  @Input() sizeDisplay: string;
  modalRef: BsModalRef;  
  public subscriptions: Subscription[] = [];
  public msgError:string;
  public msgErrorCode:string;
  public phone:string;
  public token:string = "";
  public validate:{watch:boolean,watchC:boolean,phone:boolean};
  public code:{c1:string,c2:string,c3:string,c4:string};
  public passP:boolean=false;
  public codeC:string="";
    
  constructor(private dom: ElementRef,private modalService: BsModalService, private notify: Notify, private mainService: MainService) { } 


  ngOnInit(): void {
    this.msgError = "";
    this.msgErrorCode = "";
    this.phone = "";
    this.validate = {watch:false,watchC:false,phone:false};
    this.code = {c1:"",c2:"",c3:"",c4:""};
  }

  validatePhone(){
    if(/\d{10}$/.test(this.phone)){
      this.msgError = "";
      this.validate.phone = true;
      setTimeout(() => {
        this.dom.nativeElement.querySelector('#next').focus();
      },200);
    }else{
      this.msgError = "El formato del telefóno celular es incorrecto...";
    }
  }

  eventHandler(event,type){
    if(event.keyCode == 13 && type == "phone"){
      this.validatePhone();
    }
  }

  hideOrShowPassword(){
    const input = document.getElementById('phone') as HTMLInputElement | null;
    if(!this.validate.watch){
      input.type = "text";
      this.validate.watch = true;
    }else{
      input.type = "password";
      this.validate.watch = false;
    }
  }

  openModalWithClass(template: TemplateRef<any>) {  
    this.modalRef = this.modalService.show( 
      template,  
      Object.assign({}, { class: 'gray modal-lg' }) 
    );  
  }  

  closeModal(){
    this.modalService.hide();
  }

  sendPhone(template: TemplateRef<any>){
    const subscribe = this.mainService.sendPhone(this.phone).subscribe(
      res => {
        if(res.phone.number == this.phone){
          this.openModalWithClass(template);
        }
      }, error => {
        this.notify.setNotification("Error",error.code,"error");
    });
    this.subscriptions.push(subscribe);
  }

  validateCode(){
    this.codeC = this.code.c1 +this.code.c2 + this.code.c3 + this.code.c4;
    const subscribe = this.mainService.validateCode(this.codeC).subscribe(
      res => {
        if(res.phone.verified == true){
          this.passP =  true;
          this.modalService.hide();
        }
      }, error => {
        this.codeC = "";
        this.code = {c1:"",c2:"",c3:"",c4:""};
        if(error.code == "TRADER_HAS_NOT_PHONE_NUMBER_YET"){
          this.msgErrorCode = error.code;
        }else if(error.code == "INVALID_TOKEN"){
          this.msgErrorCode = error.code;
        }else{
          this.notify.setNotification("Error",error.code,"error");
        }
    });
    this.subscriptions.push(subscribe);
  }

}
