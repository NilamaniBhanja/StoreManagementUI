import { SupplierService } from 'src/app/Service/supplier.service';
import { Supplier } from './../../Model/Master.Model';
import { ToasterService } from 'src/app/Service/toaster.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styles: [
  ]
})
export class SupplierComponent implements OnInit {
  supplier: Supplier;
  

  display = 'none';
  fieldReadonly = true;
  submitText = 'Create';
  modelHeader = '';
  errors = [];

  @ViewChild(NgForm, { static: false })
  formElement: NgForm;

  data: any[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  constructor(private supplierService: SupplierService, private toaster: ToasterService) { }

  ngOnInit(): void {
    this.getDataUI();
    this.dtOptions = {
      destroy: true,
      retrieve: true,      
      pagingType: 'simple_numbers',
      pageLength: 10,
      processing: true,
      columns: [
        null, null,
        null, null,
        null, null,
        null, null,
        { "width": "18%", "orderable": false, "searchable": false }
      ]
    };

  }
  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  getDataUI() {
    this.data = [];
    this.supplierService.getData().then((result: any) => {
      if (result.success) {
        this.render();
        this.data = result.data;
      } else {
        this.toaster.Error(result.message);
      }
    }, err => { this.toaster.Error(); }
    );  
  }

  reDraw(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {      
      dtInstance.clear().draw();
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }
  render(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {   
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }
  // Add, Edit and View of Supplier
  openModel(id: number, type: string) {
    this.formElement.reset();
    this.errors = [];
    if (id == 0 && type == "Add") {
      this.submitText = 'Create';
      this.fieldReadonly = false;
      this.modelHeader = 'Add Supplier';
      this.supplier ={};
      this.supplier.address = {};
      this.supplier.address.country = "India";
      this.openModalDialog();
    }
    else if (id > 0 && type == "Edit") {
      this.submitText = 'Update';
      this.fieldReadonly = false;
      this.modelHeader = 'Update Supplier';
      this.getDataById(id);
    }
    else if (id > 0 && type == "View") {
      this.submitText = '';
      this.fieldReadonly = true;
      this.modelHeader = 'Detail Supplier';
      this.getDataById(id);
    }    
  }

  async getDataById(id: number) {
    await this.supplierService.getDatabyId(id)
      .then((result: any) => {
        if (result.success) {
          this.supplier = result.data;
          this.openModalDialog();
        } else {
          this.toaster.Error(result.message);
        }
      },
        (err: any) => {
          this.toaster.ServerError();
        }
      );
  }

  onSubmit() {
    if (this.submitText === 'Update') {
      this.updateSupplier(this.supplier);
    } else {
      this.addSupplier(this.supplier);
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
        this.supplierService.deleteData(id).subscribe((result: any) => {
          if (result.success) {
            this.toaster.Detele();
            this.render();
            this.getDataUI();
          } else {
            this.toaster.Error(result.message);
          }
        }, err => {
          this.toaster.Error();
        });
      }
    })
  }

  updateSupplier(supplier: Supplier) {
    this.supplierService.updateData(supplier).subscribe((result: any) => {
      if (result.success) {
        this.toaster.Update();
        this.closeModalDialog();
        this.reDraw();
        this.getDataUI();
      } else {
        this.toaster.Error();
      }
    }, err => {
      this.fieldError(err);
    });
  }

  addSupplier(supplier: Supplier) {
    this.supplierService.addData(supplier)
      .subscribe(
        resp => {
          if (resp != null) {
            this.errors = [];
            this.closeModalDialog();
            this.toaster.Add();
            this.reDraw();
        this.getDataUI();
          } else {
            this.toaster.Warning('Something went wrong! Please try again');
          }
        },
        (err: any) => {
          this.fieldError(err);
        }
      );
  }

  fieldError(err: any) {
    this.errors = [];
    if (err.status == 400) {
      let validationErrorDictionary = err.error;
      for (var serverfieldName in validationErrorDictionary) {
          var fieldName = serverfieldName.split('.')[serverfieldName.split('.').length -1];
          if (this.formElement.controls[fieldName]) {
            this.formElement.controls[fieldName].setErrors({ errorMessage: validationErrorDictionary[serverfieldName], incorrect: true });
            this.formElement.controls[fieldName].markAsTouched();
            this.formElement.controls[fieldName].markAsDirty();
          } else {
            this.errors.push(validationErrorDictionary[fieldName]);
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