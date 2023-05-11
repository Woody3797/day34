import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    count = 0

    countEvent = new Subject<number>

    ngOnInit(): void {
        
    }
}
