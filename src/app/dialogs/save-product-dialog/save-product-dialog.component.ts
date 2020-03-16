import {Component, Inject, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ManageProductsService} from '../../services/manage-products.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {environment} from '../../../environments/environment';
import {CommonService} from '../../services/common.service';

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
  selectedOptionalIngredients = [];

  smallPriceEnabled = true;
  mediumPriceEnabled = true;
  largePriceEnabled = true;

  isSubmitted = false;

  productImg;


  constructor(
    private fb: FormBuilder,
    private mp: ManageProductsService,
    public common: CommonService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<SaveProductDialogComponent>
  ) {

    this.formFields = {
      title: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern('^[0-9].*$')]],
      sizable: [this.sizable, Validators.required],
      customizable: [this.customizable, Validators.required],
      menu_ids: [[data.menuId]],
      productIngredients: [[]],
      defaultIngredients: [[]],
      optionalIngredients: [[]],
      hidden: [false],
      image: ['']
    };

    this.saveProductForm = fb.group(this.formFields);

    this.edit = !!data.product;


    this.selectedProduct = data.product;


    this.attachSizes();

    this.handleEditCase(data);


  }

  ngOnInit(): void {
    this.getIngredientMenus();
    this.getIngredients();

  }

  handleEditCase(data) {

    if (this.edit) {
      this.sizable = this.selectedProduct.sizable;
      this.customizable = this.selectedProduct.customizable;
      this.changeSizable({value: this.selectedProduct.sizable});
      this.changeCustomizable({value: this.selectedProduct.customizable});

      this.selectedIngrMenus = data.productIngredients;
      this.ingrMenus = this.selectedIngrMenus;

      // Getting product ingredients ids to patch "Ingredients for making product" dropdown
      data.productIngredients.forEach(di => {
        if (di.product_ids.includes(this.selectedProduct._id)) {
          console.log(this.selectedProduct._id)

          this.selectedProdIngredients.push(di._id); //Ingredient menu id not ingredient id
        }
      });

      // Getting default ingredient ids for selected product to patch "Default ingredients" drop down
      const defaultIngrIds = [];
      const optionalIngrIds = [];
      data.defaultIngredients.forEach(di => {

        // console.log(di)
        di.default_ids.map(id => {
          if (id === data.product._id) {
            defaultIngrIds.push(di._id)
            this.selectedDefaultIngredients.push(di);
          }
        });

        di.optional_ids.map(id => {
          if (id === data.product._id) {
            optionalIngrIds.push(di._id);
            this.selectedOptionalIngredients.push(di);
          }
        });
      });

      if (this.selectedProduct.image) {
        this.productImg = `${environment.staticUrl}images/${this.selectedProduct.image}`;
      } else {
        this.productImg = `${environment.staticUrl}images/no-image.png`;
      }


      const sizesArr = this.saveProductForm.controls.sizes as any;

      this.saveProductForm = this.fb.group(this.formFields);

      // Check sizable product price fields before patching
      sizesArr.controls.map(c => {
        const f = this.selectedProduct.sizes.filter(s => s.title === c.value.title);

        if (f.length === 0) {
          c.disable();
        } else {
          c.patchValue({price: f[0].price});
          c.enable();
        }
      });

      const copy = JSON.parse(JSON.stringify(this.selectedProduct));
      delete copy.sizes;
      this.saveProductForm.patchValue(copy);

      this.saveProductForm.patchValue({
        productIngredients: this.selectedProdIngredients,
        defaultIngredients: defaultIngrIds,
        optionalIngredients: optionalIngrIds
      });
    }
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

  getOptionals() {
    const defaultIngredients = this.saveProductForm.get('defaultIngredients').value;
    let result = [];
    if (defaultIngredients) {
      // console.log(defaultIngredients, this.ingredients);

      result = this.ingredients.filter((a) => {
        return defaultIngredients.indexOf(a._id) === -1;
      });


    }
    return result;
  }

  checkBoxCheck(p) {
    return p.value;
  }


  changeSizable(e): void {
    this.sizable = e.value;
    // this.customizable = false;
    if (this.sizable) {
      this.priceCtrl.disable();
    } else {
      this.priceCtrl.enable();
    }
    this.saveProductForm.patchValue({customizable: this.customizable, sizable: this.sizable});
  }

  changeCustomizable(e): void {
    this.customizable = e.value;
    // this.sizable = false;
    this.saveProductForm.patchValue({sizable: this.sizable, customizable: this.customizable});
  }

  save() {
    const product = this.saveProductForm.value;
    this.isSubmitted = true;

    // if (this.saveProductForm.valid) {
    this.common.formProcessing = true;


    // const filteredDefIngr = [];
    // if (product.defaultIngredients && product.defaultIngredients.length > 0) {
    //
    //   // Grabbing selected default ingredients data
    //
    //   product.defaultIngredients.map(id => {
    //     filteredDefIngr.push(this.ingredients.filter(i => i._id === id)[0]);
    //   });
    //
    //   product.defaultIngredients = filteredDefIngr;
    //
    // }
    if (!this.sizable) {
      product.sizes = [];
    }


    const fd = new FormData();
    fd.append('image', this.newProductImg);
    fd.append('image_name', this.edit ? product.image : (this.newProductImg ? this.newProductImg.name : ''));
    fd.append('title', product.title);
    fd.append('sizable', product.sizable);
    fd.append('customizable', product.customizable);
    fd.append('hidden', product.hidden);
    fd.append('menu_ids', JSON.stringify(product.menu_ids))
    if (!this.sizable) {
      fd.append('price', product.price);
    }

    if (this.sizable) {
      fd.append('sizes', JSON.stringify(product.sizes));
    }
    // if (this.customizable) {


    // console.log(filteredDefIngr)
    fd.append('prodIngr', JSON.stringify(this.customizable ? product.productIngredients : []));
    fd.append('optionalIngr', JSON.stringify(this.customizable ? product.optionalIngredients : []));
    fd.append('defaultIngr', JSON.stringify(this.customizable ? product.defaultIngredients : []));
    // }

    if (!this.edit) {
      this.mp.addProduct(fd).subscribe(data => {
        this.common.formProcessing = false;
        this.dialogRef.close();
      });
    } else {
      product._id = this.selectedProduct._id;
      fd.append('_id', product._id);
      this.mp.updateProduct(fd).subscribe(data => {
        this.common.formProcessing = false;
        this.dialogRef.close();
      });
    }
    // }
  }

  removeProductImg() {
    this.productImg = null;
    this.saveProductForm.patchValue({image: ''})
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
    // console.log(sizeControls)
    // console.log(sizeControls[0].value.title, titleInput.value)
    // console.log(sizeControls[1].value.title, titleInput.value)
    // console.log(sizeControls[2].value.title, titleInput.value)
    const selectedInput = sizeControls.filter(c => c.value.title.includes(titleInput.value))[0];

    // Setting input control as disabled or enabled
    if (priceInput.disabled && selectedInput) {
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

  visibilityChanged(e) {
    console.log(e.checked)
    this.saveProductForm.patchValue({hidden: e.checked});
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

  get imageFieldCtrl(): AbstractControl {
    return this.saveProductForm.get('image');
  }

}
