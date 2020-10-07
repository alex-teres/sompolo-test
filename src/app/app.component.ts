import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('slideLeft', [
      transition(':enter', [
        style({transform: 'translateX(-100%)'}),
        animate('500ms ease-in', style({transform: 'translateY(0%)'}))
      ])
    ]),
    trigger('slideRight', [
      transition(':enter', [
        style({transform: 'translateX(100%)'}),
        animate('500ms ease-in', style({transform: 'translateY(0%)'}))
      ])
    ])
  ]
})
export class AppComponent {

  constructor(private modalService: NgbModal){}
  fileUrl: string | ArrayBuffer;

  form = new FormGroup({
    picture: new FormControl('', [ Validators.required ] ),
    url: new FormControl('', [ Validators.required, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?') ]),
    animationType: new FormControl('', [ Validators.required] ),
  });

  readUrl(event:any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (event: ProgressEvent) => {
        this.fileUrl = (<FileReader>event.target).result;
      }

      reader.readAsDataURL(event.target.files[0]);
    }
  }

  generateAd(content){
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg' })
  }
}
