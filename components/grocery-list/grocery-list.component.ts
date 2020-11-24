import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Grocery } from 'src/app/models/grocery';

import { GroceryListCrudService } from './../../services/grocery-list-crud.service';



@Component({
  selector: 'app-grocery-list',
  templateUrl: './grocery-list.component.html',
  styleUrls: ['./grocery-list.component.scss']
})
export class GroceryListComponent implements OnInit {
groceries$ : Observable<Grocery[]>; // le '$' est une convention pour dire que c'est un Observable

  constructor(private groceryListCrudService: GroceryListCrudService) { }

  ngOnInit(): void {
    this.groceries$ = this.fetchAll();
  }
  fetchAll() : Observable<Grocery[]>{
    return  this.groceryListCrudService.fetchAll();
  }

  post(groceryItem: Partial<Grocery>): void{
    const item = (<string>groceryItem).trim(); //trim enlève tous les espaces avant le premier mot (evite les erreurs de frappes)
    if (!item) return;
    this.groceries$ = this.groceryListCrudService
    .post({ item })
    .pipe(tap((_)=> (this.groceries$ = this.fetchAll()))
    );
  }

  update(id: number, newItem: Partial<Grocery>): void {
    const item = (<string>newItem).trim(); 
    if (!item) return;
    
    const newGrocery : Grocery = { 
      id, 
      item
    }

    this.groceries$ = this.groceryListCrudService
    .update(newGrocery)
    .pipe(tap((_)=> (this.groceries$ = this.fetchAll()))
    );
  }

  delete(id: number) : void {
    this.groceries$ = this.groceryListCrudService
    .delete(id)
    .pipe(tap((_)=> (this.groceries$ = this.fetchAll())));
  }

}
