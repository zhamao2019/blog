import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EditorModule } from "@tinymce/tinymce-angular";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PostComponent } from './components/post/post.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AddPostComponent } from './components/post/add-post/add-post.component';
import { DetailPostComponent } from './components/post/detail-post/detail-post.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { LoginComponent } from './components/auth/login/login.component';
import { ProfileComponent } from './components/auth/profile/profile.component';

import { authInterceptorProviders } from './helpers/auth.interceptor';
import { EditPostComponent } from './components/post/edit-post/edit-post.component';
import { ToastrModule } from 'ngx-toastr';
import { PasswordResetComponent } from './components/auth/password-reset/password-reset.component';
import { PasswordResetConfirmComponent } from './components/auth/password-reset-confirm/password-reset-confirm.component';
import {UrlService} from "./services/shared/url.service";


@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    AddPostComponent,
    DetailPostComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    EditPostComponent,
    PasswordResetComponent,
    PasswordResetConfirmComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    EditorModule,
    ToastrModule.forRoot(),
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {
  // do not remove this
  // use to redirect to previous page
  constructor(private urlService: UrlService){}
}
