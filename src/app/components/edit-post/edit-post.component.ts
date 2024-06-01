// edit-post.component.ts
import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { Post } from "../../../types";
import { ButtonModule } from "primeng/button";
import { FormsModule } from "@angular/forms";
import { PostsService } from "../../services/posts.service";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { CommonModule, DatePipe, Location } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { SelectCategoryComponent } from "../select-category/select-category.component";

@Component({
  selector: "app-edit-post",
  standalone: true,
  imports: [ButtonModule, FormsModule, CommonModule, SelectCategoryComponent],
  templateUrl: "./edit-post.component.html",
  styleUrls: ["./edit-post.component.scss"],
})
export class EditPostComponent implements OnInit {
  @ViewChild(SelectCategoryComponent)
  selectCategoryComponent!: SelectCategoryComponent;

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
    category_id: 0,
    image: "",
    title: "",
    created_at: "",
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

    if (this.selectedFile) {
      this.formData.append("image", this.selectedFile, this.selectedFile.name);
    } else {
      this.formData.append("image", this.post.image);
    }

    if (this.selectCategoryComponent.isCreated()) {
      this.post.category_id = this.selectCategoryComponent.selectedCategory.id;
      console.log(this.post.category_id);
      this.formData.append("category_id", this.post.category_id.toString());
      this.sendFormData(
        "https://blogdbhazar-nico-5d30f5ae698b.herokuapp.com/api/blogs"
      );
    } else if (this.selectCategoryComponent.selectedCategory == "") {
      alert("edit comp : else if : please select cat");
    } else {
      this.selectCategoryComponent.addCategory().subscribe({
        next: (data: any) => {
          this.post.category_id = data.id;
          this.formData.append("category_id", this.post.category_id.toString());
          console.log("this is where it bugs ?");
          this.sendFormData(
            "https://blogdbhazar-nico-5d30f5ae698b.herokuapp.com/api/blogs"
          );
        },
        error: (err: any) => console.log(err),
      });
    }

    console.log("FormData before sending:", this.formData);
  }

  onEdit(): void {
    const id = Number(this.route.snapshot.paramMap.get("id"));
    this.formData.append("title", this.post.title);
    this.formData.append("content", this.post.content);

    if (this.selectCategoryComponent.isCreated()) {
      this.post.category_id = this.selectCategoryComponent.selectedCategory.id;
      this.formData.append("category_id", this.post.category_id.toString());
    } else if (this.selectCategoryComponent.selectedCategory == "") {
      alert("please select a category");
    } else {
      this.selectCategoryComponent.addCategory().subscribe({
        next: (data: any) => {
          this.post.category_id = data.id;
          this.formData.append("category_id", this.post.category_id.toString());
        },
        error: (err: any) => console.log(err),
      });
    }

    if (this.selectedFile) {
      this.formData.append("image", this.selectedFile, this.selectedFile.name);
    }
    if (this.post.category_id == 0 || this.post.category_id == undefined) {
      alert("please select a category");
    } else {
      console.log("FormData before sending:", this.formData);
    }
    console.log("right before sending formdata()");
    this.sendFormData(
      "https://blogdbhazar-nico-5d30f5ae698b.herokuapp.com/api/blogs/" +
        id.toString()
    );
  }

  sendFormData(url: string) {
    console.log("sending data");
    this.http.post(url, this.formData).subscribe({
      next: (data: any) => {
        console.log("article posted:", data);
        this.message = "Blog post created successfullyn!";
        this.router.navigate(["post/", data.data.id]);
      },
      error: (err) => {
        console.log(err);
        this.message = "An error occurred. Please try again.";
      },
    });
  }

  onCancel(): void {
    this.router.navigate(["/"]);
  }

  formatDate = (date: string): string =>
    this.datePipe.transform(date, "EEE d MMM yyyy") || "";
}
