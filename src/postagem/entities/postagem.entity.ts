import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import {Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm"

@Entity ({name: "tb_postagens"})
export class Postagem {
    @PrimaryGeneratedColumn() //chave primaria Autoincremental
    id : number

    @Transform(({ value }: TransformFnParams) => value?.trim())//bloquear apenas espaços em branco
    @IsNotEmpty() //não aceitar titulo vazio
    @Column ({length: 100, nullable: false })
        titulo: string

        @Transform(({ value }: TransformFnParams) => value?.trim())
        @IsNotEmpty()
    @Column({length: 1000, nullable: false })
        texto: string

    @UpdateDateColumn() //Data e Hora são preenchidas automaticamente
    data: Date
    
}