import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private readonly router: Router,
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    this.redirectToRoleArea();
  }

  private redirectToRoleArea(): void {
    const url = this.authService.getCurrentRoleAreaUrl();
    if (url) {
      this.router.navigateByUrl(url);
    }
  }
}
