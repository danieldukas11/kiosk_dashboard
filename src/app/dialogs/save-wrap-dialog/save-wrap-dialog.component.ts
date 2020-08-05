import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ManageProductsService} from '../../services/manage-products.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-save-wrap-dialog',
  templateUrl: './save-wrap-dialog.component.html',
  styleUrls: ['./save-wrap-dialog.component.scss']
})
export class SaveWrapDialogComponent implements OnInit, OnDestroy {
  saveWrapForm: FormGroup;
  subscriptions: Subscription[] = [];
  edit = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private mp: ManageProductsService,
    public dialogRef: MatDialogRef<SaveWrapDialogComponent>,
    private toastr: ToastrService
  ) {
    console.log(data)
    this.edit = !!data.wrap;

    this.saveWrapForm = fb.group({title: ['', Validators.required], _id: ['']});

    if (this.edit) {
      this.saveWrapForm.patchValue(data.wrap);
    }
  }

  ngOnInit() {
  }

  save() {
    if (this.saveWrapForm.valid) {
      if (!this.edit) {
        this.subscriptions.push(this.mp.addWrap({title: this.titleCtrl.value}).subscribe(() => {
          this.toastr.success('The wrap info has been added successfully.', 'Added!');
          this.dialogRef.close();
        }));
      } else {
        this.subscriptions.push(this.mp.updateWrap(this.saveWrapForm.value).subscribe(() => {
          this.toastr.success('The wrap info has been updated successfully.', 'Updated!');
          this.dialogRef.close();
        }));
      }
    }
  }

  get titleCtrl() {
    return this.saveWrapForm.get('title');
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}
