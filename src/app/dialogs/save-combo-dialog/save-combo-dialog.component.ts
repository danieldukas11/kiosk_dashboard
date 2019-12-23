import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ManageProductsService} from '../../services/manage-products.service';
import {ToastrService} from 'ngx-toastr';

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
  comboImg;
  selectedCombo;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private mp: ManageProductsService,
    public dialogRef: MatDialogRef<SaveComboDialogComponent>,
    private toastr: ToastrService
  ) {

    this.edit = !!data.combo;

    this.saveComboForm = fb.group({
      title: ['', Validators.required],
      comboMenu: ['', Validators.required],
      products: ['', Validators.required],
      defaults: ['', Validators.required],
      image: ['', Validators.required]
    });

    if (this.edit) {
      this.selectedCombo = data.combo;
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

  getImage(e) {
    this.comboImg = e.target.files;
    this.saveComboForm.patchValue({image: this.comboImg[0].name});
  }

  save() {
    this.submitted = true;

    // if (this.saveComboForm.valid) {


    const fd: FormData = new FormData();
    console.log(this.saveComboForm.value.products)

    let price = 0;
    if (this.comboDefaultCtrl.value && this.comboDefaultCtrl.value.length) {
      this.comboDefaultCtrl.value.forEach(d => {
        price += d.price;
      });
    }
    fd.append('title', this.saveComboForm.value.title);


    if (!this.edit) {
      fd.append('price', JSON.stringify(price));


      fd.append('products', JSON.stringify(this.saveComboForm.value.products));
      fd.append('comboMenu', JSON.stringify(this.saveComboForm.value.comboMenu));
      fd.append('defaults', JSON.stringify(this.saveComboForm.value.defaults));
      fd.append('image', this.comboImg ? this.comboImg[0] : '');
      this.mp.addCombo(fd).subscribe(dt => {
        this.toastr.success('The combo has been added successfully.', 'Added!');
        this.dialogRef.close();
      });
    } else {
      const updateData = {_id: this.selectedCombo._id, title: this.saveComboForm.value.title}
      this.mp.updateCombo(updateData).subscribe(dt => {
        this.toastr.success('The combo has been updated successfully.', 'Updated!');
        this.dialogRef.close();
      });
    }
    // }
  }

  get comboMenuCtrl(): AbstractControl {
    return this.saveComboForm.get('comboMenu');
  }

  get comboProdsCtrl(): AbstractControl {
    return this.saveComboForm.get('products');
  }

  get comboDefaultCtrl(): AbstractControl {
    return this.saveComboForm.get('defaults');
  }

  get comboTitleCtrl(): AbstractControl {
    return this.saveComboForm.get('title');
  }

  get imageFieldCtrl(): AbstractControl {
    return this.saveComboForm.get('image');
  }


}
