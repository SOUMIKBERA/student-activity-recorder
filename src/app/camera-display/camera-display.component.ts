import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { MediaRecorderService } from '../media-recorder.service';

@Component({
  selector: 'app-camera-display',
  templateUrl: './camera-display.component.html',
  styleUrls: ['./camera-display.component.css']
})
export class CameraDisplayComponent implements OnInit {
  @ViewChild('cameraVideoElement') cameraVideoElement!: ElementRef;

  constructor(private mediaRecorderService: MediaRecorderService) {}

  ngOnInit() {
    this.showCameraStream();
  }

  showCameraStream() {
    const cameraStream = this.mediaRecorderService.getCameraStream();
    if (cameraStream) {
      this.cameraVideoElement.nativeElement.srcObject = cameraStream;
      this.cameraVideoElement.nativeElement.play();
    }
  }
}



