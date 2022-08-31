import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedDataService } from '../sharedData/shared-data.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  constructor(private shared:SharedDataService, private router: Router) { }
  percentageCorrect:number = this.shared.getPercentageRight();
  passOrFail:string = this.shared.getPassOrFail();
  color:string = "";

  ngOnInit(): void {
  }

  getColorForStyle()
  {
    if (this.percentageCorrect >= 60)
    {
      this.color = "green";
    }
    else
    {
      this.color = "red";
    }

    return this.color;
  }

  navigateHome()
  {
    this.router.navigate(['/']);
  }
}
