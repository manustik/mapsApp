import { Component } from '@angular/core';
import { CounterAloneComponent } from "../../components/counter-alone/counter-alone.component";

@Component({
  selector: 'app-alone-page',
  imports: [CounterAloneComponent],
  templateUrl: './alone-page.component.html',
  styleUrl: './alone-page.component.css'
})
export class AlonePageComponent {

}
