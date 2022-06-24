
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { HomeComponent } from './screens/home-layouts/home/home.component';
import { QuizComponent } from './screens/home-layouts/quiz/quiz.component';
import { SubjectComponent } from './screens/home-layouts/subject/subject.component';
import { DashboardComponent } from './screens/admin-layouts/dashboard/dashboard.component';
import { QuestionComponent } from './screens/admin-layouts/questions/question.component';
import { StudentComponent } from './screens/admin-layouts/students/student.component';
import { SubjectsComponent } from './screens/admin-layouts/subjects/subjects.component';
import { LoginComponent } from './screens/login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './components/homepage/header/header.component';
import { FooterComponent } from './components/homepage/footer/footer.component';

import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { RegisterComponent } from './screens/register/register.component';
import { NavComponent } from './components/admin/nav/nav.component';
import { HeaderAdminComponent } from './components/admin/header-admin/header-admin.component';
import { App404Component } from './screens/app404/app404.component';
import { FormSubjectComponent } from './components/subjects/form-subject/form-subject.component';
import { ListSubjectComponent } from './components/subjects/list-subject/list-subject.component';
import { ListStudentComponent } from './components/students/list-student/list-student.component';
import { FormStudentComponent } from './components/students/form-student/form-student.component';
import { FormQuestionComponent } from './components/questions/form-question/form-question.component';
import { ListQuestionComponent } from './components/questions/list-question/list-question.component';
import { GoogleLoginProvider,SocialAuthServiceConfig,SocialLoginModule } from 'angularx-social-login';
import { environment } from 'src/environments/environment';
import { FinalComponent } from './screens/home-layouts/final/final.component';
import { GenderPipe } from './helpers/pipe/gender.pipe';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
// import { SweetAlertModule } from 'sweetalert2';  
import {ToastrModule } from 'ngx-toastr';
import { DetailComponent } from './components/students/detail/detail.component';
import { ProfileComponent } from './screens/home-layouts/profile/profile.component';
import { ProfileMarkComponent } from './screens/home-layouts/profile-mark/profile-mark.component';
import { LayoutProfileComponent } from './screens/home-layouts/layout-profile/layout-profile.component';
@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    HomeLayoutComponent,
    HomeComponent,
    QuizComponent,
    SubjectComponent,
    DashboardComponent,
    QuestionComponent,
    StudentComponent,
    SubjectsComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    RegisterComponent,
    NavComponent,
    HeaderAdminComponent,
    App404Component,
    FormStudentComponent,
    FormSubjectComponent,
    ListSubjectComponent,
    ListStudentComponent,
    FormQuestionComponent,
    ListQuestionComponent,
    FinalComponent,
    GenderPipe,
    DetailComponent,
    ProfileComponent,
    ProfileMarkComponent,
    LayoutProfileComponent,

  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    SocialLoginModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut:5000,
      progressBar:true
    })

  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              environment.GOOGLE_CLIENT_ID
            )
          }
        ],
        onError: (err) => {
          // console.error(err);
        }
      } as SocialAuthServiceConfig,
    }


  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
