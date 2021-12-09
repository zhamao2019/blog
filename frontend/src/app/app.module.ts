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
export class AppModule { }
