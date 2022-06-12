import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RoleType } from '../enums/role.enum';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly LOCAL_STORAGE_ROLES_KEY = 'role';

  getCurrentRole(): RoleType | null {
    return localStorage.getItem(this.LOCAL_STORAGE_ROLES_KEY) as RoleType;
  }

  getCurrentRoleAreaUrl(): string | null {
    const role = this.getCurrentRole();
    switch (role) {
      case 'admin':
        return '/admin';
      case 'seller':
        return '/seller';
      case 'buyer':
        return '/buyer';
      case null:
        return '/auth/login';
      default:
        console.error(`Role ${role} doesn't exist!`);
        return null;
    }
  }

  login(username: string, password: string): Observable<boolean> {
    if (password !== 'pass123') {
      return of(false);
    }

    const usernameToRoleMappings = new Map<string, string>([
      ['admin', 'admin'],
      ['palani', 'buyer'],
      ['peter', 'seller'],
    ]);
    const role = usernameToRoleMappings.get(username);
    if (!role) {
      return of(false);
    }

    localStorage.setItem(this.LOCAL_STORAGE_ROLES_KEY, role);
    return of(true);
  }

  logout(): void {
    localStorage.removeItem(this.LOCAL_STORAGE_ROLES_KEY);
  }
}
