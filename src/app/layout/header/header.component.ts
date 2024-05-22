import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthComponent } from '../../components/auth/auth.component';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { CategoryMenuComponent } from '../../components/category-menu/category-menu.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, AuthComponent, CommonModule, CategoryMenuComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  authService = inject(AuthService);
  connected = this.authService.isLoggedIn();

}


