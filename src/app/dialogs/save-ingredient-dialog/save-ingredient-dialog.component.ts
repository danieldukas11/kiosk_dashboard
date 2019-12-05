import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {ManageProductsService} from '../../services/manage-products.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-save-ingredient-dialog',
  templateUrl: './save-ingredient-dialog.component.html',
  styleUrls: ['./save-ingredient-dialog.component.scss']
})
export class SaveIngredientDialogComponent implements OnInit, OnDestroy {
  saveIngredientForm: FormGroup;
  subscriptions: Subscription[] = [];
  ingredientImg;
  newIngredientImg;
  edit = false;
  submitted = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private mp: ManageProductsService,
    public dialogRef: MatDialogRef<SaveIngredientDialogComponent>
  ) {


    this.edit = !!data.ingredient;

    this.saveIngredientForm = this.fb.group({
      title: ['', Validators.required],
      double_price: ['', Validators.required],
      normal_price: ['', Validators.required],
      light_price: ['', Validators.required],
      ingredient_ids: [[data.menuId], Validators.required],
      image: [this.ingredientImg, Validators.required]
    });

    if (this.edit) {
      this.ingredientImg = `${environment.staticUrl}images/${data.ingredient.image}`;
      this.saveIngredientForm.patchValue(data.ingredient);
    }
  }

  ngOnInit(): void {
  }

  save(): void {

    this.submitted = true;

    if (this.saveIngredientForm.valid) {


      const ingredient = this.saveIngredientForm.value;
      const fd = new FormData();

      fd.append('image', this.newIngredientImg);
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
    this.newIngredientImg = img.item(0);
    this.ingredientImg = `${environment.staticUrl}images/${this.newIngredientImg.name}`;
    this.saveIngredientForm.patchValue({image: this.newIngredientImg.name});
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

  get imageFieldCtrl() {
    return this.saveIngredientForm.get('image');
  }


  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
