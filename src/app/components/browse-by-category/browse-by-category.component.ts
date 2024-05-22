import { Component } from '@angular/core';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-browse-by-category',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './browse-by-category.component.html',
  styleUrl: './browse-by-category.component.scss'
})
export class BrowseByCategoryComponent {

}
