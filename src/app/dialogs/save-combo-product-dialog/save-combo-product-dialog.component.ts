import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ManageProductsService} from '../../services/manage-products.service';

@Component({
  selector: 'app-save-combo-product-dialog',
  templateUrl: './save-combo-product-dialog.component.html',
  styleUrls: ['./save-combo-product-dialog.component.scss']
})
export class SaveComboProductDialogComponent implements OnInit {
  saveComboProductForm: FormGroup;
  products;
  selectedProducts = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private mp: ManageProductsService,
    public dialogRef: MatDialogRef<SaveComboProductDialogComponent>
  ) {
    this.saveComboProductForm = fb.group({
      products: ['', Validators.required],
      special_menu_id: [data.menuId]
    });
  }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.mp.getProducts().subscribe((data: any[]) => {
      this.products = data;
    });
  }

  changeProduct(e) {
    this.selectedProducts = e;
  }

  save() {
    this.mp.addComboProd(this.saveComboProductForm.value).subscribe(data => {
      this.dialogRef.close();
    });
  }

}
