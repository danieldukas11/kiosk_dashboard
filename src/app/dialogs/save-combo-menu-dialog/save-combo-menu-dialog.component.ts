import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ManageProductsService} from '../../services/manage-products.service';

@Component({
  selector: 'app-save-combo-menu-dialog',
  templateUrl: './save-combo-menu-dialog.component.html',
  styleUrls: ['./save-combo-menu-dialog.component.scss']
})
export class SaveComboMenuDialogComponent implements OnInit, OnDestroy {
  saveComboMenuForm: FormGroup;
  subscriptions: Subscription[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private mp: ManageProductsService,
    public dialogRef: MatDialogRef<SaveComboMenuDialogComponent>
  ) {
    this.saveComboMenuForm = fb.group({
      title: ['', Validators.required],
      configurable: ['false', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  add() {
    if (this.saveComboMenuForm.valid) {
      this.subscriptions.push(this.mp.addComboMenu(this.saveComboMenuForm.value).subscribe(() => {
        this.dialogRef.close();
      }));
    }
  }

  get titleCtrl() {
    return this.saveComboMenuForm.get('title');
  }


  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
