import { Component } from '@angular/core';
import { Menu } from '../menu/menu';
import { Footer } from '../component/footer/footer';

@Component({
  selector: 'app-propos',
  imports: [Menu, Footer],
  templateUrl: './propos.html',
  styleUrl: './propos.scss',
})
export class Propos {}
