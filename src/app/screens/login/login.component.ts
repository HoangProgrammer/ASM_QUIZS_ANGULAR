import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { StudentService } from 'src/app/services/student-service/student-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service/auth-service.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private authService: SocialAuthService,
    private service: StudentService,
    private Router: Router,
    private LoginService: AuthServiceService,
  ) {}

  ngOnInit(): void {
    localStorage.removeItem('user');
  }
  error = '';
  onSubmit() {
    let email = this.loginForm.value['email'];
    let password = this.loginForm.value['password'];
    let id = '';

    this.service.fetchAll().subscribe((data) => {
      let i = -1;
      data.forEach((v: any) => {
        if (v.email == email && v.password == password) {
          i = 1;
          id = v.id;
          return;
        }
      });

      if (i == 1) {
        let data = {
          email: email,
          id: id,
        };

        localStorage.setItem('user', JSON.stringify(data));
        this.Router.navigateByUrl('');
      } else {
        this.error = 'tài khoản hoặc mật khẩu không chính xác';
        // alert('fail')
      } 
    });
  }

  loginGoogle() {

    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((resp) => {
      console.log(resp);
      this.LoginService.Login(resp.email,resp.id).subscribe((data)=>{
        this.Router.navigate(['']);
      })

    });
  }
}
