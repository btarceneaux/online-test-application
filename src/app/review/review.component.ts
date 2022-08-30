import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Responses } from '../responses';
import { SharedDataService } from '../sharedData/shared-data.service'

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  constructor(private shared:SharedDataService, private router:Router) { }

  userResponse:Array<Responses> = [];

  ngOnInit(): void 
  {
    this.userResponse = this.shared.getResponses();
  }

  scoreMyTest()
  {
    this.router.navigate(["/reviewResults"]);
  }

}
