import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-similarity',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './similarity.component.html',
  styleUrls: ['./similarity.component.css']
})
export class SimilarityComponent {
  text1: string = '';
  text2: string = '';
  similarityResult: string = '';
  apiKey: string = '';

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  checkSimilarity() {
    this.apiKey = this.tokenService.getToken() || '';
    const url = `https://api.dandelion.eu/datatxt/sim/v1`;
    const params = {
      text1: this.text1,
      text2: this.text2,
      token: this.apiKey
    };

    this.http.get<any>(url, { params }).subscribe(
      (response) => {
        this.similarityResult = `Similarity: ${(response.similarity * 100).toFixed(2)}%`;
      },
      (error) => {
        console.error('Error fetching similarity', error);
        this.similarityResult = 'Error fetching similarity result';
      }
    );
  }
}
