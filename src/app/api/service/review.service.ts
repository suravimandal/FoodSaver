import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, filter, map } from 'rxjs/operators';
import { ApiConfiguration } from 'src/app/api/api-configuration';
import { Review } from 'src/app/api/models';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private rootUrl: string;
 
  constructor(
    private config: ApiConfiguration,
    private http: HttpClient
  ) { 
   this.rootUrl = config.rootUrl + 'review' + config.apiVersion + 'reviews/'
   // this.rootUrl = 'ec2-52-221-120-194.ap-southeast-1.compute.amazonaws.com/Review';
  }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }  

  listReviews(): Observable<Array<Review>>  {
    return this.http.get<any>(this.rootUrl)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  getReview(id: number): Observable<Review> {
    return this.http.get<any>(this.rootUrl + '/' + id)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  createReview(review: Review): Observable<Review> {
    return this.http.post<any>(this.rootUrl + '/', JSON.stringify(review), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  updateReview(id: number, review: Review): Observable<Review> {
    return this.http.put<any>(this.rootUrl + '/' + id, JSON.stringify(review), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  deleteReview(id: number): Observable<Review> {
    return this.http.delete<any>(this.rootUrl + '/' + id, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // Error handling 
  handleError(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
 }
}
