import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ProjetsService } from '../services/api/projects/projetsservice';
import { FormsModule, NgForm } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';
import { Footer } from '../component/footer/footer';
import { Menu } from '../menu/menu';
import { GeminiService } from '../services/api/gemini/gemini';

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
  private mediaRecorder!: MediaRecorder;
  private audioChunks: BlobPart[] = [];
  transcription: string = '';
  successMessage: any;
  errorMessage: any;
  showSnackbar: boolean = false;
  loadingGemni: boolean = false;

  constructor(
    private router: Router,
    private projectService: ProjetsService,
    private geminiService: GeminiService
  ) {}

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

  async startRecording() {
    this.audioChunks = [];
    this.transcription = '';
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    this.mediaRecorder = new MediaRecorder(stream);

    this.mediaRecorder.ondataavailable = (event) => {
      this.audioChunks.push(event.data);
    };

    this.mediaRecorder.start();
  }

  async stopRecording() {
    if (!this.mediaRecorder || this.mediaRecorder.state === 'inactive') {
      console.warn('MediaRecorder not active');
      return;
    }

    this.loadingGemni = true;

    return new Promise<void>((resolve, reject) => {
      this.mediaRecorder.onstop = () => {
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
        const reader = new FileReader();

        reader.onloadend = async () => {
          const base64Audio = (reader.result as string).split(',')[1];
          try {
            this.transcription = await this.geminiService.transcribeAudio(
              base64Audio,
              'audio/webm'
            );
            resolve();
          } catch (error) {
            console.error('Erreur Gemini:', error);
            reject(error);
          } finally {
            this.loadingGemni = false;
          }
        };

        reader.readAsDataURL(audioBlob);
      };

      this.mediaRecorder.stop();

      // ✅ stop microphone stream
      this.mediaRecorder.stream.getTracks().forEach((track) => track.stop());
    });
  }

  createTask() {
    this.loading = true;

    this.projectService.askGemini(this.transcription).subscribe({
      next: (response: any) => {
        this.loading = false;
        this.successMessage =
          response.message || '✅ Task created successfully!';
        this.errorMessage = null;

        // Optional: clear transcription
        // this.transcription = '';
      },
      error: (error) => {
        console.error(error);
        this.loading = false;

        // Safely extract backend message
        if (error.error && error.error.error) {
          this.errorMessage = '❌ ' + error.error.error;
        } else {
          this.errorMessage = '❌ ' + (error.message || 'An error occurred');
        }

        this.successMessage = null;
      },
    });
  }
}
