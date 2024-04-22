import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [],
  templateUrl: './error.component.html',
  styleUrl: './error.component.css',
  host: { 'class': 'w-100 m-auto text-center' },
})
export class ErrorComponent {
  constructor(private location: Location) {
  }

  goBack(): void {
    this.location.back();
  }
}
