import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  currentUrl = "home";

  constructor(private router: Router) {

    //check url whenever you're on a new page
    router.events.subscribe(
      (url:any) => {
        this.currentUrl = url.url ? url.url.replace("/",""):this.currentUrl;
    });
    
  }

  ngOnInit():void {
  }
}
