import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  isResetFailed = false;
  errorMsg = '';

  constructor(
    private fAuth: AngularFireAuth,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit(f: NgForm) {
    this.fAuth.sendPasswordResetEmail(f.value.email)
      .then(data => {
        f.resetForm();
        this.isResetFailed = false;
        this.router.navigate(['/login']);
      })
      .catch(err => {
        this.isResetFailed = true;
        this.errorMsg = err.message;
      });
  }

}
