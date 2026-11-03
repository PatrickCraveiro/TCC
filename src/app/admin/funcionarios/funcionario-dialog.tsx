"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import { excluirFuncionario, salvarFuncionario } from "@/actions/funcionarios";
import type { FuncionarioDTO } from "@/lib/data/funcionarios";
import { CARGOS } from "@/lib/constants";
import { formatarCPF } from "@/lib/format";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type OpcaoClinica = { id: string; nome: string };

export function FuncionarioDialog({
  funcionario,
  clinicas,
}: {
  funcionario?: FuncionarioDTO;
  clinicas: OpcaoClinica[];
}) {
  const [aberto, setAberto] = useState(false);
  return (
    <Dialog open={aberto} onOpenChange={setAberto}>
      <DialogTrigger asChild>
        {funcionario ? (
          <Button variant="ghost" size="icon-sm" title="Editar">
            <Pencil />
            <span className="sr-only">Editar {funcionario.nome}</span>
          </Button>
        ) : (
          <Button disabled={!clinicas.length} title={clinicas.length ? undefined : "Cadastre uma clínica antes"}>
            <Plus /> Novo funcionário
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{funcionario ? "Editar funcionário" : "Novo funcionário"}</DialogTitle>
          <DialogDescription>Vincule o colaborador à clínica onde ele trabalha.</DialogDescription>
        </DialogHeader>
        <FormFuncionario funcionario={funcionario} clinicas={clinicas} aoSalvar={() => setAberto(false)} />
      </DialogContent>
    </Dialog>
  );
}

function FormFuncionario({
  funcionario,
  clinicas,
  aoSalvar,
}: {
  funcionario?: FuncionarioDTO;
  clinicas: OpcaoClinica[];
  aoSalvar: () => void;
}) {
  const { estado, pendente, onSubmit, erro } = useFormAction(salvarFuncionario, {
    aoConcluir: (e) => {
      toast.success(e?.mensagem);
      aoSalvar();
    },
  });

  return (
    <form onSubmit={onSubmit} noValidate>
      {funcionario && <input type="hidden" name="id" value={funcionario.id} />}
      <FieldGroup className="gap-4">
        <MensagemForm estado={estado} />
        <Campo nome="nome" rotulo="Nome completo" erro={erro("nome")}>
          <Input id="nome" name="nome" defaultValue={funcionario?.nome} aria-invalid={!!erro("nome")} />
        </Campo>
        <div className="grid gap-4 sm:grid-cols-2">
          <Campo nome="cpf" rotulo="CPF" erro={erro("cpf")}>
            <InputMascara
              id="cpf"
              name="cpf"
              mascara={formatarCPF}
              defaultValue={funcionario?.cpf}
              placeholder="000.000.000-00"
              inputMode="numeric"
              aria-invalid={!!erro("cpf")}
            />
          </Campo>
          <Campo nome="email" rotulo="E-mail" erro={erro("email")}>
            <Input
              id="email"
              name="email"
              type="email"
              defaultValue={funcionario?.email}
              aria-invalid={!!erro("email")}
            />
          </Campo>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Campo nome="cargo" rotulo="Cargo" erro={erro("cargo")}>
            <Select name="cargo" defaultValue={funcionario?.cargo}>
              <SelectTrigger id="cargo" className="w-full" aria-invalid={!!erro("cargo")}>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                {CARGOS.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Campo>
          <Campo nome="dataContratacao" rotulo="Data de contratação" erro={erro("dataContratacao")}>
            <Input
              id="dataContratacao"
              name="dataContratacao"
              type="date"
              defaultValue={funcionario?.dataContratacao}
              aria-invalid={!!erro("dataContratacao")}
            />
          </Campo>
        </div>
        <Campo nome="clinicaId" rotulo="Clínica" erro={erro("clinicaId")}>
          <Select name="clinicaId" defaultValue={funcionario?.clinicaId || undefined}>
            <SelectTrigger id="clinicaId" className="w-full" aria-invalid={!!erro("clinicaId")}>
              <SelectValue placeholder="Selecione a clínica" />
            </SelectTrigger>
            <SelectContent>
              {clinicas.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.nome}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Campo>
      </FieldGroup>
      <DialogFooter className="mt-6">
        <DialogClose asChild>
          <Button type="button" variant="outline">
            Cancelar
          </Button>
        </DialogClose>
        <Button type="submit" disabled={pendente}>
          {pendente && <Loader2 className="animate-spin" />}
          {funcionario ? "Salvar alterações" : "Cadastrar funcionário"}
        </Button>
      </DialogFooter>
    </form>
  );
}


export function ExcluirFuncionario({ funcionario }: { funcionario: FuncionarioDTO }) {
  const [pendente, iniciar] = useTransition();

  function confirmar() {
    iniciar(async () => {
      const resultado = await excluirFuncionario(funcionario.id);
      if (resultado?.ok) toast.success(resultado.mensagem);
      else toast.error(resultado?.mensagem ?? "Não foi possível excluir.");
    });
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon-sm" title="Excluir" disabled={pendente}>
          {pendente ? <Loader2 className="animate-spin" /> : <Trash2 />}
          <span className="sr-only">Excluir {funcionario.nome}</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Excluir {funcionario.nome}?</AlertDialogTitle>
          <AlertDialogDescription>
            O cadastro será removido da {funcionario.clinicaNome}. Essa ação não pode ser desfeita.
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
