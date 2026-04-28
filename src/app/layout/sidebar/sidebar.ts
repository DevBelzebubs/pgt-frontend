import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar {
  userName = 'Juan Perez';
  userRole = 'Adm. Central';
  constructor(private authService: AuthService) {}

  onLogout(): void {
    this.authService.logout();
  }
}
