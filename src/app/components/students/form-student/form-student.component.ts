import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from './../../../services/student-service/student-service.service';

@Component({
  selector: 'app-form-student',
  templateUrl: './form-student.component.html',
  styleUrls: ['./form-student.component.css'],
})
export class FormStudentComponent implements OnInit {
  param: any = '';
  constructor(
    private router: ActivatedRoute,
    private StudentService: StudentService,
    private routerURL: Router,
  ) {}
  note: any = 'Thêm sinh viên';
  ngOnInit(): void {

    if (  this.router.snapshot.paramMap.get('id') != null) {
      this.param = this.router.snapshot.paramMap.get('id');
      this.note = 'Sửa sinh viên';
      this.render()
    }
  
  }

  render() {
  
    this.StudentService.getOne(this.param).subscribe(data => {
      // console.log(data);
      this.formStudent=data
      // for(const item in this.formStudent.controls){    
      //  this.formStudent.controls[item].setValue(data[item])     
      // }

    });
  }

   
  formStudent = {
    name:"",
    email:"",
    password:"",
    avatar:"",
    marks:[],
    roles:['member'],
  }
  

  save() {
   
    // console.log(this.formStudent);
    
    if(this.param==''){
      this.StudentService.create(this.formStudent).subscribe(() => {
        this.routerURL.navigateByUrl('admin/students');
      });     
      console.log(this.param);   
        
    }else{
      console.log(this.param);

      this.StudentService.update(this.param,this.formStudent).subscribe(() => {
        this.routerURL.navigateByUrl('admin/students');
      });
    }
   
  }

  
}
