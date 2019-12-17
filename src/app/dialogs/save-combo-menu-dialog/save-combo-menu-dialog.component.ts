import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ManageProductsService} from '../../services/manage-products.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-save-combo-menu-dialog',
  templateUrl: './save-combo-menu-dialog.component.html',
  styleUrls: ['./save-combo-menu-dialog.component.scss']
})
export class SaveComboMenuDialogComponent implements OnInit, OnDestroy {
  saveComboMenuForm: FormGroup;
  subscriptions: Subscription[] = [];
  edit = false;
  configurable = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private mp: ManageProductsService,
    public dialogRef: MatDialogRef<SaveComboMenuDialogComponent>,
    private toastr: ToastrService
  ) {

    this.edit = !!data.menu;

    this.saveComboMenuForm = fb.group({
      title: ['', Validators.required],
      configurable: [this.configurable, Validators.required]
    });

    if (this.edit) {
      this.saveComboMenuForm.patchValue(data.menu);
    }
  }

  ngOnInit(): void {
  }

  save() {
    if (this.saveComboMenuForm.valid) {
      if (!this.edit) {
        this.subscriptions.push(this.mp.addComboMenu(this.saveComboMenuForm.value).subscribe(() => {
          this.toastr.success('The combo menu has been added successfully.', 'Added!');
          this.dialogRef.close();
        }));
      } else {
        this.subscriptions.push(this.mp.updateComboMenu(this.saveComboMenuForm.value).subscribe(() => {
          this.toastr.success('The combo menu has been updated successfully.', 'Updated!');
          this.dialogRef.close();
        }));
      }
    }
  }

  get titleCtrl() {
    return this.saveComboMenuForm.get('title');
  }


  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
