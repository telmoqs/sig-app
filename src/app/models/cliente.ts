import { Pessoa } from "./pessoa";

export class Cliente {
    id: number;
    email: string;
    permiteEnvioEmail: boolean;
    pessoa: Pessoa;
}
