import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Url } from "./Url";

@Entity()
export class User {
   @PrimaryGeneratedColumn()
   id: number

   @Column("text", { nullable: false })
   name: string

   @Column("text", { nullable: false })
   email: string

   @Column("text")
   password: string

   @Column("boolean", { default: false, nullable: false })
   isVerified: boolean

   @Column("text", { nullable: false })
   verificationCode: string

   @OneToMany(() => Url, urls => urls.user)
   urls: Url[]
}