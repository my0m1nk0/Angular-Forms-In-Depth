import {Component, Input} from '@angular/core';
import {HttpClient, HttpEventType} from '@angular/common/http';
import {catchError, finalize} from 'rxjs/operators';
import {AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator} from '@angular/forms';
import {noop, of} from 'rxjs';


@Component({
  selector: 'file-upload',
  templateUrl: "file-upload.component.html",
  styleUrls: ["file-upload.component.scss"],
  providers:[
    {
      provide: NG_VALUE_ACCESSOR,
      multi:true,
      useExisting:FileUploadComponent
    },{
      provide:NG_VALIDATORS,
      multi:true,
      useExisting:FileUploadComponent
    }
  ]
})
export class FileUploadComponent implements ControlValueAccessor, Validator{
  @Input()
  requiredFileType: string;
  fileName='';
  fileUploadError = false;
  uploadProgress: number;
  onChange = (fileName:string )=>{};
  onTouched = ()=>{};
  disabled:boolean = false;
  fileUploadSuccess = false;
  onValidatorChange = ()=>{};

  constructor(private http: HttpClient) {}

  ////////control value accessor methods////////////

  writeValue(value: any) {
    this.fileName = value;
  }
  registerOnChange(onChange: any) {
    this.onChange = onChange;
  }
  registerOnTouched(onTouched:any) {
    this.onTouched = onTouched;

  }
  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  ///////////validator methods//////////////
  validate(control: AbstractControl): ValidationErrors | null {
    if(this.fileUploadSuccess){
      return null;
    }
    let errors:any={
      requiredFileType:this.requiredFileType
    };

    if(this.fileUploadError){
      errors.fileUploadError = true;
    }
    return errors;
  }


  registerOnValidatorChange(onValidatorChange: () => void) {
    this.onValidatorChange=onValidatorChange;
  }

  onClick(fileUpload:HTMLInputElement){
    this.onTouched();
    fileUpload.click();
  }

  onFileSelected(event) {
    const file: File = event.target.files[0];
    if (file) {
      this.fileName=file.name;
      const formData = new FormData();
      formData.append("thumbnail", file);
      this.fileUploadError = false;
      this.http.post("/api/thumbnail-upload", formData,{
        reportProgress: true,
        observe: 'events'
      })
          .pipe(
            catchError(err=>{
              this.fileUploadError = true;
              return of(err);
            }),
            finalize(()=>{
              this.uploadProgress = null
            })
            )
          .subscribe(
            event => {
              if(event.type == HttpEventType.UploadProgress){
              this.uploadProgress = Math.round(100 * (event.loaded / event.total));
              }
              else if(event.type == HttpEventType.Response){
                this.fileUploadSuccess = true;
                this.onChange(this.fileName);
                this.onValidatorChange();
              }
            }
          );

    }
}
}
