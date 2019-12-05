import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ManageProductsService} from '../../services/manage-products.service';

@Component({
  selector: 'app-save-product-dialog',
  templateUrl: './save-product-dialog.component.html',
  styleUrls: ['./save-product-dialog.component.scss']
})
export class SaveProductDialogComponent implements OnInit {
  saveProductForm: FormGroup;
  sizable = false;
  customizable = false;

  ingrMenus = [];

  constructor(
    private fb: FormBuilder,
    private mp: ManageProductsService
  ) {
    this.saveProductForm = fb.group({
      title: ['', Validators.required],
      price: ['', Validators.required],
      sizable: [this.sizable, Validators.required],
      customizable: [this.customizable, Validators.required],
      productIngredients: [],
      defaultIngredients: []
    });
  }

  ngOnInit() {
    this.getIngredientMenus();
  }

  getIngredientMenus() {
    this.mp.getIngredientMenus().subscribe((data: any[]) => {
      this.ingrMenus = data;
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

}
