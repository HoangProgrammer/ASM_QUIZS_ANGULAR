import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentService } from 'src/app/services/student-service/student-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private studentService: StudentService,
    private route: Router,
    private Toast: ToastrService
  ) {}

  ngOnInit(): void {}

  formRegister = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required] ),
    marks: new FormControl([]),
    roles: new FormControl(['member']),
  });

  Onsubmit() {

    this.studentService.create(this.formRegister.value).subscribe((data) => {
      if (data.status === 200) {
        this.Toast.success('chúc mừng bạn đã đăng ký thành công', 'tiêu đề');
        this.route.navigateByUrl('/login');
      } else {
        this.Toast.warning('dăng ký thất bại', 'tiêu đề');
        this.route.navigateByUrl('/register');

      }
    });
  }
}
