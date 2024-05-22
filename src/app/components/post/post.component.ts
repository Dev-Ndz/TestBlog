import { Component, EventEmitter, Output, inject } from "@angular/core";
import { PostsService } from "../../services/posts.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Post } from "../../../types";
import { ButtonModule } from "primeng/button";
import { FormsModule } from "@angular/forms";
import { CommonModule, DatePipe, Location } from "@angular/common";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-post",
  standalone: true,
  imports: [ButtonModule, CommonModule],
  templateUrl: "./post.component.html",
  styleUrl: "./post.component.scss",
})
export class PostComponent {
  @Output() edit: EventEmitter<Post> = new EventEmitter<Post>();
  @Output() delete: EventEmitter<Post> = new EventEmitter<Post>();

  authService = inject(AuthService);

  constructor(
    private postsService: PostsService,
    private route: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe, // private authService : AuthService
    private location: Location
  ) {}

  post: Post = {
    id: 0,
    category_id: 1,
    image: [],
    title: "",
    date: "",
    content: "",
    slug: "",
    views: 0,
    likes: 0,
  };

  formatDate = (date: string): string =>
    this.datePipe.transform(date, "EEE d MMM yyyy") || "";

  navigateToEditPost = (post: Post) => {
    console.log("redirect to edit...");
    this.router.navigate(["edit-post/" + post.id]);
  };

  editPost = () => this.navigateToEditPost(this.post);
  onDelete = () => this.deletePost();

  deletePost = () => {
    this.authService
      .delete(
        "https://blogdbhazar-nico-5d30f5ae698b.herokuapp.com/api/blogs/" +
          this.post.id
      )
      .subscribe({
        next: (response: any) => {
          console.log(response);
          this.post = response.data;
        },
        error: (error) => {
          console.log(error);
        },
      });
    this.location.back();
  };

  getPost(): void {
    const id = Number(this.route.snapshot.paramMap.get("id"));
    this.postsService
      .getPostById(
        "https://blogdbhazar-nico-5d30f5ae698b.herokuapp.com/api/blogs/" + id
      )
      .subscribe({
        next: (response: any) => {
          console.log(response);
          this.post = response.data;
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  ngOnInit() {
    this.getPost();
  }
}
