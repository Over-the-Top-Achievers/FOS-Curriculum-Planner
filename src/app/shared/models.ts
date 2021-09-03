export interface Course {
    //look u model view controller mvc
    _id : string;
    Course_Code: string;
    Course_Name: string;
    Credits: string;
    NQF: string;
    Slot: string;
    Semester: string;
    Year: string;
    Co_requisite: string;
    Pre_requisite: string;
    Shareable: string;
}

export interface Subject{
    _id: string;
    Subject: string;
    Level_100_90: string;
    Level_89_80: string;
    Level_79_70: string;
    Level_69_60: string;
    Level_59_50: string;
    Level_49_40: string;
    Level_39_30: string;
    Level_29_0: string;
}

export interface DegreeRequirement{
    _id: string,
    Degree_Name: string,
    Firm_Offer: string,
    Waitlist: string,
    Reject: string,
}

export interface DegreeName {
    _id:string;
    Degree_Name:string;
    Firm_Offer:string;
    Waitlist:string;
    Reject:string;
};
