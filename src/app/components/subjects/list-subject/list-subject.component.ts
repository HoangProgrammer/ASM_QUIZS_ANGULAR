import { Component, OnInit } from '@angular/core';
import { SubjectService } from 'src/app/services/subject-service/subject.service';
@Component({
  selector: 'app-list-subject',
  templateUrl: './list-subject.component.html',
  styleUrls: ['./list-subject.component.css'],
})
export class ListSubjectComponent implements OnInit {
  constructor(private httpSubject: SubjectService) {}
  list: any;
  ngOnInit(): void {
    this.get()
  }
  get() {
    this.httpSubject.get().subscribe((data) => {
      this.list = data;
    });
  }

  delete(id:any){
    let con=confirm('bạn có thực sự muốn xóa không !')
    if(con){
      this.httpSubject.delete(id).subscribe((data) => {      
        this.get()
      })
    }
  
  }
}
