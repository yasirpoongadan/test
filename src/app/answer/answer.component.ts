import { Component, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css'],
  inputs: ['poll']
  
})
export class AnswerComponent implements OnInit {
  private answerPollEvent = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  // answerPoll(){
  //   this.answerPollEvent.emit();
  // }
}
