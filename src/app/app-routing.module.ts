// import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ExtractionComponent } from './components/extraction/extraction.component';
import { SimilarityComponentComponent } from './components/similarity-component/similarity-component.component';
import { DetectionComponent } from './components/detection/detection.component';
import { SentimentComponent } from './components/sentiment/sentiment.component';


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
    component: SimilarityComponentComponent,
  },
  {
    path: 'detection',
    component: DetectionComponent,
  },
  {
    path: 'sentiment',
    component: SentimentComponent,
  },
];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }
