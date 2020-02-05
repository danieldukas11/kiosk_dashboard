import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {ManageProductsService} from '../../services/manage-products.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {environment} from '../../../environments/environment';
import {ToastrService} from 'ngx-toastr';
import {CommonService} from '../../services/common.service';

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
  lightPriceEnabled = true;
  normalPriceEnabled = true;
  doublePriceEnabled = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private mp: ManageProductsService,
    public dialogRef: MatDialogRef<SaveIngredientDialogComponent>,
    private toastr: ToastrService,
    public common: CommonService
  ) {


    this.edit = !!data.ingredient;
    this.selectedIngredient = data.ingredient;


    this.saveIngredientForm = this.fb.group({
      title: ['', Validators.required],
      double_price: ['', Validators.required],
      price: ['', Validators.required],
      light_price: ['', Validators.required],
      ingredient_ids: [[data.menuId], Validators.required],
      image: [this.ingredientImg]
    });

    if (this.edit) {

      // This is to fix non-defined prices should be disabled issue
      for (const key in data.ingredient) {
        if (data.ingredient[key] === null) {
          delete data.ingredient[key];
        }
      }

      this.setPricesStatus('light_price', 'lightPriceEnabled', data);
      this.setPricesStatus('price', 'normalPriceEnabled', data);
      this.setPricesStatus('double_price', 'doublePriceEnabled', data);


      this.ingredientImg = `${environment.staticUrl}images/${data.ingredient.image}`;
      this.saveIngredientForm.patchValue(data.ingredient);
    }
  }

  ngOnInit(): void {
  }

  // Set prices and price inputs status (enabled/disabled) for edit case
  setPricesStatus(controlName, statusName, data) {
    this[statusName] = data.ingredient.hasOwnProperty(controlName);
    if (this[statusName]) {
      this.saveIngredientForm.get(controlName).enable();
    } else {
      this.saveIngredientForm.get(controlName).disable();
    }
  }

  disableInput(input, name, status): void {
    input.disabled = !input.disabled;
    const control = this.saveIngredientForm.controls[name];
    this[status] = !input.disabled;


    if (input.disabled) {
      control.patchValue('');
      control.disable();
    } else {
      control.enable();
    }
  }

  save(): void {

    this.submitted = true;
    if (this.saveIngredientForm.valid) {

      this.common.formProcessing = true;
      const ingredient = this.saveIngredientForm.value;
      const fd = new FormData();

      fd.append('image', this.newIngredientImg);
      fd.append('title', ingredient.title);
      fd.append('price', ingredient.price);
      fd.append('light_price', ingredient.light_price);
      fd.append('double_price', ingredient.double_price);
      fd.append('ingredient_ids', ingredient.ingredient_ids);

      if (!this.edit) {

        this.mp.addIngredient(fd).subscribe(() => {
          this.common.formProcessing = false;
          this.toastr.success('The ingredient has been added successfully.', 'Added!');
          this.dialogRef.close();
        });
      } else {
        ingredient._id = this.selectedIngredient._id;
        console.log(ingredient)
        fd.append('_id', this.selectedIngredient._id);
        this.mp.updateIngredient(fd).subscribe(() => {
          this.common.formProcessing = false;
          this.toastr.success('The ingredient has been updated successfully.', 'Updated!');
          this.dialogRef.close();
        });
      }
    }
  }

  getImage(img): void {
    this.newIngredientImg = img.item(0);
    this.saveIngredientForm.patchValue({title: this.newIngredientImg.name.split('.').slice(0, -1).join('.')});
    this.ingredientImg = `${environment.staticUrl}images/${this.newIngredientImg.name}`;
    // this.saveIngredientForm.patchValue({image: this.newIngredientImg.name});
  }

  get titleCtrl(): AbstractControl {
    return this.saveIngredientForm.get('title');
  }

  get priceCtrl(): AbstractControl {
    return this.saveIngredientForm.get('price');
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
