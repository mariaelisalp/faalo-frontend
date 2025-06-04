import { Component, ElementRef, EventEmitter, forwardRef, HostListener, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { PrelineService } from '../../services/preline.service';

@Component({
  selector: 'app-file-upload',
  imports: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileUploadComponent),
      multi: true
    }
  ],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss'
})

export class FileUploadComponent implements ControlValueAccessor{

  @Input() progress: any;
  @Output() fileSelected = new EventEmitter<File>();
  onChange!: Function;
  private file: File | null = null;


  @HostListener('change', ['$event.target.files']) emitFiles( event: FileList ) {
    const file = event && event.item(0);

    if(file){
      this.file = file;
      this.fileSelected.emit(file);
    }
    
  }

  constructor( private host: ElementRef<HTMLInputElement>, private preline: PrelineService) {
  }

  ngOnInit(){
    this.preline.initializeFileUpload();
  }

  writeValue( value: null ) {
    // clear file input
    this.host.nativeElement.value = '';
    this.file = null;
  }

  registerOnChange( fn: Function ) {
    this.onChange = fn;
  }

  registerOnTouched( fn: Function ) {

  }
}
