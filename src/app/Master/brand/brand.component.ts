import { ToasterService } from 'src/app/Service/toaster.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';

import { Brand } from 'src/app/Model/Master.Model';
import { BrandService } from 'src/app/Service/brand.service';

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
  errors = [];

  @ViewChild(NgForm, { static: false })
  formElement: NgForm;

  dt$: any[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  constructor(private brandService: BrandService, private toaster: ToasterService,) { }

  ngOnInit(): void {
    this.getDataUI();
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  ngAfterViewInit(): void {
    this.dtTrigger.next();
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

    this.brandService.getData().subscribe((result :any) => {
      if(result.success)
      {        
        this.dt$ = result.data;
        this.dtTrigger.next();
      }else{
        this.toaster.Error();
      }      
    }, err => { this.toaster.Error(); });
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
    this.formElement.reset();
    this.errors = [];
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
    } else if (id > 0 && type == "View") {
      this.submitText = '';
      this.fieldReadonly = true;
      this.modelHeader = 'Detail Brand';
      this.getDataById(id);
    }
    this.openModalDialog();
  }

  async getDataById(id: number) {
    await this.brandService.getDatabyId(id)
      .then((result : any) => { 
      if(result.success)
      {
        this.brand = result.data;
      }else{
        this.toaster.Error();
      }
      },
        (err: any) => {
          this.toaster.Error();
        }
      );
  }

  onSubmit() {
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
    }).then((result : any) => {
      if (result.isConfirmed) {
        this.brandService.deleteData(id).subscribe((result : any) => {
          if(result.success)
          {
            this.toaster.Detele();
            this.reDraw();
            this.getDataUI();
          }else{
            this.toaster.Error(result.message);
          }          
        }, err => {
          this.toaster.Error();
        });
      }
    })
  }

  updateBrand(brand: Brand) {
    this.brandService.updateData(brand).subscribe((result : any) => {
      if(result.success)
          {
            this.toaster.Update();
            this.closeModalDialog();
            this.reDraw();
            this.getDataUI();
          }else{
            this.toaster.Error();
          }  
    }, (err : any) => {
      this.fieldError(err);
    });
  }

  addBrand(brand: Brand) {
    this.brandService.addData(brand)
      .subscribe(
        (result :any) => {
          if(result.success)
          {
            this.errors = [];
            this.closeModalDialog();
            this.toaster.Add();
            this.reDraw();
            this.getDataUI();
          }else{
            this.toaster.Warning('Something went wrong! Please try again');
          }  
        },
        (err: any) => {
          this.fieldError(err);
        }
      );
  }

  fieldError(err : any)
  {
    this.errors = [];
      if (err.status == 400) {
        let validationErrorDictionary = err.error;
        for (var fieldName in validationErrorDictionary) {
          if (validationErrorDictionary.hasOwnProperty(fieldName)) {
            if (this.formElement.controls[fieldName]) {
              this.formElement.controls[fieldName].setErrors({ errorMessage: validationErrorDictionary[fieldName], incorrect: true });
              this.formElement.controls[fieldName].markAsTouched();
              this.formElement.controls[fieldName].markAsDirty();
            } else {
              this.errors.push(validationErrorDictionary[fieldName]);
            }
          }
        }
      } else {
        this.toaster.Error();
      }
  }
  // Model Help
  openModalDialog() {
    this.display = 'block';
  }
  closeModalDialog() {
    this.display = 'none';
  }
}