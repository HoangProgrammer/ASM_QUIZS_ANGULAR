import { QuizServiceService } from './../../../services/quiz-service/quiz-service.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StudentService } from 'src/app/services/student-service/student-service.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent implements OnInit {
  constructor(
    private Router: Router,
    private RouterActive: ActivatedRoute,
    private service: QuizServiceService,
    private studentService: StudentService
  ) {}

  list: any = [];
  Url: any;
  ngOnInit(): void {
    this.get();
  }

  get() {
    this.Url = this.RouterActive.snapshot.paramMap.get('id');

    let newArr: any = [];

    this.service.get(this.Url).subscribe((data) => {
      // console.log(data);
      
      newArr = data.sort(() => Math.random() - 0.5);
      this.list = newArr.slice(0, 10);

      // let first = data[0].Id;
      // let last = data[data.length - 1].Id;
      // let i = 0;

      // while (i < 10) {
      //   let random = Math.floor(Math.random() * (last - first) + first);
      //   if (!newArr.includes(random)) {
      //     newArr.push(random);
      //     i++;
      //   }
      // }

      // this.list = [];
      // console.log(newArr);
      // data.forEach((v: any, i: any) => {
      //   for (let index = 0; index < newArr.length; index++) {
      //     if (v.Id == newArr[index]) {
      //       this.list.push(v);
      //     }
      //   }
      // });
      console.log(this.list);
    });
  }

  listAnswers = [
    {
      Id: 0,
      IdAnswer: 0,
    },
  ];
  color: any;
  // ArrColor:any=[]

  change(id: any, idAnswer: any) {
    let index = -1;

    this.color = idAnswer;

    this.listAnswers.forEach((v, i) => {
      if (v.Id == id) {
        index = i;
        return;
      }
    });

    if (index == -1) {
      this.listAnswers.push({ Id: id, IdAnswer: idAnswer });
    } else {
      this.listAnswers[index] = { Id: id, IdAnswer: idAnswer };
    }
    console.log(this.listAnswers);
    // console.log(this.ArrColor);
  }

  final() {
    let newArr = this.listAnswers.filter((a) => a.Id != 0);
    console.log(newArr);
    let score = 0;
    let user: any = null;
    // let correct = 0;

    this.list.forEach((v: any) => {
      // console.log(v);

      newArr.forEach((val: any) => {
        // console.log(val);

        if (v.Id == val.Id && v.AnswerId == val.IdAnswer) {
          score += 1;
          // correct += 1;
        }
      });
    });

    user = localStorage.getItem('user');
    user = JSON.parse(user);
    // console.log(user.id);

    let mark = {
      Subject: this.Url,
      mark: score,
    };

    this.studentService.getOne(user.id).subscribe((res) => {
      // console.log(res);
      let index = -1;
      res.marks.forEach((v: any, i: any) => {
        if (v.Subject != null && v.Subject == this.Url) {
          index = i;
          return;
        }
      });

      if (index == -1) {
        res.marks.push(mark);
        this.studentService.update(user.id, res).subscribe((data) => {});
      } else {
        res.marks[index] = mark;
        this.studentService.update(user.id, res).subscribe((data) => {});
      }
    });

    console.log('Điểm của bạn là :' + score);
    // console.log('Đúng :' + correct);

    // this.Router.navigate([`quiz/${this.Url}/final`]);
  }

  background = false;

  check() {
    this.background = true;
  }
}
