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
import { VocabularyListComponent } from './features/pages/vocabulary-list/vocabulary-list.component';
import { VocabularyPageComponent } from './features/pages/vocabulary-page/vocabulary-page.component';
import { VocabularyCollectionComponent } from './features/pages/vocabulary-collection/vocabulary-collection.component';
import { UserProfileComponent } from './core/user/pages/user-profile/user-profile.component';
import { LandingPageComponent } from './features/pages/landing-page/landing-page.component';
import { RedirectGuard } from './core/auth/guards/redirect.guard';

export const routes: Routes = [
    {path: '', component: LandingPageComponent, title: 'Faalo'},
    {path: 'register', component: RegisterComponent, canActivate: [IsSignedIn]},
    {path: 'login', component: LoginComponent, canActivate: [IsSignedIn]},
    {path: 'email-verification', component: EmailVerificationComponent, canActivate: [AuthGuard, RedirectGuard]},
    {path: 'password-reset', component: PasswordResetComponent, canActivate: [IsSignedIn]},
    {path: 'forgot-password', component: PasswordResetEmailComponent, canActivate: [IsSignedIn]},
    {path: 'home', component: HomeComponent, canActivate: [AuthGuard], title: 'Home'},
    {path: 'dashboard/:languageId', component: LanguageDashboardComponent, canActivate: [AuthGuard], title: 'Dashboard'},
    {path: ':languageId/content', component: ContentListComponent, canActivate: [AuthGuard], title: 'Content'},
    {path: ':languageId/content/:id', component: ContentPageComponent, canActivate: [AuthGuard]},
    {path: ':languageId/resources', component: ResourceListComponent, canActivate: [AuthGuard], title: 'Resources'},
    {path: ':languageId/resources/:collectionId', component: CollectionPageComponent, canActivate: [AuthGuard], title: 'Resources: collection'},
    {path: ':languageId/vocabulary', component: VocabularyListComponent, canActivate: [AuthGuard], title: 'Vocabulary'},
    {path: ':languageId/vocabulary/:id', component: VocabularyPageComponent, canActivate: [AuthGuard], title: 'Vocabulary'},
    {path: ':languageId/vocabulary/collection/:id', component: VocabularyCollectionComponent, canActivate: [AuthGuard], title: 'Collection'},
    {path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard], title: 'My Account'}
    
];
