import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinTable } from "typeorm";
import { User } from "./User";

@Entity()
export class Url {
   @PrimaryGeneratedColumn()
   id: number

   @Column("text", { nullable: false })
   originalUrl: string

   @Column("text", { nullable: false })
   shortUrl: string

   @Column("int", { nullable: false })
   userId: number

   @Column("boolean", { default: true, nullable: false }) 
   isActive: boolean

   @ManyToOne(() => User, user => user.urls)
   @JoinTable({ name: "userId" })
   user: User
}