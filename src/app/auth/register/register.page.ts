import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  isRegisterFailed = false;
  errorMsg = '';
  constructor(
    private fAuth: AngularFireAuth,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit(f: NgForm) {
    console.log(f.value);
    this.fAuth.createUserWithEmailAndPassword(f.value.email, f.value.password)
      .then(() => {
        f.resetForm();
        this.router.navigate(['/login'])
      })
      .catch(err => {
        this.isRegisterFailed = true;
        this.errorMsg = err.message;
      });;
  }

}
