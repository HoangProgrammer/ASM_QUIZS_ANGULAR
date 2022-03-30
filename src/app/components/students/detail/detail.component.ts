import { SubjectService } from './../../../services/subject-service/subject.service';
import { StudentService } from 'src/app/services/student-service/student-service.service';
import { ActivatedRoute } from '@angular/router';
import { QuizServiceService } from 'src/app/services/quiz-service/quiz-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  constructor(
    private service: QuizServiceService,
    private router: ActivatedRoute,
    private student: StudentService,
    private Subject: SubjectService
  ) { }
  note="Điểm"
  name=''
  ngOnInit(): void {
    this.get() 
  }
List:any

  get() {
   
    let id = this.router.snapshot.paramMap.get('id');
      this.student.getOne(id).subscribe((data) => { 
     this.List=data.marks
     this.name=data.fullname

      });
 
  }
}
