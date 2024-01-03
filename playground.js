function printTime() {
  return new Date().toISOString().substring(11);
}

async function funcaoDemorada(nome) {
  await null;
  console.time(nome);
  for (let i = 0; i < 3000000000; i++) {}
  console.timeEnd(nome);
  console.log(printTime());
  return 'Fim!';
}

async function executar() {
  console.log('Começou!!');
  console.time('Tempo Total');
  const return1 = funcaoDemorada('Execução 01');
  const return2 = funcaoDemorada('Execução 02');
  console.log(return1);
  console.timeEnd('Tempo Total');
  console.log(printTime());
}

executar();