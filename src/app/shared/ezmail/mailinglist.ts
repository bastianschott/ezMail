export interface Mailinglist {
  verteilerId: string;
  userId: string;
  verteilerName: string;
  verteilerMail: string;
  mailadressen: string;
  eigentuemer: string;
  privateListe: boolean;
  moderierteListe: boolean;
  timeCreated: number;
  timeModified: number;
}

export interface MailinglistBlueprint {
  verteilerName: string;
  verteilerMail: string;
  mailadressen: string;
  eigentuemer: string;
  privateListe: boolean;
  moderierteListe: boolean;
}
