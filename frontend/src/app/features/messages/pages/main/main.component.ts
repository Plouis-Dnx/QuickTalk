import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'app-main',
    standalone: true,
    templateUrl: './main.component.html',
    styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {
    // Reunites everything : Contacts sidebar, conversation display, ...

    isLoading = true;

    ngOnInit(): void {
        this.isLoading = false;
    }
}