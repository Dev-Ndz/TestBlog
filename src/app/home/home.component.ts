import { Component } from '@angular/core';
import { Post, Posts } from '../../types';
import { CardComponent } from '../components/card/card.component';
import { PostsService } from '../services/posts.service';
import { CommonModule } from '@angular/common';
import { EditPopupComponent } from '../components/edit-popup/edit-popup.component';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardComponent, CommonModule, EditPopupComponent, ButtonModule, ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private postsService: PostsService, private authService: AuthService) {}

  posts: Post[] = [];


  // testRoute = () => {
    
  //   this.authService.getStuff().subscribe((r) => console.log(r))

  // }
 

  displayEditPopup: boolean = false;
  displayAddPopup: boolean = false;

  toggleEditPopup = (post: Post) => {
    this.selectedPost = post;
    this.displayEditPopup = true;
  };

  toggleDeletePopup = (post: Post) => {};

  toggleAddPopup = () => (this.displayAddPopup = true);

  selectedPost: Post = {
    id: 0,
    category_id: 1,
    image: [],
    title: '',
    date: '',
    content: '',
    slug: '',
    views: 0,
    likes: 0,
  };

  onConfirmEdit = (post: Post) => {
    if (!this.selectedPost.id) {
      return;
    }
    this.editPosts(this.selectedPost, this.selectedPost.id);
    this.displayEditPopup = false;
  };

  onConfirmAdd = (post: Post) => {
    this.addPosts(post);
    this.displayEditPopup = false;
  };

  /********************
   *                  *
   *  Querries to DB  *
   *                  *
   ********************/
  fetchPosts() {
    this.postsService.getPosts('https://blogdbhazar-nico-5d30f5ae698b.herokuapp.com/api/blogs').subscribe({
      next: (response:any) => {
        console.log("fetching posts...")
        console.log(response.data.data)
        this.posts = response.data.data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  editPosts(post: Post, id: number) {
    this.postsService
      .editPosts(`http://localhost:3000/posts/${id}`, post)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.fetchPosts();
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
  addPosts(post: Post) {
    this.postsService.addPosts('http://localhost:3001/posts', post).subscribe({
      next: (data) => {
        console.log(data);
        this.fetchPosts();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  
  deletePosts(id: number) {
    this.postsService
      .deletePosts(`http://localhost:3000/posts/${id}`)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.fetchPosts();
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  onCardOutput(post: Post) {
    console.log(post, 'output');
  }

  ngOnInit() {
    this.fetchPosts();
  }
}
