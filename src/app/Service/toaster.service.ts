import { Injectable } from '@angular/core';
import { AppSettings } from '../AppSettings';
//declare var toastr:any;

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  titlemessage:string;
  constructor() { }


  // Success(message:string, title?:string){
  //   toastr.success(message, title);
  // }
  // Warning(message:string, title?:string){
  //   toastr.warning(message, title);
  // }
  // Error(message:string, title?:string){
  //   toastr.error(message, title);
  // }
  // Info(message:string){
  //   toastr.info(message);
  // }

  ServerError(titlemessage: string = 'Something went wrong in Server!') {
    AppSettings.Toast.fire({
      icon: 'error',
      background: '#bf443d',
      title: titlemessage
    });
  }
  ClientError(titlemessage: string = 'Something went wrong in Client!') {
    AppSettings.Toast.fire({
      icon: 'error',
      background: '#bf443d',
      title: titlemessage
    });
  }
  Error(titlemessage: string = 'Something went wrong') {
    AppSettings.Toast.fire({
      icon: 'error',
      background: '#bf443d',
      title: titlemessage
    });
  }
  Success(titlemessage?: string) {
    AppSettings.Toast.fire({
      icon: 'success',
      background: '#51A351',
      title: titlemessage
    });
  }

  Add(){
    this.titlemessage = 'Data created successfully';
    AppSettings.Toast.fire({
      icon: 'success',
      background: '#51A351',
      title: this.titlemessage
    });
  }
  Update(titlemessage?: string) {
    this.titlemessage = 'Data updated successfully';
    if(titlemessage!=null)
      this.titlemessage = titlemessage;
    AppSettings.Toast.fire({
      icon: 'success',
      background: '#51A351',
      title: this.titlemessage
    });
  }
  Detele(titlemessage?: string) {
    this.titlemessage = 'Data deleted successfully';
    if(titlemessage!=null)
      this.titlemessage = titlemessage;
      
    AppSettings.Toast.fire({
      icon: 'success',
      background: '#51A351',
      title: this.titlemessage
    });
  }

  Info(titlemessage?: string) {
    AppSettings.Toast.fire({
      icon: 'info',
      background: '#17a2b8',
      title: titlemessage
    });
  }
  Warning(titlemessage?: string) {
    AppSettings.Toast.fire({
      icon: 'warning',
      background: '#d68511',
      title: titlemessage
    });
  }

}
