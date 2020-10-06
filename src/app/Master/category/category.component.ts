import { ToasterService } from 'src/app/Service/toaster.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';

import { Category } from 'src/app/Model/Master.Model';
import { CategoryService } from 'src/app/Service/category.service';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styles: [
  ]
})
export class CategoryComponent implements OnInit {
  category: Category;


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

  constructor(private categoryService: CategoryService, private toaster: ToasterService) { }

  ngOnInit(): void {
    this.getDataUI();
    this.dtOptions = {
      destroy: true,
      retrieve: true,
      pagingType: 'simple_numbers',
      pageLength: 10,
      processing: true,
      columns: [
        null, null, null,
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
    this.categoryService.getData().then((result: any) => {
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
  // Add, Edit and View of Category
  openModel(id: number, type: string) {
    this.formElement.reset();
    this.errors = [];
    if (id == 0 && type == "Add") {
      this.submitText = 'Create';
      this.fieldReadonly = false;
      this.modelHeader = 'Add Category';
      this.category = new Category();
      this.openModalDialog();
    }
    else if (id > 0 && type == "Edit") {
      this.submitText = 'Update';
      this.fieldReadonly = false;
      this.modelHeader = 'Update Category';
      this.getDataById(id);
    }
    else if (id > 0 && type == "View") {
      this.submitText = '';
      this.fieldReadonly = true;
      this.modelHeader = 'Detail Category';
      this.getDataById(id);
    }
  }

  async getDataById(id: number) {
    await this.categoryService.getDatabyId(id)
      .then((result: any) => {
        if (result.success) {
          this.category = result.data;
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
      this.updateCategory(this.category);
    } else {
      this.addCategory(this.category);
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
        this.categoryService.deleteData(id).subscribe((result: any) => {
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

  updateCategory(category: Category) {
    this.categoryService.updateData(category).subscribe((result: any) => {
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

  addCategory(category: Category) {
    this.categoryService.addData(category)
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
        var fieldName = serverfieldName.split('.')[serverfieldName.split('.').length - 1];
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