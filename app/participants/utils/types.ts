export interface OrganisationTypes {
    id: string;
    name: string;
    website: string;
    logo: string;
    type: string;
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
  