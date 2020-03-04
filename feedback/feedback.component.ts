import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators,FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  feedback : FormGroup;
  submitted: boolean;
  sortT='HightoLow';

  constructor(private formBuilder:FormBuilder,private router:Router) { }

  ngOnInit() {
    this.feedback=this.formBuilder.group({
      name:['' ,[Validators.required,Validators.pattern('[A-Za-z ]+'),Validators.minLength(5),Validators.maxLength(20)]],
      email:['',[Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      mobile:['' ,[Validators.required,Validators.pattern('[6-9][0-9]+'),Validators.minLength(10),Validators.maxLength(10)]],
      feedback:['',[Validators.required]],

    });
  }
  onSubmit(){
    this.submitted=true;
    console.log(this.feedback);
    if(this.feedback.invalid){
      return;
    }

    let data={
      'Name':this.feedback.controls.name.value,
      'Email':this.feedback.controls.email.value,
      'Mobile':this.feedback.controls.mobile.value,
      'Feedback':this.feedback.controls.feedback.value
    }
    localStorage.setItem('feedback',JSON.stringify(data));
    
  if(this.feedback.valid){
    alert('Your Feedback has been saved in localstorage!!');
     let sortType=this.sortT;
      let queryParams = {
       sortType
     }
      this.router.navigate(['list'], { queryParams});
  }
  }

  
  close(){
    let sortType=this.sortT;
    let queryParams = {
     sortType
   }
    this.router.navigate(['list'], { queryParams});
  }

}
