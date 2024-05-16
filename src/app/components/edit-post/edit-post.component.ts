import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Post } from '../../../types';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { PostsService } from '../../services/posts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-edit-post',
  standalone: true,
  imports: [ButtonModule, FormsModule],
  templateUrl: './edit-post.component.html',
  styleUrl: './edit-post.component.scss',
})
export class EditPostComponent {
  constructor(
    private router: Router,
    private postsService: PostsService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  post: Post = {
    category_id: 3,
    image: [],
    title: 'This is a Title',
    date: '',
    content: 'Lorem Ipsum content',
    slug: '',
    views: 0,
    likes: 0,
  };

  @Output() confirm = new EventEmitter<Post>();

  header: string = 'New Post';

  getPost(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.postsService
        .getPostById(
          'https://blogdbhazar-nico-5d30f5ae698b.herokuapp.com/api/blogs/' + id
        )
        .subscribe({
          next: (post: Post) => {
            this.post = post;
            this.header = 'Edit Post';
          },
          error: (error) => {
            console.log(error);
          },
        });
    }
  }

  ngOnInit() {
    this.getPost();
  }

  onConfirm = () => {
    console.log(this.post);
    this.authService
      .post(
        'https://blogdbhazar-nico-5d30f5ae698b.herokuapp.com/api/blogs',
        this.post
      )
      .subscribe({
        next: (data) => console.log('new post created:', data),
        error: (err) => console.log(err),
      });
  };
  onCancel = () => console.log('Abort !!!');
}


// import { Component, EventEmitter, Output } from '@angular/core';
// import { Post } from '../../../types';
// import { ButtonModule } from 'primeng/button';
// import { FormsModule } from '@angular/forms';
// import { PostsService } from '../../services/posts.service';
// import { ActivatedRoute, Router } from '@angular/router';
// import { AuthService } from '../../services/auth.service';

// @Component({
//   selector: 'app-edit-post',
//   standalone: true,
//   imports: [ButtonModule, FormsModule],
//   templateUrl: './edit-post.component.html',
//   styleUrl: './edit-post.component.scss',
// })
// export class EditPostComponent {
//   constructor(
//     private router: Router,
//     private postsService: PostsService,
//     private route: ActivatedRoute,
//     private authService: AuthService
//   ) {}

//   post: Post = {
//     category_id: 3,
//     image: [], // Assuming this is where you want to store the file
//     title: 'This is a Title',
//     date: '',
//     content: 'Lorem Ipsum content',
//     slug: '',
//     views: 0,
//     likes: 0,
//   };

//   @Output() confirm = new EventEmitter<Post>();

//   header: string = 'New Post';

//   // Function to handle file selection
//   onFileSelected(event: any) {
//     if (event.target.files.length > 0) {
//       const file = event.target.files[0];
//       // Store the file in the post object
//       this.post.image.push(file);
//     }
//   }

//   getPost(): void {
//     const id = Number(this.route.snapshot.paramMap.get('id'));
//     if (id) {
//       this.postsService
//         .getPostById('https://blogdbhazar-nico-5d30f5ae698b.herokuapp.com/api/blogs/' + id)
//         .subscribe({
//           next: (post: Post) => {
//             this.post = post;
//             this.header = 'Edit Post';
//           },
//           error: (error) => {
//             console.log(error);
//           },
//         });
//     }
//   }

//   ngOnInit() {
//     this.getPost();
//   }

//   onConfirm = () => {
//     // Create FormData object to send both text and file data
//     const formData = new FormData();
//     formData.append('title', this.post.title);
//     formData.append('category_id', this.post.category_id.toString());
//     formData.append('content', this.post.content);
//     // Append file to the FormData object
//     if (this.post.image.length > 0) {
//       formData.append('image', this.post.image[0]);
//     }
//     console.log(formData)
//     // Make the HTTP request with FormData
//     this.authService
//       .post('https://blogdbhazar-nico-5d30f5ae698b.herokuapp.com/api/blogs', formData)
//       .subscribe({
//         next: (data) => console.log('new post created:', data),
//         error: (err) => console.log(err),
//       });
//   };

//   onCancel = () => console.log('Abort !!!');
// }
