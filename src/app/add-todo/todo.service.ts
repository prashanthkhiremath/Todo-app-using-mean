import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Todo } from './todo.model';
import { HttpHeaders } from '@angular/common/http';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})

export class TodoService {
  private todo: Todo;
  constructor(private http: HttpClient) { }



  getTodos() {
    return this.http.get('http://localhost:3000/api/todos/')
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  addTodo (todo): Observable<any> {
    return this.http.post<Todo>('http://localhost:3000/api/todos/', todo , httpOptions)
      .pipe(
        catchError(this.handleError) // then handle the error
      );
  }

  updateTodo (todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(`http://localhost:3000/api/todos/${todo.id}`, todo , httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  removeTodo (id): Observable<Todo> {
    return this.http.delete<Todo>(`http://localhost:3000/api/todos/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
}
