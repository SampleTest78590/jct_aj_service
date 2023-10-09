import {
  Component,
  OnInit,
  Input,
  ViewEncapsulation,
  ViewChild,
  HostListener,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { ToastService } from "../custom-elements/custom-toast/toast-service.service";

@Component({
  selector: "app-attach-drag-drop",
  templateUrl: "./attach-drag-drop.component.html",
  styleUrls: ["./attach-drag-drop.component.css"],
  encapsulation: ViewEncapsulation.None,
})
export class AttachDragDropComponent implements OnInit, OnChanges {
  @Input() attachmentText: any;
  @Input() maxSize: any;
  @Input()
  multiple!: boolean;
  @Input() maxUploadLimit: any;
  @Input() acceptedFormats: any;
  @Input() fileSizeLimit!: number;
  @Input() existingFilesArray: any[] = [];
  @Input() viewOnly!: boolean;
  @Input() dragMaxWidth: any;
  @Input() onUploadClear: boolean = false;
  @Input() filesizeText: boolean = false;
  @ViewChild("fileDropRef") fileDropRef: any;
  acceptedFileSize: any = 0;
  fileOver!: boolean;
  formatErrorString: any = "";
  choosenFiles: any = [];
  imageUrls: any = [];
  @Output() filesDropped = new EventEmitter();
  @Output() filesDeleted = new EventEmitter();
  @Output() viewClicked = new EventEmitter();
  @Output() errorEvent = new EventEmitter();
  @Input() attachmentTextLink = '';
  formatRegex!: RegExp;
  @Input() validationMsg: any = ''

  @HostListener("dragover", ["$event"]) onDragOver(evt: any) {
    evt.preventDefault();
    evt.stopPropagation();
  }

  @HostListener("dragleave", ["$event"]) onDragLeave(evt: any) {
    evt.preventDefault();
    evt.stopPropagation();
  }

  @HostListener("drop", ["$event"]) onDrop(evt: any) {
    evt.preventDefault();
    evt.stopPropagation();
    this.checkFormats(evt, true);
  }

  constructor(
    // public modalService: MessageModalService,
    private sanitizer: DomSanitizer,
    public toastservice: ToastService
  ) { }
  ngOnChanges(changes: SimpleChanges | any) {
    if (this.onUploadClear) {
      this.choosenFiles = [];
      return;
    }
    // to refelect existingFIleCahnges on view
    if (
      changes.existingFilesArray &&
      changes.existingFilesArray.currentValue &&
      changes.existingFilesArray.currentValue.length > 0
    ) {
      if (this.choosenFiles.length == 0) {
        console.log("exisiting file choosenFiles length is zero");
        this.uploadExistingFiles(this.existingFilesArray);
      }
    }
  }
  ngOnInit(): void {
    this.acceptedFormats =
      this.acceptedFormats != undefined ? this.acceptedFormats : [];
    this.createFormatRegex();
    this.maxSize != undefined ? this.maxSize : "";
    if (this.maxSize) {
      this.createMaxSize();
    }
    if (this.multiple == undefined) {
      this.multiple = false;
    }
    if (this.multiple && this.maxUploadLimit == undefined) {
      this.maxUploadLimit = 2;
    } else if (!this.multiple && this.maxUploadLimit == undefined) {
      this.maxUploadLimit = 1;
    } else if (!this.multiple && this.maxUploadLimit > 1) {
      this.maxUploadLimit = 1;
    }
    if (this.existingFilesArray && this.choosenFiles.length == 0) {
      this.existingFilesArray.length > 0
        ? this.uploadExistingFiles(this.existingFilesArray)
        : "";
    }
  }

  createMaxSize() {
    let fileSizeSuffix = this.maxSize.slice(-2).toLowerCase();
    let fileSizePrefix = this.maxSize.slice(0, -2);
    fileSizePrefix = <Number>fileSizePrefix;
    let fileSizeInto: any;
    if (fileSizeSuffix == "kb") {
      fileSizeInto = 1;
    } else if (fileSizeSuffix == "mb") {
      fileSizeInto = 2;
    }
    this.acceptedFileSize = fileSizePrefix * Math.pow(1024, fileSizeInto);
    this.maxSize = fileSizePrefix + fileSizeSuffix.toUpperCase();
  }

  createFormatRegex() {
    let regexString = "";
    for (let i = 0; i < this.acceptedFormats.length; i++) {
      regexString = regexString + this.acceptedFormats[i];
      regexString = regexString + "|";
      if (
        i == this.acceptedFormats.length - 1 &&
        this.acceptedFormats.length != 1
      ) {
        this.formatErrorString =
          this.formatErrorString.replace(/,\s*$/, "") + " or " + this.acceptedFormats[i];
      } else if (this.acceptedFormats.length == 1) {
        this.formatErrorString = this.acceptedFormats[i];
      } else {
        this.formatErrorString =
          this.formatErrorString + this.acceptedFormats[i] + ", ";
      }
    }
    regexString = regexString.slice(0, -1);
    this.formatRegex = new RegExp(regexString, "i");
  }

  checkFormats(evt: any, fromDrop: any) {
    let files = fromDrop ? evt.dataTransfer.files : evt.target.files;
    let formatValid = true;
    if (this.acceptedFormats.length > 0) {
      for (let i = 0; i < files.length; i++) {
        if (!this.formatRegex.test(files[i].name)) {
          this.toastservice.showToast({'title': 'Please upload a file with '+ this.formatErrorString + ' format(s)', 'kind': 'error'});
          // this.modalService.showMessage(
          //   `Please upload a file with ${this.formatErrorString} format(s)`,
          //   "Error",
          //   "warning-icon",
          //   "Close"
          // );
          formatValid = false;
        } else if (this.fileSizeLimit && files[i].size > this.fileSizeLimit) {
          let fileSize: any = this.fileSizeLimit !== 0 ? this.fileSizeLimit / 1000000 : this.fileSizeLimit;
          this.toastservice.showToast({'title': 'Please upload a file with size less than '+ fileSize + ' MB.', 'kind': 'error'});
          // this.modalService.showMessage(
          //   `Please upload a file with size less than ${this.fileSizeLimit !== 0
          //     ? this.fileSizeLimit / 1000000
          //     : this.fileSizeLimit
          //   } MB.`,
          //   "Error",
          //   "warning-icon",
          //   "Close"
          // );
          formatValid = false;
        }
      }
    }
    if (this.maxSize) {
      for (let i = 0; i < files.length; i++) {
        if (files[i].size > this.acceptedFileSize) {
          this.toastservice.showToast({'title': 'Please upload a file with size less than '+ this.maxSize, 'kind': 'error'});
          // this.modalService.showMessage(
          //   `Please upload a file with size less than ${this.maxSize}`,
          //   "Error",
          //   "warning-icon",
          //   "Close"
          // );
          formatValid = false;
        }
      }
    }
    if (formatValid) {
      this.uploadFiles(evt, fromDrop);
    }
    const element = evt.target as HTMLInputElement
    element.value = ''
  }

  uploadFiles(evt: any, fromDrop: any) {
    this.fileOver = false;
    const files = fromDrop ? evt.dataTransfer.files : evt.target.files;
    if (files.length > 0) {
      let fileLength =
        this.choosenFiles.length == 0 ? files.length : this.choosenFiles.length;
      if (this.multiple) {
        if (
          fileLength >= this.maxUploadLimit &&
          this.choosenFiles.length != 0
        ) {
          this.toastservice.showToast({'title': 'Cannot upload more than '+ this.maxUploadLimit + ' file(s)', 'kind': 'error'});
          // this.modalService.showMessage(
          //   `Cannot upload more than ${this.maxUploadLimit} file(s)`,
          //   "Error",
          //   "warning-icon",
          //   "Close"
          // );
          return;
        } else {
          this.uploadMultipleFiles(files);
        }
      } else {
        if (fileLength >= 1 && this.choosenFiles.length != 0) {
          this.toastservice.showToast({'title': 'Cannot upload more than 1 file', 'kind': 'error'});
          // this.modalService.showMessage(
          //   "Cannot upload more than 1 file",
          //   "Error",
          //   "warning-icon",
          //   "Close"
          // );
          return;
        } else {
          this.uploadMultipleFiles(files);
        }
      }
    }
  }

  uploadMultipleFiles(files: any) {
    for (let i = 0; i < files.length; i++) {
      this.choosenFiles.push(files[i]);

      let reader = new FileReader();
      reader.readAsDataURL(files[i]);
      reader.onloadend = (e: any) => {
        let file = this.sanitizer.bypassSecurityTrustUrl(
          e.target.result.toString()
        );
        this.imageUrls.push(file);
      };
    }
    let emittedResult = {
      files: this.choosenFiles,
      imageUrls: this.imageUrls,
    };
    this.filesDropped.emit(emittedResult);
  }

  emitViewEvent(index: any) {
    let emittedResult = {
      fileClicked: this.choosenFiles[index],
      imageUrlClicked: this.imageUrls[index],
      index: index,
    };
    this.viewClicked.emit(emittedResult);
  }

  deleteFile(file: any) {
    let fileIndex = this.choosenFiles.indexOf(file);
    this.choosenFiles.splice(fileIndex, 1);
    this.imageUrls.splice(fileIndex, 1);
    let emittedResult = {
      files: this.choosenFiles,
      imageUrls: this.imageUrls,
      fileRemoved: file,
    };
    this.filesDeleted.emit(emittedResult);

    // this.modalService.showConfirmation(
    //   "Are you sure you want to delete the selected file?",
    //   "Confirmation",
    //   "confirmation-icon",
    //   (reason: any) => {
    //     if (reason === "YES") {
    //       let fileIndex = this.choosenFiles.indexOf(file);
    //       this.choosenFiles.splice(fileIndex, 1);
    //       this.imageUrls.splice(fileIndex, 1);
    //       let emittedResult = {
    //         files: this.choosenFiles,
    //         imageUrls: this.imageUrls,
    //         fileRemoved: file,
    //       };
    //       this.filesDeleted.emit(emittedResult);
    //     }
    //   }
    // );
  }
  uploadExistingFiles(files: any) {
    for (let i = 0; i < files.length; i++) {
      this.choosenFiles.push(files[i]);
    }
   
  }
}
