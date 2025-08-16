import { Component } from '@angular/core';
import { Menu } from '../menu/menu';
import { Footer } from '../component/footer/footer';

@Component({
  selector: 'app-fonctionnalites',
  imports: [Menu, Footer],
  templateUrl: './fonctionnalites.html',
  styleUrl: './fonctionnalites.scss',
})
export class Fonctionnalites {}
