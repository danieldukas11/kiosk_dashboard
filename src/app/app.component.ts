import {Component, DoCheck} from '@angular/core';
import * as jwtDecode from 'jwt-decode';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements DoCheck {
  title = 'kiosk-dashboard';

  constructor(private toastr: ToastrService, public router: Router) {

  }


  ngDoCheck(): void {

    const token = localStorage.getItem('usr');

    if (token) {
      const decoded = jwtDecode(token);
      const dateEnd = decoded.exp;
      const dateNow = Date.now();

      if (dateEnd < dateNow / 1000) {
        this.toastr.error('Your session has been expired');
        this.router.navigate(['/']);
        localStorage.removeItem('usr');
      }

    }
  }

}
