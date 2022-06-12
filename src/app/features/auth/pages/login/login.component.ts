import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { takeWhile } from 'rxjs';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  public readonly form: FormGroup;

  public showErrorMessage: boolean = false;

  private isComponentAlive = true;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.authService.logout();
  }

  onFormSubmit(): void {
    const { username, password } = this.form.value;
    this.authService
      .login(username, password)
      .pipe(takeWhile(() => this.isComponentAlive))
      .subscribe(this.onLogin.bind(this));
  }

  ngOnDestroy(): void {
    this.isComponentAlive = false;
  }

  private onLogin(result: boolean) {
    this.showErrorMessage = !result;
    const redirectUrl = this.authService.getCurrentRoleAreaUrl();
    if (redirectUrl) {
      this.router.navigateByUrl(redirectUrl);
    }
  }
}
