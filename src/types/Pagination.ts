export class Pagination {
    sortBy: string|null
    descending: boolean
    itemsPerPage: number
    constructor(pagination: any){
        this.sortBy = (typeof pagination.sortBy !== 'undefined') ? pagination.sortBy : null
        this.descending = (typeof pagination.descending !== 'undefined') ? pagination.descending : false
        this.itemsPerPage = (typeof pagination.itemsPerPage !== 'undefined') ? pagination.itemsPerPage : 25
    }
}