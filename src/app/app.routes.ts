import { Routes } from '@angular/router';
import { RegisterComponent } from './core/auth/pages/register/register.component';
import { LoginComponent } from './core/auth/pages/login/login.component';
import { EmailVerificationComponent } from './core/auth/pages/email-verification/email-verification.component';
import { PasswordResetComponent } from './core/auth/pages/password-reset/password-reset.component';
import { PasswordResetEmailComponent } from './core/auth/pages/password-reset-email/password-reset-email.component';
import { AuthGuard } from './core/auth/guards/auth.guard';
import { IsSignedIn } from './core/auth/guards/is-signed-in.guard';
import { ContentListComponent } from './features/pages/content-list/content-list.component';
import { ContentPageComponent } from './features/pages/content-page/content-page.component';
import { HomeComponent } from './features/pages/home/home.component';
import { LanguageDashboardComponent } from './features/pages/language-dashboard/language-dashboard.component';
import { TopicTreeNode } from './features/interfaces/response/topic-tree.class';
import { ResourceListComponent } from './features/pages/resource-list/resource-list.component';
import { CollectionPageComponent } from './features/pages/collection-page/collection-page.component';

export const routes: Routes = [
    {path: 'register', component: RegisterComponent, canActivate: [IsSignedIn]},
    {path: 'login', component: LoginComponent, canActivate: [IsSignedIn]},
    {path: 'email-verification', component: EmailVerificationComponent},
    {path: 'password-reset', component: PasswordResetComponent},
    {path: 'forgot-password', component: PasswordResetEmailComponent, canActivate: [IsSignedIn]},
    {path: 'home', component: HomeComponent, canActivate: [AuthGuard], title: 'Home'},
    {path: 'dashboard/:languageId', component: LanguageDashboardComponent, canActivate: [AuthGuard], title: 'Dashboard'},
    {path: ':languageId/content', component: ContentListComponent, canActivate: [AuthGuard], title: 'Content'},
    {path: ':languageId/content/:id', component: ContentPageComponent, canActivate: [AuthGuard]},
    {path: ':languageId/resources', component: ResourceListComponent, canActivate: [AuthGuard], title: 'Resources'},
    {path: ':languageId/resources/:collectionId', component: CollectionPageComponent, canActivate: [AuthGuard], title: 'Resources: collection'}
    
];
