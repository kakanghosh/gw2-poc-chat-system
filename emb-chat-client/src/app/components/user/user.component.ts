import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { User } from '../../models';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [NgIf],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {
  @Input() user!: User;
}
