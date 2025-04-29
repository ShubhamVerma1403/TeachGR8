import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainComponent } from "./Students/Main/main.component";
import { HeaderComponent } from "./layout/header/header.component";
import { GlobalSpinnerComponent } from './shared/components/global-spinner/global-spinner.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, GlobalSpinnerComponent]
})
export class AppComponent {
  title = 'angular-school';
}
