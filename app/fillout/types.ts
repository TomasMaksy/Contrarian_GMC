export type OrgProps = {
  name: string;
  id: string;
  logo: string;
  type: string;
  fundraising: string;
  stage: string;
};

export interface PreferencesFormProps {
  excludedOrg: FormOrgType;
  preferences: string[];
  setPreference: (index: number, value: string) => void;
  className?: string;
  startups: OrgProps[],
  investors: OrgProps[]
}

export interface BackupFormProps {
  preferences: string[];
  excludedOrg: FormOrgType;
  backups: string[];
  setBackup: (index: number, value: string) => void;
  className?: string;
  startups: OrgProps[];
  investors: OrgProps[];
}

// FormOrgType now accepts any dynamically fetched organisation ID
export type FormOrgType = string | undefined;

export type IdentifactionFormProps = React.HTMLAttributes<HTMLFormElement> & {
  idName: string;
  setFormName: (value: string) => void;
  idEmail: string;
  setFormEmail: (value: string) => void;
  idOrg: FormOrgType;
  setFormOrg: (value: string) => void;
  startups: OrgProps[];
  investors: OrgProps[];
  type: string;
  setFormType: (value: string) => void;
};