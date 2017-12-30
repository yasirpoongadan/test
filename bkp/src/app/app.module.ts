import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{ HttpModule} from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AnswerComponent } from './answer/answer.component';
import { QuestionComponent } from './question/question.component';
import { GraphComponent } from './graph/graph.component';
import { AddQuestionComponent } from './add-question/add-question.component';
import { ListQuestionComponent } from './list-question/list-question.component';
import { VoteComponent } from './vote/vote.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AnswerComponent,
    QuestionComponent,
    GraphComponent,
    AddQuestionComponent,
    ListQuestionComponent,
    VoteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
