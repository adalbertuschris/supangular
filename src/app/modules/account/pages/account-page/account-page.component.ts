import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Profile } from '../../models/profile';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { AccountService } from '../../services/account.service';
import { AuthUser } from 'src/app/modules/auth/models/auth-user';

@Component({
  selector: 'vt-account-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.scss']
})
export class AccountPageComponent {
  loading = false;
  profile!: Profile;

  updateProfileForm = this.formBuilder.group({
    username: ''
  });

  user: AuthUser = null;

  constructor(
    private readonly authService: AuthService,
    private readonly accountService: AccountService,
    private formBuilder: FormBuilder
  ) {
    this.user = this.authService.authUser;
  }

  async ngOnInit(): Promise<void> {
    if (this.user) {
      await this.getProfile(this.user.id);

      if (this.profile) {
        const { username } = this.profile;
        this.updateProfileForm.patchValue({
          username
        });
      }
    }
  }

  async getProfile(userId: string) {
    try {
      this.loading = true;
      const { data: profile, error, status } = (await this.accountService.getProfile(userId)) as any;

      if (error && status !== 406) {
        throw error;
      }

      if (profile) {
        this.profile = profile;
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      this.loading = false;
    }
  }

  async updateProfile(): Promise<void> {
    try {
      this.loading = true;

      const username = this.updateProfileForm.value.username as string;

      const { error } = await this.accountService.updateProfile({
        id: this.user?.id || '',
        username
      });
      if (error) throw error;
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      this.loading = false;
    }
  }

  async signOut() {
    await this.authService.signOut();
  }
}
