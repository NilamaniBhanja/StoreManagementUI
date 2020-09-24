import { Component, OnInit } from '@angular/core';
import { LoadScriptService } from 'src/app/Service/load-script.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styles: [
  ]
})
export class BrandComponent implements OnInit {

  constructor(private loadScriptService: LoadScriptService) { }

  ngOnInit(): void {
    this.loadScriptService.loadScript('https://cdn.datatables.net/1.10.20/js/jquery.dataTables.min.js');
    this.loadScriptService.loadScript('https://cdn.datatables.net/1.10.20/js/dataTables.bootstrap4.min.js');    
    this.loadScriptService.loadScript('assets/demo/datatables-demo.js');
  }
  
}
