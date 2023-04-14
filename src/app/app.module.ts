import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { MatInputModule } from "@angular/material/input";
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { MatCardModule } from '@angular/material/card';
import { HeaderComponent } from './header/header.component';
import {MatToolbarModule} from'@angular/material/toolbar';
import {MatIconModule} from'@angular/material/icon';
import{MatListModule} from'@angular/material/list';
import{MatSidenavModule} from'@angular/material/sidenav';
import{MatButtonModule} from'@angular/material/button';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { ChildAddComponent } from './child-add/child-add.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { CarouselComponent } from './caroussel/caroussel.component';
import { MatSliderModule } from '@angular/material/slider';
import { NewsComponent } from './news/news.component';
import { SidebarAdminComponent } from './sidebar-admin/sidebar-admin.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { AddNewsComponent } from './add-news/add-news.component';
import { UsersTabComponent } from './users-tab/users-tab.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { DashboardHeaderComponent } from './dashboard-header/dashboard-header.component';
import { SearchComponent } from './search/search.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ContactComponent } from './contact/contact.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { AnimatedToyComponent } from './animated-toy/animated-toy.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ArticleComponent } from './article/article.component';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { UsersListComponent } from './users-list/users-list.component';
import { NgChartsModule } from 'ng2-charts';
import {MatMenuModule} from '@angular/material/menu';
import { AdminNewsComponent } from './admin-news/admin-news.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { EditNewsComponent } from './edit-news/edit-news.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { CommonModule } from '@angular/common';
import * as CanvasJSAngularChart from '../assets/canvasjs.angular.component';
import { DashChartsComponent } from './dash-charts/dash-charts.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminArticlesComponent } from './admin-articles/admin-articles.component';
import { CategoryComponent } from './category/category.component';
import { AddCategoryComponent } from './add-category/add-category.component';
var CanvasJSChart = CanvasJSAngularChart.CanvasJSChart;
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CanvasJSChart,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    ChildAddComponent,
    NotfoundComponent,
    CarouselComponent,
    NewsComponent,
    SidebarAdminComponent,
    DashboardAdminComponent,
    AddNewsComponent,
    UsersTabComponent,
    DashboardComponent,
    DashboardHeaderComponent,
    SearchComponent,
    ContactComponent,
    AboutUsComponent,
    AnimatedToyComponent,
    HomePageComponent,
    ArticleComponent,
    UsersListComponent,
    AdminNewsComponent,
    ConfirmationDialogComponent,
    EditNewsComponent,
    DashChartsComponent,
    ProfileComponent,
    AdminArticlesComponent,
    CategoryComponent,
    AddCategoryComponent,
  ],
  imports: [
    BrowserModule,
    CarouselModule,
    CommonModule,
    MatMenuModule,
    NgxPaginationModule,
    NgChartsModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatDialogModule,
    NgbCarouselModule,
    RouterOutlet,
    MatSliderModule,
    NgxMatSelectSearchModule,
    MatSelectModule,
    MatFormFieldModule,
    AppRoutingModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NoopAnimationsModule,
    MatInputModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }