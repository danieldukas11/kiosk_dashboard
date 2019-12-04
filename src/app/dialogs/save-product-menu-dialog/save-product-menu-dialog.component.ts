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

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private mp: ManageProductsService,
    public dialogRef: MatDialogRef<SaveProductMenuDialogComponent>
  ) {
    this.saveProductMenuForm = fb.group({title: ['', Validators.required]});
  }

  ngOnInit(): void {
  }

  add() {
    if (this.saveProductMenuForm.valid) {
      this.subscriptions.push(this.mp.addProductMenu(this.titleCtrl.value).subscribe(() => {
        this.dialogRef.close();
      }));
    }
  }

  get titleCtrl() {
    return this.saveProductMenuForm.get('title');
  }


  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}
