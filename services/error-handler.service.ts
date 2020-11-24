import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  handleError<T>(operation = "operation", result? : T){ // <T> generic type symbolise Observable<Grocery[]> dans le cas présent
    return (error: any): Observable<T> => {
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
