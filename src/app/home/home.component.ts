import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { ApiService } from '../api.service';
import {fuseAnimations} from '../../@fuse/animations';
import {FuseSidebarService} from '../../@fuse/components/sidebar/sidebar.service';
import {FuseProgressBarService} from '../../@fuse/components/progress-bar/progress-bar.service';
import {locale as navigationEnglish} from '../navigation/i18n/en';
import {locale as navigationTurkish} from '../navigation/i18n/tr';
import {FuseConfigService} from '../../@fuse/services/config.service';
import {FuseNavigationService} from '../../@fuse/components/navigation/navigation.service';
import {FuseSplashScreenService} from '../../@fuse/services/splash-screen.service';
import {FuseTranslationLoaderService} from '../../@fuse/services/translation-loader.service';
import {TranslateService} from '@ngx-translate/core';
import {Platform} from '@angular/cdk/platform';



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
    navigation;
    user;

  constructor(
      private _fuseConfigService: FuseConfigService,
      private _fuseNavigationService: FuseNavigationService,
      private _fuseSplashScreenService: FuseSplashScreenService,
      private _fuseTranslationLoaderService: FuseTranslationLoaderService,
      private _translateService: TranslateService,
      private _platform: Platform,

      public api: ApiService,
      private _fuseSidebarService: FuseSidebarService,
      private _fuseProgressBarService: FuseProgressBarService,
  ) {
      this.api.onUserChanged.subscribe(usr  => {
          console.log('Token', usr);
          this.user = usr;
          this.navigation = this.api.navegacion( this.user.profile );

          // Register the navigation to the service
          this._fuseNavigationService.register('main', this.navigation);

          // Set the main navigation as our current navigation
          this._fuseNavigationService.setCurrentNavigation('main');

          // Add languages
          this._translateService.addLangs(['en', 'tr']);

          // Set the default language
          this._translateService.setDefaultLang('en');

          // Set the navigation translations
          this._fuseTranslationLoaderService.loadTranslations(navigationEnglish, navigationTurkish);

          // Use a language
          this._translateService.use('en');
      });

  }

    dataDash(): void{

        // this._fuseProgressBarService.show();
        this.api.get('operador')
            .subscribe( data => {

                console.log('CONSULTA::', data);
                this.widgets = data;
                this._fuseProgressBarService.hide();

            });
    }

  ngOnInit() {
      this.dataDash();
      this.api.onTokenChanged.subscribe(token => {
          console.log('Token', token);
      });
  }


   toggleSidebar(name): void{
        this._fuseSidebarService.getSidebar(name).toggleOpen();
   }

}
