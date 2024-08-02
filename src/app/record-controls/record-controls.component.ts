import { Component } from '@angular/core';
import { MediaRecorderService } from '../media-recorder.service';

@Component({
  selector: 'app-record-controls',
  templateUrl: './record-controls.component.html',
  styleUrls: ['./record-controls.component.css']
})
export class RecordControlsComponent {
  constructor(private mediaRecorderService: MediaRecorderService) { }

  async startRecording(): Promise<void> {
    await this.mediaRecorderService.startRecording();

    const mediaSource = this.mediaRecorderService.getMediaSource();
    if (mediaSource !== 'monitor') {
      alert('Warning: You have not shared the entire screen. Please share your entire screen.');
    }
  }

  stopRecording(): void {
    const { screenBlob, cameraBlob } = this.mediaRecorderService.stopRecording();

    // Download the screen recording
    const screenUrl = URL.createObjectURL(screenBlob);
    const screenLink = document.createElement('a');
    screenLink.href = screenUrl;
    screenLink.download = 'screen-recording.webm';
    screenLink.click();

    // Download the camera recording
    const cameraUrl = URL.createObjectURL(cameraBlob);
    const cameraLink = document.createElement('a');
    cameraLink.href = cameraUrl;
    cameraLink.download = 'camera-recording.webm';
    cameraLink.click();
  }
}


