import {
  Component,
  ViewChild,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  title = 'ezMail';

  @ViewChild('sidenav', { static: false }) sidenav: MatSidenav;

  close() {
    this.sidenav.close();
  }
}
