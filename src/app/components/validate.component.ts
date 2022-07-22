import { Component, ElementRef, Input, OnInit} from '@angular/core';
import { Validate } from '../modules/main.model';
import { MainService } from '../modules/main.service';
import { Notify } from '../modules/notify';

@Component({
  selector: 'validate-root',
  templateUrl: './validate.component.html',
  styleUrls: ['./validate.component.css']
})
export class ValidateComponent implements OnInit {
  @Input() validate: Validate;
  @Input() sizeDisplay: string;
    
  constructor(private dom: ElementRef, private notify: Notify, private mainService: MainService) {
  
   } 

  ngOnInit(): void {
   
  }

 
}
