import { Component, OnInit} from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Post } from "../post.model";
import { mimeType } from "./mime-type.validator";
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
export class PostCreateComponent implements OnInit {
  //enteredValue = '';
  //newPost = '';
  enteredTitle = '';
  enteredContent = '';
  private mode = 'create';
  private postId: string;
  post: Post;
  form: FormGroup;
  isLoading = false;
  imagePreview: string;
  //At first Output decorator added (imported) in line 1 and then added to below property.
  //Used it in app.component.html to listen to postCreated
  //@Output in this line that has been removed now:  @Output() postCreated = new EventEmitter<Post>(); used to turn postCreated into an event that you can listen to from the outside (in app.component.ts)
  //used Post interface
  //@Output() postCreated = new EventEmitter<Post>();

//I want to connect to service so I created a constructor
  constructor(public postsService: PostsService, public route: ActivatedRoute) {}
//now postsService is injected here as well
//I want to reach out to postService whenever I create a new post

//onAddPost(postInput: HTMLTextAreaElement)
//used required in post-create.component.html for validation
//this loop checks whether the form is valid. if not, it will not create a new post.
//for example if user tries to submit an empty form, they can't

ngOnInit() {
  this.form = new FormGroup({
    title: new FormControl(null, {
      validators: [Validators.required, Validators.minLength(3)]
    }),
    content: new FormControl(null, { validators: [Validators.required] }),
    image: new FormControl(null, {
      validators: [Validators.required],
      asyncValidators: [mimeType]
    })
  });
  this.route.paramMap.subscribe((paramMap: ParamMap) => {
    if (paramMap.has("postId")) {
      this.mode = "edit";
      this.postId = paramMap.get("postId");
      this.isLoading = true;
      this.postsService.getPost(this.postId).subscribe(postData => {
        this.isLoading = false;
        this.post = {
          id: postData._id,
          title: postData.title,
          content: postData.content
        };
        this.form.setValue({
          title: this.post.title,
          content: this.post.content
        });
      });
    } else {
      this.mode = "create";
      this.postId = null;
    }
  });
}

onImagePicked(event: Event) {
  const file = (event.target as HTMLInputElement).files[0];
  this.form.patchValue({image: file});
  this.form.get('image').updateValueAndValidity();
  console.log(file);
  console.log(this.form);
  const reader = new FileReader();
  reader.onload = () => {
   this.imagePreview = reader.result as string;
  };
  reader.readAsDataURL(file);
}

    //this.newPost = this.enteredValue;
    onSavePost() {
      if (this.form.invalid) {
        return;
      }
      this.isLoading = true;
      if (this.mode === "create") {
        this.postsService.addPost(this.form.value.title, this.form.value.content);
      } else {
        this.postsService.updatePost(
          this.postId,
          this.form.value.title,
          this.form.value.content
        );
      }
      this.form.reset();
    }
      //used Post interface
      //title and content are names we defined in post-created.component.html
    //const post: Post = {
    // title: form.value.title,
    // content: form.value.content
    //};
    //to emit a new event and pass a post as an argument
    //this.postCreated.emit(post);


}
