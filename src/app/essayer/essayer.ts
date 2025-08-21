import { Component } from '@angular/core';
import { Menu } from '../menu/menu';
import { Footer } from '../component/footer/footer';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-essayer',
  imports: [Menu, Footer, RouterLink],
  templateUrl: './essayer.html',
  styleUrl: './essayer.scss',
})
export class Essayer {}
