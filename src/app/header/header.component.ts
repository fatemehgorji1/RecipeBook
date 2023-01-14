import { Component, OnInit } from '@angular/core';
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

    constructor(
        private dataStorageService: DataStorageService,
        private authService: AuthService
    ) { }

    ngOnInit(): void {

        this.authService.user.subscribe(user => {
            this.isAuthenticated = !!user;
        })

    }

    //events 
    onToggleMenu() {
        this.isToggleMenu = !this.isToggleMenu;
    }
    onLogOut() {
        this.authService.logOut();
    }
    onSaveResipesData() {
        this.dataStorageService.storeRecipes();
    }
    onFetchRecipesData() {
        this.dataStorageService.fetchRecipesData().subscribe((recipes) => {
            console.log(recipes);
        });
    }
    onSaveIngredientsData() {
        this.dataStorageService.storeShoppingList();
    }
    onFetchIngredientsData() {
        this.dataStorageService.fetchShoppinglistData().subscribe(res => {
            console.log(res);
        })
    }



}