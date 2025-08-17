import { Component } from '@angular/core';
import { Menu } from '../menu/menu';
import { Footer } from '../component/footer/footer';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-propos',
  imports: [Menu, Footer, RouterLink],
  templateUrl: './propos.html',
  styleUrl: './propos.scss',
})
export class Propos {}
