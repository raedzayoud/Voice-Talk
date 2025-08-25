import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ProjetsService } from '../services/api/projects/projetsservice';
import { FormsModule, NgForm } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';
import { Footer } from '../component/footer/footer';
import { Menu } from '../menu/menu';

@Component({
  imports: [NgFor, NgIf, FormsModule, RouterLink, Menu, Footer],
  selector: 'app-projects',
  templateUrl: './projects.html',
  styleUrls: ['./projects.scss'],
})
export class Projects implements OnInit {
  loading: boolean = false;
  projects: any[] = [];
  isSuccess: boolean = false;
  snackbarMessage: string = '';
  showSnackbar: boolean = false;

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

  deleteProject(id: number) {
    this.loading = true;
    this.projectService.deleteProject(id).subscribe({
      next: (response: any) => {
        this.loading = false;
        this.isSuccess = true;

        // this.showSnackbarMessage('Project deleted successfully!');
        this.getProjects();
      },
      error: (error) => {
        this.loading = false;
        this.isSuccess = false;
        // this.showSnackbarMessage('Failed to delete project!');
        console.error(error);
      },
    });
  }
}
