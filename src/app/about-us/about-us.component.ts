import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss'
})
export class AboutUsComponent {
  team = [
    {
      name: 'Mr. Grish Shrestha',
      role: 'CEO & Founder',
      image: 'assets/images/Grish-CEO.jpg'

    },
    {
      name: 'Mrs. Diya Shrestha',
      role: 'Head of Marketing',
      image: 'assets/images/Diya.jpg'
    },
    {
      name: 'Mr. Pasa',
      role: 'Lead Developer(Senior Software Developer)',
      image: 'assets/images/Grish-developer.jpg'
    }
  ];
}
