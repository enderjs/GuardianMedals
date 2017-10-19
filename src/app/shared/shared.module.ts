import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from "@angular/flex-layout";
// import { BarChartModule, LineChartComponent, PieChartModule } from '@swimlane/ngx-charts';
import {
    CovalentCommonModule, CovalentLayoutModule, CovalentMediaModule, CovalentExpansionPanelModule,
    CovalentLoadingModule, CovalentDialogsModule, CovalentSearchModule, CovalentPagingModule,
    CovalentMenuModule, CovalentChipsModule, CovalentDataTableModule, CovalentMessageModule,
} from '@covalent/core';
import {
    MatButtonModule, MatListModule, MatIconModule, MatCardModule, MatMenuModule, MatInputModule, MatButtonToggleModule,
    MatProgressSpinnerModule, MatSelectModule, MatSlideToggleModule, MatDialogModule, MatSnackBarModule, MatToolbarModule,
    MatTabsModule, MatSidenavModule, MatTooltipModule, MatCheckboxModule, MatRadioModule, MatGridListModule,
    MatProgressBarModule, MatSliderModule, MatChipsModule, MatRippleModule, 
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    CovalentCommonModule, CovalentLayoutModule, CovalentMediaModule, CovalentExpansionPanelModule,
    CovalentLoadingModule, CovalentDialogsModule, CovalentSearchModule, CovalentPagingModule,
    CovalentMenuModule, CovalentChipsModule, CovalentDataTableModule, CovalentMessageModule,
    MatButtonModule, MatListModule, MatIconModule, MatCardModule, MatMenuModule, MatInputModule, MatButtonToggleModule,
    MatProgressSpinnerModule, MatSelectModule, MatSlideToggleModule, MatDialogModule, MatSnackBarModule, MatToolbarModule,
    MatTabsModule, MatSidenavModule, MatTooltipModule, MatCheckboxModule, MatRadioModule, MatGridListModule,
    MatProgressBarModule, MatSliderModule, MatChipsModule, MatRippleModule, 
  ],
  declarations: [],
  exports: [
    CommonModule,
    FlexLayoutModule,
    CovalentCommonModule, CovalentLayoutModule, CovalentMediaModule, CovalentExpansionPanelModule,
    CovalentLoadingModule, CovalentDialogsModule, CovalentSearchModule, CovalentPagingModule,
    CovalentMenuModule, CovalentChipsModule, CovalentDataTableModule, CovalentMessageModule,
    MatButtonModule, MatListModule, MatIconModule, MatCardModule, MatMenuModule, MatInputModule, MatButtonToggleModule,
    MatProgressSpinnerModule, MatSelectModule, MatSlideToggleModule, MatDialogModule, MatSnackBarModule, MatToolbarModule,
    MatTabsModule, MatSidenavModule, MatTooltipModule, MatCheckboxModule, MatRadioModule, MatGridListModule,
    MatProgressBarModule, MatSliderModule, MatChipsModule, MatRippleModule, 
  ]
})
export class SharedModule { }
