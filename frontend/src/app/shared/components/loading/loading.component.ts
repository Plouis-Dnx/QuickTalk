import { Component } from "@angular/core";

@Component({
    standalone: true,
    selector: 'app-loading',
    template: `
        <div class="flex h-screen text-grey-500"> Loading... </div>
    `
})
export class LoadingComponent{}