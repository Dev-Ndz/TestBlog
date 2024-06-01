import { Component, Input, inject } from "@angular/core";
import { DialogModule } from "primeng/dialog";
import { AuthService } from "../../services/auth.service";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-auth",
  standalone: true,
  imports: [DialogModule, CommonModule, FormsModule],
  templateUrl: "./auth.component.html",
  styleUrl: "./auth.component.scss",
})
export class AuthComponent {
  @Input() displayLogin: boolean = false;
  @Input() displayRegister: boolean = false;
  authService = inject(AuthService);
  router = inject(Router);

  name: string = "";
  email: string = "";
  password: string = "";
  password_confirmation: string = "";
  userType: string = "";

  user = this.authService.getUser();

  onLogin = () => {
    this.authService
      .login({ email: this.email, password: this.password })
      .subscribe({
        next: () => {
          this.displayLogin = false;
          window.location.reload();
        },

        error: (err) => console.log(err),
      });
  };
  onRegister = () => {
    this.authService
      .register({
        name: this.name,
        email: this.email,
        password: this.password,
        password_confirmation: this.password_confirmation,
        userType: this.userType,
      })
      .subscribe({
        next: (data) => {
          this.displayRegister = false;
          console.log(data);
        },
        error: (err) => console.log(err),
      });
  };

  onLogOut = () => {
    this.authService.logout();
  };

  switchToRegister = () => {
    this.displayLogin = false;
    this.displayRegister = true;
  };

  switchToLogin = () => {
    this.displayLogin = true;
    this.displayRegister = false;
  };
}
