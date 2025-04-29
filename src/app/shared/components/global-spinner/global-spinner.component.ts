import { Component } from '@angular/core';
import { LoadingService } from '../../../core/services/loading/loading.service';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-global-spinner',
  standalone: true,
  imports: [CommonModule,MatProgressSpinnerModule],
  templateUrl: './global-spinner.component.html',
  styleUrl: './global-spinner.component.css'
})
export class GlobalSpinnerComponent {
  isLoading$ = this.loadingService.isLoading$;
  constructor(private loadingService: LoadingService) {}
}
