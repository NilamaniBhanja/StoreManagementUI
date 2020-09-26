import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { AppSettings } from 'src/app/AppSettings';
import { Brand } from 'src/app/Model/Master.Model';
import { BrandServiceService } from 'src/app/Service/brand-service.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styles: [
  ]
})



export class BrandComponent implements OnInit {

  brand: Brand;
  display = 'none';
  fieldReadonly = true;
  submitText = 'Create';
  modelHeader = '';

  dt$: any[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

 
  

  constructor(private brandServiceService: BrandServiceService) { }

  ngOnInit(): void {
    this.getDataUI();
  }
  getDataUI() {

    this.dtOptions = {
      retrieve: true,
      destroy: true,
      pagingType: 'simple_numbers',
      pageLength: 10,
      processing: true,
      columns: [
        null,
        null,
        null,
        null,
        { "width": "18%", "orderable": false, "searchable": false }
      ]
    };

    this.brandServiceService.getData().subscribe(data => {
      this.dtTrigger.next();
      this.dt$ = data;
    }, err => { console.log(err); });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }
  reDraw(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.clear().draw();
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }

  // Add, Edit and View of Brand
  openModel(id: number, type: string) {
    console.log(this.submitText, id, type);
    if (id == 0 && type == "Add") {
      this.submitText = 'Create';
      this.fieldReadonly = false;
      this.modelHeader = 'Add Brand';
      this.brand = new Brand();
    }
    else if (id > 0 && type == "Edit") {
      this.submitText = 'Update';
      this.fieldReadonly = false;
      this.modelHeader = 'Update Brand';
      this.getDataById(id);
      console.log(this.brand);
    } else if (id > 0 && type == "View") {
      this.submitText = '';
      this.fieldReadonly = true;
      this.modelHeader = 'Details Brand';
      this.getDataById(id);
    }
    this.openModalDialog();
  }

  async getDataById(id: number) {
    await this.brandServiceService.getDatabyId(id)
      .then(resp => { this.brand = resp; },
        (err: any) => console.log(err)
      );
  }

  onSubmit(form: NgForm) {
    if (this.submitText === 'Update') {
      this.updateBrand(this.brand);
    } else {
      this.addBrand(this.brand);
    }
  }
  onDelete(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.brandServiceService.deleteData(id).subscribe(data => {
          console.log(data);
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
          this.reDraw();
          this.getDataUI();
        }, err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!'
          })
        });
      }
    })
  }

  updateBrand(brand: Brand) {
    this.brandServiceService.updateData(brand).subscribe(data => {
      console.log(data);
      this.closeModalDialog();
      this.reDraw();
      this.getDataUI();
    }, err => { console.log(err); });
  }

  addBrand(brand: Brand) {
    this.brandServiceService.addData(brand)
      .subscribe(
        resp => {
          if (resp != null) {
            this.closeModalDialog();
            AppSettings.Toast.fire({
              icon: 'success',
              background:'#28a745',
              title: 'Data successfully created'
            })
            this.reDraw();
            this.getDataUI();
          } else {
            console.log(resp);
          }
        },
        (err: any) => {
          console.log("Error" + err);
        }
      );
  }


  // Model Help
  openModalDialog() {
    this.display = 'block';
  }
  closeModalDialog() {
    this.display = 'none';
  }
}