import {Component, Inject, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ManageProductsService} from '../../services/manage-products.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-save-product-dialog',
  templateUrl: './save-product-dialog.component.html',
  styleUrls: ['./save-product-dialog.component.scss']
})
export class SaveProductDialogComponent implements OnInit {
  saveProductForm: FormGroup;
  sizable = false;
  customizable = false;
  edit = false;

  ingrMenus = [];
  ingredients = [];
  selectedIngrMenus = [];
  sizes = [
    {
      title: 'Small',
      price: '',
      requiredMsg: 'Price for small size is <strong>required</strong>',
      numericMsg: 'Price for small size should be <strong>number</strong>'
    },
    {
      title: 'Medium',
      price: '',
      requiredMsg: 'Price for medium size is <strong>required</strong>',
      numericMsg: 'Price for medium size should be <strong>number</strong>'
    },
    {
      title: 'Large',
      price: '',
      requiredMsg: 'Price for large size is <strong>required</strong>',
      numericMsg: 'Price for medium size should be <strong>number</strong>'
    }
  ];

  newProductImg;

  formFields;

  constructor(
    private fb: FormBuilder,
    private mp: ManageProductsService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<SaveProductDialogComponent>
  ) {

    this.formFields = {
      title: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern('^[0-9].*$')]],
      sizable: [this.sizable, Validators.required],
      customizable: [this.customizable, Validators.required],
      menu_ids: [[data.menuId]],
      productIngredients: [],
      defaultIngredients: [],
    };

    this.saveProductForm = fb.group(this.formFields);

    this.edit = !!data.product;

    this.attachSizes();

    if (this.edit) {
      this.saveProductForm = fb.group(this.formFields);
      this.saveProductForm.patchValue(data.product);
    }

  }

  ngOnInit(): void {
    this.getIngredientMenus();
    this.getIngredients();
  }

  attachSizes(): void {

    this.formFields.sizes = this.fb.array(
      [
        this.createSizesFormGroup('Small Price'),
        this.createSizesFormGroup('Medium Price'),
        this.createSizesFormGroup('Large Price')
      ],
      [Validators.required]
    );
    this.saveProductForm = this.fb.group(this.formFields);
  }


  createSizesFormGroup(title): FormGroup {
    return this.fb.group({
        title: [title, [Validators.required]],
        price: ['', [Validators.required, Validators.pattern('^[0-9].*$')]],
      }
    );
  }

  getImage(img): void {
    this.newProductImg = img.item(0);
    // this.ingredientImg = `${environment.staticUrl}images/${this.newIngredientImg.name}`;
    this.saveProductForm.patchValue({image: this.newProductImg.name});
  }


  getIngredientMenus(): void {
    this.mp.getIngredientMenus().subscribe((data: any[]) => {
      this.ingrMenus = data;
    });
  }

  getIngredients(): void {
    this.mp.getIngredients().subscribe((data: any[]) => {
      this.ingredients = data;
    });
  }

  getIngredientsByMenu(id) {
    return this.ingredients.filter(ingr => {
      return ingr.ingredient_ids[0] === id;
    });
  }


  changeSizable(e): void {
    this.sizable = e.value;
    this.customizable = false;
  }

  changeCustomizable(e): void {
    this.customizable = e.value;
    this.sizable = false;
  }

  save() {
    const product = this.saveProductForm.value;

    if (!this.sizable) {
      product.sizes = [];
    }
    console.log(product.menu_ids)

    if (!this.edit) {
      const fd = new FormData();
      fd.append('image', this.newProductImg);
      fd.append('title', product.title);
      fd.append('sizable', product.sizable);
      fd.append('customizable', product.customizable);
      fd.append('menu_ids', JSON.stringify(product.menu_ids))
      if (!this.sizable && !this.customizable) {
        fd.append('price', product.price);
      }

      if (this.sizable) {
        fd.append('sizes', JSON.stringify(product.sizes));
      }
      if (this.customizable) {
        fd.append('prodIngr', JSON.stringify(product.productIngredients));
        fd.append('defaultIngr', JSON.stringify(product.defaultIngredients));
      }
      console.log(product)
      this.mp.addProduct(fd).subscribe(data => {
        this.dialogRef.close();
      });
    }

    console.log(this.saveProductForm.value)
  }


  menuSelected(menus): void {
    this.selectedIngrMenus = menus;
  }

  get titleCtrl(): AbstractControl {
    return this.saveProductForm.get('title');
  }

  get priceCtrl(): AbstractControl {
    return this.saveProductForm.get('price');
  }

  get sizesArr(): FormArray {
    return this.saveProductForm.get('sizes') as FormArray;
  }

}
