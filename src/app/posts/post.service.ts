//Easier way of passing data
//A service is a class which is injected into components
//Provides easy access to data from within different components without property and event binding
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Subject } from 'rxjs';

import { Post } from './post.model';

//using injection, angular will find this service files from anywhere that it has been used
//we injected service into post-list.component.ts
@Injectable({providedIn: 'root'})
export class PostsService {
  //to store a list of posts
  //I set the array to empty
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) {}

  //method for getting a post
  //changes to here we will not affect the original array above since it is private
  getPosts() {
    this.http.get<{message: string, posts: Post[]}>('http://localhost:3000/api/posts') //line below function gets executed whenever we get a new response
      .subscribe((postData) => { //we need to listen to any observable if we want to use it. to listen, we subscribe
        this.posts = postData.posts; //the postData we get from the server is going inside posts array we defined up
        this.postsUpdated.next([...this.posts]); //inform other parts of our app about this update
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }
  //method for adding a new post
  addPost(title: string, content: string) {
    const post: Post = { id: null, title: title, content: content};
    this.http.post<{message: string}>('http://localhost:3000/api/posts', post)
      .subscribe((responseData) => {
      console.log(responseData.message);
      this.posts.push(post);
      this.postsUpdated.next([...this.posts]);
  });
  }
}
