import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ManageProductsService} from '../../services/manage-products.service';

@Component({
  selector: 'app-save-combo-dialog',
  templateUrl: './save-combo-dialog.component.html',
  styleUrls: ['./save-combo-dialog.component.scss']
})
export class SaveComboDialogComponent implements OnInit {
  saveComboForm: FormGroup;

  selectedComboMenus = [];
  selectedComboProducts = [];
  comboMenus = [];
  products = [];
  edit = false;
  submitted = false;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private mp: ManageProductsService,
    public dialogRef: MatDialogRef<SaveComboDialogComponent>
  ) {

    this.edit = !!data.combo;

    this.saveComboForm = fb.group({
      title: ['', Validators.required],
      combo_menu: ['', Validators.required],
      combo_prod: ['', Validators.required],
      combo_default: ['', Validators.required],
      image: ['', Validators.required]
    });

    if (this.edit) {
      this.saveComboForm.patchValue(data.combo);
    }
  }

  ngOnInit() {
    this.getComboMenus();
    this.getProducts();
  }

  getComboMenus() {
    this.mp.getComboMenu().subscribe((data: any[]) => {
      this.comboMenus = data;
    });
  }

  getComboProdByMenu(id) {
    this.selectedComboProducts = this.products.filter(prod => {
      return prod.special_menu_ids[0] === id;
    });
    return this.selectedComboProducts;
  }

  changeComboMenu(e) {
    this.selectedComboMenus = e;
  }

  changeComboProducts(e) {
    this.selectedComboProducts = e;
  }

  getProducts() {
    this.mp.getProducts().subscribe((data: any[]) => {
      this.products = data;
    });
  }


  getComboDefProdByMenu(id) {
    if (this.comboProdsCtrl.value && this.comboProdsCtrl.value.length) {

      return this.comboProdsCtrl.value.filter(prod => {
        return prod.special_menu_ids[0] === id;
      });
    }

  }

  save() {
    this.submitted = true;
  }

  get comboMenuCtrl(): AbstractControl {
    return this.saveComboForm.get('combo_menu');
  }

  get comboProdsCtrl(): AbstractControl {
    return this.saveComboForm.get('combo_prod');
  }

  get comboDefaultCtrl(): AbstractControl {
    return this.saveComboForm.get('combo_default');
  }

  get comboTitleCtrl(): AbstractControl {
    return this.saveComboForm.get('title');
  }

  get imageFieldCtrl(): AbstractControl {
    return this.saveComboForm.get('image');
  }


}
