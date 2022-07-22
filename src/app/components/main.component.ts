import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { Notify } from '../modules/notify';
import { RegisterComponent } from './register.component';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';


@Component({
  selector: 'main-root',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  @ViewChild(RegisterComponent) register;
  public sizeDisplay: string = 'phone' || 'web';
  modalRef: BsModalRef;  
  constructor(public breakpointObserver: BreakpointObserver) { } 

  public validate:{cellV:boolean,mailV:boolean,passV:boolean,watch:boolean};
  public phone: string = "";
  public msgError:string="";

  ngOnInit(): void {
    this.validate = {cellV:false,mailV:false,passV:false,watch:false};
    this.breakpointObserver
    .observe(Breakpoints.Small)
    .subscribe((state: BreakpointState) => {
      if (state.matches) {
      //AQUI SERA TRUE SOLO SI ESTA EN RESOLUCION DE CELULAR
        this.sizeDisplay = 'phone';
      }
    });
    this.breakpointObserver
    .observe(Breakpoints.Web)
    .subscribe((state: BreakpointState) => {
      if (state.matches) {
        //AQUI SERA TRUE SOLO SI ES RESOLUCION PARA WEB
        this.sizeDisplay = 'web';
        }
      });
      console.log(this.sizeDisplay);
      
    }
}
