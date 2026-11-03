"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import { excluirClinica, salvarClinica } from "@/actions/clinicas";
import type { ClinicaDTO } from "@/lib/data/clinicas";
import { formatarCEP, formatarCNPJ } from "@/lib/format";
import { useFormAction } from "@/components/form/use-form-action";
import { InputMascara } from "@/components/form/input-mascara";
import { MensagemForm } from "@/components/form/mensagem-form";
import { Campo } from "@/components/form/campo";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function ClinicaDialog({ clinica }: { clinica?: ClinicaDTO }) {
  const [aberto, setAberto] = useState(false);
  return (
    <Dialog open={aberto} onOpenChange={setAberto}>
      <DialogTrigger asChild>
        {clinica ? (
          <Button variant="ghost" size="icon-sm" title="Editar">
            <Pencil />
            <span className="sr-only">Editar {clinica.nome}</span>
          </Button>
        ) : (
          <Button>
            <Plus /> Nova clínica
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{clinica ? "Editar clínica" : "Nova clínica"}</DialogTitle>
          <DialogDescription>Os pacientes verão o nome e o endereço ao agendar.</DialogDescription>
        </DialogHeader>
        <FormClinica clinica={clinica} aoSalvar={() => setAberto(false)} />
      </DialogContent>
    </Dialog>
  );
}

// Fica dentro do DialogContent para o estado do formulário zerar a cada abertura.
function FormClinica({ clinica, aoSalvar }: { clinica?: ClinicaDTO; aoSalvar: () => void }) {
  const { estado, pendente, onSubmit, erro } = useFormAction(salvarClinica, {
    aoConcluir: (e) => {
      toast.success(e?.mensagem);
      aoSalvar();
    },
  });

  return (
    <form onSubmit={onSubmit} noValidate>
      {clinica && <input type="hidden" name="id" value={clinica.id} />}
      <FieldGroup className="gap-4">
        <MensagemForm estado={estado} />
        <Campo nome="nome" rotulo="Nome" erro={erro("nome")}>
          <Input id="nome" name="nome" defaultValue={clinica?.nome} aria-invalid={!!erro("nome")} />
        </Campo>
        <div className="grid gap-4 sm:grid-cols-[1.4fr_1fr]">
          <Campo nome="cnpj" rotulo="CNPJ" erro={erro("cnpj")}>
            <InputMascara
              id="cnpj"
              name="cnpj"
              mascara={formatarCNPJ}
              defaultValue={clinica?.cnpj}
              placeholder="00.000.000/0000-00"
              aria-invalid={!!erro("cnpj")}
            />
          </Campo>
          <Campo nome="cep" rotulo="CEP" erro={erro("cep")}>
            <InputMascara
              id="cep"
              name="cep"
              mascara={formatarCEP}
              defaultValue={clinica?.cep}
              placeholder="00000-000"
              inputMode="numeric"
              aria-invalid={!!erro("cep")}
            />
          </Campo>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Campo nome="bairro" rotulo="Bairro" erro={erro("bairro")}>
            <Input id="bairro" name="bairro" defaultValue={clinica?.bairro} aria-invalid={!!erro("bairro")} />
          </Campo>
          <Campo nome="cidade" rotulo="Cidade" erro={erro("cidade")}>
            <Input id="cidade" name="cidade" defaultValue={clinica?.cidade} aria-invalid={!!erro("cidade")} />
          </Campo>
        </div>
      </FieldGroup>
      <DialogFooter className="mt-6">
        <DialogClose asChild>
          <Button type="button" variant="outline">
            Cancelar
          </Button>
        </DialogClose>
        <Button type="submit" disabled={pendente}>
          {pendente && <Loader2 className="animate-spin" />}
          {clinica ? "Salvar alterações" : "Cadastrar clínica"}
        </Button>
      </DialogFooter>
    </form>
  );
}


export function ExcluirClinica({ clinica }: { clinica: ClinicaDTO }) {
  const [pendente, iniciar] = useTransition();

  function confirmar() {
    iniciar(async () => {
      const resultado = await excluirClinica(clinica.id);
      if (resultado?.ok) toast.success(resultado.mensagem);
      else toast.error(resultado?.mensagem ?? "Não foi possível excluir.");
    });
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon-sm" title="Excluir" disabled={pendente}>
          {pendente ? <Loader2 className="animate-spin" /> : <Trash2 />}
          <span className="sr-only">Excluir {clinica.nome}</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Excluir {clinica.nome}?</AlertDialogTitle>
          <AlertDialogDescription>
            Só é possível excluir clínicas sem funcionários e sem consultas vinculadas. Essa ação
            não pode ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction variant="destructive" onClick={confirmar}>
            Excluir
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
