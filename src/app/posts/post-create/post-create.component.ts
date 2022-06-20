import { Component, EventEmitter, Output } from "@angular/core";
import { NgForm } from "@angular/forms";

import { Post } from '../post.model';
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
  enteredTitle = '';
  enteredContent = '';
  //At first Output decorator added (imported) in line 1 and then added to below property.
  //Used it in app.component.html to listen to postCreated
  //@Output turn postCreated into an event that you can listen to from the outside (in app.component.ts)
  //used Post interface
  @Output() postCreated = new EventEmitter<Post>();

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
    const post: Post = {
      title: form.value.title,
      content: form.value.content
    };
    //to emit a new event and pass a post as an argument
    this.postCreated.emit(post);
  }
}
