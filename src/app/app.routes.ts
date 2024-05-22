import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PostComponent } from './components/post/post.component';
import { EditPostComponent } from './components/edit-post/edit-post.component';
import { authGuard } from './auth.guard';
import { LoginComponent } from './components/login/login.component';
import { BrowseByCategoryComponent } from './components/browse-by-category/browse-by-category.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'post/:id',
    component: PostComponent,
  },
  {
    path: 'category/:id',
    component: BrowseByCategoryComponent,
  },
  {
    path: 'new-post',
    component: EditPostComponent, canActivate:[authGuard],
  },
  {
    path: 'edit-post/:id',
    component: EditPostComponent, canActivate:[authGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
