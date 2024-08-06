import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import {Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm"
import { Tema } from "../../tema/entities/tema.entity";
import { Usuario } from "../../usuario/entities/usuario.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity ({name: "tb_postagens"})
export class Postagem {
    
    @ApiProperty() 
    @PrimaryGeneratedColumn() //chave primaria Autoincremental
    id : number

    @ApiProperty() 
    @Transform(({ value }: TransformFnParams) => value?.trim())//bloquear apenas espaços em branco
    @IsNotEmpty() //não aceitar titulo vazio
    @Column ({length: 100, nullable: false })
        titulo: string

     @ApiProperty() 
     @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Column({length: 1000, nullable: false })
        texto: string

    @ApiProperty() 
    @UpdateDateColumn() //Data e Hora são preenchidas automaticamente
    data: Date;

    //Muitos pra Um, Muitas postagens, possuem um tema
    @ApiProperty({ type: () => Tema }) 
    @ManyToOne(() => Tema, (tema) => tema. postagem, {
        onDelete: "CASCADE"
    })
    tema: Tema;

    @ApiProperty({ type: () => Usuario })  
    @ManyToOne(() => Usuario, (usuario) => usuario. postagem, {
        onDelete: "CASCADE"
    })
    usuario: Usuario;
    
}