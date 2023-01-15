import { Component , ViewChild, AfterViewInit, ChangeDetectorRef, OnInit} from '@angular/core';
import { MatSidenav} from '@angular/material/sidenav';
import { BreakpointObserver} from '@angular/cdk/layout';
import { NewService } from './new.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit , OnInit{
  title = 'NewsApp';
  @ViewChild(MatSidenav) sid!: MatSidenav;
  public sources: any = [];
  public articles: any = [];
  public selectorNewsLabel: string = 'Top 10 Trending News'; 

  constructor(private observer: BreakpointObserver, private cdr: ChangeDetectorRef, private newsApi:NewService){}

  ngAfterViewInit(): void {
    this.sid.opened = true;
    this.observer.observe(['(max-width: 787px)']).subscribe(
      (res) =>  {
        if(res.matches){
            this.sid.mode = 'over';
            this.sid.close();
        }
        else{
          this.sid.mode = 'side';
          this.sid.open();
        }
      }
    );
    this.cdr.detectChanges();
  }

  ngOnInit(): void {
      this.newsApi.initArticles().subscribe(
        (res:any) => {
          console.log(res);
          this.articles = res.articles;
        }
      )

      this.newsApi.initSourcers().subscribe(
        (res:any) => {
          console.log(res);
          this.sources = res.sources;
        }
      )
  }


  searchSource(source: any){
    this.newsApi.getArticlesByid(source.id).subscribe(
      (res:any) =>{ 
      this.articles = res.articles;
      this.selectorNewsLabel = source.name;
      }
    );
  }

}
