import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RedditPost } from './reddit-post'

@Component({
  selector: 'app-reddit',
  templateUrl: './reddit.component.html',
  styleUrls: ['./reddit.component.css']
})
export class RedditComponent implements OnInit {
	redditWidgetTitle: string;
	messages: RedditPost[];
	constructor(private http: HttpClient) {
		this.redditWidgetTitle = "Reddit";
	}

  ngOnInit() {
	  this.http.get('/api/reddit/hot').subscribe(data => {
			this.messages = new Array<RedditPost>();
			for (let i = 0; i < data['posts'].length - 2; i++)
			{
				this.messages.push(new RedditPost(
				data['posts'][i].title,
				data['posts'][i].author,
				new Date(data['posts'][i].time).toLocaleString(),
				data['posts'][i].url));
			}
		},
		err => {
			console.log('Something went wrong!');
		});
  }

}
