import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { Observable, Subject, Subscription, debounceTime, filter, map, skip, startWith, tap } from 'rxjs';
import { InputComponent } from './input/input.component';
import { DogService } from './dog.service';
import { ApiResponse } from './model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
    
    count = 0
    log = 0
    countEvent = new Subject<number>
    countSub$!: Subscription // $ is a convention in naming for Subscription, Observable, Promise
    countObs$!: Observable<number>
    countObs2$!: Observable<number>

    ngOnInit(): void {
        this.countObs2$ = this.countEvent
        this.countObs$ = this.countEvent.pipe(
            startWith(this.count),
            tap(v => {
                console.info(v)
            }),
            filter(v => !(v%2)),
            map(v => v * 10)
        )
        this.countSub$ = this.countEvent.subscribe(
            (v) => {
                this.log = v
                if (!(v%2)) {
                    this.count = v * 10
                }
            }
        )
    }

    ngOnDestroy(): void {
        // MUST unsubscribe to prevent memory leak
        this.countSub$.unsubscribe()
    }

    pressed() {
        this.count = Math.floor(Math.random() * 100)
        this.countEvent.next(this.count)
    }



    @ViewChild(InputComponent)
    inputComp!: InputComponent

    keyPressed$!: Observable<string | undefined>

    ngAfterViewInit(): void {
        this.keyPressed$ = this.inputComp.keyPressed.pipe(
            debounceTime(100),
            map(v => v.split('').filter(c => c != 'e').join('').toUpperCase())
        )
    }



    dogSvc = inject(DogService)

    dogResponse$!: Observable<ApiResponse>
    dogProm$!: Promise<string>

    getDogsAsObservable() {
        this.dogResponse$ = this.dogSvc.getDogAsObservable()
    }

    getDogsAsPromise() {
        this.dogProm$ = this.dogSvc.getDogAsPromiseImage()
    }
}
