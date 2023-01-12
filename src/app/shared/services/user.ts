export class User {

    constructor(
        public email: string,
        public id: string,
        private _token: string,
        private _tokenExpersionDate: Date
    ) { }

    get token() {
        if (!this._tokenExpersionDate || new Date > this._tokenExpersionDate) {
            return null;
        }
        return this._token;
    }
}

