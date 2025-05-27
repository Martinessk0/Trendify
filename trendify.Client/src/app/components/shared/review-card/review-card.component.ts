import { Component, Input } from '@angular/core';
import { ReviewModel } from '../../../models/review/review-model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-review-card',
  imports: [DatePipe],
  templateUrl: './review-card.component.html',
  styleUrl: './review-card.component.scss'
})
export class ReviewCardComponent {
  @Input() review!: ReviewModel;
}
