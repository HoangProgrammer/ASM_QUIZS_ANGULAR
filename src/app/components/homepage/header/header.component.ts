import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service/auth-service.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
user:any=null
name:any
  constructor(
 private authService:AuthServiceService
  ) { }

  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem('user') || "{}")
    if( this.user!==null){
      this.name=this.user.email
    }
 
     
  }

  logout(){
this.authService.logout()
  }

}
