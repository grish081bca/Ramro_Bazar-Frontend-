import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,RouterModule,RouterOutlet],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title : string = '';

  constructor(private route : ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      const currentRoute = this.route.snapshot.firstChild;
      if (currentRoute && currentRoute.routeConfig) {
        const routeSegment = currentRoute.routeConfig.path;
        if(routeSegment){
        this.title = this.formatTitle(routeSegment);
        }
      }
    });
  }

  private formatTitle(segment : string): string {
    // return `${segment.charAt(0).toUpperCase() + segment.slice(1)}`;
    return segment
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  }
}
