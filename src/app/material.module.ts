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
  MdAutocompleteModule,
  MdSelectModule,
  MdOptionModule,
  MdTableModule
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
    MdAutocompleteModule,
    MdSelectModule,
    MdOptionModule,
    MdTableModule
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
    MdAutocompleteModule,
    MdSelectModule,
    MdOptionModule,
    MdTableModule
  ]
})
export class MaterialModule {}