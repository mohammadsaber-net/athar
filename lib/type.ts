export type WakafatFormData = {
  aya: string;
  ayaSource: string;
  tafsir: string;
  tafsirSource: string;
};
export type WakafatType =WakafatFormData &{id:string}
export type HeroFormData = {
  aya: string;
  ayaSource: string;
  hadith: string;
  hadithSource: string;
};
export type HeroType =HeroFormData &{id:string}
export type NamesFormData = {
  name: string;
  image: File | null;
  meaning: string;
  meaningSource: string;
};
export type NamesType =NamesFormData &{id:string}
export type SunnaFormData = {
  sunna: string;
  sunnaSource: string;
  tafsir: string;
};
export type SunnaType =SunnaFormData &{id:string}