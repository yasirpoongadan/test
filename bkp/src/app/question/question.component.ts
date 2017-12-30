import { Component, OnInit } from '@angular/core';
import { PollService } from './../poll.service';
import { Poll } from './../poll';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
  providers: [PollService]
})
export class QuestionComponent implements OnInit {

  polls : Array<Poll>;
  selectedPoll : Poll;
  showAns : boolean = false;
  constructor(private _pollService : PollService) { }

  ngOnInit() {
    this._pollService.getPolls().subscribe(resPoll => this.polls = resPoll);
  }

  getQues(pol : any){
      this.selectedPoll = pol;
      this.showAns = true; 
      console.log(this.selectedPoll);
  }
  geBackToquestion(){
    this.showAns = false; 
  }
}
