import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';

import { UsuariosService } from './usuarios.service';
import { ContactsContactFormDialogComponent } from './contact-form/contact-form.component';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class UsuariosComponent implements OnInit, OnDestroy {

    dialogRef: any;
    hasSelectedContacts: boolean;
    searchInput: FormControl;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {ContactsService} _contactsService
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {MatDialog} _matDialog
     */
  constructor(
      private _contactsService: UsuariosService,
      private _fuseSidebarService: FuseSidebarService,
      private _matDialog: MatDialog,
      public api: ApiService,
    ) {
        // Set the defaults
        this.searchInput = new FormControl('');

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

  ngOnInit() {
      this._contactsService.onSelectedContactsChanged
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(selectedContacts => {
              this.hasSelectedContacts = selectedContacts.length > 0;
          });

      this.searchInput.valueChanges
          .pipe(
              takeUntil(this._unsubscribeAll),
              debounceTime(300),
              distinctUntilChanged()
          )
          .subscribe(searchText => {
              this._contactsService.onSearchTextChanged.next(searchText);
          });
  }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * New contact
     */
    newContact(): void
    {
        this.dialogRef = this._matDialog.open(ContactsContactFormDialogComponent, {
            panelClass: 'contact-form-dialog',
            data      : {
                action: 'new'
            },
            width: '600px',
        });

        this.dialogRef.afterClosed()
            .subscribe((response: FormGroup) => {
                if ( !response )
                {
                    return;
                }

                this._contactsService.updateContact(response.getRawValue());
            });
    }

    /**
     * Toggle the sidebar
     *
     * @param name
     */
    toggleSidebar(name): void
    {
        this._fuseSidebarService.getSidebar(name).toggleOpen();
    }

}
