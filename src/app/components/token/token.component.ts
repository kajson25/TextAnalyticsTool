import { Component } from '@angular/core';
import { TokenService } from '../../services/token.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-token',
  standalone: true,
  imports: [FormsModule, CommonModule], 
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.css']
})
export class TokenComponent {
  token: string = '';

  constructor(private tokenService: TokenService) {}

  ngOnInit(): void {
    const savedToken = this.tokenService.getToken();
    if (savedToken) {
      this.token = savedToken;
    }
  }

  saveToken(): void {
    this.tokenService.setToken(this.token);
    alert('API Token saved successfully!');
  }
}

