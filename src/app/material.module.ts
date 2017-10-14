import { NgModule } from '@angular/core';

import {
  MdButtonModule,
  MdMenuModule,
  MdToolbarModule,
  MdIconModule,
  MdCardModule,
  MdProgressSpinnerModule,
  MdProgressBarModule,
  MdChipsModule,
  MdTabsModule,
  MdRadioModule
} from '@angular/material';

@NgModule({
  imports: [
    MdButtonModule,
    MdMenuModule,
    MdToolbarModule,
    MdIconModule,
    MdCardModule,
    MdProgressSpinnerModule,
    MdProgressBarModule,
    MdChipsModule,
    MdTabsModule,
    MdRadioModule
  ],
  exports: [
    MdButtonModule,
    MdMenuModule,
    MdToolbarModule,
    MdIconModule,
    MdCardModule,
    MdProgressSpinnerModule,
    MdProgressBarModule,
    MdChipsModule,
    MdTabsModule,
    MdRadioModule
  ]
})
export class MaterialModule {}