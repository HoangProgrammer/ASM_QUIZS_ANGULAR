import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { QuizServiceService } from 'src/app/services/quiz-service/quiz-service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form-question',
  templateUrl: './form-question.component.html',
  styleUrls: ['./form-question.component.css']
})
export class FormQuestionComponent implements OnInit {

 
  constructor(
    private service: QuizServiceService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  param: any = '';
  code: any = '';
  list: any;
  note:any='Thêm câu hỏi'
  ngOnInit(): void {
     if(this.route.snapshot.paramMap.get('id')!=null){
    this.code=this.route.snapshot.paramMap.get('code');
     
      this.param =this.route.snapshot.paramMap.get('id')
      this.note='Sửa câu hỏi' 
      this.get()
     }
  }

  FormQuestions=new FormGroup({
    Text:new FormControl(''),
    mark:new FormControl(''),
  })

  get() {
    this.service.get(this.code).subscribe((data) => {
      for(let item of data) {
        if(this.param==item.Id){
         this.list=item.Answers
    }      
      }
      // console.log(data);
      
    });
  }

}
