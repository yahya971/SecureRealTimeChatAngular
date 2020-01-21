import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  constructor(private fb: FormBuilder,private router:Router) { }
  myForm: FormGroup;
  ngOnInit() {
    this.myForm = this.fb.group({
      cn: [''],
      givenName: [''],
      sn: [''],
      telephoneNumber: [''],
      userPassword:['']
    });



 


  }
  submit() {
    console.log(this.myForm.value);
    this.router.navigate(['/login']);
  }

}
