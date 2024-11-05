import { trigger, transition, style, animate } from '@angular/animations';

export const slideUp = trigger('slideUp', [
  transition(':enter', [
    style({ transform: 'translateY(100%)', opacity: 0 }), // Start off-screen and invisible
    animate('0.5s ease-out', style({ transform: 'translateY(0)', opacity: 1 })) // Slide up into view
  ]),
  transition(':leave', [
    animate('0.5s ease-in', style({ transform: 'translateY(100%)', opacity: 0 })) // Slide down out of view
  ])
]);
// Slide Fade Animation
export const slideFade = trigger('slideFade', [
    transition(':enter', [
      style({ transform: 'translateY(50%)', opacity: 0 }), // Start from slightly below and invisible
      animate('0.5s ease-out', style({ transform: 'translateY(0)', opacity: 1 })) // Slide to position and fade in
    ]),
    transition(':leave', [
      animate('0.5s ease-in', style({ transform: 'translateY(50%)', opacity: 0 })) // Slide down and fade out
    ])
  ]);