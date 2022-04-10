import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service/auth-service.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
user:any=null

checkAdmin:any
  constructor(
 private authService:AuthServiceService
  ) { }

  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem('user') || "{}")
    this.checkAdmin=this.user.roles.filter((role:any) => role=='admin')
  
 
     
  }

  handlerChange(e:any){
console.log(e.target.value);

  }

  logout(){
this.authService.logout()
  }

}
