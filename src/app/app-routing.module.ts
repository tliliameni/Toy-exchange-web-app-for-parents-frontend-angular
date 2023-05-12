import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNewsComponent } from './add-news/add-news.component';
import { AppComponent } from './app.component';
import { ChildAddComponent } from './child-add/child-add.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NewsComponent } from './news/news.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { SignupComponent } from './signup/signup.component';
import { ContactComponent } from './contact/contact.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { UsersListComponent } from './users-list/users-list.component';
import { AdminNewsComponent } from './admin-news/admin-news.component';
import { EditNewsComponent } from './edit-news/edit-news.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminArticlesComponent } from './admin-articles/admin-articles.component';
import { CategoryComponent } from './category/category.component';
import { ArticleComponent } from './article/article.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { AdminGuard } from './services/admin.guard';
import {CanActivateChild} from '@angular/router';
import { ArticleCreateComponent } from './article-create/article-create.component';
import { AuthGuard } from './services/auth.guard';
import { ArticleDetailsComponent } from './article-details/article-details.component';

const routes: Routes = [
  { path: '', component: HomeComponent ,pathMatch: 'full',
  },
  { path: 'home', component: HomeComponent ,pathMatch: 'full',
},
  { path: 'admin',
  component: DashboardAdminComponent ,canActivate: [AdminGuard],
  children: [
      {
        path: '',
        component: DashboardComponent,

      },

      {
        path: 'profile',
        component: ProfileComponent,

      },
      {
        path: 'article',
        component: AdminArticlesComponent,

      },
      {
        path: 'category',
        component: CategoryComponent,

      },
      {
        path: 'edit/:id',
        component: EditNewsComponent,

      },
      {
        path: 'users',
        component: UsersListComponent,

      },
      {
        path:'newsList',
        component:AdminNewsComponent,
      },
      {
        path: 'createNews',
        component: AddNewsComponent,

      },
      {
        path: 'addcategory',
        component: AddCategoryComponent,

      }

  ]
},
  {
    path: 'login',
    component: LoginComponent,

  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'articles',
    component: ArticleComponent,

  },
  {
    path: 'articledetails/:id',
    component: ArticleDetailsComponent,
  },
  {
    path: 'aboutus',
    component: AboutUsComponent,

  },
    {
    path: 'news',
    component: NewsComponent,

  },

  {
    path: 'contact',
    component: ContactComponent,

  },
  {
    path: 'create',
    component: ArticleCreateComponent,canActivate: [AuthGuard]

  },


  {
    path: 'signup',
    component: SignupComponent,

  },
  {
    path: 'addchild',
    component: ChildAddComponent,

  },
  {
    path: '404',
    component: NotfoundComponent,

  },
  {
    path: '**',
    component: NotfoundComponent,

  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
