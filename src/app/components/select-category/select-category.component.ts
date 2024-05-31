import { HttpClient } from "@angular/common/http";
import { Component, EventEmitter, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { DropdownModule } from "primeng/dropdown";
import { AuthService } from "../../services/auth.service";
import { Observable, Observer, tap } from "rxjs";

@Component({
  selector: "app-select-category",
  standalone: true,
  imports: [DropdownModule, FormsModule],
  templateUrl: "./select-category.component.html",
  styleUrl: "./select-category.component.scss",
})
export class SelectCategoryComponent {
  constructor(private http: HttpClient) {}

  categoryList: any = [];
  selectedCategory: any = "";
  @Output() emitCategory: EventEmitter<any> = new EventEmitter<any>();

  fetchCategories() {
    this.http
      .get("https://blogdbhazar-nico-5d30f5ae698b.herokuapp.com/api/categories")
      .subscribe({
        next: (response: any) => {
          console.log("fetching categories...");
          console.log(response);
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

  isCreated(): boolean {
    let check = false;
    this.categoryList.forEach((category: any) => {
      if (category.name == this.selectedCategory.name) {
        check = true;
      }
    });
    console.log("category exist : ", check);
    return check;
  }

  createCategory(name: string): Observable<any> {
    console.log("create new category", name);
    return this.http.post(
      "https://blogdbhazar-nico-5d30f5ae698b.herokuapp.com/api/categories",
      { name: name }
    );
  }

  addCategory(): Observable<any> {
    return this.createCategory(this.selectedCategory).pipe(
      tap((data) => console.log("category created", data))
    );
  }
}
