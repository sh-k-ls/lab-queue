import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { ReactiveFormsModule} from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

const modules = [
  MatIconModule,
  MatCardModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatMenuModule,
  MatFormFieldModule,
  MatInputModule,
  MatOptionModule,
  ReactiveFormsModule,
  MatAutocompleteModule,
  MatChipsModule,
  MatDatepickerModule,
  MatNativeDateModule,
  NgxMaterialTimepickerModule,
];

@NgModule({
  declarations: [],
  imports: [
    modules
  ],
  exports: [
    modules
  ]
})
export class AngularMaterialModule { }
