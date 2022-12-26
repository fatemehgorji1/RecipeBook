import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DataStorageService } from 'src/app/shared/services/data-storage.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']

})
export class HeaderComponent implements OnInit {
    isAuthenticated = false;
    isToggleMenu: boolean = false;
    @Input() selectedPage!: number;

    constructor(
        private dataStorageService: DataStorageService,
        private authService: AuthService
    ) { }

    ngOnInit(): void {

        this.authService.user.subscribe(user => {
            this.isAuthenticated = !!user;
            console.log(!!user);
        })

    }

    //events 
    onToggleMenu() {
        this.isToggleMenu = !this.isToggleMenu;
    }
    onSaveData() {
        this.dataStorageService.storeRecipes();
    }
    onFetchData() {
        this.dataStorageService.fetchData().subscribe((recipes) => {
            console.log(recipes);
        });
    }

}