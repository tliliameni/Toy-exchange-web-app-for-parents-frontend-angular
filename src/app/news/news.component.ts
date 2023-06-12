import { Component, OnInit } from '@angular/core';
import { NewsService } from '../services/news.service';
import { Router } from '@angular/router';
import { NewsPageService } from '../services/news-page.service';
import { NewsPage } from '../Models/NewsPage';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  newsList: any = [];
  NewsPage:NewsPage;
  searchQuery: string = '';
  p: number = 1;

  constructor(private newsService: NewsService,private newsPageService: NewsPageService, private router: Router) { }

  ngOnInit(): void {
    this.getNews();
    this.getNewss();
  }

  getNews(): void {
    this.newsService.getAllNews()
      .subscribe(
        data => {
          this.newsList = data;
          for (let news of this.newsList) {
            this.newsService.getImage(news.id)
              .subscribe(
                image => {
                  const reader = new FileReader();
                  reader.readAsDataURL(image);
                  reader.onload = () => {
                    news.imageDataUrl = reader.result as string;
                  };
                },
                error => console.log(error)
              );
          }
        },
        error => console.log(error)
      );
  }

  searchNews(): void {
    if (this.searchQuery === '') {
      this.resetFilter();
      return;
    }

    this.newsService.getAllNewsByMc(this.searchQuery)
      .subscribe(
        data => {
          this.newsList = data;
          for (let news of this.newsList) {
            this.newsService.getImage(news.id)
              .subscribe(
                image => {
                  const reader = new FileReader();
                  reader.readAsDataURL(image);
                  reader.onload = () => {
                    news.imageDataUrl = reader.result as string;
                  };
                },
                error => console.log(error)
              );
          }
        },
        error => console.log(error)
      );
  }

  resetFilter(): void {
    this.searchQuery = '';
    // Reset any other filter-related variables or properties if needed
    // Perform any other actions required to reset the filter

    // Example: Clear the newsList
    this.newsList = this.getNews();
  }

  getNewss(): void {
    this.newsPageService.getPageContactById(1)
      .subscribe(
        data => {
          this.NewsPage = data;
            this.newsPageService.getImage(this.NewsPage.id)
              .subscribe(
                image => {
                  const reader = new FileReader();
                  reader.readAsDataURL(image);
                  reader.onload = () => {
                    this.NewsPage.imagedataUrl = reader.result as string;
                  };
                },
                error => console.log(error)
              );
          },)}

  viewmore(id: number) {
    this.router.navigate(['/newsdetails', id]);
  }
}
