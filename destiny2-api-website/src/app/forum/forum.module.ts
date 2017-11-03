import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForumComponent } from './forum.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
	HttpClientModule
  ],
  exports: [
	ForumComponent

  ],
  declarations: [ForumComponent]
})
export class ForumModule { }
