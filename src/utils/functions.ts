import { Injectable } from '@angular/core';
// @ts-ignore  
import jwt_decode from "jwt-decode";
import { DomSanitizer } from '@angular/platform-browser';
declare var $: any;


@Injectable({
    providedIn: 'root'
})
export class Functions {

    userInfo: any;

    constructor(
        private sanitizer: DomSanitizer,
    ) {
        this.checkUserInfo()
     }

    checkUserInfo(){
        this.userInfo = this.authorization() ? this.decodedJwt(this.authorization()) : {}
    }

    urlWhithParams(moreUrl: any, urlService: any, params?: any) {
        let url = urlService + `${moreUrl}`;
        if (params) {
            Object.keys(params).forEach(function (value) {
                url += `/${params[value]}`;
            })
        }
        return url
    }

    validateMessageError(err:any) {
        var message = ''
        if (err.error.message_error != null) {
            if (typeof err.error.message_error == 'object') {
                Object.keys(err.error.message_error).forEach(function (value) {
                    message += ` ${value}: ${err.error.message_error[value]}`
                })
            } else if (typeof err.error.message_error == 'string') {
                message = err.error.message_error;
            } else {
                message = 'No ha sido posible obtener el mensaje de error';
            }
        } else {
            message = err.message;
        }
        return message;
    }

    authorization() {
        var tokenAuth = localStorage.getItem('jwt_token_user') || '';
        return tokenAuth
    }

    getJwtWithKey(suffix = 'jwt') {
        return `${suffix} ${this.authorization()}`
    }

    decodedJwt(jwt:any) {
        return jwt_decode(jwt);
    }

    saveToken(token:any, key?: any) {
        localStorage.setItem(key || 'jwt_token_user', token);
    }

    requiresIsEmpty(requires:any, model:any) {
        if (Object.keys(model).length) {
            for (var value in requires) {
                if (model.hasOwnProperty(requires[value])) {
                    if (!model[requires[value]]){
                        return true;
                    }
                }else{
                    return true;
                }
            }
        } else {
            return true;
        }
        return false;
    }
}