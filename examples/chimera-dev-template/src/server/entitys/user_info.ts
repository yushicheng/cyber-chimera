/* eslint-disable */
import {PrimaryGeneratedColumn,Column,Entity} from "typeorm";

@Entity({database:"user",name:"userinfo"})
export class UserInfoEntity {
  
  @PrimaryGeneratedColumn({
    comment:"用户ID"
  })
  user_id:number|undefined;

  @Column({
    type:"varchar",
    length:12,
    nullable: false,
    comment:"用户名"
  })
  username:string|undefined;

  @Column({
    type: "varchar",
    length: 32,
    nullable: false,
    comment: "密码的MD5值"
  })
  password:string|undefined;

};