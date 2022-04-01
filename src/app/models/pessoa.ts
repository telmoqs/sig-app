import { PessoaFisica } from "./pessoaFisica";

export class Pessoa {
    id: number;
    nomeMae: string;
    nomePai: string;
    rg: string;
    orgaoEmissor: string;
    dataExpedicao: Date;
    pessoa_fisica?: PessoaFisica;
};