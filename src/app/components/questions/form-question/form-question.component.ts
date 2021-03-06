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
  note: any = 'Thêm câu hỏi';

  ListQuestions: any = []; // danh sách ỏ phần thêm
  ListIsAnswers: any = [];
  Arr: any = [];

  display = false;
  ngOnInit(): void {
    this.code = this.route.snapshot.paramMap.get('code');
    if (this.route.snapshot.paramMap.get('id') != null) {
      this.display = true;
      this.param = this.route.snapshot.paramMap.get('id');
      this.note = 'Sửa câu hỏi';
      this.get();
    }
  }



  // lấy ra danh sách phần edit
  get() {
    this.service.getOne(this.code,this.param).subscribe((data) => {
          for (let items in this.Questions) {            
           this.Questions[items] =data[items];
          }
          // console.log(this.ArrQuestions);         
    });
  }

  // xóa đáp án
  HandlerDeleteQuestion(i: any) {
    // console.log(i);
    let arr: any = [];
    this.Questions.answers.forEach((v: any, index: any) => {
      if (index !== i) {
        arr.push(v);
      }
    });
    this.Questions.answers = arr;
  }

  // chọn đáp án đúng
  ChangeAnswer(i: any) {  
    this.Questions.answers.forEach((v: any, index: any) => {
      if (index === i) {
        this.Questions.answers[i].is_correct = true; //gán lại true
        this.Questions.AnswerId = i; //gán đáp án đúng bằng chỉ số index
      }
      
// còn lại chuyển về false
      if (index !== i) {
        this.Questions.answers[index].is_correct = false;
      }
    });
  }

  // thay đổi giá trị câu hỏi
  ChangeText(e: any, i: any) {
    this.Questions.answers[i].Text = e.target.value;
  }

  // thay đổi câu đáp án đúng
  ChangeUpdate(id: any) {
    this.Questions.AnswerId = id;
  }

  // Hàm Tìm kiếm id Câu hỏi Cuối cùng
  logIdAnswers() {
    this.service.get(this.code).subscribe((data) => {
      let id = data[data.length - 1].answers; // tìm  mảng câu hỏi cuối cùng
      let lengthId = id[id.length - 1].id; // tìm đến id answer cuối cùng
      for (let i = 0; i <= this.Questions.answers.length; i++) {
        // độ dài của answers đã thêm
        this.Arr.push((lengthId += 1));
      }
      // console.log( this.Arr);
    });

    // lọc câu hỏi
    for (var i = 0; i < this.Arr.length; i++) {
      if (!this.ListIsAnswers.includes(this.Arr[i])) {
        this.ListIsAnswers.push(this.Arr[i]);
      }
    }
    // console.log(this.ListIsAnswers);
  }


  // thêm câu trả lời
  CreateAnswers() {

    let data = {
      Text: '',
      is_correct: false,
    };

    this.Questions.answers.push(data);
    this.logIdAnswers();
  }

  // object questions
  Questions: any = {
    Text: '',
    AnswerId: '',
    answers: [],
  };
  
  // Lưu
  Save() {
    //  kiểm tra tồn tại của id thì update
    if (this.param !== '') {
      this.service
        .update(this.code, this.param, this.Questions)
        .subscribe((data) => {
          this.router.navigate([`/admin/questions/${this.code}`]);
        });

    } else {
      
      let dataSave: any = [];
      let answers: any = [];
      let AnswerId: any;
      // console.log('danh sach cau dap an : '+ this.ListIsAnswers);

      this.Questions.answers.forEach((val: any, i: any) => {
        // format lại dữ liệu của phần answer
        answers.push({
          id: this.ListIsAnswers[i],
          Text: val.Text,
        });

        if (this.Questions.AnswerId == i) {
          AnswerId = this.ListIsAnswers[i]; // tìm đáp án đúng
        }
      });
      // console.log(answers);

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
