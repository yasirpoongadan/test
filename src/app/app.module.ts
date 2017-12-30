import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{ HttpModule,Http, Response, Headers, RequestOptions} from '@angular/http';
import { FormsModule }   from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AnswerComponent } from './answer/answer.component';
import { QuestionComponent } from './question/question.component';
import { GraphComponent } from './graph/graph.component';
import { AddQuestionComponent } from './add-question/add-question.component';
import { ListQuestionComponent } from './list-question/list-question.component';
import { VoteComponent } from './vote/vote.component';
import { MysearchFilterPipe } from './mysearch-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AnswerComponent,
    QuestionComponent,
    GraphComponent,
    AddQuestionComponent,
    ListQuestionComponent,
    VoteComponent,
    MysearchFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
