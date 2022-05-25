import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ClienteService } from 'app/services/cliente.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

interface EnumSimNao {
  value: string;
  viewValue: string;
}

interface EnumTipoPessoa {
  value: string;
  viewValue: string;
}

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {

  products = [];
  destroy$: Subject<boolean> = new Subject<boolean>();

  isLinear = false;

  matcher = new MyErrorStateMatcher();

  listaEnumSimNao: EnumSimNao[] = [
    { value: 'S', viewValue: 'Sim' },
    { value: 'N', viewValue: 'Não' },
  ];

  listaEnumTipoPessoa: EnumTipoPessoa[] = [
    { value: 'PF', viewValue: 'Pessoa Física' },
    { value: 'PJ', viewValue: 'Pessoa Jurídica' },
  ];

  constructor(private fb: FormBuilder, private clienteService: ClienteService) { }


  clienteForm = this.fb.group({
    email: ['', Validators.required, Validators.email],
    permiteRecebimentoEmail: [this.listaEnumSimNao[1].value],
    tipoPessoa: [this.listaEnumTipoPessoa[0].value],
    enderecoCompleto: ['', Validators.required],
    pessoaFisica: this.fb.group({
      nomeCompleto: ['', Validators.required],
      cpf: ['', Validators.required],
    }),
    pessoaJuridica: this.fb.group({
      razaoSocial: ['', Validators.required],
      cnpj: ['', Validators.required],
    }),
    endereco: this.fb.group({
      logradouro: ['', Validators.required],
      cep: ['', Validators.required],
    }),
    aliases: this.fb.array([
      this.fb.control('')
    ])
  });

  ngOnInit() {
    this.clienteService.sendGetRequest().pipe(takeUntil(this.destroy$)).subscribe((data: any[]) => {
      console.log(data);
      this.products = data;
    })
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }

  get aliases() {
    return this.clienteForm.get('aliases') as FormArray;
  }

  salvar() {
    this.clienteForm.patchValue({
      firstName: 'Nancy',
      address: {
        street: '123 Drew Street'
      }
    });
  }

  addAlias() {
    this.aliases.push(this.fb.control(''));
  }

  onSubmit() {
    console.log(this.clienteForm.value);
    this.clienteService.save();
  }
}