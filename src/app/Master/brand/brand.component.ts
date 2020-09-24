import { Component, OnInit, ViewChild } from '@angular/core';
import { BrandServiceService } from 'src/app/Service/brand-service.service';
import { LoadScriptService } from 'src/app/Service/load-script.service';
declare var $;

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styles: [
  ]
})
export class BrandComponent implements OnInit {
  dataTable: any;
  dtOptions: any;
  tableData = [];
  @ViewChild('dataTable', { static: true }) table;

  constructor(private brandServiceService: BrandServiceService, private loadScriptService: LoadScriptService) { }

  ngOnInit(): void {
    // this.loadScriptService.loadScript('https://cdn.datatables.net/1.10.20/js/jquery.dataTables.min.js');
    // this.loadScriptService.loadScript('https://cdn.datatables.net/1.10.20/js/dataTables.bootstrap4.min.js');
    this.getDataFromSource();
  }
  getDataFromSource() {
    this.brandServiceService.getBrand().subscribe(data => {
      this.tableData = data;
      console.log(this.tableData);
      this.dtOptions = {
        data: this.tableData,
        columns: [
          { title: 'ID', data: 'id' },
          { title: 'Name', data: 'name' },
          { title: 'Description', data: 'description' },
          { title: 'BrandQuality', data: 'brandQuality' }
        ]
      };
    }, err => { }, () => {
      this.dataTable = $(this.table.nativeElement);
      this.dataTable.DataTable(this.dtOptions);
    });
  }
}
