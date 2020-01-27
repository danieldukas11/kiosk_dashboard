import {Component, Inject, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ManageProductsService} from '../../services/manage-products.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

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
  selectedProduct;

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
  selectedProdIngredients = [];
  selectedDefaultIngredients = [];

  smallPriceEnabled = true;
  mediumPriceEnabled = true;
  largePriceEnabled = true;

  isSubmitted = false;


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


    this.selectedProduct = data.product;


    this.attachSizes();

    if (this.edit) {
      this.sizable = data.product.sizable;
      this.customizable = data.product.customizable;
      this.selectedIngrMenus = data.productIngredients;
      this.ingrMenus = this.selectedIngrMenus;

      // Getting product ingredients ids to patch "Ingredients for making product" dropdown
      data.productIngredients.forEach(i => {
        this.selectedProdIngredients.push(i._id);
      });


      // Getting default ingredient ids for selected product to patch "Default ingredients" drop down
      const defaultIngrIds = [];
      data.defaultIngredients.forEach(di => {
        di.default_ids.map(id => {
          if (id === data.product._id) {
            defaultIngrIds.push(di._id)
            this.selectedDefaultIngredients.push(di);
          }
        });
      });

      this.saveProductForm = fb.group(this.formFields);
      this.saveProductForm.patchValue(data.product);
      this.saveProductForm.patchValue({
        sizes: data.product.sizes
      });

      this.saveProductForm.patchValue({
        productIngredients: this.selectedProdIngredients,
        defaultIngredients: defaultIngrIds
      });
    }

  }

  ngOnInit(): void {
    this.getIngredientMenus();
    this.getIngredients();
  }

  getInput(title) {
    return title.toLowerCase();
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
        price: ['', [Validators.pattern('^[0-9].*$')]],
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
    if (this.sizable) {
      this.priceCtrl.disable();
    } else {
      this.priceCtrl.enable();
    }
    // console.log(this.saveProductForm.value)
    this.saveProductForm.patchValue({customizable: this.customizable, sizable: this.sizable});
  }

  changeCustomizable(e): void {
    this.customizable = e.value;
    this.sizable = false;
    this.saveProductForm.patchValue({sizable: this.sizable, customizable: this.customizable});
  }

  save() {
    const product = this.saveProductForm.value;
    this.isSubmitted = true;
    console.log(product)

    if (this.saveProductForm.valid) {


      const filteredDefIngr = [];
      if (product.defaultIngredients && product.defaultIngredients.length > 0) {

        // Grabbing selected default ingredients data

        product.defaultIngredients.map(id => {
          filteredDefIngr.push(this.ingredients.filter(i => i._id === id)[0]);
        });

        product.defaultIngredients = filteredDefIngr;

      }
      if (!this.sizable) {
        product.sizes = [];
      }

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


          console.log(filteredDefIngr)
          fd.append('prodIngr', JSON.stringify(product.productIngredients));
          fd.append('defaultIngr', JSON.stringify(filteredDefIngr));
        }


        this.mp.addProduct(fd).subscribe(data => {
          this.dialogRef.close();
        });
      } else {
        product._id = this.selectedProduct._id;
        this.mp.updateProduct(product).subscribe(data => {
          this.dialogRef.close();
        });
      }
    }
  }

  disablePrice(priceInput, titleInput, name): void {

    // Disabling/enabling related title & price inputs
    priceInput.disabled = !priceInput.disabled;
    titleInput.disabled = !titleInput.disabled;

    // getting checkbox status variable and toggling its disable/enable status
    const status = `${name}PriceEnabled`;
    this[status] = !priceInput.disabled;

    // Getting selected price input
    const sizes = this.saveProductForm.controls.sizes as FormGroup;
    const sizeControls = sizes.controls as any;
    const selectedInput = sizeControls.filter(c => c.value.title.includes(titleInput.value))[0];

    // Setting input control as disabled or enabled
    if (priceInput.disabled) {
      selectedInput.disable();
    } else {
      selectedInput.enable();
    }

    // Checking if all inputs are disabled and setting sizable control true or false
    const allDisabled = sizeControls.some(c => !c.disabled);
    this.saveProductForm.patchValue({sizable: allDisabled});
  }


  menuSelected(menus): void {
    this.selectedIngrMenus = [];
    menus.map(menu => {
      this.ingrMenus.map(m => {
        if (m._id === menu) {
          this.selectedIngrMenus.push(m);
        }
      });
    });
  }

  defaultIngrSelected(e) {
    this.selectedDefaultIngredients = e;
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
