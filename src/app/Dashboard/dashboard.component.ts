import { Component, OnInit } from '@angular/core';
import { LoadScriptService } from '../Service/load-script.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit {

  constructor(private loadScriptService: LoadScriptService) { }

  ngOnInit(): void {    
    this.loadScriptService.loadScript('https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.min.js');
    this.loadScriptService.loadScript('assets/JS/scripts.js');
    this.loadScriptService.loadScript('assets/demo/chart-area-demo.js');
    this.loadScriptService.loadScript('assets/demo/chart-bar-demo.js');
    this.loadScriptService.loadScript('assets/demo/datatables-demo.js');
  }
  
}
