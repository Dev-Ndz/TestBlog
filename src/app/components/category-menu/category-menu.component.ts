import { Component } from '@angular/core';
import {MatMenuModule} from '@angular/material/menu'
import { MatButtonModule } from '@angular/material/button'

@Component({
  selector: 'app-category-menu',
  standalone: true,
  imports: [MatButtonModule, MatMenuModule],
  templateUrl: './category-menu.component.html',
  styleUrl: './category-menu.component.scss'
})


export class CategoryMenuComponent {

}
// import {Component} from '@angular/core';
// import {MatMenuModule} from '@angular/material/menu';
// import {MatButtonModule} from '@angular/material/button';

// /**
//  * @title Basic menu
//  */
// @Component({
//   selector: 'menu-overview-example',
//   templateUrl: 'menu-overview-example.html',
//   standalone: true,
//   imports: [MatButtonModule, MatMenuModule],
// })
// export class MenuOverviewExample {}
