import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjetsService } from '../services/api/projects/projetsservice';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms'; // pour ngModel
import { NgIf } from '@angular/common'; // <-- import nécessaire
import { NgFor } from '@angular/common'; // <-- import nécessaire

@Component({
  imports: [NgFor, NgIf, FormsModule, HttpClientModule],
  selector: 'app-projects',
  templateUrl: './projects.html',
  styleUrls: ['./projects.scss'], // fixed typo: styleUrl -> styleUrls
})
export class Projects implements OnInit {
  loading: boolean = false;
  projects: any[] = []; // store the projects

  constructor(private router: Router, private projectService: ProjetsService) {}

  ngOnInit() {
    this.getProjects();
  }

  getProjects() {
    this.loading = true;
    this.projectService.getProjectsByUser().subscribe({
      next: (response: any) => {
        this.projects = response.projets;
        this.loading = false;
      },
      error: (error) => {
        console.error(error);
        this.loading = false;
      },
    });
  }
}
