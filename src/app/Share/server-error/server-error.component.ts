import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-server-error',
  templateUrl: './server-error.component.html',
  styles: [
  ]
})
export class ServerErrorComponent implements OnInit {
  fullImagePath: string;
  constructor() { 
    this.fullImagePath = 'assets/Images/500Error.jpg'
  }

  ngOnInit(): void {
  }

}
