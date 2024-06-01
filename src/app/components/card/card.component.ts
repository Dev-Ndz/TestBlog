import { Component, EventEmitter, Input, Output, OnInit } from "@angular/core";
import { Post } from "../../../types";
import { CommonModule, DatePipe } from "@angular/common";
import { ButtonModule } from "primeng/button";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-card",
  standalone: true,
  imports: [ButtonModule, RouterLink, CommonModule],
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.scss"],
})
export class CardComponent implements OnInit {
  @Input() post!: Post;
  @Output() edit: EventEmitter<Post> = new EventEmitter<Post>();
  @Output() delete: EventEmitter<Post> = new EventEmitter<Post>();

  summary: string = "";

  constructor(private datePipe: DatePipe) {}

  ngOnInit() {
    this.summary = this.getFirst20Words(this.post.content);
  }

  getFirst20Words(content: string): string {
    const wordsArray = content.split(" ");
    const first20Words = wordsArray.slice(0, 20);
    return first20Words.join(" ") + "...";
  }

  formatDate(timestamp: string): string {
    return this.datePipe.transform(timestamp, "EEE d MMM yyyy") || "";
  }

  editPost = () => this.edit.emit(this.post);
  deletePost = () => this.delete.emit(this.post);
}
