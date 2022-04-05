import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { QuizServiceService } from 'src/app/services/quiz-service/quiz-service.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-list-question',
  templateUrl: './list-question.component.html',
  styleUrls: ['./list-question.component.css'],
})
export class ListQuestionComponent implements OnInit {
  constructor(
    private service: QuizServiceService,
    private router: Router,
    private routes: ActivatedRoute
  ) {}
  list:any=[];
  param: any = '';
  ngOnInit(): void {
    this.param = this.routes.snapshot.paramMap.get('code');
    this.get()
  }

  get() {
    this.service.get(this.param).subscribe((data) => { 
       this.list=data   
    });
  }

  handleDelete(id:any){
  Swal.fire({
  title: 'Are you sure?',
  text: "bạn có chắc chắn muốn xóa không!",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'đồng ý!'
}).then((result) => {
  if (result.isConfirmed) {
    this.service.delete(this.param,id).subscribe(()=>{
      this.get()
    })
    Swal.fire(
      'xóa bỏ!',
      'bạn đã xóa thành công',
      'success'
    )
  }
})
  
  }
}
