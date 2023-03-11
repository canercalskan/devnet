import { Component } from "@angular/core";
import countries from '../../../../assets/json/countries.json';

@Component({
    selector : 'join',
    templateUrl : './join.component.html',
    styleUrls : ['./join.component.css']
})

export class JoinComponent {
    countries  = countries.countries
    countryNames : string[] = []
    array : string[] = ['caner' , 'eren' , 'caliskan']
    constructor(){
        this.countries.forEach(country => {
            this.countryNames.push(country.name);
        })
    }

    handleSignUpForm(value : any) : void {
        console.log(value)
    }
}