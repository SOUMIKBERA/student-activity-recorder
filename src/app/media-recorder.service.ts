import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MediaRecorderService {
  private screenRecorder: MediaRecorder | null = null;
  private cameraRecorder: MediaRecorder | null = null;
  private screenChunks: Blob[] = [];
  private cameraChunks: Blob[] = [];
  private screenStream: MediaStream | null = null;
  private cameraStream: MediaStream | null = null;
  private mediaSource: string = 'unknown';
  private screenBlob: Blob | null = null;
  private cameraBlob: Blob | null = null;

  constructor() { }

  async startRecording(): Promise<void> {
    try {
      // Capture screen
      this.screenStream = await (navigator.mediaDevices as any).getDisplayMedia({ video: true });
      if (this.screenStream) {
        const screenTrack = this.screenStream.getVideoTracks()[0];
        const settings = screenTrack.getSettings() as any;
        this.mediaSource = settings.displaySurface || 'unknown';

        this.screenRecorder = new MediaRecorder(this.screenStream);
        this.screenRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            this.screenChunks.push(event.data);
          }
        };
        this.screenRecorder.onstop = () => {
          this.screenBlob = new Blob(this.screenChunks, { type: 'video/webm' });
          this.screenChunks = [];
        };
        this.screenRecorder.start();
      }
    } catch (error) {
      console.error('Error capturing screen:', error);
    }

    try {
      // Capture camera
      this.cameraStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (this.cameraStream) {
        this.cameraRecorder = new MediaRecorder(this.cameraStream);
        this.cameraRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            this.cameraChunks.push(event.data);
          }
        };
        this.cameraRecorder.onstop = () => {
          this.cameraBlob = new Blob(this.cameraChunks, { type: 'video/webm' });
          this.cameraChunks = [];
        };
        this.cameraRecorder.start();
      }
    } catch (error) {
      console.error('Error capturing camera:', error);
    }
  }

  async stopRecording(): Promise<{ screenBlob: Blob | null, cameraBlob: Blob | null }> {
    return new Promise((resolve) => {
      if (this.screenRecorder) {
        this.screenRecorder.onstop = () => {
          this.screenBlob = new Blob(this.screenChunks, { type: 'video/webm' });
          this.screenChunks = [];
          if (!this.cameraRecorder || this.cameraBlob !== null) {
            resolve({ screenBlob: this.screenBlob, cameraBlob: this.cameraBlob });
          }
        };
        this.screenRecorder.stop();
      }

      if (this.cameraRecorder) {
        this.cameraRecorder.onstop = () => {
          this.cameraBlob = new Blob(this.cameraChunks, { type: 'video/webm' });
          this.cameraChunks = [];
          if (!this.screenRecorder || this.screenBlob !== null) {
            resolve({ screenBlob: this.screenBlob, cameraBlob: this.cameraBlob });
          }
        };
        this.cameraRecorder.stop();
      }

      if (!this.screenRecorder && !this.cameraRecorder) {
        resolve({ screenBlob: this.screenBlob, cameraBlob: this.cameraBlob });
      }
    });
  }

  getScreenStream(): MediaStream | null {
    return this.screenStream;
  }

  getCameraStream(): MediaStream | null {
    return this.cameraStream;
  }

  getMediaSource(): string {
    return this.mediaSource;
  }
}




