import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment.development";
import { Observable } from "rxjs";

export class CrudService<T> {
    private readonly apiUrl: string;
    private readonly resourceUrl: string;

    constructor(
        public http: HttpClient,
        endpoint: string,
    ) {
        this.apiUrl = environment.apiUrl;
        this.resourceUrl = `${this.apiUrl}/${endpoint}`;
    }

    public getAll(): Observable<T[]> {
        return this.http.get<T[]>(this.resourceUrl);
    }

    public getById(id: number): Observable<T> {
        return this.http.get<T>(`${this.resourceUrl}/${id}`);
    }

    public create(item: T): Observable<T> {
        return this.http.post<T>(this.resourceUrl, item);
    }

    public update(id: number, item: T): Observable<T> {
        return this.http.put<T>(`${this.resourceUrl}/${id}`, item);
    }

    public delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.resourceUrl}/${id}`);
    }
}