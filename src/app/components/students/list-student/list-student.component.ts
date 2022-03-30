import { Component, OnInit } from '@angular/core';
import {StudentService } from '../../../services/student-service/student-service.service'

@Component({
  selector: 'app-list-student',
  templateUrl: './list-student.component.html',
  styleUrls: ['./list-student.component.css']
})
export class ListStudentComponent implements OnInit {

  constructor(private Service: StudentService) { }
   listStudent:any
   keyWord:string='';
  ngOnInit(): void {

   this.getStudent()

  }

  getStudent(keyWord:string=''){
    this.Service.get(keyWord).subscribe((data) => {
      // console.log(data);
      this.listStudent=data
    });
  }
 

  search(){
    // console.log(this.keyWord);
    
   this.getStudent(this.keyWord)
  }
  delete(id:any){
    let con=confirm('bạn có chắc chắn muốn xóa không !')
    if(con){
      this.Service.delete(id).subscribe(data => {
        this.getStudent()
      })
    }
   
  }

}
