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
    return this.http.get(`${environment.url}dashboard/admin/ingr_menu`)
  }

  getIngredients() {
    return this.http.get(`${environment.url}dashboard/admin/ingredient`)
  }

  getProductMenus() {
    return this.http.get(`${environment.url}dashboard/admin/prod_menu`)
  }

  getProducts() {
    return this.http.get(`${environment.url}dashboard/admin/product`)
  }

  getComboMenu() {
    return this.http.get(`${environment.url}dashboard/admin/combo_menu`)
  }

  getCombos() {
    return this.http.get(`${environment.url}dashboard/admin/combo`)
  }


  addIngredientMenu(title) {
    return this.http.post(`${environment.url}dashboard/admin/ingr_menu/add`, {title})
  }

  addIngredient(ingredient) {
    return this.http.post(`${environment.url}dashboard/admin/ingredient/add`, ingredient)
  }

  addProductMenu(title) {
    return this.http.post(`${environment.url}dashboard/admin/prod_menu/add`, {title})
  }

  addProduct(data) {
    return this.http.post(`${environment.url}dashboard/admin/product/add`, data)
  }

  addCombo(data) {
    return this.http.post(`${environment.url}dashboard/admin/combo/add`, data)
  }

  addComboMenu(data) {
    return this.http.post(`${environment.url}dashboard/admin/combo_menu/add`, data)
  }

  addComboProd(data) {
    return this.http.post(`${environment.url}dashboard/admin/combo_prod/add`, data)
  }

  removeComboProd(id) {
    return this.http.delete(`${environment.url}dashboard/admin/combo_prod/delete?id=${id}`);
  }

  removeIngredientMenu(id) {

    return this.http.delete(`${environment.url}dashboard/admin/ingredientmenu/delete?id=${id}`);
  }

  deleteIngredient(id) {
    return this.http.delete(`${environment.url}dashboard/admin/ingredient/delete`, {params: {id}});
  }

  removeProductMenu(id) {
    return this.http.delete(`${environment.url}dashboard/admin/prod_menu/delete`, {params: {id}});
  }

  removeComboMenu(id) {
    return this.http.delete(`${environment.url}dashboard/admin/combo_menu/delete`, {params: {id}});
  }

  removeCombo(id) {
    return this.http.delete(`${environment.url}dashboard/admin/combo/delete`, {params: {id}});
  }

  updateIngredientMenu(val) {
    return this.http.put(`${environment.url}dashboard/admin/ingr_menu/update`, val);
  }

  updateIngredient(val) {
    return this.http.put(`${environment.url}dashboard/admin/ingredient/update`, val);
  }

  updateProductMenu(val) {
    return this.http.put(`${environment.url}dashboard/admin/prod_menu/update`, val);
  }

  updateProduct(val) {
    return this.http.put(`${environment.url}dashboard/admin/product/update`, val);
  }

  updateComboMenu(val) {
    return this.http.put(`${environment.url}dashboard/admin/combo_menu/update`, val);
  }

  updateCombo(val) {
    return this.http.put(`${environment.url}dashboard/admin/combo/update`, val);
  }

  uploadAdVideo(fd) {
    return this.http.post(`${environment.url}dashboard/admin/ads/video/add`, fd);
  }

  uploadKioskVideo(fd) {
    return this.http.post(`${environment.url}dashboard/admin/kiosk/video/add`, fd);
  }

  getAdVideos() {
    return this.http.get(`${environment.url}dashboard/admin/progress_monitor`);
  }

  getKioskVideos() {
    return this.http.get(`${environment.url}dashboard/admin/kiosk/getdata`);
  }

  removeProduct(id) {
    return this.http.delete(`${environment.url}dashboard/admin/product/delete`, {params: {id}});
  }

  updateIngrMenuOrder(data) {
    return this.http.put(`${environment.url}dashboard/admin/ingr_menu/update-order`, data);
  }

  updateIngrOrder(data) {
    return this.http.put(`${environment.url}dashboard/admin/ingredient/update-order`, data);
  }

  updateProductOrder(data) {
    return this.http.put(`${environment.url}dashboard/admin/product/update-order`, data);
  }

  toggleProduct(data) {
    return this.http.put(`${environment.url}dashboard/admin/product/update-visibility`, data);
  }

  toggleProdMenu(data) {
    return this.http.put(`${environment.url}dashboard/admin/prod_menu/update-visibility`, data);
  }

  toggleIngredient(data) {
    return this.http.put(`${environment.url}dashboard/admin/ingredient/update-visibility`, data);
  }

  toggleIngrMenu(data) {
    return this.http.put(`${environment.url}dashboard/admin/ingr_menu/update-visibility`, data);
  }


}
