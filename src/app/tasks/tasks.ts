import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
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
export class Tasks implements OnInit {
  projectId!: number;
  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.projectId = Number(this.route.snapshot.paramMap.get('id'));
    console.log('Project ID:', this.projectId);
    // Now you can fetch tasks by projectId
  }
}
