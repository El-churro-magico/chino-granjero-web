import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent implements OnInit {
  @Input() score: number;

  filledStars: number = 0;
  halfStars: number = 0;
  emptyStars: number = 0;
  stars: string[] = [];

  constructor() { }

  ngOnInit(): void {
    this.calculateStars(this.score);
    this.createStarList();
  }

  calculateStars(score: number) {
    let starCounter = 5;
    let decimalPart = score % 1;
    let intScore = score - decimalPart;
    if(decimalPart != 0) {
      if(decimalPart >= 0.5) {
        this.halfStars += 1;
      }
      else {
        this.emptyStars += 1;
      }
      starCounter -= 1;
    }
    this.filledStars += intScore;
    console.log(this.filledStars);
    starCounter -= intScore;
    this.emptyStars += (starCounter);
  }

  createStarList(){
    for(let i = 0; i < this.filledStars; i++) {
      this.stars.push('../../../../assets/icons/review-star-filled.svg');
    }
    for(let i = 0; i < this.halfStars; i++) {
      this.stars.push('../../../../assets/icons/review-star-half.svg');
    }
    for(let i = 0; i < this.emptyStars; i++) {
      this.stars.push('../../../../assets/icons/review-star-empty.svg');
    }
  }

}
