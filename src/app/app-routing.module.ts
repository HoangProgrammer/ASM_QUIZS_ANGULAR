import { DetailComponent } from './components/students/detail/detail.component';
import { QuestionComponent } from './screens/admin-layouts/questions/question.component';
import { FormSubjectComponent } from './components/subjects/form-subject/form-subject.component';
import { App404Component } from './screens/app404/app404.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './screens/login/login.component';
import { QuizComponent } from './screens/home-layouts/quiz/quiz.component';
import { SubjectComponent } from './screens/home-layouts/subject/subject.component';
import { HomeComponent } from './screens/home-layouts/home/home.component';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './screens/register/register.component';
import { DashboardComponent } from './screens/admin-layouts/dashboard/dashboard.component';
import { SubjectsComponent } from './screens/admin-layouts/subjects/subjects.component';
import { StudentComponent } from './screens/admin-layouts/students/student.component';
import { ListSubjectComponent } from './components/subjects/list-subject/list-subject.component';
import { ListStudentComponent } from './components/students/list-student/list-student.component';
import { FormStudentComponent } from './components/students/form-student/form-student.component';
import { FormQuestionComponent } from './components/questions/form-question/form-question.component';
import { ListQuestionComponent } from './components/questions/list-question/list-question.component';
import { FinalComponent } from './screens/home-layouts/final/final.component';
import { AuthGuard } from './helpers/auth-guard';

const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: HomeComponent },
      { path: 'mon-hoc', component: SubjectComponent },
      { path: 'quiz/:id', component: QuizComponent },
      { path: 'quiz/:id/final', component: FinalComponent },
    ],
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'dashboard', component: DashboardComponent },
      {
        path: 'subjects',
        component: SubjectsComponent,
        children: [
          { path: '', component: ListSubjectComponent },
          { path: 'add', component: FormSubjectComponent },
          { path: 'edit/:id', component: FormSubjectComponent },
        ],
      },
      {
        path: 'students',
        component: StudentComponent,
        children: [
          { path: '', component: ListStudentComponent },
          { path: 'add', component: FormStudentComponent },
          { path: 'edit/:id', component: FormStudentComponent },
          { path: 'detail/:id', component: DetailComponent },
        ],
      },
      {
        path:'questions/:code',component:QuestionComponent,
        children:[
          { path: '', component: ListQuestionComponent},
          { path: 'add/:code', component: FormQuestionComponent},
          { path: 'edit/:code/:id', component: FormQuestionComponent}
        ]
      }
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', component: App404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  
})
export class AppRoutingModule {}
