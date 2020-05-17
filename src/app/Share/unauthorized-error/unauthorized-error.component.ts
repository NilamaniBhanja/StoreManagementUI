import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-unauthorized-error',
  templateUrl: './unauthorized-error.component.html',
  styles: [
  ]
})
export class UnauthorizedErrorComponent implements OnInit {
  fullImagePath: string;
  constructor() {
    this.fullImagePath = 'assets/Images/401Error.jpg'
   }

  ngOnInit(): void {
  }

}
