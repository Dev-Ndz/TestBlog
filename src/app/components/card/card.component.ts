import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Post } from '../../../types';
import { DatePipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [ButtonModule, RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() post!: Post;
  @Output() edit: EventEmitter<Post> = new EventEmitter<Post>();
  @Output() delete: EventEmitter<Post> = new EventEmitter<Post>();

  constructor(private datePipe: DatePipe) {}

  formatDate(timestamp: string): string {
    return this.datePipe.transform(timestamp, 'EEE d MMM yyyy') || '';
  }

  editPost = () => this.edit.emit(this.post);
  deletePost = () => this.delete.emit(this.post);

  // ngOnInit = () => {}
}
