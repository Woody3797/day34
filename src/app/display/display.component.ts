import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { tap } from 'rxjs';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {

    fb = inject(FormBuilder)
    form!: FormGroup
    name!: string
    email!: string
    object!: string

    ngOnInit(): void {
        this.form = this.fb.group({
            name: this.fb.control(''),
            email: this.fb.control('',)
        })
        this.form.valueChanges.pipe(
            tap(v => {
                console.info(v)
                this.name = v['name']
                this.email = v['email']
                this.object = v
            })
        ).subscribe({
            next: v => { },
            error: err => { },
            complete: () => { },
        })
    }

    
}
