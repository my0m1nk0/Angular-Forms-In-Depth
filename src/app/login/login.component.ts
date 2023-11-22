import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  val={
    email:"mmk@gmail.com",
    password:"123456"
  }
  constructor() {
  }

  ngOnInit() {

  }

  login(loginForm: NgForm, submit:any){
    console.log(loginForm.value,loginForm.valid,submit);
  }

  emailChange(event: any) {
   console.log(event);
   console.log(this.val);
    }


}
