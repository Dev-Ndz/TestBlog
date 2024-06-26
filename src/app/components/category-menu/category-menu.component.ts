import { Component } from "@angular/core";
import { MatMenuModule } from "@angular/material/menu";
import { MatButtonModule } from "@angular/material/button";
import { HttpClient } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { CategoryItemComponent } from "../category-item/category-item.component";

@Component({
  selector: "app-category-menu",
  standalone: true,
  imports: [
    MatButtonModule,
    MatMenuModule,
    CommonModule,
    RouterLink,
    FormsModule,
    CategoryItemComponent,
  ],
  templateUrl: "./category-menu.component.html",
  styleUrl: "./category-menu.component.scss",
})
export class CategoryMenuComponent {
  constructor(private http: HttpClient) {}

  categoryList: any = [];
  newName: string = "";

  fetchCategories() {
    this.http
      .get("https://blogdbhazar-nico-5d30f5ae698b.herokuapp.com/api/categories")
      .subscribe({
        next: (response: any) => {
          console.log("fetching categories", response);
          this.categoryList = response;
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  ngOnInit() {
    this.fetchCategories();
  }
}
