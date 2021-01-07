import {animate, state, style, transition, trigger} from '@angular/animations';

export let popLeft = trigger('pop-left', [
  state('void', style({
    opacity: 0,
    transform: 'translateX(40px)'
  })),
  transition(':enter, :leave', [
    animate('.3s ease-out')
  ])
]);

export let multiAnimation = trigger('animate', [
  state('move', style({
    transform: 'translateX(-100%) translateY(50px)'
  })),
  state('enlarge', style({
    transform: 'scale(1.5)'
  })),
  state('spin', style({
    transform: 'rotateY(180deg) rotateZ(90deg)'
  })),
  transition('spin <=> move, enlarge <=> move, spin <=> enlarge', animate('1000ms ease-out')),
  transition('* => *', animate('500ms ease'))
]);
