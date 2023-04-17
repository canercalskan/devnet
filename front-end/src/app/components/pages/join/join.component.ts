import { Component, OnInit } from "@angular/core";
import { UserModel } from "src/app/models/user.model";
import countries from '../../../../assets/json/countries.json';
import { JoinService } from "src/app/services/join.service";
import { HttpClient } from "@angular/common/http";
@Component({
    selector : 'join',
    templateUrl : './join.component.html',
    styleUrls : ['./join.component.css']
})

export class JoinComponent {
    countries  = countries.countries
    countryNames : string[] = []
    array : string[] = ['caner' , 'eren' , 'caliskan'];
    selectionError! : boolean;
    constructor(private joinService : JoinService , private http : HttpClient){
        this.countries.forEach(country => {
            this.countryNames.push(country.name);
        })
    }

    handleSignUpForm(newUser : UserModel) : void {
        if(newUser.country === "" || newUser.gender === "") {
            this.selectionError = true;
            return;
        }
        else {
            this.joinService.register(newUser);
        }
    }

    handleLoginForm(value : {email : string, password : string}) : void {
        this.joinService.login(value.email , value.password)
    }
    
    openTerms() : void {
        const terms = document.getElementById('terms-of-use');
        terms!.style.display = 'flex';
    }

    closeTerms() : void {
        const terms = document.getElementById('terms-of-use');
        terms!.style.display = 'none';
    }
}