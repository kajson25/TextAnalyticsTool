import { Component } from '@angular/core';
import { TokenService } from '../../services/token.service';  // Import the service
import { FormsModule } from '@angular/forms';  // For ngModel
import { CommonModule } from '@angular/common';  // For *ngIf and other common directives

@Component({
  selector: 'app-token',
  standalone: true,
  imports: [FormsModule, CommonModule],  // Import FormsModule and CommonModule
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.css']
})
export class TokenComponent {
  token: string = '';  // The token value

  constructor(private tokenService: TokenService) {}

  // Load the token from localStorage on component initialization
  ngOnInit(): void {
    const savedToken = this.tokenService.getToken();
    if (savedToken) {
      this.token = savedToken;
    }
  }

  // Save the token to localStorage using the service
  saveToken(): void {
    this.tokenService.setToken(this.token);
    alert('API Token saved successfully!');
  }
}

