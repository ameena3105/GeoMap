import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { 
  MatToolbarModule, 
  MatIconModule,
  MatListModule,
  MatInputModule,
  MatFormFieldModule,
  MatButtonModule,
  MatChipsModule,
  MatAutocompleteModule,
  MatSelectModule,
  MatCardModule
} from '@angular/material';
import { AgmCoreModule } from '@agm/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { SearchComponent } from './header/search/search.component';
import { FilterComponent } from './search-result/filter/filter.component';
import { UserListComponent } from './search-result/user-list/user-list.component';
import { MapComponent } from './search-result/map/map.component';
import {AgmJsMarkerClustererModule} from '@agm/js-marker-clusterer';
import { UserInfoComponent } from './search-result/map/user-info/user-info.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    SearchResultComponent,
    SearchComponent,
    FilterComponent,
    UserListComponent,
    MapComponent,
    UserInfoComponent
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCdP3ITeChWb0ZTdnhwkHPmHB3fLo6TIGM'
    }),
    AgmJsMarkerClustererModule,
    AppRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
