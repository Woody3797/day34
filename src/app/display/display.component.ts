import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, map, tap } from 'rxjs';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit, OnDestroy {
    
    fb = inject(FormBuilder)
    form!: FormGroup
    name!: string
    email!: string
    object!: string
    form$!: Observable<string>

    ngOnInit(): void {
        this.form = this.fb.group({
            name: this.fb.control(''),
            email: this.fb.control(''),
        })
        this.form$ = this.form.valueChanges
        
        this.form.valueChanges.subscribe({
            next: v => { this.object = v},
            error: err => { console.info(err) },
            complete: () => { null },
        })
    }

    ngOnDestroy(): void {
        throw new Error('Method not implemented.');
    }
    
}
