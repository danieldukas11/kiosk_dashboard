import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ManageProductsService} from '../../services/manage-products.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-save-ingredient-menu-dialog',
  templateUrl: './save-ingredient-menu-dialog.component.html',
  styleUrls: ['./save-ingredient-menu-dialog.component.scss']
})
export class SaveIngredientMenuDialogComponent implements OnInit, OnDestroy {
  saveIngredientMenuForm: FormGroup;
  subscriptions: Subscription[] = [];
  edit = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private mp: ManageProductsService,
    public dialogRef: MatDialogRef<SaveIngredientMenuDialogComponent>
  ) {
    this.edit = !!data.menu;

    this.saveIngredientMenuForm = fb.group({title: ['', Validators.required]});

    if (this.edit) {
      this.saveIngredientMenuForm.patchValue(data.menu);
    }
  }

  ngOnInit() {
  }

  save() {
    if (this.saveIngredientMenuForm.valid) {
      if (!this.edit) {
        this.subscriptions.push(this.mp.addIngredientMenu(this.titleCtrl.value).subscribe(() => {
          this.dialogRef.close();
        }));
      }
    }
  }

  get titleCtrl() {
    return this.saveIngredientMenuForm.get('title');
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
