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
      for(const item in this.formStudent.controls){    
       this.formStudent.controls[item].setValue(data[item])     
      }

    });
  }

   
  formStudent = new FormGroup({
    name:new FormControl('' ,[Validators.required]),
    email:new FormControl('',[Validators.required ,Validators.email] ),
    password:new FormControl('',[Validators.required]),
    avatar:new FormControl(''),
    marks: new FormControl([]),
    roles:new FormControl(['member']),
  })
  

  save() {
    console.log(this.formStudent.value.name);
    
    if(this.param==''){
      this.StudentService.create(this.formStudent.value).subscribe((data) => {
        this.routerURL.navigateByUrl('admin/students');
      });
      console.log(this.param);
      
    }else{
      console.log(this.param);

      this.StudentService.update(this.param,this.formStudent.value).subscribe((data) => {
        this.routerURL.navigateByUrl('admin/students');
      });
    }
   
  }

  
}
