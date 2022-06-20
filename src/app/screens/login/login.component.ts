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
    private LoginService: AuthServiceService
  ) {}

  ngOnInit(): void {
    localStorage.removeItem('user');
  }
  error = '';
  onSubmit() {
    // console.log('hi');
    
    let email = this.loginForm.value['email'];
    let password = this.loginForm.value['password'];

    this.service.getLogin(email,password).subscribe((res) => {
      if(res!==''){
   console.log(res);
        res.map((db:any) =>{
          localStorage.setItem('user', JSON.stringify(db));
          this.Router.navigate(['']);
        }
        )
   
  
      }else{

        this.error = 'tài khoản hoặc mật khẩu không chính xác';
      }

    });
  }

  loginGoogle() {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((resp) => {
      // console.log(resp);
      this.service.getLogin(resp.email).subscribe((re) => {
        if (re == '') {
          let db = {
            name: resp.name,
            email: resp.email,
            avatar: resp.photoUrl,
            googleId: resp.id,
            marks: [],
            roles: ['member'],
          };
          
          this.service.create(db).subscribe((res) => {
            this.LoginService.Login(res.email, res.googleId).subscribe(
              (data) => {
                this.Router.navigate(['']);
              }
            );
          });

        } else {
          this.LoginService.Login(resp.email, resp.id).subscribe((data) => {
            this.Router.navigate(['']);
          });
        }

      });
    });
  }
}
