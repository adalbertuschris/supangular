import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { Profile } from '../../models/profile';
import { ProfileService } from '../../services/profile.service';
import { ProfileUpsert } from '../../models/profile-upsert';

@Component({
  selector: 'vt-my-profile-page',
  templateUrl: './my-profile-page.component.html',
  styleUrls: ['./my-profile-page.component.scss']
})
export class MyProfilePageComponent implements OnInit {
  isLoading$: Observable<boolean> = this.profileService.isLoading$;
  profile$: Observable<Profile> = this.profileService.profile$;

  profileForm = this.formBuilder.group({
    firstName: '',
    lastName: ''
  });

  constructor(
    private readonly profileService: ProfileService,
    private readonly formBuilder: FormBuilder,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe(({ profile }) => {
      const { firstName, lastName } = profile;
      this.profileForm.patchValue({
        firstName,
        lastName
      });
    });
  }

  updateProfile(profileId: string): void {
    const model: ProfileUpsert = this.profileForm.value as ProfileUpsert;
    this.profileService.updateProfile(profileId, model);
  }
}
