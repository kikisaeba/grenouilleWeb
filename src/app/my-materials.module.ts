import { NgModule } from '@angular/core';
import {MatMenuModule, MatIconModule, MatButtonModule, MatToolbarModule, MatSidenavModule, MatListModule,
  MatSlideToggleModule, MatRadioModule, MatTableModule, MatCheckboxModule, MatPaginatorModule,
  MatTreeModule} from "@angular/material";


@NgModule({
  imports: [
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatSlideToggleModule,
    MatRadioModule,
    MatTableModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatTreeModule
  ],
  exports: [
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatSlideToggleModule,
    MatRadioModule,
    MatTableModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatTreeModule
  ],
  declarations: []
})
export class MyMaterialsModule { }
