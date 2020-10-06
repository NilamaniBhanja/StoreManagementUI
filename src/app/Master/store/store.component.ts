import { ToasterService } from 'src/app/Service/toaster.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styles: [
  ]
})
export class StoreComponent implements OnInit {
 

  constructor() { }

  ngOnInit(): void {

  }
 
}