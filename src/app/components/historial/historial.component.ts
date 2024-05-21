import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css'],
})
export class HistorialComponent implements OnInit {
  @Input() historial: any[] = [];
  public historial2: any[] = [];
  ngOnInit(): void {
    // console.log(this.historial);
    this.historial2 = this.historial.shift();
    // console.log(this.historial2);
  }
}
