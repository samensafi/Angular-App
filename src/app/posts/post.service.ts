//Easier way of passing data
//A service is a class which is injected into components
//Provides easy access to data from within different components without property and event binding
import { Injectable } from '@angular/core';
import { Post } from './post.model';

//using injection, angular will find this service files from anywhere that it has been used
//we injected service into post-list.component.ts
@Injectable({providedIn: 'root'})
export class PostService {
  //to store a list of posts
  //I set the array to empty
  private posts: Post[] = [];

  //method for getting a post
  //changes to here we will not affect the original array above since it is private
  getPosts() {
    return [...this.posts];
  }

  //method for adding a new post
  addPost(title: string, content: string) {
    const post: Post = {title: title, content: content};
    this.posts.push(post);
  }
}
