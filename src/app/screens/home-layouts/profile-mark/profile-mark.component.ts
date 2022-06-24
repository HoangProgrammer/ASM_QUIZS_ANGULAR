import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-mark',
  templateUrl: './profile-mark.component.html',
  styleUrls: ['./profile-mark.component.css'],
})
export class ProfileMarkComponent implements OnInit {
  constructor() {}
  users: any;
  ngOnInit(): void {
    this.users = JSON.parse(localStorage.getItem('user') || '{}');
    console.log(this.users);
  }
}
