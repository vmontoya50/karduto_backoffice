import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { ApiService } from '../api.service';
import {fuseAnimations} from '../../@fuse/animations';
import {FuseSidebarService} from '../../@fuse/components/sidebar/sidebar.service';
import {FuseProgressBarService} from '../../@fuse/components/progress-bar/progress-bar.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})
export class HomeComponent implements OnInit {

    widgets: any;
    widget5: any = {};
    widget6: any = {};
    widget7: any = {};
    widget8: any = {};
    widget9: any = {};
    widget11: any = {};

  constructor(
      private api: ApiService,
      private _fuseSidebarService: FuseSidebarService,
      private _fuseProgressBarService: FuseProgressBarService,
  ) {

  }

    dataDash(): void{

        this._fuseProgressBarService.show();
        this.api.get('dashboard')
            .subscribe( data => {

                // console.log('CONSULTA::', data);
                this.widgets = data;
                this._fuseProgressBarService.hide();

            });
    }

  ngOnInit() {
      this.dataDash();
      this.api.onTokenChanged.subscribe(token  => {
          // console.log('Token', token);
      });

  }

   toggleSidebar(name): void{
        this._fuseSidebarService.getSidebar(name).toggleOpen();
   }

}
