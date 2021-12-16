import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostComponent } from './components/post/post.component'
import { DetailPostComponent } from './components/post/detail-post/detail-post.component'
import { AddPostComponent } from './components/post/add-post/add-post.component'
import { LoginComponent } from './components/auth/login/login.component'
import { RegisterComponent } from './components/auth/register/register.component'
import { ProfileComponent } from './components/auth/profile/profile.component'
import {EditPostComponent} from "./components/post/edit-post/edit-post.component";
import {PasswordResetComponent} from "./components/auth/password-reset/password-reset.component";
import {PasswordResetConfirmComponent} from "./components/auth/password-reset-confirm/password-reset-confirm.component";


const routes: Routes = [
  { path: '', redirectTo: 'blog', pathMatch: 'full' },
  { path: 'blog', component: PostComponent },
  { path: 'blog/create', component: AddPostComponent },
  { path: 'blog/:id', component: DetailPostComponent },
  { path: 'blog/edit/:id', component: EditPostComponent },
  { path: 'account/profile/:id', component: ProfileComponent },
  { path: 'account/login', component: LoginComponent },
  { path: 'account/password_reset', component: PasswordResetComponent },
  { path: 'account/password_reset_confirm/:token', component: PasswordResetConfirmComponent },
  { path: 'account/register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
