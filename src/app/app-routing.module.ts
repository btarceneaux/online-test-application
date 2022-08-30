import { ResultComponent } from './result/result.component';
import { ReviewComponent } from './review/review.component';
import { QuizComponent } from './quiz/quiz.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = 
[
  {path:"onlineTest", component:QuizComponent},
  {path:"", redirectTo:"onlineTest",pathMatch:"full"},
  {path:"reviewQuestions", component:ReviewComponent},
  {path:"reviewResults", component:ResultComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
