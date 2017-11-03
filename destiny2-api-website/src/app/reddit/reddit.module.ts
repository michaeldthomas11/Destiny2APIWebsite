import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RedditComponent } from './reddit.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
	HttpClientModule
  ],
  exports: [
	RedditComponent
	],
  declarations: [RedditComponent]
})
export class RedditModule { }
