export interface Campaign {
    patient: string;
    sex: string;
    bloode_type:string;
    type_of_donation:string;
    age:string;
    number_of_donors:number;
    donor_received:number;
    city:string;
    comment:string;
    hospital_fk:string;
    hospital_name:string;
    user_fk:string;
    id?:string;
}
