import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";

import { Post } from '../post.model';
import { PostsService } from "../post.service";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
//I want to reach out to service and call the getPosts method in post.service.ts
//so I used implements OnInit and created its method as well
export class PostListComponent implements OnInit, OnDestroy {
//  posts = [
//    {title: 'First Post', content: 'This is the first post\'s content'},
//    {title: 'Second Post', content: 'This is the second post\'s content'},
//    {title: 'Third Post', content: 'This is the third post\'s content'},
//  ];

//used Post interface
posts: Post[] = [];
private postsSub: Subscription;

//adding constructor for dependancy injection as we have created a service file (post.service.ts)
//constructor is a function which is called whenever angular creates a new instance of this component

//define the service you want have and the type to help angular what to give you
//we want to store this instance into a property we could have declare a postsService variable of type Post[] above and let this.postsService below = to it to be stored in it
//however, public keyboard does that. It automatically creates a new property in PostListComponent and store the value in that property
  constructor(public postsService: PostsService) {}

  //fetch all the posts
  ngOnInit() {
    this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
  });
  }

  onDelete(postId: string) {
    this.postsService.deletePost(postId);
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}


