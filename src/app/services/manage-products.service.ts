import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from "../../environments/environment"


@Injectable({
  providedIn: 'root'
})
export class ManageProductsService {

  constructor(
    private http: HttpClient
  ) {
  }

  getIngredientMenus() {
    return this.http.get(`${environment.staticUrl}dashboard/admin/ingr_menu`)
  }

  getIngredients() {
    return this.http.get(`${environment.staticUrl}dashboard/admin/ingredient`)
  }

  getProductMenus() {
    return this.http.get(`${environment.staticUrl}dashboard/admin/prod_menu`)
  }

  getProducts() {
    return this.http.get(`${environment.staticUrl}dashboard/admin/product`)
  }

  getComboMenu() {
    return this.http.get(`${environment.staticUrl}dashboard/admin/combo_menu`)
  }

  getCombos() {
    return this.http.get(`${environment.staticUrl}dashboard/admin/combo`)
  }


  addIngredientMenu(title) {
    return this.http.post(`${environment.staticUrl}dashboard/admin/ingr_menu/add`, {title})
  }

  addIngredient(ingredient) {
    return this.http.post(`${environment.staticUrl}dashboard/admin/ingredient/add`, ingredient)
  }

  addProductMenu(title) {
    return this.http.post(`${environment.staticUrl}dashboard/admin/prod_menu/add`, {title})
  }

  addProduct(data) {
    return this.http.post(`${environment.staticUrl}dashboard/admin/product/add`, data)
  }

  addCombo(data) {
    return this.http.post(`${environment.staticUrl}dashboard/admin/combo/add`, data)
  }

  addComboMenu(data) {
    return this.http.post(`${environment.staticUrl}dashboard/admin/combo_menu/add`, data)
  }

  addComboProd(data) {
    return this.http.post(`${environment.staticUrl}dashboard/admin/combo_prod/add`, data)
  }

  removeComboProd(id) {
    return this.http.delete(`${environment.staticUrl}dashboard/admin/combo_prod/delete?id=${id}`);
  }

  removeIngredientMenu(id) {

    return this.http.delete(`${environment.staticUrl}dashboard/admin/ingredientmenu/delete?id=${id}`);
  }

  deleteIngredient(id) {
    return this.http.delete(`${environment.staticUrl}dashboard/admin/ingredient/delete`, {params: {id: id}})
  }
}
