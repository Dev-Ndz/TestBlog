import { Component } from "@angular/core";
import { CardComponent } from "../card/card.component";
import { CommonModule } from "@angular/common";
import { Post } from "../../../types";
import { AuthService } from "../../services/auth.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-browse-by-category",
  standalone: true,
  imports: [CardComponent, CommonModule],
  templateUrl: "./browse-by-category.component.html",
  styleUrl: "./browse-by-category.component.scss",
})
export class BrowseByCategoryComponent {
  constructor(
    private authservice: AuthService,
    private route: ActivatedRoute
  ) {}

  posts: Post[] = [];

  fetchPosts() {
    console.log("fetching post by category");
    const id = Number(this.route.snapshot.paramMap.get("id"));
    this.authservice
      .get(
        `https://blogdbhazar-nico-5d30f5ae698b.herokuapp.com/api/categories/${id}/blogs`
      )
      .subscribe({
        next: (response: any) => {
          console.log("fetching posts by category...", response.data);
          this.posts = response.data;
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  ngOnInit() {
    this.fetchPosts();
  }
}
