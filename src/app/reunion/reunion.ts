import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Menu } from '../menu/menu';
import { Footer } from '../component/footer/footer';
import { MeetingService } from '../services/api/meeting/meeting';
import { GeminiService } from '../services/api/gemini/gemini';

@Component({
  selector: 'app-reunion',
  imports: [RouterLink, Menu, Footer],
  templateUrl: './reunion.html',
  styleUrls: ['./reunion.scss'],
})
export class Reunion {
  prompt: string = '';
  private mediaRecorder!: MediaRecorder;
  private audioChunks: BlobPart[] = [];
  transcription: string = '';
  loadingGemni: boolean = false;
  messageSuccess: string = '';
  messageFalse: string = '';
  meetings: any = [];

  constructor(
    private meetingService: MeetingService,
    private geminiService: GeminiService
  ) {}

  createMeeting() {
    this.meetingService.createMeeting(this.prompt).subscribe({
      next: (response: any) => {
        this.messageSuccess = response.message;
      },
      error: (error) => {
        console.error('Error creating meeting:', error);
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

  async stopRecording(): Promise<void> {
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

  getAllByUserMeeting() {
    this.meetingService.getAllByUserMeeting().subscribe({
      next: (response: any) => {
        this.meetings = response.meet;
      },
      error: (error) => {
        console.error('Error creating meeting:', error);
      },
    });
  }
}
