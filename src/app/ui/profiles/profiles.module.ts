import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MyProfilePageComponent } from './pages/my-profile-page/my-profile-page.component';
import { ProfileEffects } from './state/effects';
import { profileResolver } from './resolvers/profile.resolver';
import { profileFeature } from './state/reducer';

const routes: Routes = [
  {
    path: '',
    component: MyProfilePageComponent,
    resolve: { profile: profileResolver }
  }
];

@NgModule({
  declarations: [MyProfilePageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(profileFeature),
    EffectsModule.forFeature([ProfileEffects]),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: []
})
export class ProfilesModule {}