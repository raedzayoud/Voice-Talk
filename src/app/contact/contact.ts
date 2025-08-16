import { Component } from '@angular/core';
import { Menu } from '../menu/menu';
import { Footer } from '../component/footer/footer';

@Component({
  selector: 'app-contact',
  imports: [Menu, Footer],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {}
