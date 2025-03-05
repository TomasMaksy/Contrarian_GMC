export interface OrganisationTypes {
    id: string;
    name: string;
    representative: string;
    title: string;
    website: string;
    logo: string;
  }
  
  export interface Meeting {
    id: string;
    companyFrom: string;
    companyTo: string;
    time: string;
    date: string;
    location: string;
  }
  
  export interface Timetable {
    companyId: string;
    meetings: Meeting[];
  }
  