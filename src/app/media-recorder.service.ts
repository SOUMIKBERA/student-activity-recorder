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

  constructor() { }

  async startRecording(): Promise<void> {
    // Capture screen
    this.screenStream = await (navigator.mediaDevices as any).getDisplayMedia({ video: true });
    if (this.screenStream) {
      const screenTrack = this.screenStream.getVideoTracks()[0];
      const settings = screenTrack.getSettings() as any;
      this.mediaSource = settings.displaySurface || 'unknown';
      
      this.screenRecorder = new MediaRecorder(this.screenStream);
      this.screenRecorder.ondataavailable = (event) => this.screenChunks.push(event.data);
      this.screenRecorder.start();
    }

    // Capture camera
    this.cameraStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    if (this.cameraStream) {
      this.cameraRecorder = new MediaRecorder(this.cameraStream);
      this.cameraRecorder.ondataavailable = (event) => this.cameraChunks.push(event.data);
      this.cameraRecorder.start();
    }
  }

  stopRecording(): { screenBlob: Blob, cameraBlob: Blob } {
    if (this.screenRecorder) {
      this.screenRecorder.stop();
    }
    if (this.cameraRecorder) {
      this.cameraRecorder.stop();
    }

    const screenBlob = new Blob(this.screenChunks, { type: 'video/webm' });
    const cameraBlob = new Blob(this.cameraChunks, { type: 'video/webm' });

    this.screenChunks = [];
    this.cameraChunks = [];

    return { screenBlob, cameraBlob };
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

