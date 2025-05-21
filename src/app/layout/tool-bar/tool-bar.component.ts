import { Component } from '@angular/core';
import { MaterialModule } from '../../shared/material/material.module';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tool-bar',
  standalone: true,
  imports: [MaterialModule, RouterLink],
  templateUrl: './tool-bar.component.html',
  styleUrl: './tool-bar.component.scss'
})
export class ToolBarComponent {

}
