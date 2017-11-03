import { Component} from '@angular/core';
import { CharacterItem } from './character-item';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})

export class SearchComponent {
    //Function to back end goes here.
    value = '';
    id = '2';
    output = '';
    characters: CharacterItem[];
    selection: CharacterItem;
    noData = true;

    constructor(private http: HttpClient) {}

    // Eventually this is supposed to handle selecting the character from the dropdown
    select(char: CharacterItem) {
        console.log(char);
    }

    onEnter(name: string){
        this.value = name;
        this.validateInfo();
        if(this.output === '') {
            this.output = "Character Name: " + this.value + "\n" +
                "Platform Id: " + this.id;
        }
        this.getCharacters('1','2');
        console.log(this.characters);
    }
    membershipId(platformId: string){
        this.id = platformId;
        console.log("ID:" + platformId);
    }
    validateInfo(){
        if(this.id === '' && this.value === '')
        {
            this.output = "Please enter a valid Character name and select Platform.";
        }
        else if(this.id === '' && this.value !== '')
        {
            this.output = "Please select a Platform.";
        }
        else if(this.id !== '' && this.value === '')
        {
            this.output = "Please enter a Character name";
        }
        else
        {
            this.output = '';
        }
    }
    // Leaving this here so I (Marion) can update it to work correctly in the future
    getCharacters(platform: string, displayName: string):void {
        this.http.get('/api/search').subscribe(data => {
                this.characters = new Array<CharacterItem>();
                if (data['characters'].length > 0) {
                    this.selection = new CharacterItem(
                        data['characters'][0].classType,
                        data['characters'][0].race,
                        data['characters'][0].gender,
                        data['characters'][0].light,
                        data['characters'][0].level,
                        data['characters'][0].emblemBackgroundPath);
                    for (let i = 1; i < data['characters'].length; i++) {
                        this.characters.push(new CharacterItem(
                            data['characters'][i].classType,
                            data['characters'][i].race,
                            data['characters'][i].gender,
                            data['characters'][i].light,
                            data['characters'][i].level,
                            data['characters'][i].emblemBackgroundPath));
                    }
                    this.noData = false;
                } else {
                    this.noData = true;
                    console.log('no data is true')
                }
        },
        err => {
            console.log('Something went wrong!');
        });
    }
}
