import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink,CommonModule,RouterOutlet,RouterLink,
    RouterModule,
    CommonModule,
    RouterOutlet,

    FormsModule, // Keep this for router outlet
 ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'Ramro_Bazar';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title
  ) {}

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateTitle();
      });
  }
  private updateTitle() {
    const segments = this.router.url.split('/');
    const lastSegment = segments[segments.length - 1];
    this.titleService.setTitle(this.formatTitle(lastSegment));
  }
  private formatTitle(segment: string): string {
    return `RamroBazar - ${segment.charAt(0).toUpperCase() + segment.slice(1)}`;
  }

  menuItems =[
    {
      title: 'Dashboard',
      route: 'dashboard'
    },
    {
      title : 'Add Product',
      route : 'add-product',
    },
    {
      title : 'Product List',
      route : 'list-product'
    },
    {
      title : 'About Us',
      route : 'about-us'
    }
  ]
}
