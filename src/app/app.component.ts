import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainComponent } from "./Students/Main/main.component";
import { HeaderComponent } from "./layout/header/header.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet]
})
export class AppComponent {
  title = 'angular-school';
}
