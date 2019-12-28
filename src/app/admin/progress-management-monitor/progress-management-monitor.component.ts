import {Component, OnInit} from '@angular/core';
import {ManageProductsService} from '../../services/manage-products.service';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-progress-management-monitor',
  templateUrl: './progress-management-monitor.component.html',
  styleUrls: ['./progress-management-monitor.component.scss']
})
export class ProgressManagementMonitorComponent implements OnInit {
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

    fd.append('adVideo', this.dropzoneFile);

    this.mp.uploadAdVideo(fd).subscribe(dt => {
      this.getAdVideos();
    });
  }

  getAdVideos() {
    this.mp.getAdVideos().subscribe(dt => {
      this.videoFiles = dt;
    });
  }

  getVideoUrl(name) {
    return `${environment.staticUrl}videos/${name}`;
  }

}
