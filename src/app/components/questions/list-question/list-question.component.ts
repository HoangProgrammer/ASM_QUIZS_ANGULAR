import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { QuizServiceService } from 'src/app/services/quiz-service/quiz-service.service';

@Component({
  selector: 'app-list-question',
  templateUrl: './list-question.component.html',
  styleUrls: ['./list-question.component.css'],
})
export class ListQuestionComponent implements OnInit {
  constructor(
    private service: QuizServiceService,
    private router: Router,
    private routes: ActivatedRoute
  ) {}
  list:any;
  param: any = '';
  ngOnInit(): void {
    this.param = this.routes.snapshot.paramMap.get('code');
    this.get()
  }
  get() {
    this.service.get(this.param).subscribe((data) => {
      this.list=data
    });
  }
}
