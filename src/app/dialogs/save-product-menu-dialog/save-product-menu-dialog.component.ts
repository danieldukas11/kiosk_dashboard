import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ManageProductsService} from '../../services/manage-products.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-save-product-menu-dialog',
  templateUrl: './save-product-menu-dialog.component.html',
  styleUrls: ['./save-product-menu-dialog.component.scss']
})
export class SaveProductMenuDialogComponent implements OnInit, OnDestroy {
  saveProductMenuForm: FormGroup;
  subscriptions: Subscription[] = [];
  edit = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private mp: ManageProductsService,
    public dialogRef: MatDialogRef<SaveProductMenuDialogComponent>
  ) {

    this.edit = !!data.menu;

    this.saveProductMenuForm = fb.group(
      {
        title: ['', Validators.required],
        _id: ['']
      });

    if (this.edit) {
      this.saveProductMenuForm.patchValue(data.menu);
    }
  }

  ngOnInit(): void {
  }

  save() {
    if (this.saveProductMenuForm.valid) {
      if (!this.edit) {
        this.subscriptions.push(this.mp.addProductMenu(this.titleCtrl.value).subscribe(() => {
          this.dialogRef.close();
        }));

      } else {
        this.subscriptions.push(this.mp.updateProductMenu(this.saveProductMenuForm.value).subscribe(() => {
          this.dialogRef.close();
        }));
      }
    }
  }

  get titleCtrl() {
    return this.saveProductMenuForm.get('title');
  }


  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}
