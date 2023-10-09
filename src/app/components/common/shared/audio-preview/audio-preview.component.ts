import {
  Component,
  OnInit,
  Input,
  ViewEncapsulation,
  ViewChild,
  SimpleChanges,
  OnChanges,
  EventEmitter,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-audio-preview-play',
  templateUrl: './audio-preview.component.html',
  styleUrls: ['./audio-preview.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AudioPreviewComponent implements OnInit, OnChanges {
  public audio: HTMLMediaElement;
  @Input() public src: any;
  @Input() public audioId: boolean = false;
  @Input() public autoplay: boolean = false;
  @Input() public volume: number = 1.0; /* 1.0 is loudest */
  @Input() index: any;
  @Input() activePlayerID: any;
  @Input() replayButtonInput = false;
  replayButton = false;
  @ViewChild('audioElement', { static: true }) audioElement: any;
  // @ViewChild('playerButton',{static: false}) playerButton: any;
  playAudio: boolean = true;
  time: any;
  timeline: any;
  // audioTime: any;
  @Output() activePlayer = new EventEmitter();
  @Input() public audioDuration: any;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.audio = this.audioElement.nativeElement;
      this.timeline = document.querySelector('.timeline-' + this.index);
      if (this.timeline) {
        this.timeline.style.backgroundSize = `0% 100%`;
      }
      if (this.audio) {
        this.audio.volume = this.volume;
        this.audio.autoplay = this.autoplay;
        this.audio.load();
        this.audio.onloadedmetadata = () => {
          if (this.timeline) {
            this.timeline.value = '0';
          }

          // this.audioTime = this.getMinutesAudioTime(this.audio.duration);
        };
        this.audio.currentTime = 0;
      }
    }, 100);
  }

  ngOnChanges(simpleChanges: SimpleChanges) {
    if (simpleChanges) {
      this.replayButton = false;
      if (!!this.activePlayerID && this.activePlayerID != this.index) {
        this.playAudio = true;
        // setTimeout(() => {
        this.audio.pause();
        // }, 102);
      }
      if (this.audioElement && this.audioElement.nativeElement) {
        this.audioElement.nativeElement.remove();
      }
    }
  }

  toggleAudio() {
    setTimeout(() => {
      if (this.audio.paused) {
        this.playAudio = false;
        this.audio.play();
        if(this.replayButtonInput){
          this.replayButton = true;
        }
        this.activePlayer.emit(this.index);
      } else {
        this.playAudio = true;
        this.audio.pause();
        this.activePlayer.emit(null);
      }
    }, 500);
  }

  changeTimelinePosition() {
    setTimeout(() => {
      this.time = this.getMinutesAudioTime(this.audio?.currentTime);
      const percentagePosition =
        (100 * this.audio?.currentTime) / this.audio?.duration;
      this.timeline.style.backgroundSize = `${percentagePosition}% 100%`;
      this.timeline.value = percentagePosition;

      if (this.audio.currentTime == this.audio.duration) {
        this.playAudio = true;
        this.activePlayer.emit(null);
      }
    }, 100);
  }

  getMinutesAudioTime(time: any) {
    const minutes = Math.floor(time / 60);
    let seconds: any = Math.floor(time % 60);
    seconds = seconds > 9 ? seconds : `0${seconds}`;
    return `${minutes}:${seconds}`;
  }

  changeSeek() {
    const time =
      (this.timeline.value * this.audioElement.nativeElement.duration) / 100;
    this.audio.currentTime = time;
  }

  ngOnDestroy(): void {
    // this.src = this.src;
    // this.audioId = false;
    this.autoplay = false;
    // this.playerButton = '';
    this.playAudio = true;
    if (
      this.audioElement &&
      this.audioElement.nativeElement &&
      !this.audioElement.pause
    ) {
      this.audioElement = this.audioElement;
      this.audio?.pause();
      this.activePlayer.emit(null);
    }
  }
}
