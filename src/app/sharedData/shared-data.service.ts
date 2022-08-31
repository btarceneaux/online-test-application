import { Injectable } from '@angular/core';
import { Responses } from '../responses';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  totalCorrect:number = 0;
  totalPossibleQuestions:number = 0;
  quizResponses:Array<Responses> = [];
  finalResult:string = "";

  constructor() { }

  setTotalCorrect(numCorrect:number)
  {
    this.totalCorrect = numCorrect;
  }

  getTotalCorrect()
  {
    return this.totalCorrect;
  }

  setTotalQuestions(numQuestions:number)
  {
    this.totalPossibleQuestions = numQuestions;
  }

  getTotalQuestions()
  {
    return this.totalPossibleQuestions;
  }

  getPercentageRight()
  {
    return ( this.totalCorrect/this.totalPossibleQuestions * 100 );
  }

  setResponses(incomingResponses:Array<Responses>)
  {
    this.quizResponses = incomingResponses;
  }

  getResponses()
  {
    return this.quizResponses;
  }

  getPassOrFail()
  {
    //let totalNumberCorrect = this.getTotalCorrect();
    //let outOf = this.getTotalQuestions();
    if (this.getPercentageRight() >= 60)
    {
      this.finalResult = "You Passed!";
    }
    else
    {
      this.finalResult = "You Failed. Please Try Again!";
    }

    return this.finalResult;
  }
}
