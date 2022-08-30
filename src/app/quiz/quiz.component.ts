import { Questions } from './../questions';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Answers } from '../answers';
import { SharedDataService } from '../sharedData/shared-data.service'
import { Responses } from '../responses';
import { Router } from '@angular/router';


@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  totalNumberCorrect:number = 0;
  tempString:string = "";
  questions:Array<Questions> = [];
  answers:Array<Answers> = [];
  userResponses:Array<Responses> = [];
  selectedAnswers = new Map();
  totalNumberOfQuizQuestions:number = 15;

  // Added Shared Data Service to pass information from component to component.
  constructor(public http:HttpClient, private shared:SharedDataService, private router: Router) { }  // DI for HttpClient
  

  ngOnInit(): void 
  {
    this.http.get("/assets/questions.json").
    subscribe((result:any) =>this.questions=result.questions,error=>console.log(error),()=>console.log("completed"));

    this.http.get("/assets/answers.json").
    subscribe((result:any)=> this.answers=result.answers,error=>console.log(error),()=>console.log("completed"));

    this.disableButton();
  }

  disableButton()
  {
    document.getElementById("btn")?.setAttribute('disabled', 'disabled');
  }

  enableButton()
  {
    console.log("Enabling button");
    document.getElementById("btn")?.removeAttribute("disabled");
  }


  storeAnswer(qnumber:number, ans:string )
  {
    this.selectedAnswers.set(qnumber,ans);
    console.log(this.selectedAnswers);

    // Enable button when all of the questions have been selected
    if(this.selectedAnswers.size == this.totalNumberOfQuizQuestions)
    {
      this.enableButton();

      const enableSubmitButton = document.getElementById('btn');
      enableSubmitButton?.setAttribute('enabled', '');
    }
  }

  // Write logic to check answers
  correctAnswers()
  {
    // Loop through the selected answers and see if they are correct. 
    for(let i=0; i<this.selectedAnswers.size; i++)
    {
      // Get one element from the array of answers and store it in a variable. 
      let myResult:string;
      let myAnswer = this.answers[i];
      let tempQuestion = this.questions[i];
      
      // console.log(myAnswer);
      // console.log("The correct answer number is " + myAnswer.correctAnswer);
      // console.log(myAnswer.proof);

      if(this.selectedAnswers.get((i + 1)) === myAnswer.correctAnswer)
      {
        this.totalNumberCorrect += 1;
        console.log(`Question number ${i + 1} is correct!`);
        myResult = "Correct";
        // console.log(`The answer is ${myAnswer.correctAnswer}`);
        // console.log(myAnswer.proof);
      }
      // This probably needs to get moved to the display section.
      else
      {
        console.log(`Incorrect: You answered question ${i + 1} as ${this.selectedAnswers.get((i + 1))} : Please read ${myAnswer.proof}`);
        myResult = "Incorrect";
      }

      let myResponses = new Responses((i + 1), tempQuestion.question, this.selectedAnswers.get(i + 1), myResult, myAnswer.proof);
      this.userResponses.push(myResponses);
    }

    //Send information in service 
    this.shared.setTotalCorrect(this.totalNumberCorrect);
    this.shared.setTotalQuestions(this.totalNumberOfQuizQuestions);
    this.shared.setResponses(this.userResponses);

    //Redirect to Review Page
    this.router.navigate(['/reviewQuestions']);
  }

}
