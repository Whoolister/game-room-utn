import { Component } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {MatList, MatListItem, MatListSubheaderCssMatStyler} from "@angular/material/list";
import {NgIcon, provideIcons} from "@ng-icons/core";
import {bootstrapGithub, bootstrapLinkedin} from '@ng-icons/bootstrap-icons';

@Component({
  selector: 'app-who-am-i',
  standalone: true,
  imports: [
    NgOptimizedImage,
    MatIcon,
    MatListItem,
    MatList,
    MatListSubheaderCssMatStyler,
    NgIcon
  ],
  templateUrl: './who-am-i.component.html',
  styleUrl: './who-am-i.component.css',
  host: { 'class': 'm-auto' },
  providers: [provideIcons({ bootstrapGithub, bootstrapLinkedin })]
})
export class WhoAmIComponent {
  links: Link[] = [
    { title: "GitHub", icon: bootstrapGithub, url: "https://github.com/Whoolister"},
    { title: "LinkedIn", icon: bootstrapLinkedin, url: "https://ar.linkedin.com/in/lautaro-joaquin-fonseca"}
  ]
}

type Link = { title: string, icon: string, url: string };
