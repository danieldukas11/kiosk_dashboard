import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {ManageProductsService} from '../../services/manage-products.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-save-ingredient-dialog',
  templateUrl: './save-ingredient-dialog.component.html',
  styleUrls: ['./save-ingredient-dialog.component.scss']
})
export class SaveIngredientDialogComponent implements OnInit, OnDestroy {
  saveIngredientForm: FormGroup;
  subscriptions: Subscription[] = [];
  ingredientImg;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private mp: ManageProductsService,
    public dialogRef: MatDialogRef<SaveIngredientDialogComponent>
  ) {

    console.log(data.ingredient)



    this.saveIngredientForm = this.fb.group({
      title: ['', Validators.required],
      double_price: ['', Validators.required],
      normal_price: ['', Validators.required],
      light_price: ['', Validators.required],
      ingredient_ids: [[data.menuId], Validators.required]
    });

    if (data.ingredient) {
      this.saveIngredientForm.patchValue(data.ingredient);
    }
  }

  ngOnInit(): void {
  }

  add(): void {

    if (this.saveIngredientForm.valid) {


      const ingredient = this.saveIngredientForm.value;
      const fd = new FormData();

      fd.append('image', this.ingredientImg);
      fd.append('title', ingredient.title);
      fd.append('price', ingredient.normal_price);
      fd.append('light_price', ingredient.light_price);
      fd.append('double_price', ingredient.double_price);
      fd.append('ingredient_ids', ingredient.ingredient_ids);

      this.mp.addIngredient(fd).subscribe(() => {
        this.dialogRef.close();
      });
    }
  }

  getImage(img): void {
    this.ingredientImg = img.item(0);
  }

  get titleCtrl() {
    return this.saveIngredientForm.get('title');
  }

  get priceCtrl() {
    return this.saveIngredientForm.get('normal_price');
  }

  get doublePriceCtrl() {
    return this.saveIngredientForm.get('double_price');
  }

  get lightPriceCtrl() {
    return this.saveIngredientForm.get('light_price');
  }


  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
