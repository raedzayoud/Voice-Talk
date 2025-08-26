import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProjetsService } from '../services/api/projects/projetsservice';
import { FormsModule, NgForm } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';
import { Footer } from '../component/footer/footer';
import { Menu } from '../menu/menu';
import { TaskService } from '../services/api/tasks/task';

@Component({
  standalone: true,
  selector: 'app-tasks',
  imports: [RouterLink, FormsModule, Footer, Menu, NgIf, NgFor],
  templateUrl: './tasks.html',
  styleUrl: './tasks.scss',
})
export class Tasks implements OnInit {
  projectId!: number;
  loading: boolean = false;
  tasks: any[] = [];
  isSuccess: boolean = false;
  snackbarMessage: string = '';
  showSnackbar: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.projectId = Number(this.route.snapshot.paramMap.get('id'));
    console.log('Project ID:', this.projectId);
    this.getTasks();
    // Now you can fetch tasks by projectId
  }

  goToAddTask() {
    this.router.navigate(['/addtask', this.projectId]);
  }

  getTasks() {
    this.loading = true;
    this.taskService.getTasksByProjet(this.projectId).subscribe({
      next: (response: any) => {
        this.tasks = response.tasks;
        this.loading = false;
      },
      error: (error) => {
        console.error(error);
        this.loading = false;
      },
    });
  }

  deleteTask(id: number) {
    this.loading = true;
    this.taskService.deleteTask(id).subscribe({
      next: (response: any) => {
        this.loading = false;
        this.isSuccess = true;
        this.getTasks();
      },
      error: (error) => {
        this.loading = false;
        this.isSuccess = false;
        console.error(error);
      },
    });
  }
}
