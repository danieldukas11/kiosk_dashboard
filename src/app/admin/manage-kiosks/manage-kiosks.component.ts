import { Component, OnInit } from '@angular/core';
import {ManageProductsService} from '../../services/manage-products.service';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-manage-kiosks',
  templateUrl: './manage-kiosks.component.html',
  styleUrls: ['./manage-kiosks.component.scss']
})
export class ManageKiosksComponent implements OnInit {

  config = {
    url: '{no_url}',
    autoProcessQueue: false,
    addRemoveLinks: true
  };
  dropzoneFile;
  videoFiles;
  addVideo = false;
  showVideos = false;


  constructor(
    private mp: ManageProductsService
  ) {
  }

  ngOnInit() {
    this.getAdVideos();
  }

  getFile(e) {
    this.dropzoneFile = e;
  }

  upload() {
    const fd = new FormData();

    fd.append('kioskVideo', this.dropzoneFile);

    this.mp.uploadKioskVideo(fd).subscribe(dt => {
      this.getAdVideos();
    });
  }

  getAdVideos() {
    this.mp.getKioskVideos().subscribe(dt => {
      this.videoFiles = dt;
    });
  }

  getVideoUrl(name) {
    return `${environment.staticUrl}videos/${name}`;
  }

}
