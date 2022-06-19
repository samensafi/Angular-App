import { Component, EventEmitter, Output } from "@angular/core";
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
  @Output() postCreated = new EventEmitter ();

//onAddPost(postInput: HTMLTextAreaElement)
  onAddPost() {
    //this.newPost = this.enteredValue;
    const post = {
      title: this.enteredTitle,
      content: this.enteredContent
    };
    //to emit a new event and pass a post as an argument
    this.postCreated.emit(post);
  }
}
