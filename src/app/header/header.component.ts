import { Component, Input, OnInit } from '@angular/core';
import { DataStorageService } from 'src/app/shared/services/data-storage.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']

})
export class HeaderComponent implements OnInit {
    isToggleMenu: boolean = false;
    @Input() selectedPage!: number;

    constructor(
        private dataStorageService: DataStorageService
    ) { }

    ngOnInit(): void {

    }

    //events 
    onToggleMenu() {
        this.isToggleMenu = !this.isToggleMenu;
    }
    onSaveData() {
        this.dataStorageService.saveData();
    }
    onFetchData() {
        this.dataStorageService.fetchData().subscribe((recipes) => {
            console.log(recipes);
        });
    }

}