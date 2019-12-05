import {Component, Inject, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ManageProductsService} from '../../services/manage-products.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

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
    {title: 'Small', price: ''},
    {title: 'Medium', price: ''},
    {title: 'Large', price: ''}
  ];

  constructor(
    private fb: FormBuilder,
    private mp: ManageProductsService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.saveProductForm = fb.group({
      title: ['', Validators.required],
      price: ['', Validators.required],
      sizable: [this.sizable, Validators.required],
      customizable: [this.customizable, Validators.required],
      menu_ids: [data.menuId],
      sizes: new FormArray([
        new FormGroup({
          title: new FormControl('Small Price'),
          price: new FormControl(''),
        }),
        new FormGroup({
          title: new FormControl('Medium Price'),
          price: new FormControl(''),
        }),
        new FormGroup({
          title: new FormControl('Large Price'),
          price: new FormControl(''),
        })
      ]),

      productIngredients: [],
      defaultIngredients: []
    });

    this.edit = !!data.product;

    if (this.edit) {
      this.saveProductForm.patchValue(data.product);
    }
  }

  ngOnInit() {
    this.getIngredientMenus();
    this.getIngredients();
  }

  getIngredientMenus() {
    this.mp.getIngredientMenus().subscribe((data: any[]) => {
      this.ingrMenus = data;
    });
  }

  getIngredients() {
    this.mp.getIngredients().subscribe((data: any[]) => {
      this.ingredients = data;
    });
  }

  getIngredientsByMenu(id) {
    return this.ingredients.filter(ingr => {
      return ingr.ingredient_ids[0] === id;
    });
  }


  changeSizable(e) {
    this.sizable = e.value;
  }

  changeCustomizable(e) {
    this.customizable = e.value;
  }

  save() {
    console.log(this.saveProductForm.value)
  }


  menuSelected(menus) {
    this.selectedIngrMenus = menus;
  }

  get titleCtrl() {
    return this.saveProductForm.get('title');
  }

  get priceCtrl() {
    return this.saveProductForm.get('price');
  }

}
