import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from '../services/news.service';
import { News } from '../Models/news';

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.css']
})
export class NewsDetailsComponent implements OnInit {
  id: number;
  news: News;

  constructor(private route: ActivatedRoute, private newsService: NewsService) { }
  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.getNewsById(this.id);
    this.getImageById(this.id);
  }
getImageById(id:number){
  this.newsService.getImage(id).subscribe(
    data=>{
      this.news.photo=data;
    }
    ,
      error => {
        console.log(error);
      }
  )
}
  getNewsById(id: number): void {
    this.newsService.getNewsById(id).subscribe(
      data => {
        this.news = data;
        this.newsService.getImage(this.news.id)
        .subscribe(
          image => {
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = () => {
              this.news.imagedataUrl = reader.result as string;
            };
          },
          error => console.log(error)
        );
        console.log(data)
        console.log(data.photo)
      },
      error => {
        console.log(error);
      }
    );
  }

}
