import { Component} from "@angular/core";
import { NgForm } from "@angular/forms";

import { Post } from '../post.model';
import { PostsService } from "../post.service";
//we turn the component to something angular will understand by adding a decorator to it @Component()
//we create a component by creating a class
@Component({
  //selector allows us to use that component
  //a basic component includes a selector and a template
  selector: 'app-post-create',
  templateUrl: '../post-create/post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {
  //enteredValue = '';
  //newPost = '';
  //enteredTitle = '';
  //enteredContent = '';
  //At first Output decorator added (imported) in line 1 and then added to below property.
  //Used it in app.component.html to listen to postCreated
  //@Output in this line that has been removed now:  @Output() postCreated = new EventEmitter<Post>(); used to turn postCreated into an event that you can listen to from the outside (in app.component.ts)
  //used Post interface
  //@Output() postCreated = new EventEmitter<Post>();

//I want to connect to service so I created a constructor
  constructor(public postsService: PostsService) {}
//now postsService is injected here as well
//I want to reach out to postService whenever I create a new post

//onAddPost(postInput: HTMLTextAreaElement)
//used required in post-create.component.html for validation
//this loop checks whether the form is valid. if not, it will not create a new post.
//for example if user tries to submit an empty form, they can't
  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    //this.newPost = this.enteredValue;

      //used Post interface
      //title and content are names we defined in post-created.component.html
    //const post: Post = {
    // title: form.value.title,
    // content: form.value.content
    //};
    //to emit a new event and pass a post as an argument
    //this.postCreated.emit(post);

    this.postsService.addPost(form.value.title, form.value.content)
    //clears the user inputs in form after each post
    form.resetForm();
  }
}
