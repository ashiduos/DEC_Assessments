import { LightningElement,track,wire } from 'lwc';
import getAccounts from '@salesforce/apex/accountListViewController.getAccounts';


export default class AccountListView extends LightningElement {
    @track data;
    searchKey;
    Accounts = [];
    @track searchString;
    @track initialRecords;
    @track filterData;
    @track columns = [
        { label : 'Name', fieldName : 'Name', type: 'text' },
        { label : 'First Name', fieldName : 'First_Name__c', type: 'text' },
        { label : 'Last Name', fieldName : 'Last_Name__c', type: 'text'},
        { label : 'Email', fieldName : 'Email__c', type: 'Email'},
    ];
    @wire (getAccounts) accountRecords({error,data}){
        if (data) {
            console.log(data);
            this.data = data;
            this.initialRecords = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.data = undefined;
        }
    }
    seachAccounts(event) {
        const searchKey = event.target.value.toLowerCase();
 
        if (searchKey) {
            this.data = this.initialRecords;
 
            if (this.data) {
                let searchRecords = [];
 
                for (let record of this.data) {
                    let valuesArray = Object.values(record);
                    
                    console.log('valuesArray : '+valuesArray);
                    console.log('Id '+record.Id);
                    console.log(record.Email__c)
                    if(record.Email__c){
                        let strVal = String(record.Email__c);
                        if (strVal.toLowerCase().includes(searchKey)) {
                            searchRecords.push(record);
                            break;
                        }
                    }
                    let strval1 = String(record.Last_Name__c)
                    if(strval1){
                        if (strval1.toLowerCase().includes(searchKey)) {
                            searchRecords.push(record);
                            break;
                        }
                    }

                    
                }
 
                console.log('Matched Accounts are ' + JSON.stringify(searchRecords));
                this.data = searchRecords;
            }
        } else {
            this.data = this.initialRecords;
        }
    }
}