import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found-error',
  templateUrl: './not-found-error.component.html',
  styles: [
  ]
})
export class NotFoundErrorComponent implements OnInit {
  fullImagePath: string;
  constructor() { 
    this.fullImagePath = 'assets/Images/404Error.jpg'
  }

  ngOnInit(): void {
  }

}
