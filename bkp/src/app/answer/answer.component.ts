import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css'],
  inputs: ['poll']
  
})
export class AnswerComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }

}
