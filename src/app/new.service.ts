import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NewService {
  constructor(private http:HttpClient) { }

  initSourcers(){
    return this.http.get('https://newsapi.org/v2/sources?language=en&apiKey=65cf1b7ee87d4a15bdab53884838d599');
  }

  getArticlesByid(source: string){
    return this.http.get('https://newsapi.org/v2/top-headlines?sources=' + source + '&apiKey=65cf1b7ee87d4a15bdab53884838d599');
  }

  initArticles(){
    return this.http.get('https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=65cf1b7ee87d4a15bdab53884838d599')
  }
}

