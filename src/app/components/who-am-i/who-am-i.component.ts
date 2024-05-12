import { Component } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {MatList, MatListItem, MatListSubheaderCssMatStyler} from "@angular/material/list";

@Component({
  selector: 'app-who-am-i',
  standalone: true,
  imports: [
    NgOptimizedImage,
    MatIcon,
    MatListItem,
    MatList,
    MatListSubheaderCssMatStyler,
  ],
  templateUrl: './who-am-i.component.html',
  styleUrl: './who-am-i.component.css',
  host: { 'class': 'm-auto' },
})
export class WhoAmIComponent {
  links: Link[] = [
    { title: "GitHub", icon: "code", url: "https://github.com/Whoolister"},
    { title: "LinkedIn", icon: "group", url: "https://ar.linkedin.com/in/lautaro-joaquin-fonseca"}
  ]
}

type Link = { title: string, icon: string, url: string };
