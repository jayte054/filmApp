export interface PurchaseObject {
    title: string;
    film_Id: string; 
    price: string;
    status: PaidStatus;
    date: string;
}

export enum PaidStatus {
    paid = "paid",
    not_paid = "not_paid"
}