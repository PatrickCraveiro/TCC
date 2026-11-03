export function somenteDigitos(valor: string) {
  return valor.replace(/\D/g, "");
}

// CNPJ pode ser alfanumérico (IN RFB 2.229/2024): 12 caracteres [0-9A-Z] + 2 dígitos verificadores.
export function normalizarCNPJ(valor: string) {
  return valor.toUpperCase().replace(/[^0-9A-Z]/g, "");
}

function dvCPF(base: string) {
  let soma = 0;
  for (let i = 0; i < base.length; i++) soma += Number(base[i]) * (base.length + 1 - i);
  const resto = (soma * 10) % 11;
  return resto === 10 ? 0 : resto;
}

export function digitosVerificadoresCPF(base9: string) {
  const d1 = dvCPF(base9);
  return `${d1}${dvCPF(base9 + d1)}`;
}

export function cpfValido(valor: string) {
  const cpf = somenteDigitos(valor);
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
  return digitosVerificadoresCPF(cpf.slice(0, 9)) === cpf.slice(9);
}

function dvCNPJ(base: string) {
  const pesos = base.length === 12
    ? [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
    : [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  // O valor de cada caractere é o código ASCII menos 48 ("0" = 0, "A" = 17).
  const soma = [...base].reduce((acc, c, i) => acc + (c.charCodeAt(0) - 48) * pesos[i], 0);
  const resto = soma % 11;
  return resto < 2 ? 0 : 11 - resto;
}

export function digitosVerificadoresCNPJ(base12: string) {
  const d1 = dvCNPJ(base12);
  return `${d1}${dvCNPJ(base12 + d1)}`;
}

export function cnpjValido(valor: string) {
  const cnpj = normalizarCNPJ(valor);
  if (!/^[0-9A-Z]{12}\d{2}$/.test(cnpj) || /^(\d)\1{13}$/.test(cnpj)) return false;
  return digitosVerificadoresCNPJ(cnpj.slice(0, 12)) === cnpj.slice(12);
}

export function formatarCPF(valor: string) {
  const d = somenteDigitos(valor).slice(0, 11);
  return d
    .replace(/^(\d{3})(\d)/, "$1.$2")
    .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d{1,2})$/, ".$1-$2");
}

export function formatarCNPJ(valor: string) {
  const c = normalizarCNPJ(valor).slice(0, 14);
  return c
    .replace(/^(\w{2})(\w)/, "$1.$2")
    .replace(/^(\w{2})\.(\w{3})(\w)/, "$1.$2.$3")
    .replace(/\.(\w{3})(\w)/, ".$1/$2")
    .replace(/(\w{4})(\w{1,2})$/, "$1-$2");
}

export function formatarCEP(valor: string) {
  return somenteDigitos(valor).slice(0, 8).replace(/^(\d{5})(\d)/, "$1-$2");
}

export function iniciais(nome: string) {
  const partes = nome.trim().split(/\s+/);
  const primeira = partes[0]?.[0] ?? "";
  const ultima = partes.length > 1 ? partes[partes.length - 1][0] : "";
  return (primeira + ultima).toUpperCase();
}

export function escaparRegex(texto: string) {
  return texto.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
