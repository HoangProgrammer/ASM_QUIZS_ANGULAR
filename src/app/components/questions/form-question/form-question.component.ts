import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { QuizServiceService } from 'src/app/services/quiz-service/quiz-service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form-question',
  templateUrl: './form-question.component.html',
  styleUrls: ['./form-question.component.css'],
})
export class FormQuestionComponent implements OnInit {
  constructor(
    private service: QuizServiceService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  param: any = '';
  code: any = '';
  ArrQuestions: any;
  ListQuestions: any = [];
  note: any = 'Thêm câu hỏi';
  lengthId: any;
  ListIsAnswers: any = [];
  Arr: any = [];

  display = false;
  ngOnInit(): void {
    this.code = this.route.snapshot.paramMap.get('code');
    if (this.route.snapshot.paramMap.get('id') != null) {
      this.display = true;
      this.param = this.route.snapshot.paramMap.get('id');
      console.log(this.param);

      this.note = 'Sửa câu hỏi';
      this.get();
    }

    console.log(this.code);
  }

  get() {
    // console.log( this.FormQuestions.controls['Answers']);
    this.service.get(this.code).subscribe((data) => {
      for (let item of data) {
        if (this.param == item.id) {
          for (let items in this.Questions) {
            // console.log(item);
            // console.log(items);
            // console.log(item[items]);
            this.Questions[items] = item[items];
            this.ArrQuestions = this.Questions['answers'] = item['answers'];
          }
          console.log(this.ArrQuestions);
        }
      }
    });
  }

  Questions: any = {
    Text: '',
    AnswerId: '',
    answers: [],
  };

  ChangeAnswer(i: any) {
    // chọn đáp án đúng
    let Arr: any = this.Questions.answers;
    Arr.forEach((v: any, index: any) => {
      if (index === i) {
        this.Questions.answers[i].is_correct = true;
        this.Questions.AnswerId = i;
      }
      if (index !== i) {
        this.Questions.answers[index].is_correct = false;
      }
    });
  }

  ChangeUpdate(id: any) {
    this.Questions.AnswerId = id;
  }

  ChangeText(e: any, i: any) {
    // viết các câu hỏi cho từng phần tử
    this.Questions.answers[i].Text = e.target.value;
  }

  log() {
    // lấy ra phần từ id cuối cùng của câu hỏi API
    this.service.get(this.code).subscribe((data) => {
      let id = data[data.length - 1].answers; // tìm  mảng câu hỏi cuối cùng
      let lengthId = id[id.length - 1].id; // tìm đến id anwer cuối cùng
      for (let i = 0; i <= this.Questions.answers.length; i++) {
        this.Arr.push((lengthId += 1));
      }
    });

    for (var i = 0; i < this.Arr.length; i++) {
      if (!this.ListIsAnswers.includes(this.Arr[i])) {
        this.ListIsAnswers.push(this.Arr[i]);
      }
    }
    console.log(this.ListIsAnswers);
  }

  createQuestion() {
    // thêm câu hỏi
    let data = {
      Text: '',
      is_correct: false,
    };
    this.Questions.answers.push(data);
    this.log();
  }

  Save() {  
    if (this.param !== '') {
      this.service
        .update(this.code, this.param, this.Questions)
        .subscribe((data) => {
          this.router.navigate([`/admin/questions/${this.code}`]);
        });
    } else {
      let dataSave: any = [];
      let answers: any = [];
      console.log(this.ListIsAnswers);

      let AnswerId: any;
      this.Questions.answers.forEach((val: any, i: any) => {
        answers.push({
          id: this.ListIsAnswers[i],
          Text: val.Text,
        });

        if (this.Questions.AnswerId == i) {
          AnswerId = this.ListIsAnswers[i]; // tìm đáp án đúng
        }
      });
      console.log(answers);

      dataSave = {
        Text: this.Questions.Text,
        AnswerId: AnswerId,
        answers: answers,
      };

      this.service.create(this.code, dataSave).subscribe(() => {
        this.router.navigate([`/admin/questions/${this.code}`]);
      });
    }
  }
}
