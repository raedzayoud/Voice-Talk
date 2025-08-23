import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Menu } from '../menu/menu';
import { Footer } from '../component/footer/footer';

@Component({
  selector: 'app-reunion',
  imports: [RouterLink, Menu, Footer],
  templateUrl: './reunion.html',
  styleUrl: './reunion.scss',
})
export class Reunion {}
