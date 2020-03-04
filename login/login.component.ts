import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators,FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm : FormGroup;
  submitted: boolean;
  sortT='HightoLow';
  date=new Date();
  constructor(private formBuilder:FormBuilder,private router:Router,) { }

  ngOnInit() {
    this.loginForm=this.formBuilder.group({
      username:['' ,[Validators.required,Validators.pattern('[A-Za-z ]+'),Validators.minLength(5),Validators.maxLength(20)]],
      password:['',[Validators.required,Validators.pattern('[A-Za-z0-9@#]+'),Validators.minLength(5),Validators.maxLength(10)]],
    });
  }
  onSubmit(){
    this.submitted=true;
    if(this.loginForm.invalid){
      return;
    }
    if(this.loginForm.valid){
      console.log(this.loginForm);
      let sortType=this.sortT;
      let queryParams = {
       sortType
     }
      this.router.navigate(['list'], { queryParams});
    }
  }
}
