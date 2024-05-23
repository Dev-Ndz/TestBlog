import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Post } from "../../../types";
import { ButtonModule } from "primeng/button";
import { FormsModule } from "@angular/forms";
import { PostsService } from "../../services/posts.service";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { CommonModule, DatePipe, Location } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { formatDate } from "../../utilities/dateHelper";

@Component({
  selector: "app-edit-post",
  standalone: true,
  imports: [ButtonModule, FormsModule, CommonModule],
  templateUrl: "./edit-post.component.html",
  styleUrls: ["./edit-post.component.scss"],
})
export class EditPostComponent implements OnInit {
  constructor(
    private router: Router,
    private postsService: PostsService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private http: HttpClient,
    private location: Location,
    private datePipe: DatePipe
  ) {}

  post: Post = {
    category_id: 1,
    image: "",
    title: "",
    date: "",
    content: "",
    slug: "",
    views: 0,
    likes: 0,
  };

  header: string = "New Post";
  isEdit: boolean = false;
  selectedFile: File | null = null;
  message: string = "";
  formData: FormData = new FormData();

  @Output() confirm = new EventEmitter<Post>();

  ngOnInit() {
    this.getPost();
  }
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      console.log("File selected:", this.selectedFile);
      const imgSrc = URL.createObjectURL(this.selectedFile);
      console.log("url :", imgSrc);
      this.post.image = imgSrc;
    }
  }
  getPost(): void {
    const id = Number(this.route.snapshot.paramMap.get("id"));
    if (id) {
      this.isEdit = true;
      this.postsService
        .getPostById(
          "https://blogdbhazar-nico-5d30f5ae698b.herokuapp.com/api/blogs/" + id
        )
        .subscribe({
          next: (response: any) => {
            this.post = response.data;
            this.header = "Edit Post";
            console.log("Post loaded:", this.post);
          },
          error: (error) => {
            console.log(error);
          },
        });
    }
  }
  onCreate(): void {
    this.formData.append("title", this.post.title);
    this.formData.append("content", this.post.content);
    this.formData.append("category_id", this.post.category_id.toString());
    if (this.selectedFile) {
      this.formData.append("image", this.selectedFile, this.selectedFile.name);
    } else {
      this.formData.append("image", this.post.image);
    }
    console.log("FormData before sending:", this.formData);

    this.http
      .post(
        "https://blogdbhazar-nico-5d30f5ae698b.herokuapp.com/api/blogs",
        this.formData
      )
      .subscribe({
        next: (data) => {
          console.log("new post created:", data);
          this.message = "Blog post created successfully!";
        },
        error: (err) => {
          console.log(err);
          this.message = "An error occurred. Please try again.";
        },
      });
  }
  onEdit(): void {
    const id = Number(this.route.snapshot.paramMap.get("id"));
    this.formData.append("title", this.post.title);
    this.formData.append("content", this.post.content);
    this.formData.append("category_id", this.post.category_id.toString());
    if (this.selectedFile) {
      this.formData.append("image", this.selectedFile, this.selectedFile.name);
    }
    console.log("FormData before sending:", this.formData);

    this.http
      .post(
        "https://blogdbhazar-nico-5d30f5ae698b.herokuapp.com/api/blogs/" +
          id.toString(),
        this.formData
      )
      .subscribe({
        next: (data) => {
          console.log("post edited:", data);
          this.message = "Blog post created successfully!";
          this.location.back();
        },
        error: (err) => {
          console.log(err);
          this.message = "An error occurred. Please try again.";
        },
      });
  }
  onCancel(): void {
    this.location.back();
  }

  formatDate = (date: string): string =>
    this.datePipe.transform(date, "EEE d MMM yyyy") || "";
}
