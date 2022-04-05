import { Router } from '@angular/router';
import { SubjectService } from '../../../services/subject-service/subject.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private SubjectSV: SubjectService,
    private toast: ToastrService,
    private route: Router
  ) {}



  
  listSubject: any;
  user: any = null;
  ngOnInit(): void {
    this.render();
  }
  render() {
    this.SubjectSV.get().subscribe((data) => {
      this.listSubject = data;
    });
    this.user = localStorage.getItem('user');
  }

  takeQuiz(id: any) {
    if (this.user == null) {
      this.toast.error('Vui lòng đăng nhập để làm bài ', 'error');
    } else {
      this.route.navigate(['quiz/', id]);
    }
  }
}
