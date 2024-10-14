// import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ExtractionComponent } from './components/extraction/extraction.component';
import { SimilarityComponent } from './components/similarity-component/similarity.component';
import { DetectionComponent } from './components/detection/detection.component';
import { SentimentComponent } from './components/sentiment/sentiment.component';
import { TokenComponent } from './components/token/token.component';
import { LoggerComponent } from './components/logger/logger.component';


export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'extraction',
    component: ExtractionComponent,
  },
  {
    path: 'similarity',
    component: SimilarityComponent,
  },
  {
    path: 'detection',
    component: DetectionComponent,
  },
  {
    path: 'sentiment',
    component: SentimentComponent,
  },
  {
    path: 'token',
    component: TokenComponent,
  },
  {
    path: 'logger',
    component: LoggerComponent,
  },
];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }
