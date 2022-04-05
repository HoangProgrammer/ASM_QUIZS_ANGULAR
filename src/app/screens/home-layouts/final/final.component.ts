import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from 'src/app/services/student-service/student-service.service';
import { SubjectService } from 'src/app/services/subject-service/subject.service';
// import { QuizComponent } from '../quiz/quiz.component';
import { QuizServiceService } from './../../../services/quiz-service/quiz-service.service';

@Component({
  selector: 'app-final',
  templateUrl: './final.component.html',
  styleUrls: ['./final.component.css'],
})
export class FinalComponent implements OnInit {
  Score:number=0;
  NameSubject: any;
  Username:any;
  constructor(
    private service: QuizServiceService,
    private router: ActivatedRoute,
    private student: StudentService,
    private Subject: SubjectService
  ) {}

  ngOnInit(): void {
    this.get();
    // this.get()
  }
  // time:number=3000;
 isLoading=false

  get() {
    let user: any = localStorage.getItem('user');
    user = JSON.parse(user);
    let code = this.router.snapshot.paramMap.get('id');

    setTimeout(()=>{  
    this.Subject.get().subscribe(data=>{
    data.forEach((v:any)=>{
      if(v.Code===code){
      this.NameSubject= v.Name;
      }
    })
    })

      this.student.getOne(user.id).subscribe((data) => { 
        console.log(data);
        data.marks.forEach((v: any,i:any) => {
          if(v.Subject==code){
            // console.log(v);
           this.Score=v.mark 
            this.Username=data.name
            return
          }
        });
      });
 this.isLoading=true
    },3000)
   
  }
}
