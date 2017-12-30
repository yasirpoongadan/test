import { Component, OnInit , EventEmitter} from '@angular/core';
import { Poll } from '../poll';

@Component({
  selector: 'list-question',
  templateUrl: './list-question.component.html',
  styleUrls: ['./list-question.component.css'],
  inputs: ['polls'],
  outputs : ['onClickEvent']
})
export class ListQuestionComponent implements OnInit {

   public onClickEvent = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  getPoll(pol: Poll){
      this.onClickEvent.emit(pol);
  }
}
