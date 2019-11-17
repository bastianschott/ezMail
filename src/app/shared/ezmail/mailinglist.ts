/**
 * Alle Daten einer Mailinglist sind hier vorhanden.
 */
export interface Mailinglist {
  verteilerId: string;
  userId: string;
  verteilerName: string;
  verteilerMail: string;
  mailadressen: string[];
  eigentuemer: string;
  privateListe: boolean;
  moderierteListe: boolean;
  timeCreated: number;
  timeModified: number;
}

/**
 * Vorlage einer Mailinglist. Beinhaltet weniger Variablen als eine vollständige Mailinglist.
 */
export interface MailinglistTemplate {
  verteilerName: string;
  verteilerMail: string;
  mailadressen: string[];
  eigentuemer: string;
  privateListe: boolean;
  moderierteListe: boolean;
}
