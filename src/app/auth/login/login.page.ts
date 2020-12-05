import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  isLoginFailed = false;
  errorMsg = '';

  constructor(
    private fAuth: AngularFireAuth,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit(f: NgForm) {
    this.fAuth.signInWithEmailAndPassword(f.value.email, f.value.password)
      .then(data => {
        f.resetForm();
        this.isLoginFailed = false;
        this.router.navigate(['/tabs/tab1']);
      })
      .catch(err => {
        this.isLoginFailed = true;
        this.errorMsg = err.message;
      });
  }
}
