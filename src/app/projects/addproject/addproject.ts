import { Component } from '@angular/core';
import { Footer } from '../../component/footer/footer';
import { Menu } from '../../menu/menu';

@Component({
  selector: 'app-addproject',
  imports: [Menu, Footer],
  templateUrl: './addproject.html',
  styleUrl: './addproject.scss',
})
export class Addproject {}
