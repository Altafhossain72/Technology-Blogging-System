import { Component, OnInit } from '@angular/core';

import {multiAnimation} from '../admin/shared/animations';

@Component({
  selector: 'app-animation',
  templateUrl: './animation.component.html',
  styleUrls: ['./animation.component.scss'],
  animations: [
    multiAnimation
  ]
})
export class AnimationComponent implements OnInit {

  position: string | null;
  constructor() { }

  ngOnInit() {
  }

  changePosition(param: string) {
    this.position = this.position !== param ? param : null;
  }
}
