export class User {
    constructor(
        public email: string,
        public id: string,
        private _token: string,
        private _refreshToken: Date
    ) {

    }


    get token() {
        if (!this._refreshToken || new Date() > this._refreshToken) {
            return null;
        }
        return this._token;
    }
}

