import { Component } from '@angular/core';
import { Menu } from '../menu/menu';
import { Footer } from '../component/footer/footer';

@Component({
  selector: 'app-essayer',
  imports: [Menu, Footer],
  templateUrl: './essayer.html',
  styleUrl: './essayer.scss',
})
export class Essayer {}
