import { Component } from '@angular/core';

@Component({
  selector: 'app-theme-toggle',
  imports: [],
  templateUrl: './theme-toggle.component.html',
  styleUrl: './theme-toggle.component.scss'
})
export class ThemeToggleComponent {
  isDarkMode = false;

  ngOnInit(): void {
    const savedTheme = localStorage.getItem('hs_theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    this.isDarkMode = 
      savedTheme === 'dark' || 
      (savedTheme === 'auto' && prefersDark) ||
      (!savedTheme && prefersDark);
    
    this.applyTheme();
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    
    localStorage.setItem('hs_theme', this.isDarkMode ? 'dark' : 'light');
    
    this.applyTheme();
  }

  private applyTheme(): void {
    const html = document.querySelector('html');
    if (!html) return;
    
    if (this.isDarkMode) {
      html.classList.add('dark');
      html.classList.remove('light');
    } else {
      html.classList.add('light');
      html.classList.remove('dark');
    }
  }
  

}
