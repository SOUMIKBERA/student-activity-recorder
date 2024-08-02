import { Component } from '@angular/core';
import { MediaRecorderService } from './media-recorder.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'student-activity-recorder';

  constructor(private mediaRecorderService: MediaRecorderService) {}

  startRecording() {
    this.mediaRecorderService.startRecording();
  }

  stopRecording() {
    this.mediaRecorderService.stopRecording();
  }
}

