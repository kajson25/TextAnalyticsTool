import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

/**
 * Standalone component does not need to be declared in an NgModule. 
 * Instead, it directly manages its own dependencies and can be bootstrapped or used independently.
 */

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatButtonModule, RouterModule], // Import Angular Material Button and RouterModule
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {}
