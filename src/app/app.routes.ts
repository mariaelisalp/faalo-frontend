import { Routes } from '@angular/router';
import { RegisterComponent } from './core/auth/pages/register/register.component';
import { LoginComponent } from './core/auth/pages/login/login.component';
import { EmailVerificationComponent } from './core/auth/pages/email-verification/email-verification.component';
import { PasswordResetComponent } from './core/auth/pages/password-reset/password-reset.component';
import { PasswordResetEmailComponent } from './core/auth/pages/password-reset-email/password-reset-email.component';
import { AuthGuard } from './core/auth/guards/auth.guard';
import { HomeComponent } from './features/home/home.component';
import { IsSignedIn } from './core/auth/guards/is-signed-in.guard';
import { LanguageDashboardComponent } from './features/language-dashboard/language-dashboard.component';

export const routes: Routes = [
    {path: 'register', component: RegisterComponent, canActivate: [IsSignedIn]},
    {path: 'login', component: LoginComponent, canActivate: [IsSignedIn]},
    {path: 'email-verification', component: EmailVerificationComponent},
    {path: 'password-reset', component: PasswordResetComponent},
    {path: 'forgot-password', component: PasswordResetEmailComponent, canActivate: [IsSignedIn]},
    {path: 'home', component: HomeComponent, canActivate: [AuthGuard], title: 'Home'},
    {path: 'dashboard/:languageId', component: LanguageDashboardComponent, canActivate: [AuthGuard], title: 'Dashboard'}
];
