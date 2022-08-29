//I created a model to define how a post looks like in my angular app
//interface is like a class and defines how an object looks like
//we create our own type using interface
//imported in app.component.ts, post-create.component.ts, post-list.component.ts
export interface Post {
  id: string;
  title: string;
  content: string;
  imagePath: string;
}
