import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Menu } from '../menu/menu';
import { Footer } from '../component/footer/footer';
import { MeetingService } from '../services/api/meeting/meeting';
import { GeminiService } from '../services/api/gemini/gemini';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-reunion',
  imports: [RouterLink, Menu, Footer, NgIf, NgFor, FormsModule],
  templateUrl: './reunion.html',
  styleUrls: ['./reunion.scss'],
})
export class Reunion implements OnInit {
  prompt: string = '';
  private mediaRecorder!: MediaRecorder;
  private audioChunks: BlobPart[] = [];
  transcription: string = '';
  loadingGemni: boolean = false;

  messageSuccess: string = '';
  messageFalse: string = '';
  meetings: any[] = [];

  constructor(
    private meetingService: MeetingService,
    private geminiService: GeminiService
  ) {}
  ngOnInit(): void {
    this.getAllByUserMeeting();
  }

  /** ✅ Create meeting with validation */
  createMeeting() {
    this.prompt = this.transcription;
    if (!this.prompt || !this.prompt.trim()) {
      this.messageFalse = '⚠️ Please enter a meeting prompt before creating.';
      this.messageSuccess = '';
      return;
    }

    this.loadingGemni = true;

    // Normalise les formats AM/PM avec des espaces possibles
    this.prompt = this.prompt
      .replace(/\b([0-9]{1,2})\s*([AaPp])\s*([Mm])\b/g, '$1$2$3')
      .trim();

    this.meetingService.createMeeting(this.prompt).subscribe({
      next: (response: any) => {
        this.messageSuccess =
          response?.message || '✅ Meeting created successfully';
        this.messageFalse = '';
        this.prompt = '';
        this.getAllByUserMeeting();
        this.loadingGemni = false;
      },
      error: (error) => {
        console.error('Error creating meeting:', error);
        this.messageFalse = '❌ Failed to create meeting';
        this.messageSuccess = '';
        this.loadingGemni = false;
      },
    });
  }

  /** ✅ Start recording */
  async startRecording() {
    this.audioChunks = [];
    this.transcription = '';
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaRecorder = new MediaRecorder(stream);

      this.mediaRecorder.ondataavailable = (event) => {
        this.audioChunks.push(event.data);
      };

      this.mediaRecorder.start();
    } catch (err) {
      console.error('Microphone access denied:', err);
      this.messageFalse = '⚠️ Please allow microphone access';
    }
  }

  /** ✅ Stop recording + send to Gemini */
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

            if (!this.transcription) {
              this.messageFalse = '⚠️ No speech detected. Try again.';
            }
            resolve();
          } catch (error) {
            console.error('Erreur Gemini:', error);
            this.messageFalse = '❌ Transcription failed. Please retry.';
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

  /** ✅ Load meetings for user */
  getAllByUserMeeting() {
    this.meetingService.getAllByUserMeeting().subscribe({
      next: (response: any) => {
        this.meetings = Array.isArray(response?.meet) ? response.meet : [];
        if (!this.meetings.length) {
          this.messageFalse = '⚠️ No meetings found for this user.';
        }
      },
      error: (error) => {
        console.error('Error fetching meetings:', error);
        this.messageFalse = '❌ Could not load meetings';
      },
    });
  }

  joinCode: string = '';

  joinMeetingByCode() {
    if (!this.joinCode || this.joinCode.trim() === '') {
      alert('Veuillez entrer un code de réunion valide.');
      return;
    }
    const link = 'https://meet.jit.si/' + this.joinCode.trim();
    window.open(link, '_blank');
  }
}
