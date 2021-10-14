import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostComponent } from './components/post/post.component'
import { DetailPostComponent } from './components/post/detail-post/detail-post.component'
import { AddPostComponent } from './components/post/add-post/add-post.component'


const routes: Routes = [
  { path: '', redirectTo: 'blog', pathMatch: 'full' },
  { path: 'blog', component: PostComponent },
  { path: 'blog/:id', component: DetailPostComponent },
  { path: 'blog/create', component: AddPostComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
