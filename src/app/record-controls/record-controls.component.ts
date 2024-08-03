import { Component } from '@angular/core';
import { MediaRecorderService } from '../media-recorder.service';

@Component({
  selector: 'app-record-controls',
  templateUrl: './record-controls.component.html',
  styleUrls: ['./record-controls.component.css']
})
export class RecordControlsComponent {
  isRecording = false;

  constructor(private mediaRecorderService: MediaRecorderService) { }

  async startRecording(): Promise<void> {
    this.isRecording = true;
    await this.mediaRecorderService.startRecording();

    const mediaSource = this.mediaRecorderService.getMediaSource();
    if (mediaSource !== 'monitor') {
      alert('Warning: You have not shared the entire screen. Please share your entire screen.');
    }
  }

  async stopRecording(): Promise<void> {
    this.isRecording = false;

    // Stop the recording and retrieve Blob data
    const { screenBlob, cameraBlob } = await this.mediaRecorderService.stopRecording();

    // Check if the blobs are not empty before attempting to create URLs
    if (screenBlob && screenBlob.size > 0) {
      this.downloadBlob(screenBlob, 'screen-recording.webm');
    } else {
      console.error('Screen recording blob is empty.');
    }

    if (cameraBlob && cameraBlob.size > 0) {
      this.downloadBlob(cameraBlob, 'camera-recording.webm');
    } else {
      console.error('Camera recording blob is empty.');
    }
  }

  // Helper method to handle Blob download
  private downloadBlob(blob: Blob, filename: string): void {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.style.display = 'none'; // Hide the link
    document.body.appendChild(link); // Append to body to ensure it works in some browsers
    link.click();
    document.body.removeChild(link); // Clean up
    URL.revokeObjectURL(url); // Clean up URL object
  }
}


