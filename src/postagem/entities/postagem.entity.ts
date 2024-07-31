import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import {Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm"
import { Tema } from "../../tema/entities/tema.entity";
import { Usuario } from "../../usuario/entities/usuario.entity";

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
    data: Date;

    //Muitos pra Um, Muitas postagens, possuem um tema
    @ManyToOne(() => Tema, (tema) => tema. postagem, {
        onDelete: "CASCADE"
    })
    tema: Tema;

    @ManyToOne(() => Usuario, (usuario) => usuario. postagem, {
        onDelete: "CASCADE"
    })
    usuario: Usuario;
    
}