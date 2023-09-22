import { Component, OnInit } from '@angular/core';
import { Profile } from '../../models/profile';
import { FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { ProfileService } from '../../services/profile.service';
import { Observable } from 'rxjs';
import { ProfileUpsert } from '../../models/profile-upsert';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'vt-my-profile-page',
  templateUrl: './my-profile-page.component.html',
  styleUrls: ['./my-profile-page.component.scss']
})
export class MyProfilePageComponent implements OnInit {
  isLoading$: Observable<boolean> = this.profileService.isLoading$;
  profile$: Observable<Profile> = this.profileService.profile$;

  updateProfileForm = this.formBuilder.group({
    firstName: '',
    lastName: ''
  });

  constructor(
    private readonly authService: AuthService,
    private readonly profileService: ProfileService,
    private formBuilder: FormBuilder,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe(({ profile }) => {
      const { firstName, lastName } = profile;
      this.updateProfileForm.patchValue({
        firstName,
        lastName
      });
    });
  }

  updateProfile(profileId: string): void {
    const model: ProfileUpsert = this.updateProfileForm.value as ProfileUpsert;
    this.profileService.updateProfile(profileId, model);
  }

  signOut(): void {
    this.authService.signOut();
  }
}
