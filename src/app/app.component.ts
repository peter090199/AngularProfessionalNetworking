import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slideFade } from './animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
//   template: `
//   <div [@routeAnimations]="prepareRoute(outlet)">
//     <router-outlet #outlet="outlet"></router-outlet>
//   </div>
// `,
animations: [slideFade],
})
export class AppComponent {
  title = 'frontend-nexsuz';
  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
