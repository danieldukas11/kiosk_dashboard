import {Component, OnInit} from '@angular/core';
import {ManageProductsService} from '../../services/manage-products.service';
import {environment} from '../../../environments/environment'
import {FormControl} from '@angular/forms';
import {fromEvent} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {SaveIngredientMenuDialogComponent} from '../../dialogs/save-ingredient-menu-dialog/save-ingredient-menu-dialog.component';
import {SaveProductMenuDialogComponent} from '../../dialogs/save-product-menu-dialog/save-product-menu-dialog.component';
import {SaveComboMenuDialogComponent} from '../../dialogs/save-combo-menu-dialog/save-combo-menu-dialog.component';
import {SaveIngredientDialogComponent} from '../../dialogs/save-ingredient-dialog/save-ingredient-dialog.component';
import {SaveProductDialogComponent} from '../../dialogs/save-product-dialog/save-product-dialog.component';
import {SaveComboProductDialogComponent} from '../../dialogs/save-combo-product-dialog/save-combo-product-dialog.component';
import {SaveComboDialogComponent} from '../../dialogs/save-combo-dialog/save-combo-dialog.component';
import {ToastrService} from 'ngx-toastr';
import {ConfirmationDialogComponent} from '../../dialogs/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.scss']
})
export class ProductManagementComponent implements OnInit {
  imgurl = environment.staticUrl + "images";

  dialogOpened = false;
  dialogType = "";

  ingr_menus = [];
  ingredients = [];
  prod_menus = [];
  products = [];
  combos = [];
  comboMenus = []
  ComboProds = []

  prodIngr = new FormControl();
  defaultIngr = new FormControl();
  combo_prod = new FormControl();
  combo_menu = new FormControl();
  combo_default = new FormControl();
  ingrMenuTitle = "";
  img;
  disableExpansionOnPanel = false;

  ingredient = {
    title: "",
    light_price: "",
    price: "",
    double_price: "",
    ingredient_ids: "",

  };
  product = {
    title: "",
    price: "",
    sizable: "false",
    customizable: "false",
    menu_ids: [],
    sizes: [
      {
        title: "Small",
        price: ""
      },
      {
        title: "Medium",
        price: ""
      },
      {
        title: "Large",
        price: ""
      }
    ]
  };
  comboMenu = {
    title: "",
    configurable: "false"
  }
  combo = {
    title: "",
  };
  comboProd = {
    products: [],
    special_menu_id: ""

  }

  constructor(
    private mp: ManageProductsService,
    private matDialog: MatDialog,
    private toastr: ToastrService
  ) {
  }

  ngOnInit() {


    this.mp.getIngredientMenus().subscribe((data: any[]) => {
      this.ingr_menus = data
      // console.log(this.ingr_menus)
    })
    this.mp.getIngredients().subscribe((data: any[]) => {
      this.ingredients = data
      // console.log(this.ingredients)
    })
    this.mp.getProductMenus().subscribe((data: any[]) => {
      this.prod_menus = data
    })
    this.mp.getProducts().subscribe((data: any[]) => {
      this.products = data
    })
    this.mp.getComboMenu().subscribe((data: any[]) => {
      this.comboMenus = data
    })

    this.mp.getCombos().subscribe((data: any[]) => {
      this.combos = data;
    });
  }

  resetform() {
    this.ingrMenuTitle = ""
    this.ingredient.title = ""
    this.ingredient.light_price = ""
    this.ingredient.price = ""
    this.ingredient.double_price = ""
    this.ingredient.ingredient_ids = ""
    this.prodIngr = new FormControl();
    this.defaultIngr = new FormControl();
    this.product.customizable = "false"
    this.product.price = ""
    this.product.title = ""
    this.product.sizable = "false"
    this.product.menu_ids = [];
    this.combo_prod = new FormControl();
    this.combo_menu = new FormControl();
    this.comboProd.products = [],
      this.comboProd.special_menu_id = "";
    this.comboMenu.title = "",
      this.comboMenu.configurable = "false"
    this.product.sizes = [
      {
        title: "Small",
        price: ""
      },
      {
        title: "Medium",
        price: ""
      },
      {
        title: "Large",
        price: ""
      }
    ]
    this.img = null
  }

  add(type) {
    let frm = new FormData();
    switch (type) {
      case "Ingredient Menu":
        let ingrmenu = this.mp.addIngredientMenu(this.ingrMenuTitle).subscribe(data => {
          this.ingr_menus.push(data);
          this.dialogOpened = false
          this.dialogType = ""
          this.resetform()
          ingrmenu.unsubscribe()
        })
        break;
      case "Ingredient":

        frm.append("image", this.img);
        frm.append("title", this.ingredient.title)
        frm.append("price", this.ingredient.price)
        frm.append("light_price", this.ingredient.light_price)
        frm.append("double_price", this.ingredient.double_price)
        frm.append("ingredient_ids", this.ingredient.ingredient_ids)
        let ingrs = this.mp.addIngredient(frm).subscribe((data => {
          console.log(data)
          this.ingredients.push(data)
          this.dialogOpened = false
          this.dialogType = ""
          this.resetform()
          ingrs.unsubscribe()
        }))
        break;
      case "Product Menu":
        let prodm = this.mp.addProductMenu(this.ingrMenuTitle).subscribe((data) => {
          this.prod_menus.push(data);
          this.dialogOpened = false
          this.dialogType = ""
          this.resetform()
          prodm.unsubscribe()
        })
        break
      case "Product":
        console.log(this.product.menu_ids)
        frm.append("image", this.img);
        frm.append("title", this.product.title);
        frm.append("sizable", this.product.sizable);
        frm.append("customizable", this.product.customizable);
        frm.append("menu_ids", JSON.stringify(this.product.menu_ids))
        if (this.product.sizable == "false" && this.product.customizable == "false") {
          frm.append("price", this.product.price);
        }

        if (this.product.sizable == "true") {
          frm.append("sizes", JSON.stringify(this.product.sizes))
        }
        if (this.product.customizable == "true") {
          frm.append("prodIngr", JSON.stringify(this.prodIngr.value));
          frm.append("defaultIngr", JSON.stringify(this.defaultIngr.value))
        }
        this.mp.addProduct(frm).subscribe(data => {
          this.products.push(data)
          this.dialogOpened = false
          this.dialogType = ""
          this.resetform()
        })
        break;
      case "Combo":
        let price = 0
        if (this.combo_default.value && this.combo_default.value.length) {
          this.combo_default.value.forEach(d => {
            price += d.price
          });
          console.log(price)

        }
        frm.append("image", this.img);
        frm.append("title", this.combo.title);
        frm.append("price", JSON.stringify(price));
        frm.append("products", JSON.stringify(this.combo_prod.value));
        frm.append("comboMenu", JSON.stringify(this.combo_menu.value));
        frm.append("defaults", JSON.stringify(this.combo_default.value));
        console.log(this.combo_default.value)
        this.mp.addCombo(frm).subscribe(data => {
          this.dialogOpened = false
          this.dialogType = ""
          this.resetform()
          console.log(data)
          this.combos.push(data)
        })
        break
      case "Combo Menu":
        this.mp.addComboMenu(this.comboMenu).subscribe(data => {
          console.log(data)
          this.comboMenus.push(data);
          this.dialogOpened = false
          this.dialogType = ""
          this.resetform()
        })
        break;
      case "Combo Product":
        this.combo_prod.value.forEach(dat => {
          this.comboProd.products.push(dat._id)
        });
        console.log(this.comboProd)
        this.mp.addComboProd(this.comboProd).subscribe(data => {
          console.log(data)
          this.dialogOpened = false
          this.dialogType = ""
          this.resetform()
        })
        break
    }
  }

  getIngrByMenu(id) {
    return this.ingredients.filter(ingr => {
      return ingr.ingredient_ids[0] == id
    })
  }

  getProdByMenu(id) {
    let a = this.products.filter(prod => {
      return prod.menu_ids[0] == id
    })
    return a;
  }

  getComboProdByMenu(id) {
    return this.products.filter(prod => {
      return prod.special_menu_ids[0] == id
    })
  }

  getComboDefProdByMenu(id) {
    if (this.combo_prod.value && this.combo_prod.value.length) {

      return this.combo_prod.value.filter(prod => {
        return prod.special_menu_ids[0] == id
      })
      return null
    }
  }

  deleteIngredient(id) {
    this.matDialog.open(ConfirmationDialogComponent, {data: {}, maxWidth: '400px'}).afterClosed().subscribe((r) => {
      if (r) {
        this.mp.deleteIngredient(id).subscribe(() => {
          this.toastr.success('The ingredient has been removed successfully.', 'Removed!');
          this.ingredients = this.ingredients.filter(data => {
            return data._id !== id
          });
        });
      }
    });
  }

  removeComboProduct(id) {

    this.matDialog.open(ConfirmationDialogComponent, {data: {}, maxWidth: '400px'}).afterClosed().subscribe((r) => {
      if (r) {
        this.mp.removeComboProd(id).subscribe(dt => {
          this.toastr.success('The combo product has been removed successfully.', 'Removed!');
          this.products = this.products.filter(prod => {
            return prod._id !== id;
          });
        });
      }
    });
  }

  removeIngredientMenu(e, id) {
    this.disableExpansionOnPanel = true;
    e.stopPropagation();

    this.matDialog.open(ConfirmationDialogComponent, {data: {}, maxWidth: '400px'}).afterClosed().subscribe((r) => {
      if (r) {
        this.mp.removeIngredientMenu(id).subscribe(d => {
          this.toastr.success('The ingredient menu has been removed successfully.', 'Removed!');
          this.ingr_menus = this.ingr_menus.filter(m => m._id !== id);
        });
      }
    });
  }

  getImage(img) {
    this.img = img.item(0);
  }


  // Ingredient menu dialog
  openIngredientMenuDialog(e, menu = null) {
    e.stopPropagation();
    this.disableExpansionOnPanel = true;
    this.matDialog.open(SaveIngredientMenuDialogComponent, {data: {menu}}).afterClosed().subscribe(() => {
      this.mp.getIngredientMenus().subscribe((data: any[]) => {
        this.ingr_menus = data;
      });
    });
  }


  // Ingredient dialog
  openIngredientDialog(menuId, ingredient = null) {

    // this.dialogOpened = true;
    // this.dialogType = 'Ingredient';
    // this.ingredient.ingredient_ids = menuId;


    this.matDialog.open(SaveIngredientDialogComponent, {
      data: {
        menuId,
        ingredient,
      }
    }).afterClosed().subscribe(() => {
      this.mp.getIngredients().subscribe((data: any[]) => {
        this.ingredients = data;
      });
    });
  }


  // Product menu dialog
  openProductMenuDialog(menu = null) {
    this.matDialog.open(SaveProductMenuDialogComponent, {data: {menu}}).afterClosed().subscribe(() => {
      this.mp.getProductMenus().subscribe((data: any[]) => {
        this.prod_menus = data;
      });
    });

  }

  // Product dialog
  openProductDialog(menuId, product = null) {
    // this.dialogOpened = true;
    // this.dialogType = 'Product';
    // this.product.menu_ids[0] = menuId;

    this.matDialog.open(SaveProductDialogComponent, {
      data: {
        menuId,
        product,
        productIngredients: this.ingr_menus,
        defaultIngredients: this.ingredients
      }
    }).afterClosed().subscribe(() => {
      this.mp.getProducts().subscribe((data: any[]) => {
        this.products = data;
      });
      this.mp.getIngredients().subscribe((data: any[]) => {
        this.ingredients = data;
      });
    });
  }

  openComboMenuDialog(menu = null) {
    // this.dialogOpened = true;
    // this.dialogType = 'Combo Menu';
    // this.comboProd.special_menu_id = menuId;

    this.matDialog.open(SaveComboMenuDialogComponent, {data: {menu}}).afterClosed().subscribe(() => {
      this.mp.getComboMenu().subscribe((data: any[]) => {
        this.comboMenus = data;
      });
    });
  }


  openComboProductDialog(menuId, product = null) {
    // this.dialogOpened = true;
    // this.dialogType = 'Combo Product';
    // this.comboProd.special_menu_id = menuId;

    this.matDialog.open(SaveComboProductDialogComponent, {
      width: '500px',
      data: {
        menuId,
        product,
        productIngredients: this.ingr_menus
      }
    }).afterClosed().subscribe(() => {
      this.mp.getProducts().subscribe((data: any[]) => {
        this.products = data;
        this.prod_menus.forEach((prodMenu) => {
          this.getProdByMenu(prodMenu._id);
        });
      });
    });
  }

  openComboDialog(combo = null) {
    // this.dialogOpened = true;
    // this.dialogType = 'Combo';

    this.matDialog.open(SaveComboDialogComponent, {
      width: '500px',
      data: {
        combo
      }
    }).afterClosed().subscribe(() => {
      this.mp.getCombos().subscribe((dt: any) => {
        this.combos = dt;
      });
    });


  }

  removeProductMenu(id) {
    this.matDialog.open(ConfirmationDialogComponent, {data: {}, maxWidth: '400px'}).afterClosed().subscribe((r) => {
      if (r) {
        this.mp.removeProductMenu(id).subscribe(dt => {
          this.toastr.success('The product menu has been removed successfully.', 'Removed!');
          this.prod_menus = this.prod_menus.filter(data => {
            return data._id !== id;
          });
        });
      }
    });
  }

  removeComboMenu(id) {
    this.matDialog.open(ConfirmationDialogComponent, {data: {}, maxWidth: '400px'}).afterClosed().subscribe((r) => {
      if (r) {
        this.mp.removeComboMenu(id).subscribe(dt => {
          this.toastr.success('The combo menu has been removed successfully.', 'Removed!');
          this.comboMenus = this.comboMenus.filter(data => {
            return data._id !== id;
          });
        });
      }
    });
  }

  removeCombo(id) {
    this.matDialog.open(ConfirmationDialogComponent, {data: {}, maxWidth: '400px'}).afterClosed().subscribe((r) => {
      if (r) {
        this.mp.removeCombo(id).subscribe(dt => {
          this.combos = this.combos.filter(data => {
            return data._id !== id;
          });
        });
      }
    });
  }

  removeProduct(id) {
    this.matDialog.open(ConfirmationDialogComponent, {data: {}, maxWidth: '400px'}).afterClosed().subscribe((r) => {
      if (r) {
        this.mp.removeProduct(id).subscribe(dt => {
          this.toastr.success('The product has been removed successfully.', 'Removed!');
          this.products = this.products.filter(data => {
            return data._id !== id;
          });
        });
      }
    });
  }

  moveIngrMenu(e, direction, ingrMenu) {
    e.stopPropagation();
    this.mp.updateIngrMenuOrder({direction, _id: ingrMenu._id, order: ingrMenu.order}).subscribe(dt => {
      this.mp.getIngredientMenus().subscribe((data: any[]) => {
        this.ingr_menus = data;
      });
    });
  }

  moveIngredient(e, direction, ingr) {
    e.stopPropagation();
    this.mp.updateIngrOrder({direction, _id: ingr._id, order: ingr.order}).subscribe(dt => {
      this.mp.getIngredients().subscribe((data: any[]) => {
        this.ingredients = data;
      });
    });
  }

  moveProductMenu(e, direction, prodMenu) {
    e.stopPropagation();
    this.mp.updateProductOrder({direction, _id: prodMenu._id, order: prodMenu.order}).subscribe(dt => {
      this.mp.getProductMenus().subscribe((data: any[]) => {
        this.prod_menus = data;
      });
    });
  }

  moveProduct(e, direction, prod) {
    e.stopPropagation();
    this.mp.updateProductOrder({direction, _id: prod._id, order: prod.order}).subscribe(dt => {
      this.mp.getProducts().subscribe((data: any[]) => {
        this.products = data;
      });
    });
  }



  toggleProdMenu(e, prodMenu) {
    this.mp.toggleProdMenu({hidden: !e.checked, _id: prodMenu._id}).subscribe(() => {

    });
  }

  clicked(e) {
    e.preventDefault();
  }

  toggleProduct(e, product) {
    console.log(e)
    this.mp.toggleProduct({hidden: !e.checked, _id: product._id}).subscribe(() => {

    });
  }

  toggleIngrMenu(e, ingrMenu) {
    this.mp.toggleIngrMenu({hidden: !e.checked, _id: ingrMenu._id}).subscribe(() => {

    });
  }

  toggleIngredient(e, ingredient) {
    this.mp.toggleIngredient({hidden: !e.checked, _id: ingredient._id}).subscribe(() => {

    });
  }

}
