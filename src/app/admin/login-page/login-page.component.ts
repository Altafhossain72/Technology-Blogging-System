import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';

import {User} from '../../shared/interfaces/interfaces';
import {AuthService} from '../shared/services/auth.service';
import {AlertService} from '../shared/services/alert.service';
import {popLeft} from '../shared/animations';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  animations: [
    popLeft
  ]
})
export class LoginPageComponent implements OnInit {

  params: string;
  isLoading = false;
  form: FormGroup;

  // Animation state
  position = '';

  constructor(
    public auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private alert: AlertService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      if (params['loginAgain']) {
        this.params = 'Please, log in again. Your token has been expired';
      } else if (params['authFailed']) {
        this.params = 'Session has been expired. Log in, please';
      }
    });

    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ])
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.isLoading = true;
    const user: User = this.form.value;

    this.auth.login(user).subscribe((response) => {
      this.form.reset();
      this.router.navigate(['/admin', 'dashboard']);
      this.isLoading = false;
    }, (err) => {
      this.params = '';
      this.isLoading = false;
      this.alert.danger('Log in failed');
      console.log('From login-page: ', err);
    });
  }
}
