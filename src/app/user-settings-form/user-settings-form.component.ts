import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { UserSettings } from '../data/user-settings';


@Component({
  selector: 'app-user-settings-form',
  templateUrl: './user-settings-form.component.html',
  styleUrls: ['./user-settings-form.component.css']
})
export class UserSettingsFormComponent implements OnInit {

  orginalUserSettings: UserSettings ={
    name: '',
    emailOffers:true,
    interfaceStyle: 'dark',
    subscriptionType: 'Annual',
    notes: 'Here are some notes...'
  };

  userSettings: UserSettings ={    ...this.orginalUserSettings   }; 
  //  ... The Spread operator will take orginalUserSettings intouser Settings.This is a way to copy top level properties



  constructor() { }

  ngOnInit(): void {
  }
  onSubmit(form:NgForm){
    console.log('form submitted',form.valid);
  }
  onBlur(field:NgModel){
    console.log('in  onBlur',field.valid);
  }

}
