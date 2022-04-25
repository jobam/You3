import {Component, OnInit} from '@angular/core';
import {saveAs} from 'file-saver';

@Component({
  selector: 'app-encode-page',
  templateUrl: './encode-page.component.html',
  styleUrls: ['./encode-page.component.scss']
})
export class EncodePageComponent implements OnInit {
  url: string = '';
  ws: any;
  isLoading: boolean = false;
  apiUrl: string = 'ws://localhost:8080';
  private fileName: string = '';

  constructor() {
  }

  ngOnInit(): void {
  }

  convert() {
    console.log('url to send is ' + this.url);
    this.ws = new WebSocket(this.apiUrl);
    if (this.ws.readyState === WebSocket.CLOSED) {
      console.error('cannot contact server');
      this.isLoading = false;
    }
    this.ws.binaryType = "arraybuffer";

    this.ws.onopen = () => {
      console.log('connected');
      this.ws.send(JSON.stringify({type: 'convert', payload: this.url}));
    };

    this.ws.onError = (err: any) => {
      console.error('ws error', err);
      this.isLoading = false;
    }

    this.ws.onmessage = (data: any) => {
      let deserializedContent;

      try {
        deserializedContent = JSON.parse(data.data);
        this.fileName = deserializedContent.payload.replace('\n', '');
      } catch (e) {
        this.ws.close();
        this.isLoading = false;
      }
      if (!deserializedContent) {
        const blob = new Blob([data.data], {type: "audio/mpeg3"});
        saveAs(blob, this.fileName);

        this.isLoading = false;
        this.ws.close();
      }
    }
  }
}
