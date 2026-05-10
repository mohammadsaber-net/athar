
import { relations } from "drizzle-orm";
import { text,integer,boolean, timestamp } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
// hero
export const heroTable=pgTable("hero",{
    id:text("id").primaryKey(),
    aya:text("aya").notNull(),
    ayaSource:text("aya_source").notNull(),
    hadith:text("hadith").notNull(),
    hadithSource:text("hadith_source").notNull()
})
export const heroTableZodSchema=createSelectSchema(heroTable)
// users
export const usersTable=pgTable("users",{
    id:text("id").primaryKey(),
    userName:text("user_name").notNull().unique(),
    displayName:text("display_name").notNull(),
    password:text("password").notNull(),
    email:text("email").notNull().unique(),
    phone:text("phone").notNull(),
    role:text("role").default("user"),
    createdAt:timestamp("created_at").defaultNow()
})
export const userTableZodSchema=createSelectSchema(usersTable)
// wakafat
export const wakafatTable=pgTable("wakafat",{
    id:text("id").primaryKey(),
    aya:text("aya").notNull(),
    ayaSource:text("aya_source").notNull(),
    tafsir:text("tafsir").notNull(),
    tafsirSource:text("tafsir_source")
})
export const wakafatTableZodSchema=createSelectSchema(wakafatTable)
// names
export const namesTable=pgTable("names",{
    id:text("id").primaryKey(),
    name:text("name").notNull(),
    image:text("image").notNull(),
    meaning:text("meaning").notNull(),
    meaningSource:text("meaning_source")
})
export const namesTableZodSchema=createSelectSchema(namesTable)
// sunna
export const sunnaTable=pgTable("sunna",{
    id:text("id").primaryKey(),
    sunna:text("sunna").notNull(),
    sunnaSource:text("sunna_source").notNull(),
    tafsir:text("tafsir")
})
export const sunnaTableZodSchema=createSelectSchema(sunnaTable)
// comments
export const commentsTable=pgTable("commentsTable",{
    id:text("id").primaryKey(),
    comment:text("comment").notNull(),
    parentCommentId:text("parent_comment_id"),
    targetType:text("target_type").notNull(),
    createdAt:timestamp("created_at").defaultNow(),
    targetId: text("target_id").notNull(),
    userId: text("user_id").references(()=>usersTable.id,{
        onDelete:"cascade"
    }).notNull()
})
export const commentTableZodSchema=createInsertSchema(commentsTable)
// likes
export const likesTable = pgTable("likes", {
  id: text("id").primaryKey(),
  userId: text("user_id").references(()=>usersTable.id,{
    onDelete:"cascade"
  }).notNull(),
  commentId: text("comment_id").references(()=>commentsTable.id,{
    onDelete:"cascade"
  }).notNull(),
  articleId:text("article_Id").notNull(), 
  targetType: text("target_type").notNull(), 
})
export const likesTableZodSchema=createSelectSchema(likesTable)
export const likesUserCommentsRelation=relations(likesTable,({one})=>({
  user:one(usersTable,{
    fields:[likesTable.userId],
    references:[usersTable.id]
  }),
  comment:one(commentsTable,{
    fields:[likesTable.commentId],
    references:[commentsTable.id]
  })
}))
// mentions 
export const mentionsTable = pgTable("mentions", {
  id: text("id").primaryKey(),
  commentId: text("comment_id").references(()=>commentsTable.id,{
    onDelete:"cascade"
  }).notNull(),
  mentionedUserId: text("mentioned_user_id")
    .references(() => usersTable.id, {
      onDelete: "cascade",
    })
    .notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
export const mentionsTableZodSchema=createSelectSchema(mentionsTable)

// messages
export const messageTable=pgTable("messageTable",{
    id:text("id").primaryKey(),
    name:text("name").notNull(),
    email:text("email").notNull(),
    phone: text("phone"),
    message:text("message").notNull(),
})
export const messageTableZodSchema=createSelectSchema(messageTable)
// notifications
export const notificationsTable = pgTable("notifications", {
  id: text("id").primaryKey(),
  receiverId: text("receiver_id")
    .references(() => usersTable.id, { onDelete: "cascade" })
    .notNull(),
  senderId: text("sender_id")
    .references(() => usersTable.id, { onDelete: "set null" }),
  type: text("type").notNull(), 
  contentId: text("content_id"), 
  contentType: text("content_type"), 
  content: text("content"), 
  isRead: boolean("is_read").default(false), 
  createdAt: timestamp("created_at").defaultNow(),
});
// relations
// mentions relations
export const mentionsUsersCommentsRelations=relations(mentionsTable,({one})=>({
  user:one(usersTable,{
    fields:[mentionsTable.mentionedUserId],
    references:[usersTable.id]
  }),
  comment:one(commentsTable,{
    fields:[mentionsTable.commentId],
    references:[commentsTable.id]
  })
}))
// notificions relations
export const notificationsRelations=relations(notificationsTable,({one})=>({
  receiver:one(usersTable,{
    fields:[notificationsTable.receiverId],
    references:[usersTable.id]
  }),
  sender:one(usersTable,{
    fields:[notificationsTable.senderId],
    references:[usersTable.id]
  })
}))
// users relations
export const usersCommentsRelations = relations(usersTable, ({ many }) => ({
  comments: many(commentsTable),
  likes:many(likesTable),
  mention:many(mentionsTable),
  notifications:many(notificationsTable)
}));
// comments relations
export const commentsRelations = relations(commentsTable, ({ one, many }) => ({
  user: one(usersTable, {
    fields: [commentsTable.userId],
    references: [usersTable.id],
  }),
  likes: many(likesTable),
  mentions: many(mentionsTable),
}));

// export const wakafatCommentTable=pgTable("wakafatComment",{
//     id:text("id").primaryKey(),
//     comment:text("comment").notNull(),
//     parentCommentId:text("parent_comment_id"),
//     likes: integer("likes").default(0),
//     createdAt:timestamp("created_at").defaultNow(),
//     wakafatId: text("wakafat_id").references(()=>wakafatTable.id,{
//         onDelete:"cascade"
//     }).notNull(),
//     userId: text("user_id").references(()=>usersTable.id,{
//         onDelete:"set null"
//     })
// })
// export const wakafatCommentTableZodSchema=createInsertSchema(wakafatCommentTable)
// export const wakafatRelations = relations(wakafatTable, ({ many }) => ({
//   comments: many(wakafatCommentTable),
// }));
// export const wakafatCommentRelations = relations(
//   wakafatCommentTable,
//   ({ one }) => ({
//     wakafat: one(wakafatTable, {
//       fields: [wakafatCommentTable.wakafatId],
//       references: [wakafatTable.id],
//     }),
//     user: one(usersTable, {
//       fields: [wakafatCommentTable.userId],
//       references: [usersTable.id],
//     }),
//   })
// );


// export const sunnaCommentTable=pgTable("sunnaComment",{
//     id:text("id").primaryKey(),
//     likes: integer("likes").default(0),
//     parentCommentId:text("parent_comment_id"),
//     comment:text("comment").notNull(),
//     createdAt:timestamp("created_at").defaultNow(),
//     sunnaId: text("sunna").references(()=>sunnaTable.id,{
//         onDelete:"cascade"
//     }).notNull(),
//     userId: text("user_id").references(()=>usersTable.id,{
//         onDelete:"set null"
//     })
// })
// export const sunnaCommentTableZodSchema=createInsertSchema(sunnaCommentTable)
// export const sunnaRelations=relations(sunnaTable,({many})=>({
//   comment:many(sunnaCommentTable)
// }))
// export const sunnaCommentRelations=relations(sunnaCommentTable,({one})=>({
//   sunna:one(sunnaTable,{
//     fields:[sunnaCommentTable.sunnaId],
//     references:[sunnaTable.id]
//   }),
//   user:one(usersTable,{
//     fields:[sunnaCommentTable.userId],
//     references:[usersTable.id]
//   })
// }))

// export const namesCommentTable=pgTable("namesComment",{
//     id:text("id").primaryKey(),
//     comment:text("comment").notNull(),
//     parentCommentId:text("parent_comment_id"),
//     likes: integer("likes").default(0),
//     createdAt:timestamp("created_at").defaultNow(),
//     nameId: text("nameId").references(()=>namesTable.id,{
//         onDelete:"cascade"
//     }).notNull(),
//     userId: text("user_id").references(()=>usersTable.id,{
//         onDelete:"set null"
//     })
// })
// export const namesCommentTableZodSchema=createInsertSchema(namesCommentTable)
// export const nameRelations=relations(namesTable,({many})=>({
//   comment:many(namesCommentTable)
// }))
// export const namesCommentRelations=relations(namesCommentTable,({one})=>({
//   sunna:one(namesTable,{
//     fields:[namesCommentTable.nameId],
//     references:[namesTable.id]
//   }),
//   user:one(usersTable,{
//     fields:[namesCommentTable.userId],
//     references:[usersTable.id]
//   })
// }))
// export const usersRelations = relations(usersTable, ({ many }) => ({
//   wakafatComments: many(wakafatCommentTable),
//   sunnaComments: many(sunnaCommentTable),
//   namesComments: many(namesCommentTable),
// }));





// export const usersAndCommentsMentionsTable = relations(mentionsTable, ({ many }) => ({
//   wakafatComments: many(wakafatCommentTable),
//   sunnaComments: many(sunnaCommentTable),
//   namesComments: many(namesCommentTable),
//   mentionedUserId: many(usersTable),
// }));