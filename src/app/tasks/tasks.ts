import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ProjetsService } from '../services/api/projects/projetsservice';
import { FormsModule, NgForm } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';
import { Footer } from '../component/footer/footer';
import { Menu } from '../menu/menu';

@Component({
  standalone: true,
  selector: 'app-tasks',
  imports: [RouterLink, FormsModule, Footer, Menu, NgIf, NgFor],
  templateUrl: './tasks.html',
  styleUrl: './tasks.scss',
})
export class Tasks {}
