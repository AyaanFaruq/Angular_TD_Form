import { DataService } from './../data/data.service';
import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { UserSettings } from '../data/user-settings';
import { Observable } from 'rxjs';


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
    subscriptionType: '',
    notes: 'Here are some notes...'
  };

  userSettings: UserSettings ={    ...this.orginalUserSettings   }; 
  //  ... The Spread operator will take orginalUserSettings intouser Settings.This is a way to copy top level properties

  postError = false;
  postErrorMessage = ''; 
  subscriptionTypes: Observable<string[]>;

  constructor(private dataService:DataService) { }

  ngOnInit() {
    this.subscriptionTypes = this.dataService.getSubscriptionTypes();
  }

  onBlur(field:NgModel){
    console.log('in  onBlur',field.valid);
  }

  onHttpError(errorResponse: any) {
    console.log('error: ', errorResponse);
    this.postError = true;
    this.postErrorMessage = errorResponse.error.errorMessage;
  }

  onSubmit(form:NgForm){
    console.log('form submitted',form.valid);
    console.log('in onSubmit: ', form.valid);

    if (form.valid) {
      this.dataService.postUserSettingsForm(this.userSettings).subscribe(
        result => console.log('success: ', result),
        error => this.onHttpError(error)
      );
    }
    else {
      this.postError = true;
      this.postErrorMessage = "Please fix the above errors"
    }
  }

}
