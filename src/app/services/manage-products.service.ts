import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ManageProductsService {

  constructor(
    private http:HttpClient
  ) { }
  getIngredientMenus(){  
    return  this.http.get("dashboard/admin/ingr_menu")
  }

  getIngredients(){  
    return  this.http.get("dashboard/admin/ingredient")
  }
  getProductMenus(){
    return  this.http.get("dashboard/admin/prod_menu")
  }
  getProducts(){
    return  this.http.get("dashboard/admin/product")
  }
  getComboMenu(){
    return  this.http.get("dashboard/admin/combo_menu")
  }
  

  addIngredientMenu(title){
    return this.http.post("dashboard/admin/ingr_menu/add",{title})
  }

  addIngredient(ingredient){
    return this.http.post("dashboard/admin/ingredient/add",ingredient)
  }
  addProductMenu(title){
    return this.http.post("dashboard/admin/prod_menu/add",{title})
  }
  addProduct(data){
    return this.http.post("dashboard/admin/product/add",data)
  }
  addCombo(data){
    return this.http.post("dashboard/admin/combo/add",data)
  }
  addComboMenu(data){
    return this.http.post("dashboard/admin/combo_menu/add",data)
  }
  addComboProd(data){
    return this.http.post("dashboard/admin/combo_prod/add",data)
  }
  deleteIngredient(id){
    return this.http.delete("dashboard/admin/ingredient/delete",{params:{id:id}})
  }
}
