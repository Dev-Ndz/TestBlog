import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-category-item",
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: "./category-item.component.html",
  styleUrl: "./category-item.component.scss",
})
export class CategoryItemComponent {
  constructor(private http: HttpClient) {}
  @Input()
  category!: { id: number; name: string; created_at: string };
  @Output() refreshListRequest = new EventEmitter<any>;
  
  newName: string = "";
  editMode: boolean = false;

  editModeOn(event: Event) {
    event.stopPropagation();
    this.editMode = true;
  }
  editModeOff(event: Event) {
    event.stopPropagation();
    this.editMode = false;
  }

  editCategory(event: Event, id: number) {
    event.stopPropagation();
    this.editMode = false;
    this.http
      .post(
        `https://blogdbhazar-nico-5d30f5ae698b.herokuapp.com/api/categories/${id}`,
        { name: this.newName }
      )
      .subscribe({
        next: (data) => {
          this.refreshListRequest.emit()
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  deleteCategory(event: Event, id: number) {
    event.stopPropagation();
    this.http
      .delete(
        `https://blogdbhazar-nico-5d30f5ae698b.herokuapp.com/api/categories/${id}`
      )
      .subscribe({
        next: (data) => {
          this.refreshListRequest.emit();
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
