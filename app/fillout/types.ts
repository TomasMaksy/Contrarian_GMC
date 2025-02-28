import investors from "./investors";
import startups from "./startups";



export type OrgProps = {
    title: string;
    value: string;
    type: number;
  };
  
  export const organisations: OrgProps[] = [...investors, ...startups].sort((a, b) =>
    a.title.localeCompare(b.title)
  );
  
  export interface PreferencesFormProps {
    excludedOrg: FormOrgType;
    preferences: string[];
    setPreference: (index: number, value: string) => void;
    className?: string;
  }

  export interface BackupFormProps {
    preferences: string[];
    excludedOrg: FormOrgType;
    backups: string[];
    setBackup: (index: number, value: string) => void;
    className?: string;
  }


  export type FormOrgType =
    | (typeof investors)[number]["value"]
    | (typeof startups)[number]["value"]
    | undefined;
  
  export type IdentifactionFormProps = React.HTMLAttributes<HTMLFormElement> & {
    idName: string;
    setFormName: (value: string) => void;
    idEmail: string;
    setFormEmail: (value: string) => void;
    idOrg: FormOrgType;
    setFormOrg: (value: string) => void;
  };



  