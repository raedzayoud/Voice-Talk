import { Component } from '@angular/core';
import { Footer } from '../../component/footer/footer';
import { Menu } from '../../menu/menu';
import { ProjetsService } from '../../services/api/projects/projetsservice';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-addproject',
  standalone: true,
  imports: [Menu, Footer, FormsModule, NgIf],
  templateUrl: './addproject.html',
  styleUrls: ['./addproject.scss'],
})
export class Addproject {
  loading = false;
  isSuccess = false;
  name: string = '';
  description: string = '';

  constructor(private projectService: ProjetsService) {}

  addProjet() {
    this.loading = true;
    this.isSuccess = false;

    this.projectService.addProject(this.name, this.description).subscribe({
      next: (response: any) => {
        this.loading = false;
        this.isSuccess = true;

        // Reset form
        this.name = '';
        this.description = '';
      },
      error: (error) => {
        console.error(error);
        this.loading = false;
      },
    });
  }
}
