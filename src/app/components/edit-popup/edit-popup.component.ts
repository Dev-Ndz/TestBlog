import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { Post } from '../../../types';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-popup',
  standalone: true,
  imports: [DialogModule, CommonModule, FormsModule],
  templateUrl: './edit-popup.component.html',
  styleUrl: './edit-popup.component.scss',
})
export class EditPopupComponent {
  @Input() display: boolean = false;
  @Input() header!: string;

  @Input() post: Post = {
    category_id: 3,
    image: [],
    title: 'exemple',
    date: '',
    content: 'Lorem Ipsum',
    slug: '',
    views: 0,
    likes: 0,
  };

  @Output() confirm = new EventEmitter<Post>();

  // onConfirm = () => this.confirm.emit(this.post);
  onConfirm = () => console.log(this.post);
  onCancel = () => (this.display = false);
}
