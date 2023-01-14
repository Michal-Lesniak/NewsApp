import { Component , ViewChild, AfterViewInit, ChangeDetectorRef} from '@angular/core';
import { MatSidenav} from '@angular/material/sidenav';
import { BreakpointObserver} from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'NewsApp';
  @ViewChild(MatSidenav) sid!: MatSidenav;

  constructor(private observer: BreakpointObserver, private cdr: ChangeDetectorRef){}

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




}
