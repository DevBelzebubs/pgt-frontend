import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  pageTitle = signal<string>('Dashboard');
  userName = signal<string>('Diego M.');
  hasUnreadNotifications = signal<boolean>(true);
}
