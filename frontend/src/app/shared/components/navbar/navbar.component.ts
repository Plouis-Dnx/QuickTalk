import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
    standalone: true,
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    imports: [RouterLink]
})
export class NavbarComponent {}