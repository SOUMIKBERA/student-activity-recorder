import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { MediaRecorderService } from '../media-recorder.service';

@Component({
  selector: 'app-screen-display',
  templateUrl: './screen-display.component.html',
  styleUrls: ['./screen-display.component.css']
})
export class ScreenDisplayComponent implements OnInit {
  @ViewChild('screenVideoElement') screenVideoElement!: ElementRef;

  constructor(private mediaRecorderService: MediaRecorderService) {}

  ngOnInit() {
    this.showScreenStream();
  }

  showScreenStream() {
    const screenStream = this.mediaRecorderService.getScreenStream();
    if (screenStream) {
      this.screenVideoElement.nativeElement.srcObject = screenStream;
      this.screenVideoElement.nativeElement.play();
    }
  }
}

