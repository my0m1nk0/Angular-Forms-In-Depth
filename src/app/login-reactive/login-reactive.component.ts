import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from "@angular/forms";
import { createPasswordStrengthValidator } from "../validators/password-strength.validators";

@Component({
  selector: "login",
  templateUrl: "./login-reactive.component.html",
  styleUrls: ["./login-reactive.component.css"],
})
export class LoginReactiveComponent implements OnInit {
  // email = new FormControl("", {
  //   validators:[Validators.required, Validators.email],
  //   updateOn:'blur'
  // });
  // password = new FormControl("",
  // {
  //   validators:[
  //   Validators.required,
  //   Validators.minLength(8),
  //   createPasswordStrengthValidator()]

  // });

  // form = new FormGroup({
  //   // email:new FormControl('',[Validators.required,Validators.email]),
  //   // password:new FormControl('',[Validators.required,Validators.minLength(8)])
  //   email: this.email,
  //   password: this.password,
  // });
// //NOrmal form
  // formone = this.fb.group({
  //   email: [
  //     "",
  //     {
  //       validators: [Validators.required, Validators.email],
  //       updateOn: "blur",
  //     },
  //   ], //Syncronous validators
  //   password: [
  //     "",
  //     {
  //       validators: [
  //         Validators.required,
  //         Validators.minLength(8),
  //         createPasswordStrengthValidator(),
  //       ],
  //     },
  //   ],
  // });

  // Nullable form
  formone = this.fb.group({
    email: this.fb.nonNullable.control("",{
      validators: [Validators.required, Validators.email],
      updateOn: "blur",
    }),
    //Syncronous validators
    password: [
      "",
      {
        validators: [
          Validators.required,
          Validators.minLength(8),
          createPasswordStrengthValidator(),
        ],
      },
    ],
  });

  // form = this.builder.group({
  //   email:["",{
  //     Validators:[Validators.required,Validators.email],
  //   }],
  //   password:["",{
  //     validators:[Validators.required,Validators.minLength(8)]
  //   }]
  // });
  constructor(private fb: FormBuilder,private builder:NonNullableFormBuilder) {}

  ngOnInit() {}

  get email() {
    return this.formone.controls["email"];
  }

  get password() {
    return this.formone.controls["password"];
  }

  login(){
    const formvalue= this.formone.value;

    this.formone.patchValue({

    })
  }

  rest(){
    this.formone.reset();
    console.log(this.formone.value);
  }
}
