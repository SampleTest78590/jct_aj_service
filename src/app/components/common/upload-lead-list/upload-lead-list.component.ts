import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { JctServicesService } from 'src/app/components/common/services/jctservices.service';
import { ToastService } from '../shared/custom-elements/custom-toast/toast-service.service';
const ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-upload-lead-list',
  templateUrl: './upload-lead-list.component.html',
  styleUrls: ['./upload-lead-list.component.scss'],
  encapsulation:ViewEncapsulation.None,
})
export class UploadLeadListComponent implements OnInit {
  @Input() data: any = {}
  validationMsg=`<span class="grey-70">Only <span class="grey-100 bold">.csv</span> and <span class="grey-90 bold">.xlxs</span> format is supported<br/> Max file size limit: <span class="grey-100">2MB</span></span> `;
  isopenPreviewUploadleadList: boolean = false;
  filesToUpload: any = [];
  totalSize: number;
  existingFileArray = [];
  deletedFile = [];
  validNumber: any;
  invalidNumber: any;
  duplicateNumber: any;
  uploadDragDrop: boolean = true;
  acceptedFormats: any = ['.csv', '.xlsx'];
  subscriptonLst: Subscription[] = []
  summarydetail: boolean = false;
  leadName: any
  leadDescription: any;
  leadlistPreview: [] = [];
  attachFileName: any;
  attachFileSize: any;
  previewModal: boolean = false;
  displayedColumns: string[] = ['firstName', 'lastName', 'contactNumber'];
  dataSource = ELEMENT_DATA;
  disabledUpload: boolean = false;
  preKycFlag:boolean;
 
  @Output() closeModal = new EventEmitter();

  constructor(
    private uploadService: JctServicesService,
     public toastservice: ToastService) { }

  ngOnInit(): void {
    this.preKycFlag = this.uploadService.preKycFlag;
  }

  closeSubscribers() {
    this.removeAttachment();
  }

  openUploadPreview() {
    this.isopenPreviewUploadleadList = !this.isopenPreviewUploadleadList;
  }
  downloadSample() {
    this.uploadService.downloadFile().subscribe((result: any) => {

      let pdfUrl = URL.createObjectURL(result);
      var fileLink = document.createElement("a");
      fileLink.href = pdfUrl;
      fileLink.download = ("User").toString();
      fileLink.click();
      this.toastservice.showToast({'title': "File downloaded successfully", 'kind': 'success'});
    },
      (error: any) => {
        this.toastservice.showToast({'title': error.error.message, 'kind': 'error'});
      })
  }

  readyToUpload(event: any): void {
    this.uploadDragDrop = false;
    this.filesToUpload = event?.files;
    this.attachFileName = event.files[0].name
    this.attachFileSize = event.files[0].size;
    this.filesToUpload.forEach((file: any) => {
      if (file?.fileId == "" || file?.fileId == undefined) {
        file.imageURL = event?.imageUrls[event?.imageUrls.length - 1]?.changingThisBreaksApplicationSecurity;
      }
    })
    this.checkFileSize()
    this.Apivalidationcall();
  }

  checkFileSize() {
    this.totalSize = 0;
    // this.haveAttachments = false;
    if (this.filesToUpload.length > 0) {
      // this.haveAttachments = true;
      this.filesToUpload.forEach((file: any) => {
        this.totalSize = this.totalSize + file.size
      });
    }
    if (this.totalSize > 2000000) {
      this.toastservice.showToast({'title': "Maximum upload size of all files combined is 2mb", 'kind': 'error'});
    }

  }
  removeAttachment() {
    this.filesToUpload = [];
    this.uploadDragDrop = true;
    this.summarydetail = false;
  }

  removeFile(event: any): void {
    this.summarydetail = false;
    this.uploadDragDrop = true;
    this.filesToUpload = [];
  }

  openFile(event: any) {
    if (event?.fileClicked?.fileId != '' && event?.fileClicked?.fileId != undefined) {
      let payload: any = {
        fileId: event?.fileClicked?.fileId
      }
      this.subscriptonLst.push(
      )
    } else {
      if (event?.fileClicked?.type) {
        const binaryURL = URL.createObjectURL(this.uploadService.b64ToBinary(event?.imageUrlClicked?.changingThisBreaksApplicationSecurity ? event?.imageUrlClicked?.changingThisBreaksApplicationSecurity : event?.fileClicked?.imageURL, event?.fileClicked?.type));
        if (event?.fileClicked?.type == "application/pdf") {

        } else {
          window.open(binaryURL, '_blank');
        }
      }
    }
  }

  Apivalidationcall() {
    this.disabledUpload = false;
    let formData = new FormData();
    if (this.filesToUpload.length > 0) {
      this.filesToUpload.forEach((file: any) => {
        formData.append("uploadFile", file);
      })
    }
    this.subscriptonLst.push(
      this.uploadService.validateExcel(formData).subscribe((resp: any) => {
        if (resp.status == "Success") {

          this.summarydetail = true;
          this.uploadDragDrop = false;
          this.leadlistPreview = resp.result.leadList;
          this.validNumber = resp.result["Valid Numbers"];;
          this.invalidNumber = resp.result["Invalid Numbers"];;
          this.duplicateNumber = resp.result["Duplicate Numbers"];
          this.disabledUpload = true;
        }
        else {
          this.disabledUpload = false;
          this.removeAttachment();
          this.toastservice.showToast({'title': resp.result["message"], 'kind': 'error'});
        }
      }, (err: any) => {
        this.disabledUpload = false;
        this.removeAttachment();
        this.toastservice.showToast({'title': err.error.message, 'kind': 'error'});
      })
    )
  }

  UploadSubmit() {
    let formData = new FormData();
    formData.append("leadName", this.leadName);
    formData.append("leadDescription", this.leadDescription ? this.leadDescription : '');
    formData.append("gettingStarted", this.data && this.data.flag ? 'true' : 'false');
    if (this.data?.journeyId) {
      formData.append("journeyId", this.data.journeyId);
    }
    if (this.filesToUpload.length > 0) {
      this.filesToUpload.forEach((file: any) => {
        formData.append("uploadFile", file);
      })
    }
    this.subscriptonLst.push(
      this.uploadService.uploadFile(formData).subscribe((resp: any) => {
        if (resp.status == "Success") {
          this.toastservice.showToast({'title': resp?.message.message, 'kind': 'success'});
          this.closeModal.emit({
            "leadId": resp?.message.leadId,
            "leadName": resp?.message.leadName,
            "leadDescription": resp?.message.leadDescription,
            "leadBinary": resp?.message.leadDescription
          })
        }
        else {
          this.toastservice.showToast({'title': resp?.message, 'kind': 'error'});
        }
      }, (err: any) => {
        this.toastservice.showToast({'title': err?.error.message, 'kind': 'error'});
      })
    )
  }

  onCancel() {
    // this.dialogRefSelf.close();
    this.closeModal.emit(false);
  }

  backToUpload() {
    this.previewModal = false;
  }

  validateCharNumLead(evt: any) {
    let charCodeLead = evt.which ? evt.which : evt.keyCode;
    if (
      (charCodeLead >= 48 && charCodeLead !== 64 && charCodeLead <= 90) ||
      (charCodeLead >= 97 && charCodeLead <= 122) ||
      charCodeLead === 32
    ) {
      return true;
    } else {
      return false;
    }
  }
  autogrowtextArea() {
    let textArea = document.getElementById("leadtextarea"); 
    this.uploadService.autogrowtextArea(textArea);
  }
}


export interface PeriodicElement {
  firstName: {};
  lastName: {};
  contactNumber: {};
}