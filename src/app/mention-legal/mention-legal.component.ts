import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { MentionLegal } from '../Models/MentionLegal';
import { Router } from '@angular/router';
import { PageMentionLegalService } from '../services/page-mention-legal.service';
@Component({
  selector: 'app-mention-legal',
  templateUrl: './mention-legal.component.html',
  styleUrls: ['./mention-legal.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.5s ease-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('0.5s ease-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class MentionLegalComponent implements OnInit {
  title: String;
  imageURL: string;
 Contact:MentionLegal;
  public data: Array<{ text: string; value: number }> = [];

  selectedCategory = '';

  categoriesList = [];

  constructor(
    private newsService: PageMentionLegalService,
    private router: Router
  ) {}

  getNews(): void {
    this.newsService.getPageContactById(1)
      .subscribe(
        data => {
          this.Contact = data;
            this.newsService.getImage(this.Contact.id)
              .subscribe(
                image => {
                  const reader = new FileReader();
                  reader.readAsDataURL(image);
                  reader.onload = () => {
                    this.Contact.imagedataUrl = reader.result as string;
                  };
                },
                error => console.log(error)
              );
          },)}
          ngOnInit(): void {
              this.getNews();
          }

        }
