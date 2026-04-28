import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styles: [`
    @keyframes dropdownFade {
      from { opacity: 0; transform: scale(0.95) translateY(-10px); }
      to { opacity: 1; transform: scale(1) translateY(0); }
    }
    .animate-dropdown {
      animation: dropdownFade 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
  `]
})
export class Navbar {
  userName = signal<string>('Diego M.');
  hasUnreadNotifications = signal<boolean>(true);
  
  // Controles de UI
  isSettingsOpen = signal<boolean>(false);
  isDarkMode = signal<boolean>(false);

  ngOnInit() {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      this.isDarkMode.set(true);
      document.documentElement.classList.add('dark');
    }
  }

  toggleSettings() {
    this.isSettingsOpen.update(v => !v);
  }

  toggleDarkMode() {
    const isDark = !this.isDarkMode();
    this.isDarkMode.set(isDark);
    
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }
}
