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

    // Add a small delay before stopping to ensure data is captured
    await new Promise(resolve => setTimeout(resolve, 1000));

    const { screenBlob, cameraBlob } = this.mediaRecorderService.stopRecording();

    // Ensure all data chunks are available before creating the Blob URLs
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check if the blobs are not empty before creating URLs
    if (screenBlob.size > 0) {
      const screenUrl = URL.createObjectURL(screenBlob);
      const screenLink = document.createElement('a');
      screenLink.href = screenUrl;
      screenLink.download = 'screen-recording.webm';
      screenLink.click();
    } else {
      console.error('Screen recording blob is empty.');
    }

    if (cameraBlob.size > 0) {
      const cameraUrl = URL.createObjectURL(cameraBlob);
      const cameraLink = document.createElement('a');
      cameraLink.href = cameraUrl;
      cameraLink.download = 'camera-recording.webm';
      cameraLink.click();
    } else {
      console.error('Camera recording blob is empty.');
    }
  }
}
