import { AsyncPipe, JsonPipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { KingDom, UsersInKingDom } from '../../models';
import { UserComponent } from '../user/user.component';
import { forkJoin, map } from 'rxjs';
import { KingdomService } from '../../services/kingdom.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-list-window',
  standalone: true,
  imports: [NgFor, NgIf, AsyncPipe, UserComponent, JsonPipe],
  templateUrl: './user-list-window.component.html',
  styleUrl: './user-list-window.component.scss',
})
export class UserListWindowComponent implements OnInit {
  public usersInKingDoms: UsersInKingDom[] = [];

  constructor(
    private kingdomService: KingdomService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.kingdomService
      .getKingdomList()
      .subscribe((response) => this.fechUserOfKingdoms(response.kingdoms));
  }

  fechUserOfKingdoms(kingdoms: KingDom[]): void {
    const requests = kingdoms.map((kingdom) =>
      this.userService
        .getUsersOfKingdom(kingdom.id)
        .pipe(map((data) => ({ kingdom, users: data.users })))
    );

    forkJoin(requests).subscribe((results) => {
      this.usersInKingDoms = results;
      this.usersInKingDoms.sort((a, b) => {
        if (a.kingdom.name < b.kingdom.name) {
          return -1;
        }
        if (a.kingdom.name > b.kingdom.name) {
          return 1;
        }
        return 0;
      });
    });
  }
}
