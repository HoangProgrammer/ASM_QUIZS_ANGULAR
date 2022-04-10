import { QuizServiceService } from './../../../services/quiz-service/quiz-service.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StudentService } from 'src/app/services/student-service/student-service.service';
import Swal from 'sweetalert2';
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

  // lấy ra danh sách câu hỏi
  get() {
    this.Url = this.RouterActive.snapshot.paramMap.get('id');

    let newArr: any = [];

    this.service.get(this.Url).subscribe((data) => {
      // newArr = data.sort(() => Math.random() - 0.5);  
      // this.list = newArr.slice(0, 10);
      // console.log(Math.random() - 0.5);

      let first = data[0].id;
      let last = data[data.length - 1].id;

      let i = 0;
      while (i < 10) {
        let random = Math.floor(Math.random() * (last - first) + first);
        if (!newArr.includes(random)) {
          newArr.push(random);
          i++;
        }
      }

      this.list = [];
      console.log(newArr);
      data.forEach((v: any, i: any) => {
        for (let index = 0; index < newArr.length; index++) {
          if (v.id == newArr[index]) {
            this.list.push(v);
          }
        }
      });

      console.log(this.list);
    });
  }

// tạo ra đối tường chứa danh sách câu đã chọn
  listAnswers = [
    {
      Id: 0,
      IdAnswer: 0,
    },
  ];

  changColor = false;
  Colors:any
  // ArrColor:any=[]
  // chọn đáp án
  change(id: any, idAnswer: any) {
    this.Colors=[]
    let index = -1;

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

    this.Colors=this.listAnswers


    // console.log(this.listAnswers);
    // console.log(this.ArrColor);
  }

  // kết thúc chấm điểm
  final() {
    Swal.fire({
      title: 'bạn chắc chứ?',
      text: 'bạn có chắc chắn muốn nộp bài không không!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'đồng ý!',
    }).then((result) => {
      if (result.isConfirmed) {
        let newArr = this.listAnswers.filter((a) => a.Id != 0);
        console.log(newArr);
        let point = 0;

        // let correct = 0;
        newArr.forEach((val: any) => {
          let q = this.list.find((item: any) => item.id == val.Id);
          if (q.id == val.Id && q.AnswerId == val.IdAnswer) {
            point += 1;
          }
        });

        let pointTotal = ((point * 10) / this.list.length).toFixed(2);

        // lấy user trên localStorage
        let user = JSON.parse(localStorage.getItem('user') || '[]');

        let marks = {
          Subject: this.Url,
          mark:pointTotal,
        };

        // kiểm tra dữ liệu tồn tại trong db
        let index = -1;
        user.marks.forEach((v: any, i: any) => {
          if (v.Subject != null && v.Subject == this.Url) {
            index = i;
            return;
          }
        });

        if (index == -1) {
          user.marks.push(marks);
        } else {
          user.marks[index] = marks;
        }

        // post dữ liệu mới vào db và lưu trên localStorage
        this.studentService.update(user.id, user).subscribe((data) => {
  
          localStorage.setItem('user', JSON.stringify(data));

           console.log('Điểm() của bạn là :' + pointTotal);
    
        this.Router.navigate([`quiz/${this.Url}/final`]);

        });

       
      }
    });
  }

  background = false;

  check() {
    this.background = true;
  }
}
