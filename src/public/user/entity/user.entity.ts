import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { UserTable } from "../constants/user.table";

@Entity(UserTable.TABLE_NAME)
export class UserEntity {

    @PrimaryColumn({ name: UserTable.TABLE_COLUMN_USER_ID, type: "uuid" })
    public readonly userId: string;

    @Column({ name: UserTable.TABLE_COLUMN_USERNAME, type: "text", nullable: false })
    public username: string;

    @Column({ name: UserTable.TABLE_COLUMN_EMAIL, type: "text", unique: true, nullable: false })
    public email: string;

    @Column({ name: UserTable.TABLE_COLUMN_PASSWORD, type: "text", nullable: false })
    public password: string;

    @Column({ name: UserTable.TABLE_COLUMN_FIRST_NAME, type: "text", nullable: false })
    public firstName: string;

    @Column({ name: UserTable.TABLE_COLUMN_LAST_NAME, type: "text", nullable: false })
    public lastName: string;

    @Column({ name: UserTable.TABLE_COLUMN_ACCESS_TOKEN, type: "text", unique: true, default: null })
    public accessToken: string;

    @Column({ name: UserTable.TABLE_COLUMN_REFRESH_TOKEN, type: "text", unique: true, default: null })
    public refreshToken: string;

    @UpdateDateColumn({ name: UserTable.TABLE_COLUMN_UPDATED_AT, type: "date", nullable: false })
    public updatedAt: Date;

    @CreateDateColumn({ name: UserTable.TABLE_COLUMN_CREATED_AT, type: "date", nullable: false })
    public createdAt: Date;

}