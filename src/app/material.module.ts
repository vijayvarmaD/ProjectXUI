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
  MdTabsModule
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
    MdTabsModule
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
    MdTabsModule
  ]
})
export class MaterialModule {}