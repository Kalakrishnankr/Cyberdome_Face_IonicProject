import { Injectable } from '@angular/core';
import { Observable} from 'rxjs/Observable';

import {Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Platform } from 'ionic-angular';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch'
import 'rxjs/Rx';



export class User {
    Usercode: string;
    password: string;

    constructor(Usercode: string, password: string) {
        this.Usercode = Usercode;
        this.password = password;
    }
}

 
@Injectable()
export class AuthService {
    imagecaught: any;
    byteArrays: ArrayBuffer;
    create_person_api_url= "https://eastus.api.cognitive.microsoft.com/face/v1.0/persongroups/cyber_dom/persons";
    add_person_face_api_url="https://eastus.api.cognitive.microsoft.com/face/v1.0/persongroups/cyber_dom/persons/";
    train_group_api_url="https://eastus.api.cognitive.microsoft.com/face/v1.0/persongroups/cyber_dom/train";
    face_api_url = "https://eastus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false";
    public faceApiUrl: any;

    currentUser: User;
    result: any;
    private defaultOptions_ = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json' }) });
    
    constructor(public http: Http,public platform: Platform) {
        console.log('Hello Restapi Provider');
        this.faceApiUrl = "https://eastus.api.cognitive.microsoft.com/face/v1.0/";
    }
    
    private _serverError(err: any) {
        console.log('sever error:', err);  // debug
        if(err instanceof Response) {
          return Observable.throw(err.text() || 'backend server error');
        }
        return Observable.throw(err || 'backend server error');
    }

    // Method to login to the API. Pass the username and password and this will 
    // return a response that also contains the Project  list and associated location List
 
    //api for create a person//kkrcode
    createPerson(userData){
        let body = userData;
       		console.log('body',body);
        let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('Ocp-Apim-Subscription-Key','b41dacb268954fc090427c497cab0133');
            //https://eastus.api.cognitive.microsoft.com/face/v1.0/persongroups/cyber_dom/persons
        return this.http.post(this.create_person_api_url,body, {headers})
             .map((res) => res.json())
            .do(data => console.log('server data:', data))
              // debug
             

            .catch(this._serverError);   

    }
    //Api for Add person Face
    addPersonFace(personId,imageData){
        let body=imageData;
        let personID=personId;
            console.log('PersonID',personID)
            console.log('body',body);
        let headers = new Headers();
            headers.append('Content-Type', 'application/octet-stream');
            headers.append('Ocp-Apim-Subscription-Key','b41dacb268954fc090427c497cab0133');
        //https://eastus.api.cognitive.microsoft.com/face/v1.0/persongroups/cyber_dom/{personID}/persistedFaces?name:"",empid:""
        return this.http.post(this.add_person_face_api_url+personID+"/persistedFaces",body,{headers})
            .map((res) => res.json())
            .do(data => console.log('persistedFaceId:',data))
            .catch(this._serverError);  
    }

    //Api for train group
    trainGroup(){
        let headers = new Headers();
            headers.append('Ocp-Apim-Subscription-Key','b41dacb268954fc090427c497cab0133');
            return this.http.post(this.train_group_api_url,null,{headers})
            /*.map((res) => res.json())*/
            /*.do(data => console.log('Train successfully'))*/
            .catch(this._serverError);  

    }


    // api to verify if employee id is valid or not. If id is valid return details for that empid
    /*empIdVerification(empid) : Observable<Object[]> {
        return this.http.get(`${this.api_url}/ValidateEmployee?SEmployeeCode=` + empid)
            .map(res => res.json())
    }*/

    // api to submit the bulk attendance to the server side
    /*submit(myJson){  
        let body = JSON.stringify(myJson);        
        return this.http.post(`${this.api_url}/BulkSubmitAttendanceDetails`, body, this.defaultOptions_)
            .map(res => res.json())
    }*/
   
    // api to get the attendance details on a particular date taken by the logged in supervisor
    /*getReport(supervisor_id,view_date) {
        let headers = new Headers();
            headers.append('Content-Type', 'application/json');
        let body = JSON.stringify({"Date":view_date, "SupervisorId":supervisor_id});
        return this.http.post(`${this.api_url}/Getattendancedetails`, body, {headers})
            .map(res => res.json())
    }*/
   
    // function to logout
   /* public logout() {
        return Observable.create(observer => {
            this.currentUser = null;
            observer.next(true);
            observer.complete();
        });
    }*/
    
    // // TO_DO : pass image to Microsoft Azure Face API
    // public getImage(imageData){
    //     var baby = btoa(imageData)
    //     // var byteCharacters=atob(imageData);
    //     // var byteArrays=[];
        
    //     // var byteNumbers = new Array(byteCharacters.length);

    //     // for (var i = 0; i < byteCharacters.length; i++) {
    //     //        byteNumbers[i] = byteCharacters.charCodeAt(i);
    //     //     }

    //     // var byteArray = new Uint8Array(byteNumbers);
    //     // this.byteArrays=imageData
    //     // console.log(this.byteArrays);  
   
    //     // alert("imagedata"+imageData);

    //     let headers = new Headers();
    //     headers.append('Content-Type', 'application/octet-stream');
    //     headers.append('Ocp-Apim-Subscription-Key','8a02c17784704846ac1f4b0f88cb5f7a');
    //     let body = baby;
    //     console.log(body);
    //     return this.http.post(this.face_api_url, body, {headers} )
    //         .map(res => {res.json()
    //             console.log(res.json);
    //             console.log("success");
    //             alert("success" + res.json);
    //         })
    // }


    detectFace(imageData) {        
        console.log("Going to Detect Face");
        let headers = new Headers();
            headers.append('Content-Type', 'application/octet-stream');
            headers.append('Ocp-Apim-Subscription-Key','b41dacb268954fc090427c497cab0133');
        // let options = new RequestOptions({ headers: headers });
        let body = imageData;
        return this.http.post(this.faceApiUrl+"detect", body, {headers})
            .map((res) => res.json())
            .do(data => console.log('server data:', data))  // debug
            .catch(this._serverError);
    }

    identifyFace(faceData) {
        console.log("Going to Identify Face");
        let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('Ocp-Apim-Subscription-Key','b41dacb268954fc090427c497cab0133');
        // let options = new RequestOptions({ headers: headers });
        let body = faceData;
        return this.http.post(this.faceApiUrl+"identify", body, {headers})
            .map((res) => res.json())
            .do(data => console.log('server data:', data))  // debug
            .catch(this._serverError); 
    }

    getPersonDetails(personId) {
        console.log("Going to get Person's Details");
        let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('Ocp-Apim-Subscription-Key','b41dacb268954fc090427c497cab0133');
        // let options = new RequestOptions({ headers: headers });
        return this.http.get(this.faceApiUrl+"persongroups/cyber_dom/persons/"+personId)
            .map((res) => res.json())
            .do(data => console.log('server data:', data))  // debug
            .catch(this._serverError);
    }


}