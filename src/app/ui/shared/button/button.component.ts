import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

/* eslint-disable @angular-eslint/component-selector */
@Component({
  selector: 'button[vt-button], a[vt-button]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {}
