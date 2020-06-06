import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.loadScript('https://cdn.datatables.net/1.10.20/js/jquery.dataTables.min.js');
    this.loadScript('https://cdn.datatables.net/1.10.20/js/dataTables.bootstrap4.min.js');
    this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.min.js');
    this.loadScript('assets/JS/scripts.js');
    this.loadScript('assets/demo/chart-area-demo.js');
    this.loadScript('assets/demo/chart-bar-demo.js');
    this.loadScript('assets/demo/datatables-demo.js');
  }
  public loadScript(url: string) {
    const body = <HTMLDivElement> document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }
}
