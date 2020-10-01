import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';

import { Measurement } from 'src/app/Model/Master.Model';
import { MeasurementService } from 'src/app/Service/measurement.service';
import { ToastrService } from 'src/app/Service/toastr.service';

@Component({
  selector: 'app-measurement',
  templateUrl: './measurement.component.html',
  styles: [
  ]
})
export class MeasurementComponent implements OnInit {
  measurement: Measurement;
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

  constructor(private measurementService: MeasurementService, private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.dtOptions={};

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
        { "width": "18%", "orderable": false, "searchable": false }
      ]
    };

    this.measurementService.getData().subscribe(data => {
      this.dtTrigger.next();
      this.dt$ = data;
      console.log(data);
    }, err => { this.toastr.Error(); });
  }

  reDraw(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.clear().draw();
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }

  // Add, Edit and View of Measurement
  openModel(id: number, type: string) {
    this.formElement.reset();
    this.errors = [];
    if (id == 0 && type == "Add") {
      this.submitText = 'Create';
      this.fieldReadonly = false;
      this.modelHeader = 'Add Measurement';
      this.measurement = new Measurement();
    }
    else if (id > 0 && type == "Edit") {
      this.submitText = 'Update';
      this.fieldReadonly = false;
      this.modelHeader = 'Update Measurement';
      this.getDataById(id);
    } else if (id > 0 && type == "View") {
      this.submitText = '';
      this.fieldReadonly = true;
      this.modelHeader = 'Detail Measurement';
      this.getDataById(id);
    }
    this.openModalDialog();
  }

  async getDataById(id: number) {
    await this.measurementService.getDatabyId(id)
      .then(resp => { this.measurement = resp; },
        (err: any) => {
          this.toastr.ServerError();
        }
      );
  }

  onSubmit() {
    if (this.submitText === 'Update') {
      this.updateMeasurement(this.measurement);
    } else {
      this.addMeasurement(this.measurement);
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
        this.measurementService.deleteData(id).subscribe(data => {
          this.toastr.Detele();
          this.reDraw();
          this.getDataUI();
        }, err => {
          this.toastr.Error();
        });
      }
    })
  }

  updateMeasurement(measurement: Measurement) {
    this.measurementService.updateData(measurement).subscribe(data => {
      this.toastr.Update();
      this.closeModalDialog();
      this.reDraw();
      this.getDataUI();
    }, err => {
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
        this.toastr.Error();
      }
    });
  }

  addMeasurement(measurement: Measurement) {
    this.measurementService.addData(measurement)
      .subscribe(
        resp => {
          if (resp != null) {
            this.errors = [];
            this.closeModalDialog();
            this.toastr.Add();
            this.reDraw();
            this.getDataUI();
          } else {
            this.toastr.Warning('Something went wrong! Please try again');
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
            this.toastr.Error();
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