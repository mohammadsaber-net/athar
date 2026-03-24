export type WakafatFormData = {
  aya: string;
  ayaSource: string;
  tafsir: string;
  tafsirSource?: string|null;
};
export type WakafatType =WakafatFormData &{id:string}
export type comments={
  id:string,
  userId:string|null,
  wakafatId:string,
  createdAt:Date|null,
  comment:String,
  user:{
    firstName:string,
    lastName:string,
  }|null
}
export type WakafatTypeWithComments =WakafatType & { comments:comments[] }
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