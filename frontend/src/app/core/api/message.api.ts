import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";
import { Message } from "../../shared/models/message.model";

@Injectable({providedIn: 'root'})
export class MessageApi {
    private http = inject(HttpClient);

    getMessages(conversationId: string): Observable<Message[]> {
        return this.http.get<Message[]>(`${environment.apiUrl}/message/${conversationId}`);
    }
}