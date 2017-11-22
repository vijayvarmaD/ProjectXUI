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
  MdRadioModule,
  MdFormFieldModule,
  MdInputModule,
  MdTooltipModule,
  MdAutocompleteModule
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
    MdRadioModule,
    MdFormFieldModule,
    MdInputModule,
    MdTooltipModule,
    MdAutocompleteModule
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
    MdRadioModule,
    MdFormFieldModule,
    MdInputModule,
    MdTooltipModule,
    MdAutocompleteModule
  ]
})
export class MaterialModule {}