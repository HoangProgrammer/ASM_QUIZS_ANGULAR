import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { StudentService } from 'src/app/services/student-service/student-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  flag: boolean = false;
  constructor(private Student: StudentService, private Toast: ToastrService) {}
  user: any;
  invalid: any;
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.formUser = this.user;
  }
  form = {
    user: '',
  };
  formUser: any;

  CurrentPass(e: any) {
    let pass = e.target.value;
    if (pass == this.formUser.password) {
      this.invalid = true;
    } else {
      this.invalid = false;
    }

  }
  newPass(e: any) {
    this.formUser.password = e.target.value;
  }

  EditPassword(flag:any='') {
    if(flag!=''){
      this.flag = false;
    }else{
      this.flag = true;

    }
  }

  save() {
    this.Student.update(this.formUser.id, this.formUser).subscribe((data) => {
      localStorage.setItem('user', JSON.stringify(data));
      this.Toast.success('thông báo', 'Thay đổi thành công');
    });
  }
}
