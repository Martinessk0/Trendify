import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { jwtDecode } from "jwt-decode";
import { map, Observable } from "rxjs";
import { LoginModel } from "../models/account/login-model";
import { AuthResponseModel } from "../models/account/auth-response-model";
import { ProfileModel } from "../models/account/profile-model";
import { RegisterModel } from "../models/account/register-model";

@Injectable({
    providedIn: 'root',
})
export class AuthService {

    apiUrl: string = environment.apiUrl;
    private tokenKey = 'token';

    constructor(private http: HttpClient) { }


    login(data: LoginModel): Observable<AuthResponseModel> {
        return this.http
            .post<AuthResponseModel>(`${this.apiUrl}/account/login`, data)
            .pipe(
                map((response) => {
                    if (response.isSuccess) {
                        localStorage.setItem(this.tokenKey, response.token);
                    }
                    return response;
                })
            );
    }

    register(data: RegisterModel): Observable<AuthResponseModel> {
        return this.http
            .post<AuthResponseModel>(`${this.apiUrl}/account/register`, data);
    }

    isAdmin(): boolean{
        const token = this.getToken();
            if (!token) return false;
            const decodedToken: any = jwtDecode(token);
            const roles = decodedToken.role || [];
            if (roles.some((item: any) => item === 'Admin')) return true;
    
        return false;
    }

    // getUserDetail = () => {
    //     const token = this.getToken();
    //     if (!token) return undefined;
    //     const decodedToken: any = jwtDecode(token);
    //     const userDetail = {
    //         id: decodedToken.nameid,
    //         fullName: decodedToken.name,
    //         email: decodedToken.email,
    //         roles: decodedToken.role || [],
    //     };

    //     return userDetail;
    // };

    getProfile(): Observable<ProfileModel> {
        return this.http.get<ProfileModel>(`${this.apiUrl}/account/detail`);
    }

    public isLoggedIn(): boolean {
        const token = this.getToken();
        return token != null && !this.isTokenExpired();
    }

    private isTokenExpired(): boolean {
        const token = this.getToken();
        if (!token) return true;
        const decoded: any = jwtDecode(token);
        const expired = Date.now() >= decoded.exp * 1000;
        if (expired) {
            this.logout();
        }
        return expired;
    }

    public logout(): void {
        localStorage.removeItem(this.tokenKey);
    }

    public getToken(): string | null {
        return localStorage.getItem(this.tokenKey);
    }
}
