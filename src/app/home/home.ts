import { Component } from '@angular/core';
import { Menu } from '../menu/menu';
import { About } from '../acceuil/about/about';

@Component({
  selector: 'app-home',
  imports: [Menu, About],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
