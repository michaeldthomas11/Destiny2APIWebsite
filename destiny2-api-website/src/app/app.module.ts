import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ForumModule } from './forum/forum.module';
import { RedditModule } from './reddit/reddit.module';
import { SearchModule } from './search/search.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
	RedditModule,
	ForumModule,
    SearchModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
