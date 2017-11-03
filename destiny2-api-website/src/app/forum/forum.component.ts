import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ForumPost } from './forum-post'

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {
	forumWidgetTitle: string;
	messages: ForumPost[];
	constructor(private http: HttpClient) {
		this.forumWidgetTitle = "Destiny 2 Forums";
	}

  ngOnInit(): void {
	  this.http.get('/api/forums/trending').subscribe(data => {
			//this.messages = data.posts;
			this.messages = new Array<ForumPost>();
			for (let i = 0; i < data['posts'].length; i++)
			{
				this.messages.push(new ForumPost(
				data['posts'][i].subject,
				data['posts'][i].author,
				data['posts'][i].postId,
				new Date(data['posts'][i].creation).toLocaleString(),
				data['posts'][i].url));
			}
		},
		err => {
			console.log('Something went wrong!');
		});
  }
}
