import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { AppSettings } from 'src/app/AppSettings';
import { Brand } from 'src/app/Model/Master.Model';
import { BrandServiceService } from 'src/app/Service/brand-service.service';
import { ToastrService } from 'src/app/Service/toastr.service';
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
  errors = [];

  @ViewChild(NgForm, { static: false })
  formElement: NgForm;

  dt$: any[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;




  constructor(private brandServiceService: BrandServiceService, private toastr: ToastrService,) { }

  ngOnInit(): void {
    // this.toastr.Warning('You successfully updated your product.', 'Product Name : ');
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
    }).then((result) => {
      if (result.isConfirmed) {

        this.brandServiceService.deleteData(id).subscribe(data => {
          console.log(data);
          AppSettings.Toast.fire({
            icon: 'success',
            background: '#51A351',
            title: 'Your file has been deleted.'
          })
          this.reDraw();
          this.getDataUI();
        }, err => {
          AppSettings.Toast.fire({
            icon: 'error',
            background: '#bf443d',
            title: 'Something went wrong!'
          })
        });
      }
    })
  }

  updateBrand(brand: Brand) {
    this.brandServiceService.updateData(brand).subscribe(data => {
      console.log(data);
      // this.toastr.success('Data updated successfully.');
      AppSettings.Toast.fire({
        icon: 'success',
        background: '#51A351',
        title: 'Data updated successfully.'
      })

      this.closeModalDialog();
      this.reDraw();
      this.getDataUI();
    }, err => {
      console.log(err);
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
        this.errors.push("Something went wrong in Server!");
      }

    });
  }



  addBrand(brand: Brand) {
    this.brandServiceService.addData(brand)
      .subscribe(
        resp => {
          if (resp != null) {
            this.errors = [];
            this.closeModalDialog();
            AppSettings.Toast.fire({
              icon: 'success',
              background: '#51A351',
              title: 'Data created successfully'
            })
            this.reDraw();
            this.getDataUI();
          } else {
            AppSettings.Toast.fire({
              icon: 'warning',
              background: '#d68511',
              title: 'Something went wrong! Please try again'
            });
          }
        },
        (err: any) => {
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

            AppSettings.Toast.fire({
              icon: 'error',
              background: '#bf443d',
              title: 'Something went wrong in Server!'
            });
          }
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