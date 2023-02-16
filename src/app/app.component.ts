import {Component, Renderer2} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private _currentMode: 'day' | 'night' = 'night';

  constructor(private renderer: Renderer2) {
    // of course, we could store the mode in local storage for later retrieval. If so we should provide an option to unset it.
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.currentMode = 'night';
    }
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
      this.currentMode = event.matches ? 'night' : 'day';
    });
  }

  changeMode() {
    this.currentMode = this.oppositeMode();
  }

  oppositeMode() {
    if (this._currentMode === 'day') {
      return 'night';
    } else {
      return 'day';
    }
  }

  private set currentMode(currentMode: 'day' | 'night') {
    this._currentMode = currentMode;
    if (currentMode === 'night') {
      this.renderer.addClass(document.body, 'dark-theme');
    } else {
      this.renderer.removeClass(document.body, 'dark-theme');
    }
  }

  get modeIcon() {
    return this._currentMode === 'day' ? 'sunny' : 'bedtime';
  }
}
