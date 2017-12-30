import { Component, OnInit } from '@angular/core';
import { PollService } from './../poll.service';
import { Poll } from './../poll';
import { FormsModule, FormControl, FormGroup, Validators }   from '@angular/forms';
import { answer } from './../answer';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import * as socketIo from 'socket.io-client';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
  providers: [PollService]
})
export class QuestionComponent implements OnInit {

  newPollQuestion ={pollqtn: '',
    pollans: [{name: ''},{name: ''}]
    };

  isAnswered : boolean =  false;
  showAddPoll : boolean = false;
  selectedAnswer:answer;
  polls : Array<Poll>;
  selectedPoll : any;
  showAns : boolean = false;
  totalVotes : number=0;
  private socket: any; 
  sellll:String;
  
  constructor(private _pollService : PollService) {
    this.socket  = socketIo('http://192.168.1.7:3002');
  }

  ngOnInit() {
    this._pollService.getPolls().subscribe(resPoll => this.polls = resPoll);
  }

  getOtherVotingBySocket(pollId) {
      this.socket.on('vote', (data) => {
          if(data == pollId){
            this.getQues({ _id : pollId});
          }
        })    
  } 

  addMoreOption(){
    this.newPollQuestion.pollans.push({name: ''});
  }
  getQues(pol : any){
      // this.selectedPoll = pol;
      this._pollService.getPoll(pol).subscribe(resPoll =>{
        console.log(resPoll);
        this.selectedPoll = resPoll
        this.showAns = true; 
        this.isAnswered = this.selectedPoll.userVoted;
        console.log(this.isAnswered);
        this.totalVotes = this.selectedPoll.totalVotes;

        this.getOtherVotingBySocket(this.selectedPoll._id);

      });
      
   
  }



  getBackToquestion(){
    this.showAns = false; 
    this.showAddPoll = false;
  }

  addPoll(){
      this._pollService.addPoll( this.newPollQuestion).subscribe(resPoll =>{ 
      this.showAns = false;
      this.showAddPoll = false;
      this.polls.push(resPoll);
      this.newPollQuestion ={pollqtn: '',
      pollans: [{name: ''},{name: ''}]
      };
    });
   
  }

  trackByIndex(index: number, value: number) {
    return index;
  }

  addNewPoll(){
    this.showAddPoll = true;
  }

  // updateAnswer(sel :any){
  //   console.log(sel);
  //   this.selectedAnswer = {
  //     answers: sel,
  //     _id: this.selectedPoll._id,
  //   }
  //   console.log(this.selectedAnswer);
  // }

  answerPoll(){
     var selectedAnswer1 = {
      answers: this.sellll,
      _id: this.selectedPoll._id,
    }
  
    this._pollService.addPollAnswer( selectedAnswer1 );
    this.getQues({ _id : this.selectedPoll._id});
    //this.showAns = false;
  }
}
