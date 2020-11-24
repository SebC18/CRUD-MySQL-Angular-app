import { ErrorHandlerService } from './error-handler.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Grocery } from './../models/grocery';

@Injectable({
  providedIn: 'root'
})
export class GroceryListCrudService {
  private url = "http://localhost:3001/groceries";

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  }

  constructor(private errorHandlerService: ErrorHandlerService, private httpClient: HttpClient) { }

  fetchAll(): Observable<Grocery[]> {
    return this.httpClient
      .get<Grocery[]>(this.url, { responseType: "json" }) 
      .pipe(tap((_) => console.log('Fetched groceries...')),
        catchError(
          this.errorHandlerService.handleError<Grocery[]>("fetchAll", []) //ici on connait le type que l'on veut retourner donc on utilise Grocery[]
        )                        // si il y'a une erreur on retourne '[]' un tableau vide
      );
  }

  post(item: Partial<Grocery>): Observable<any> {
    return this.httpClient
      .post<Partial<Grocery>>(this.url, item, this.httpOptions) 
      .pipe(catchError(
        this.errorHandlerService.handleError<any>("post"))); //ici on connait pas le type que l'on veut retourner donc on utilise any
  }

  update(grocery: Grocery): Observable<any> {
    return this.httpClient
      .put<Grocery>(this.url, grocery, this.httpOptions) //update = put
      .pipe(catchError(
        this.errorHandlerService.handleError<any>("update")));
  }

  delete(id: number): Observable<any>{
    const deleteURL = `http://localhost:3001/groceries/${id}`;

    return this.httpClient
    .delete<Grocery>(deleteURL, this.httpOptions) //delete = delete
    .pipe(catchError(
      this.errorHandlerService.handleError<any>("delete")));
  }
}
