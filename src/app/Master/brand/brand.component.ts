import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { Brand } from 'src/app/Model/Master.Model';
import { BrandServiceService } from 'src/app/Service/brand-service.service';

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

  constructor(private brandServiceService: BrandServiceService) { }

  ngOnInit(): void {
    this.getDataUI();
  }
  getDataUI() {
    this.dtOptions = {
      destroy: true,
      retrieve: true,
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
      this.dt$ = data;
      this.dtTrigger.next();
    }, err => { console.log(err); });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
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

  updateBrand(brand: Brand) {
    this.brandServiceService.updateData(brand).subscribe(data => {
      console.log(data);
      this.closeModalDialog();
      this.getDataUI();
    }, err => { console.log(err); });
  }

  addBrand(brand: Brand) {
    this.brandServiceService.addData(brand)
      .subscribe(
        resp => {
          if (resp != null) {
            console.log("successfully created");
            this.closeModalDialog();
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