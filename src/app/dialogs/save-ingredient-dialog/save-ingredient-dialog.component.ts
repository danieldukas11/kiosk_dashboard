import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {ManageProductsService} from '../../services/manage-products.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {environment} from '../../../environments/environment';
import {ToastrService} from 'ngx-toastr';

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
  selectedIngredient;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private mp: ManageProductsService,
    public dialogRef: MatDialogRef<SaveIngredientDialogComponent>,
    private toastr: ToastrService
  ) {


    this.edit = !!data.ingredient;
    this.selectedIngredient = data.ingredient;


    this.saveIngredientForm = this.fb.group({
      title: ['', Validators.required],
      double_price: ['', Validators.required],
      normal_price: ['', Validators.required],
      light_price: ['', Validators.required],
      ingredient_ids: [[data.menuId], Validators.required],
      image: [ this.ingredientImg, Validators.required]
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

      if (!this.edit) {

        this.mp.addIngredient(fd).subscribe(() => {
          this.toastr.success('The ingredient has been added successfully.', 'Added!');
          this.dialogRef.close();
        });
      } else {

        fd.append('_id', this.selectedIngredient._id);
        this.mp.updateIngredient(fd).subscribe(() => {
          this.toastr.success('The ingredient has been updated successfully.', 'Updated!');
          this.dialogRef.close();
        });
      }
    }
  }

  getImage(img): void {
    this.newIngredientImg = img.item(0);
    this.ingredientImg = `${environment.staticUrl}images/${this.newIngredientImg.name}`;
    this.saveIngredientForm.patchValue({image: this.newIngredientImg.name});
  }

  get titleCtrl(): AbstractControl {
    return this.saveIngredientForm.get('title');
  }

  get priceCtrl(): AbstractControl {
    return this.saveIngredientForm.get('normal_price');
  }

  get doublePriceCtrl(): AbstractControl {
    return this.saveIngredientForm.get('double_price');
  }

  get lightPriceCtrl(): AbstractControl {
    return this.saveIngredientForm.get('light_price');
  }

  get imageFieldCtrl(): AbstractControl {
    return this.saveIngredientForm.get('image');
  }


  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
