import { Component, OnInit } from '@angular/core';
import { Review, User, Item } from 'src/app/api/models';
import { PageState } from '../../shared/model/page-state.model';
import { OrderService, AuthenticationService, ReviewService } from 'src/app/api/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-reviews',
  templateUrl: './my-reviews.component.html',
  styleUrls: ['./my-reviews.component.css']
})
export class MyReviewsComponent implements OnInit {
  public reviews: Array<Review>;
  public pageState: PageState = new PageState();
  private currentUser: User;
  userRating: number; 

  constructor(private reviewService: ReviewService, 
    private router: Router,
    private authenticationService: AuthenticationService) { 
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    this.reviewService.getReview().subscribe((data: Array<Review>) => {
      console.log(data);
      this.reviews = data;
      this.pageState.collectionSize = data.length;
    });
    this.reviewService.getAvgRating(this.currentUser.id).subscribe((rating: number) => {
      this.userRating = rating;
    });
  }

  onPage(event: number) {
    this.pageState.page = event;
    this.refresh();
  }

  onPageSize(event: number) {
    this.pageState.pageSize = event;
    this.refresh();
  }
}
