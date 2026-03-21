import { text, timestamp } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";
import { createSelectSchema } from "drizzle-zod";
export const heroTable=pgTable("hero",{
    id:text("id").primaryKey(),
    aya:text("aya").notNull(),
    ayaSource:text("aya_source").notNull(),
    hadith:text("hadith").notNull(),
    hadithSource:text("hadith_source").notNull()
})
export const heroTableZodSchema=createSelectSchema(heroTable)
export const wakafatTable=pgTable("wakafat",{
    id:text("id").primaryKey(),
    aya:text("aya").notNull(),
    ayaSource:text("aya_source").notNull(),
    tafsir:text("tafsir").notNull(),
    tafsirSource:text("tafsir_source")
})
export const wakafatTableZodSchema=createSelectSchema(wakafatTable)
export const sunnaTable=pgTable("sunna",{
    id:text("id").primaryKey(),
    sunna:text("sunna").notNull(),
    sunnaSource:text("sunna_source").notNull(),
    tafsir:text("tafsir")
})
export const sunnaTableZodSchema=createSelectSchema(sunnaTable)
export const namesTable=pgTable("names",{
    id:text("id").primaryKey(),
    name:text("name").notNull(),
    image:text("image").notNull(),
    meaning:text("meaning").notNull(),
    meaningSource:text("meaning_source")
})
export const namesTableZodSchema=createSelectSchema(namesTable)
export const usersTable=pgTable("users",{
    id:text("id").primaryKey(),
    firstName:text("first_name").notNull(),
    lastName:text("last_name").notNull(),
    password:text("password").notNull(),
    email:text("email").notNull().unique(),
    phone:text("phone").notNull(),
    role:text("role").default("user"),
    createdAt:timestamp("created_at").defaultNow()
})
export const userTableZodSchema=createSelectSchema(usersTable)