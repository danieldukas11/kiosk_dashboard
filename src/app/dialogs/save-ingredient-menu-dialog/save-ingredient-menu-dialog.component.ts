import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ManageProductsService} from '../../services/manage-products.service';
import {Subscription} from 'rxjs';
import {ToastrService} from 'ngx-toastr';

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
    public dialogRef: MatDialogRef<SaveIngredientMenuDialogComponent>,
    private toastr: ToastrService
  ) {
    this.edit = !!data.menu;

    this.saveIngredientMenuForm = fb.group({title: ['', Validators.required], _id: ['']});

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
          this.toastr.success('The ingredient menu has been added successfully.', 'Added!');
          this.dialogRef.close();
        }));
      } else {
        this.subscriptions.push(this.mp.updateIngredientMenu(this.saveIngredientMenuForm.value).subscribe(() => {
          this.toastr.success('The ingredient menu has been updated successfully.', 'Updated!');
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
