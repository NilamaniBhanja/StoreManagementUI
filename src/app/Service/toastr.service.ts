import { Injectable } from '@angular/core';
declare var toastr:any;

@Injectable({
  providedIn: 'root'
})
export class ToastrService {

  constructor() { }
  Success(message:string, title?:string){
    toastr.success(message, title);
  }
  Warning(message:string, title?:string){
    toastr.warning(message, title);
  }
  Error(message:string, title?:string){
    toastr.error(message, title);
  }
  Info(message:string){
    toastr.info(message);
  }
}
