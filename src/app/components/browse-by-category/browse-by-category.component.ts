import { Component } from "@angular/core";
import { CardComponent } from "../card/card.component";
import { CommonModule } from "@angular/common";
import { Post } from "../../../types";
import { AuthService } from "../../services/auth.service";
import {
  ActivatedRoute,
  NavigationEnd,
  ParamMap,
  Router,
} from "@angular/router";
import { distinctUntilChanged, filter, map, switchMap } from "rxjs";

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

  category: any;

  id!: number;

  fetchCategory() {
    this.authservice
      .get(
        `https://blogdbhazar-nico-5d30f5ae698b.herokuapp.com/api/categories/${this.id}`
      )
      .subscribe({
        next: (response: any) => {
          console.log("fetching category by id", response);
          this.category = response;
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  fetchPosts() {
    this.authservice
      .get(
        `https://blogdbhazar-nico-5d30f5ae698b.herokuapp.com/api/categories/${this.id}/blogs`
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
    // Subscribe to route parameter changes
    this.route.paramMap.subscribe((params) => {
      // Retrieve the id from route parameters
      this.id = Number(params.get("id"));
      // Fetch category and posts when id changes
      this.fetchCategory();
      this.fetchPosts();
    });
  }
}
