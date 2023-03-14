import { Component } from "@angular/core";
import { UserModel } from "src/app/models/user.model";
import countries from '../../../../assets/json/countries.json';

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
    constructor(){
        this.countries.forEach(country => {
            this.countryNames.push(country.name);
        })
    }

    handleSignUpForm(value : UserModel) : void {
        if(value.country === "" || value.gender === "") {
            this.selectionError = true;
        }
        else {
            console.log(value);
        }
    }

    handleLoginForm(value:any) : void {
        console.log(value)
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