import { Component } from "@angular/core";
//we turn the component to something angular will understand by adding a decorator to it @Component()
//we create a component by creating a class
@Component({
  //selector allows us to use that component
  //a basic component includes a selector and a template
  selector: 'app-post-create',
  templateUrl: '../post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {
  enteredValue = '';
  newPost = '';

//onAddPost(postInput: HTMLTextAreaElement)
  onAddPost() {
    this.newPost = this.enteredValue;
  }
}
