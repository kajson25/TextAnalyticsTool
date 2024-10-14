import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LoggerService {

    private logList: string[] = []

    log(requestData: string){
        this.logList.push(requestData)
    }

    allLogs(): string[] {
        return this.logList
    }
}