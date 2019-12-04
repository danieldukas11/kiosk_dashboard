import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ManageProductsService} from '../../services/manage-products.service';

@Component({
  selector: 'app-save-ingredient-menu-dialog',
  templateUrl: './save-ingredient-menu-dialog.component.html',
  styleUrls: ['./save-ingredient-menu-dialog.component.scss']
})
export class SaveIngredientMenuDialogComponent implements OnInit {
  saveIngredientMenuForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private mp: ManageProductsService,
    public dialogRef: MatDialogRef<SaveIngredientMenuDialogComponent>
  ) {
    this.saveIngredientMenuForm = fb.group({title: ['', Validators.required]});
  }

  ngOnInit() {
  }

  add() {
    if (this.saveIngredientMenuForm.valid) {
      this.mp.addIngredientMenu(this.titleCtrl.value).subscribe(() => {
        this.dialogRef.close();
      });
    }
  }

  get titleCtrl() {
    return this.saveIngredientMenuForm.get('title');
  }


}
