import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/api/tasks/task';
import { ActivatedRoute, Route } from '@angular/router';
import { Menu } from '../../menu/menu';
import { Footer } from '../../component/footer/footer';
import { FormsModule, NgForm } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-addtask',
  imports: [Menu, Footer, FormsModule, NgIf, NgFor],
  templateUrl: './addtask.html',
  styleUrl: './addtask.scss',
})
export class Addtask implements OnInit {
  loading = false;
  isSuccess = false;
  titre: string = '';
  description: string = '';
  projectId!: number;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService
  ) {}
  ngOnInit(): void {
    this.projectId = Number(this.route.snapshot.paramMap.get('id'));
  }

  addTask() {
    this.loading = true;
    this.isSuccess = false;

    this.taskService
      .addTask(this.projectId, this.titre, this.description)
      .subscribe({
        next: (response: any) => {
          this.loading = false;
          this.isSuccess = true;

          // Reset form
          this.titre = '';
          this.description = '';
        },
        error: (error) => {
          console.error(error);
          this.loading = false;
        },
      });
  }
}
