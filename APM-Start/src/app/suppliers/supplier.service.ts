import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Supplier } from '../suppliers/supplier';

import { throwError, Observable, of } from 'rxjs';
import { concatMap, map, mergeMap, switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  suppliersUrl = 'api/suppliers';

  supplierWithMap$ = of(1,5,8)
    .pipe(
      map(id => this.http.get<Supplier>(`${this.suppliersUrl}/${id}`))
    );

  supplierWithConcatMap$ = of(1,5,8)
    .pipe(
      tap(id => console.log('concatMap Source Observable', id)),
      concatMap(id => this.http.get<Supplier>(`${this.suppliersUrl}/${id}`)),
    );

  supplierWithMergeMap$ = of(1,5,8)
    .pipe(
      tap(id => console.log('mergeMap Source Observable', id)),
      mergeMap(id => this.http.get<Supplier>(`${this.suppliersUrl}/${id}`)),
    );

  supplierWithSwitchMap$ = of(1,5,8)
    .pipe(
      tap(id => console.log('switchMap Source Observable', id)),
      switchMap(id => this.http.get<Supplier>(`${this.suppliersUrl}/${id}`)),
    );

  constructor(private http: HttpClient) {
    // this.supplierWithMap$
    //   .subscribe(o => o.subscribe(
    //     item => console.log('map results', item)
    //   ));
    // this.supplierWithConcatMap$.subscribe(item => console.log('concatMap results',item));
    // this.supplierWithMergeMap$.subscribe(item => console.log('mergeMap results',item));
    // this.supplierWithSwitchMap$.subscribe(item => console.log('switchMap results',item));
  }

  private handleError(err: any): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }

}
