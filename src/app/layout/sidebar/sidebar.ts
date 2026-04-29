import { Component, signal, output } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar {
  userName = 'Juan Perez';
  userRole = 'Adm. Central';

  // Signal para controlar si el sidebar está abierto en móvil
  isOpen = signal(false);

  // Output para que el layout pueda escuchar el estado
  openChange = output<boolean>();

  constructor(private authService: AuthService) {}

  toggle() {
    this.isOpen.update(v => !v);
    this.openChange.emit(this.isOpen());
  }

  close() {
    this.isOpen.set(false);
    this.openChange.emit(false);
  }

  onLogout(): void {
    this.authService.logout();
  }
}