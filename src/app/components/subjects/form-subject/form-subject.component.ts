import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SubjectService } from 'src/app/services/subject-service/subject.service';
@Component({
  selector: 'app-form-subject',
  templateUrl: './form-subject.component.html',
  styleUrls: ['./form-subject.component.css'],
})
export class FormSubjectComponent implements OnInit {
  constructor(
    private router: ActivatedRoute,
    private route: Router,
    private SubjectService: SubjectService
  ) {}
  note: any = 'Thêm môn học';
  param: any = '';

  ngOnInit(): void {
    if (this.router.snapshot.paramMap.get('id') != null) {
      this.param = this.router.snapshot.paramMap.get('id');
      this.note = 'Sửa môn học';
      this.getEdit();
    }
  }

  getEdit() {
    this.SubjectService.getOne(this.param).subscribe((data) => {
      for (let item in this.formSubject.value) {
        this.formSubject.controls[item].setValue(data[item]);
      }
    });
  }

  formSubject = new FormGroup({
    Code: new FormControl(''),
    Name: new FormControl(''),
    Logo: new FormControl(''),
  });

  save() {
    if (this.param == '') {
      this.SubjectService.create(this.formSubject.value).subscribe((data) => {
        this.route.navigateByUrl('/admin/subjects');
      });
    } else {
      this.SubjectService.update(this.param, this.formSubject.value).subscribe(
        (data) => { 
          this.route.navigateByUrl('/admin/subjects');
        }
      );
    }
  }


  uploadLogo(e: any) {

    let url = './assets/images/';
    console.log(e.target.files[0]);
    var render = new FormData();
    render.append(url, e.target.files[0].name);
  }

}
