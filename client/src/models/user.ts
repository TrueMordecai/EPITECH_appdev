export class User {
    constructor (
        public id: number = 0,
        public email: string = '',
    ) {

    }

    get name() {
        return this.email + ' ID : ' + this.id
    }
}