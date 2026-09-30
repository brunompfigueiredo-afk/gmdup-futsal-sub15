import React, { useState } from 'react';

export default function App() {
  const [view, setView] = useState<'landing' | 'login' | 'dashboard' | 'plantel' | 'stats' | 'analytics' | 'fisiologia' | 'ficha' | 'convocatoria' | 'treino' | 'clinico' | 'antropometria' | 'jogo' | 'pmc' | 'calendario' | 'update' | 'admin'>('landing');
  
  const [emailInput, setEmailInput] = useState('');
  const [passInput, setPassInput] = useState('');
  const [erroLogin, setErroLogin] = useState('');
  
  const [utilizadorLogado, setUtilizadorLogado] = useState<any>(null);
  const [atletaSelecionado, setAtletaSelecionado] = useState<any>(null);

  // Estados para ordenação de colunas em cada tabela
  const [ordenarColuna, setOrdenarColuna] = useState<string>('nome');
  const [direcaoOrdem, setDirecaoOrdem] = useState<'asc' | 'desc'>('asc');

  const [ordenarColunaPMC, setOrdenarColunaPMC] = useState<string>('nome');
  const [direcaoOrdemPMC, setDirecaoOrdemPMC] = useState<'asc' | 'desc'>('asc');

  const [ordenarColunaClinico, setOrdenarColunaClinico] = useState<string>('nome');
  const [direcaoOrdemClinico, setDirecaoOrdemClinico] = useState<'asc' | 'desc'>('asc');

  // Atletas convocados para o próximo jogo
  const [convocados, setConvocados] = useState<number[]>([5, 10, 18, 19, 22, 1, 4, 8, 12, 13, 15, 16, 17, 20]);

  // Histórico de Antropometria Temporal
  const [historicoAntropometria, sethistoricoAntropometria] = useState([
    { id: 1, data: "2026-09-01", atletaId: 1, atletaNome: "Agostinho", peso: 58.5, altura: 1.70, imc: 20.2, massaGorda: 11.5 },
    { id: 2, data: "2026-09-01", atletaId: 5, atletaNome: "Diogo", peso: 62.0, altura: 1.75, imc: 20.2, massaGorda: 10.8 },
  ]);

  const [novoRegisto, setNovoRegisto] = useState({
    data: new Date().toISOString().split('T')[0],
    atletaId: 1,
    peso: 60.0,
    altura: 1.72,
    massaGorda: 11.0
  });

  const [config, setConfig] = useState({
    teamName: "GMDUP - Futsal Sub-15",
    logoUrl: "https://i.ibb.co/vxxCK684/logo.png",
    bgImageUrl: "https://i.ibb.co/Xx1k7wdZ/fundo.png", 
    primaryColor: "#22c55e",
    cardColor: "rgba(15, 23, 42, 0.85)",
  });

  // Base de dados completa dos 22 atletas com os 21 parâmetros oficiais e PMC[cite: 1, 5]
  const [plantel, setPlantel] = useState([
    { id: 1, nome: "Agostinho", posicao: "Ala", nasc: "2011-03-12", idade: 15, pesoBase: 57.2, peso: 58.0, altura: 1.70, cmjBase: 40.0, cmj: 38.2, pa: "116/74", fcRep: 60, phvOffset: "+1.2", treinos: 12, minTreino: 1200, jogos: 5, minJogo: 40, titular: 0, suplente: 4, golos: 0, assistencias: 0, subEntra: 0, subSai: 0, amarelo: 0, intercecao: 0, segundoAmarelo: 0, vermelho: 0, recuperacao: 0, autoGolo: 0, faltaSofrida: 0, faltaCometida: 0, perdaBola: 0, goloSofrido: 0, ctl: 65, atl: 72, tsb: -7, acwr: 1.11, rpeMedio: 7.2, cargaSessao: 648, estado: "Apto", lesao: "Nenhuma", previsao: "Disponível", nutricao: "Hidratação isotónica + Tailwind", notas: "Excelente disciplina tática e capacidade de transição." },
    { id: 2, nome: "André Pereira", posicao: "Fixo", nasc: "2011-06-20", idade: 15, pesoBase: 59.8, peso: 60.5, altura: 1.73, cmjBase: 39.0, cmj: 39.1, pa: "118/76", fcRep: 62, phvOffset: "+1.4", treinos: 12, minTreino: 1200, jogos: 5, minJogo: 48, titular: 0, suplente: 4, golos: 0, assistencias: 0, subEntra: 0, subSai: 0, amarelo: 0, intercecao: 0, segundoAmarelo: 0, vermelho: 0, recuperacao: 0, autoGolo: 0, faltaSofrida: 0, faltaCometida: 0, perdaBola: 0, goloSofrido: 0, ctl: 62, atl: 68, tsb: -6, acwr: 1.10, rpeMedio: 7.5, cargaSessao: 675, estado: "Apto", lesao: "Nenhuma", previsao: "Disponível", nutricao: "Maltodextrina pré-treino", notas: "Bom sentido de cobertura defensiva." },
    { id: 3, nome: "André Silva", posicao: "Pivot", nasc: "2011-09-05", idade: 15, pesoBase: 56.5, peso: 57.0, altura: 1.68, cmjBase: 37.0, cmj: 36.5, pa: "115/72", fcRep: 64, phvOffset: "+1.0", treinos: 9, minTreino: 915, jogos: 3, minJogo: 23, titular: 0, suplente: 2, golos: 0, assistencias: 0, subEntra: 0, subSai: 0, amarelo: 0, intercecao: 0, segundoAmarelo: 0, vermelho: 0, recuperacao: 0, autoGolo: 0, faltaSofrida: 0, faltaCometida: 0, perdaBola: 0, goloSofrido: 0, ctl: 55, atl: 50, tsb: 5, acwr: 0.91, rpeMedio: 6.8, cargaSessao: 520, estado: "Apto", lesao: "Nenhuma", previsao: "Disponível", nutricao: "Proteína de soro pós-treino", notas: "Forte jogo de costas para a baliza." },
    { id: 4, nome: "Baião", posicao: "Ala", nasc: "2011-01-18", idade: 15, pesoBase: 60.2, peso: 61.0, altura: 1.74, cmjBase: 38.5, cmj: 37.8, pa: "120/78", fcRep: 59, phvOffset: "+1.5", treinos: 12, minTreino: 1200, jogos: 6, minJogo: 81, titular: 2, suplente: 3, golos: 0, assistencias: 0, subEntra: 0, subSai: 0, amarelo: 0, intercecao: 0, segundoAmarelo: 0, vermelho: 0, recuperacao: 0, autoGolo: 0, faltaSofrida: 0, faltaCometida: 0, perdaBola: 0, goloSofrido: 0, ctl: 68, atl: 78, tsb: -10, acwr: 1.15, rpeMedio: 7.8, cargaSessao: 710, estado: "Apto", lesao: "Nenhuma", previsao: "Disponível", nutricao: "Gel energético de rápida absorção", notas: "Grande raio de ação ofensiva." },
    { id: 5, nome: "Diogo", posicao: "Guarda-Redes", nasc: "2011-04-10", idade: 15, pesoBase: 61.2, peso: 62.0, altura: 1.75, cmjBase: 39.5, cmj: 41.0, pa: "114/70", fcRep: 58, phvOffset: "+1.6", treinos: 10, minTreino: 990, jogos: 6, minJogo: 116, titular: 6, suplente: 0, golos: 0, assistencias: 0, subEntra: 0, subSai: 0, amarelo: 0, intercecao: 0, segundoAmarelo: 0, vermelho: 0, recuperacao: 0, autoGolo: 0, faltaSofrida: 0, faltaCometida: 0, perdaBola: 0, goloSofrido: 0, ctl: 70, atl: 110, tsb: -40, acwr: 1.57, rpeMedio: 8.2, cargaSessao: 790, estado: "Apto", lesao: "Nenhuma", previsao: "Disponível", nutricao: "Hidratação avançada com eletrólitos", notas: "Excelente jogo de pés e liderança defensiva." },
    { id: 6, nome: "Diogo Andrade", posicao: "Ala", nasc: "2011-12-01", idade: 14, pesoBase: 56.0, peso: 56.5, altura: 1.67, cmjBase: 36.0, cmj: 35.2, pa: "112/70", fcRep: 63, phvOffset: "+0.8", treinos: 8, minTreino: 740, jogos: 3, minJogo: 35, titular: 0, suplente: 3, golos: 0, assistencias: 0, subEntra: 0, subSai: 0, amarelo: 0, intercecao: 0, segundoAmarelo: 0, vermelho: 0, recuperacao: 0, autoGolo: 0, faltaSofrida: 0, faltaCometida: 0, perdaBola: 0, goloSofrido: 0, ctl: 50, atl: 46, tsb: 4, acwr: 0.92, rpeMedio: 6.5, cargaSessao: 480, estado: "Apto", lesao: "Nenhuma", previsao: "Disponível", nutricao: "Dieta equilibrada padrão", notas: "Atleta em fase de afirmação no modelo tático." },
    { id: 7, nome: "Enzo Almeida", posicao: "Universal", nasc: "2011-08-14", idade: 15, pesoBase: 54.5, peso: 55.0, altura: 1.65, cmjBase: 34.5, cmj: 34.0, pa: "110/68", fcRep: 65, phvOffset: "+0.7", treinos: 7, minTreino: 735, jogos: 1, minJogo: 0, titular: 0, suplente: 0, golos: 0, assistencias: 0, subEntra: 0, subSai: 0, amarelo: 0, intercecao: 0, segundoAmarelo: 0, vermelho: 0, recuperacao: 0, autoGolo: 0, faltaSofrida: 0, faltaCometida: 0, perdaBola: 0, goloSofrido: 0, ctl: 45, atl: 38, tsb: 7, acwr: 0.84, rpeMedio: 6.0, cargaSessao: 420, estado: "Apto", lesao: "Nenhuma", previsao: "Disponível", nutricao: "Reforço calórico ligeiro", notas: "Polivalência interessante nas posições de rotação." },
    { id: 8, nome: "Guilherme", posicao: "Fixo", nasc: "2011-02-22", idade: 15, pesoBase: 58.5, peso: 59.0, altura: 1.71, cmjBase: 38.0, cmj: 38.0, pa: "116/74", fcRep: 61, phvOffset: "+1.3", treinos: 11, minTreino: 1090, jogos: 5, minJogo: 55, titular: 1, suplente: 3, golos: 0, assistencias: 0, subEntra: 0, subSai: 0, amarelo: 0, intercecao: 0, segundoAmarelo: 0, vermelho: 0, recuperacao: 0, autoGolo: 0, faltaSofrida: 0, faltaCometida: 0, perdaBola: 0, goloSofrido: 0, ctl: 60, atl: 62, tsb: -2, acwr: 1.03, rpeMedio: 7.0, cargaSessao: 610, estado: "Apto", lesao: "Nenhuma", previsao: "Disponível", nutricao: "Maltodextrina e barras energéticas", notas: "Sólido nos duelos defensivos individuais." },
    { id: 9, nome: "Ivo Aguiar", posicao: "Ala", nasc: "2011-05-30", idade: 15, pesoBase: 58.0, peso: 58.5, altura: 1.70, cmjBase: 37.5, cmj: 37.5, pa: "115/72", fcRep: 60, phvOffset: "+1.1", treinos: 11, minTreino: 1080, jogos: 6, minJogo: 53, titular: 0, suplente: 4, golos: 0, assistencias: 0, subEntra: 0, subSai: 0, amarelo: 0, intercecao: 0, segundoAmarelo: 0, vermelho: 0, recuperacao: 0, autoGolo: 0, faltaSofrida: 0, faltaCometida: 0, perdaBola: 0, goloSofrido: 0, ctl: 59, atl: 60, tsb: -1, acwr: 1.01, rpeMedio: 7.1, cargaSessao: 620, estado: "Apto", lesao: "Nenhuma", previsao: "Disponível", nutricao: "Hidratação padrão", notas: "Boa capacidade de progressão lateral com bola." },
    { id: 10, nome: "Jacob M.", posicao: "Pivot", nasc: "2011-10-12", idade: 15, pesoBase: 62.0, peso: 63.0, altura: 1.76, cmjBase: 39.5, cmj: 40.5, pa: "122/80", fcRep: 57, phvOffset: "+1.7", treinos: 12, minTreino: 1200, jogos: 6, minJogo: 114, titular: 5, suplente: 1, golos: 0, assistencias: 0, subEntra: 0, subSai: 0, amarelo: 0, intercecao: 0, segundoAmarelo: 0, vermelho: 0, recuperacao: 0, autoGolo: 0, faltaSofrida: 0, faltaCometida: 0, perdaBola: 0, goloSofrido: 0, ctl: 67, atl: 105, tsb: -38, acwr: 1.56, rpeMedio: 8.0, cargaSessao: 760, estado: "Apto", lesao: "Nenhuma", previsao: "Disponível", nutricao: "Suplementação proteica intensiva", notas: "Atleta referência na finalização e apoio frontal." },
    { id: 11, nome: "José M.", posicao: "Ala", nasc: "2011-07-19", idade: 15, pesoBase: 54.5, peso: 54.0, altura: 1.64, cmjBase: 35.0, cmj: 33.5, pa: "110/68", fcRep: 66, phvOffset: "+0.6", treinos: 5, minTreino: 555, jogos: 2, minJogo: 14, titular: 0, suplente: 1, golos: 0, assistencias: 0, subEntra: 0, subSai: 0, amarelo: 0, intercecao: 0, segundoAmarelo: 0, vermelho: 0, recuperacao: 0, autoGolo: 0, faltaSofrida: 0, faltaCometida: 0, perdaBola: 0, goloSofrido: 0, ctl: 40, atl: 25, tsb: 15, acwr: 0.62, rpeMedio: 5.5, cargaSessao: 310, estado: "Recuperação", lesao: "Entorse Tornozelo Esq.", previsao: "1 Semana", nutricao: "Suplemento de colagénio e ómega-3", notas: "Em processo de reabilitação com o departamento clínico." },
    { id: 12, nome: "Liedson Tavares", posicao: "Ala", nasc: "2011-03-25", idade: 15, pesoBase: 59.5, peso: 60.0, altura: 1.72, cmjBase: 38.0, cmj: 38.9, pa: "117/75", fcRep: 61, phvOffset: "+1.2", treinos: 10, minTreino: 990, jogos: 6, minJogo: 82, titular: 3, suplente: 2, golos: 0, assistencias: 0, subEntra: 0, subSai: 0, amarelo: 0, intercecao: 0, segundoAmarelo: 0, vermelho: 0, recuperacao: 0, autoGolo: 0, faltaSofrida: 0, faltaCometida: 0, perdaBola: 0, goloSofrido: 0, ctl: 63, atl: 70, tsb: -7, acwr: 1.11, rpeMedio: 7.4, cargaSessao: 650, estado: "Apto", lesao: "Nenhuma", previsao: "Disponível", nutricao: "Tailwind e hidratos complexos", notas: "Forte ritmo de transição defesa-ataque." },
    { id: 13, nome: "Lourenço", posicao: "Fixo", nasc: "2011-01-05", idade: 15, pesoBase: 60.0, peso: 60.8, altura: 1.73, cmjBase: 38.0, cmj: 39.0, pa: "118/76", fcRep: 60, phvOffset: "+1.3", treinos: 12, minTreino: 1200, jogos: 6, minJogo: 84, titular: 2, suplente: 3, golos: 0, assistencias: 0, subEntra: 0, subSai: 0, amarelo: 0, intercecao: 0, segundoAmarelo: 0, vermelho: 0, recuperacao: 0, autoGolo: 0, faltaSofrida: 0, faltaCometida: 0, perdaBola: 0, goloSofrido: 0, ctl: 65, atl: 75, tsb: -10, acwr: 1.15, rpeMedio: 7.6, cargaSessao: 680, estado: "Apto", lesao: "Nenhuma", previsao: "Disponível", nutricao: "Bebida isotónica regular", notas: "Excelente leitura do timing de interceção." },
    { id: 14, nome: "Lourenço Cerqueira", posicao: "Ala", nasc: "2011-11-15", idade: 14, pesoBase: 57.0, peso: 57.5, altura: 1.69, cmjBase: 36.5, cmj: 36.0, pa: "114/72", fcRep: 62, phvOffset: "+0.9", treinos: 8, minTreino: 825, jogos: 4, minJogo: 38, titular: 0, suplente: 3, golos: 0, assistencias: 0, subEntra: 0, subSai: 0, amarelo: 0, intercecao: 0, segundoAmarelo: 0, vermelho: 0, recuperacao: 0, autoGolo: 0, faltaSofrida: 0, faltaCometida: 0, perdaBola: 0, goloSofrido: 0, ctl: 52, atl: 50, tsb: 2, acwr: 0.96, rpeMedio: 6.9, cargaSessao: 530, estado: "Apto", lesao: "Nenhuma", previsao: "Disponível", nutricao: "Dieta mediterrânica adaptada", notas: "Boa margem de progressão física." },
    { id: 15, nome: "Louro", posicao: "Universal", nasc: "2011-04-08", idade: 15, pesoBase: 58.2, peso: 58.8, altura: 1.70, cmjBase: 37.0, cmj: 37.2, pa: "115/73", fcRep: 61, phvOffset: "+1.1", treinos: 12, minTreino: 1195, jogos: 5, minJogo: 55, titular: 0, suplente: 4, golos: 0, assistencias: 0, subEntra: 0, subSai: 0, amarelo: 0, intercecao: 0, segundoAmarelo: 0, vermelho: 0, recuperacao: 0, autoGolo: 0, faltaSofrida: 0, faltaCometida: 0, perdaBola: 0, goloSofrido: 0, ctl: 62, atl: 65, tsb: -3, acwr: 1.05, rpeMedio: 7.2, cargaSessao: 640, estado: "Apto", lesao: "Nenhuma", previsao: "Disponível", nutricao: "Barras de cereais e água", notas: "Versatilidade tática permitindo jogar em várias posições." },
    { id: 16, nome: "Miguel", posicao: "Ala", nasc: "2011-06-11", idade: 15, pesoBase: 58.5, peso: 59.2, altura: 1.71, cmjBase: 37.5, cmj: 37.9, pa: "116/74", fcRep: 60, phvOffset: "+1.2", treinos: 11, minTreino: 1110, jogos: 6, minJogo: 55, titular: 0, suplente: 5, golos: 0, assistencias: 0, subEntra: 0, subSai: 0, amarelo: 0, intercecao: 0, segundoAmarelo: 0, vermelho: 0, recuperacao: 0, autoGolo: 0, faltaSofrida: 0, faltaCometida: 0, perdaBola: 0, goloSofrido: 0, ctl: 60, atl: 61, tsb: -1, acwr: 1.02, rpeMedio: 7.0, cargaSessao: 620, estado: "Apto", lesao: "Nenhuma", previsao: "Disponível", nutricao: "Hidratos de carbono complexos", notas: "Bom entendimento das dinâmicas de 4x4." },
    { id: 17, nome: "Pestana", posicao: "Fixo", nasc: "2011-09-28", idade: 15, pesoBase: 57.5, peso: 58.0, altura: 1.69, cmjBase: 37.0, cmj: 36.8, pa: "115/72", fcRep: 62, phvOffset: "+1.0", treinos: 11, minTreino: 1100, jogos: 4, minJogo: 40, titular: 0, suplente: 3, golos: 0, assistencias: 0, subEntra: 0, subSai: 0, amarelo: 0, intercecao: 0, segundoAmarelo: 0, vermelho: 0, recuperacao: 0, autoGolo: 0, faltaSofrida: 0, faltaCometida: 0, perdaBola: 0, goloSofrido: 0, ctl: 58, atl: 57, tsb: 1, acwr: 0.98, rpeMedio: 6.8, cargaSessao: 590, estado: "Apto", lesao: "Nenhuma", previsao: "Disponível", nutricao: "Fruta e água", notas: "Postura muito concentrada nos momentos defensivos." },
    { id: 18, nome: "Rafael R.", posicao: "Pivot", nasc: "2011-02-14", idade: 15, pesoBase: 63.0, peso: 64.0, altura: 1.77, cmjBase: 40.0, cmj: 41.2, pa: "120/78", fcRep: 56, phvOffset: "+1.8", treinos: 12, minTreino: 1200, jogos: 6, minJogo: 120, titular: 2, suplente: 4, golos: 0, assistencias: 0, subEntra: 0, subSai: 0, amarelo: 0, intercecao: 0, segundoAmarelo: 0, vermelho: 0, recuperacao: 0, autoGolo: 0, faltaSofrida: 0, faltaCometida: 0, perdaBola: 0, goloSofrido: 0, ctl: 72, atl: 90, tsb: -18, acwr: 1.25, rpeMedio: 8.4, cargaSessao: 810, estado: "Apto", lesao: "Nenhuma", previsao: "Disponível", nutricao: "Suplemento proteico e batido de recuperação", notas: "Excelente presença física na frente de ataque." },
    { id: 19, nome: "Salvador", posicao: "Ala", nasc: "2011-01-02", idade: 15, pesoBase: 64.0, peso: 65.0, altura: 1.78, cmjBase: 40.5, cmj: 42.0, pa: "122/80", fcRep: 55, phvOffset: "+1.9", treinos: 12, minTreino: 1200, jogos: 6, minJogo: 120, titular: 6, suplente: 0, golos: 0, assistencias: 0, subEntra: 0, subSai: 0, amarelo: 0, intercecao: 0, segundoAmarelo: 0, vermelho: 0, recuperacao: 0, autoGolo: 0, faltaSofrida: 0, faltaCometida: 0, perdaBola: 0, goloSofrido: 0, ctl: 74, atl: 95, tsb: -21, acwr: 1.28, rpeMedio: 8.5, cargaSessao: 830, estado: "Apto", lesao: "Nenhuma", previsao: "Disponível", nutricao: "Nutrição desportiva avançada", notas: "Atleta com índices físicos de topo no grupo." },
    { id: 20, nome: "Suarez", posicao: "Ala", nasc: "2011-05-18", idade: 15, pesoBase: 58.0, peso: 58.5, altura: 1.70, cmjBase: 37.5, cmj: 37.4, pa: "115/73", fcRep: 61, phvOffset: "+1.1", treinos: 11, minTreino: 1110, jogos: 5, minJogo: 53, titular: 0, suplente: 4, golos: 0, assistencias: 0, subEntra: 0, subSai: 0, amarelo: 0, intercecao: 0, segundoAmarelo: 0, vermelho: 0, recuperacao: 0, autoGolo: 0, faltaSofrida: 0, faltaCometida: 0, perdaBola: 0, goloSofrido: 0, ctl: 60, atl: 59, tsb: 1, acwr: 0.98, rpeMedio: 7.1, cargaSessao: 630, estado: "Apto", lesao: "Nenhuma", previsao: "Disponível", nutricao: "Hidratação isotónica", notas: "Boa regularidade exibicional ao longo da época." },
    { id: 21, nome: "Xavi", posicao: "Fixo", nasc: "2011-10-30", idade: 14, pesoBase: 53.5, peso: 53.0, altura: 1.63, cmjBase: 34.0, cmj: 32.8, pa: "108/66", fcRep: 67, phvOffset: "+0.5", treinos: 6, minTreino: 560, jogos: 1, minJogo: 0, titular: 0, suplente: 0, golos: 0, assistencias: 0, subEntra: 0, subSai: 0, amarelo: 0, intercecao: 0, segundoAmarelo: 0, vermelho: 0, recuperacao: 0, autoGolo: 0, faltaSofrida: 0, faltaCometida: 0, perdaBola: 0, goloSofrido: 0, ctl: 38, atl: 28, tsb: 10, acwr: 0.74, rpeMedio: 5.0, cargaSessao: 280, estado: "Fadiga Elevada", lesao: "Sobrecarga Muscular", previsao: "3 Dias", nutricao: "Magnésio e hidratação reforçada", notas: "A necessitar de gestão de minutos devido a fadiga." },
    { id: 22, nome: "Éder", posicao: "Ala", nasc: "2011-01-10", idade: 15, pesoBase: 64.5, peso: 65.5, altura: 1.79, cmjBase: 40.0, cmj: 41.8, pa: "124/82", fcRep: 54, phvOffset: "+2.0", treinos: 11, minTreino: 1095, jogos: 6, minJogo: 123, titular: 3, suplente: 3, golos: 0, assistencias: 0, subEntra: 0, subSai: 0, amarelo: 0, intercecao: 0, segundoAmarelo: 0, vermelho: 0, recuperacao: 0, autoGolo: 0, faltaSofrida: 0, faltaCometida: 0, perdaBola: 0, goloSofrido: 0, ctl: 75, atl: 98, tsb: -23, acwr: 1.31, rpeMedio: 8.6, cargaSessao: 850, estado: "Apto", lesao: "Nenhuma", previsao: "Disponível", nutricao: "Plano de alto rendimento estrito", notas: "Um dos motores da equipa em termos físicos e competitivos." }
  ]);

  // Estado para Calendário Operacional em Modo Mensal
  const [mesCalendario, setMesCalendario] = useState("2026-10");
  const [calendarioSessoes, setCalendarioSessoes] = useState([
    { id: 1, data: "2026-10-02", tipo: "Treino Tático", tss: 65, desc: "Sessão de transições e posicionamento defensivo." },
    { id: 2, data: "2026-10-03", tipo: "Descanso Total", tss: 0, desc: "Recuperação neuromuscular (TSS = 0)." },
    { id: 3, data: "2026-10-04", tipo: "Treino Físico (Força/CMJ)", tss: 80, desc: "Circuitos de potência e prevenção de lesões." },
    { id: 4, data: "2026-10-05", tipo: "Jogo Oficial", tss: 120, desc: "7ª Jornada Campeonato Sub-15 Futsal (Pico Ótimo)." },
    { id: 5, data: "2026-10-06", tipo: "Jogo Amigável / Treino", tss: 70, desc: "Jogo de rotação massiva para os 22 atletas." },
    { id: 6, data: "2026-10-10", tipo: "Treino Tático", tss: 65, desc: "Ajustes na saída sob pressão." },
    { id: 7, data: "2026-10-12", tipo: "Descanso Total", tss: 0, desc: "Descanso absoluto." }
  ]);

  const [novoTreino, setNovoTreino] = useState({
    data: new Date().toISOString().split('T')[0],
    tipo: "Treino Tático",
    tss: 60,
    desc: "Sessão standard"
  });

  const [jornadaAtual, setJornadaAtual] = useState({
    adversario: "Adversário FC",
    data: new Date().toISOString().split('T')[0],
    golsEquipa: 4,
    golsAdversario: 2,
    observacoes: "Bom rendimento coletivo na segunda parte."
  });

  const baseUtilizadores = [
    { email: "treinador@clube.pt", pass: "admin123", nome: "Bruno (Preparador Físico)", perfil: "Preparador Físico (Admin)" },
    { email: "adjunto@clube.pt", pass: "treino123", nome: "Prof. Adjunto", perfil: "Equipa Técnica" },
    { email: "agostinho@atleta.pt", pass: "atleta123", nome: "Agostinho", perfil: "Atleta" }
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErroLogin('');
    const userEncontrado = baseUtilizadores.find(
      (u) => u.email.toLowerCase() === emailInput.toLowerCase() && u.pass === passInput
    );
    if (userEncontrado) {
      setUtilizadorLogado(userEncontrado);
      setView('dashboard');
    } else {
      setErroLogin('Email ou password incorretos.');
    }
  };

  const toggleConvocatoria = (id: number) => {
    if (convocados.includes(id)) {
      setConvocados(convocados.filter(item => item !== id));
    } else {
      setConvocados([...convocados, id]);
    }
  };

  // Funções de ordenação dinâmica para cada tabela com colunas específicas
  const ordenarDados = (coluna: string, tipoTabela: string = 'plantel') => {
    if (tipoTabela === 'plantel') {
      if (ordenarColuna === coluna) {
        setDirecaoOrdem(direcaoOrdem === 'asc' ? 'desc' : 'asc');
      } else {
        setOrdenarColuna(coluna);
        setDirecaoOrdem('asc');
      }
    } else if (tipoTabela === 'pmc') {
      if (ordenarColunaPMC === coluna) {
        setDirecaoOrdemPMC(direcaoOrdemPMC === 'asc' ? 'desc' : 'asc');
      } else {
        setOrdenarColunaPMC(coluna);
        setDirecaoOrdemPMC('asc');
      }
    } else if (tipoTabela === 'clinico') {
      if (ordenarColunaClinico === coluna) {
        setDirecaoOrdemClinico(direcaoOrdemClinico === 'asc' ? 'desc' : 'asc');
      } else {
        setOrdenarColunaClinico(coluna);
        setDirecaoOrdemClinico('asc');
      }
    }
  };

  const plantelOrdenado = [...plantel].sort((a: any, b: any) => {
    let valorA = a[ordenarColuna];
    let valorB = b[ordenarColuna];
    if (typeof valorA === 'string') {
      return direcaoOrdem === 'asc' ? valorA.localeCompare(valorB) : valorB.localeCompare(valorA);
    }
    return direcaoOrdem === 'asc' ? valorA - valorB : valorB - valorA;
  });

  const plantelOrdenadoPMC = [...plantel].sort((a: any, b: any) => {
    let valorA = a[ordenarColunaPMC];
    let valorB = b[ordenarColunaPMC];
    if (typeof valorA === 'string') {
      return direcaoOrdemPMC === 'asc' ? valorA.localeCompare(valorB) : valorB.localeCompare(valorA);
    }
    return direcaoOrdemPMC === 'asc' ? valorA - valorB : valorB - valorA;
  });

  const plantelOrdenadoClinico = [...plantel].sort((a: any, b: any) => {
    let valorA = a[ordenarColunaClinico];
    let valorB = b[ordenarColunaClinico];
    if (typeof valorA === 'string') {
      return direcaoOrdemClinico === 'asc' ? valorA.localeCompare(valorB) : valorB.localeCompare(valorA);
    }
    return direcaoOrdemClinico === 'asc' ? valorA - valorB : valorB - valorA;
  });

  const abrirFichaAtleta = (atleta: any) => {
    setAtletaSelecionado(atleta);
    setView('ficha');
  };

  const adicionarRegistoAntropometrico = (e: React.FormEvent) => {
    e.preventDefault();
    const atletaObj = plantel.find(a => a.id === Number(novoRegisto.atletaId));
    const imcCalculado = Number((novoRegisto.peso / (novoRegisto.altura * novoRegisto.altura)).toFixed(1));
    
    const novoItem = {
      id: historicoAntropometria.length + 1,
      data: novoRegisto.data,
      atletaId: Number(novoRegisto.atletaId),
      atletaNome: atletaObj ? atletaObj.nome : "Atleta",
      peso: Number(novoRegisto.peso),
      altura: Number(novoRegisto.altura),
      imc: imcCalculado,
      massaGorda: Number(novoRegisto.massaGorda)
    };

    sethistoricoAntropometria([novoItem, ...historicoAntropometria]);
    alert('Registo antropométrico adicionado com sucesso!');
  };

  const adicionarSessaoCalendario = (e: React.FormEvent) => {
    e.preventDefault();
    setCalendarioSessoes([
      { id: calendarioSessoes.length + 1, data: novoTreino.data, tipo: novoTreino.tipo, tss: Number(novoTreino.tss), desc: novoTreino.desc },
      ...calendarioSessoes
    ]);
    alert('Sessão / Evento adicionado ao Calendário Operacional com sucesso!');
  };

  const simularImportacaoExcel = () => {
    alert('Relatório athletes_report.xlsx importado com sucesso! 22 atletas atualizados[cite: 1].');
    setView('dashboard');
  };

  const exportarExcelEquipa = () => {
    const headers = ["Atleta", "Posicao", "Treinos", "MinTreino", "Jogos", "MinJogo", "Golos", "Assistencias", "Estado", "ACWR"];
    const rows = plantel.map(a => [a.nome, a.posicao, a.treinos, a.minTreino, a.jogos, a.minJogo, a.golos, a.assistencias, a.estado, a.acwr]);
    let csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "GMDUP_Plantel_Sub15_PMC.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportarPDFAtleta = (atleta: any) => {
    window.print();
  };

  const calcularTanakaFCMax = (idade: number) => {
    return Math.round(208 - (0.7 * idade));
  };

  const calcularZonasKarvonen = (fcMax: number, fcRep: number) => {
    const reserva = fcMax - fcRep;
    return {
      z1: `${Math.round(fcRep + reserva * 0.5)} - ${Math.round(fcRep + reserva * 0.6)} bpm`,
      z2: `${Math.round(fcRep + reserva * 0.6)} - ${Math.round(fcRep + reserva * 0.7)} bpm`,
      z3: `${Math.round(fcRep + reserva * 0.7)} - ${Math.round(fcRep + reserva * 0.8)} bpm`,
      z4: `${Math.round(fcRep + reserva * 0.8)} - ${Math.round(fcRep + reserva * 0.9)} bpm`,
      z5: `${Math.round(fcRep + reserva * 0.9)} - ${fcMax} bpm`,
    };
  };

  const calcularVariacaoCMJ = (atual: number, base: number) => {
    const diff = ((atual - base) / base) * 100;
    return Number(diff.toFixed(1));
  };

  const obterSemafaroCMJ = (variacao: number) => {
    if (variacao >= -5) return { texto: "Normal (Ótimo)", cor: "#10b981", bg: "rgba(16,185,129,0.2)" };
    if (variacao >= -10) return { texto: "Alerta de Fadiga (-5% a -10%)", cor: "#f59e0b", bg: "rgba(245,158,11,0.2)" };
    return { texto: "Risco de Sobretreino (> -10%)", cor: "#ef4444", bg: "rgba(239,68,68,0.2)" };
  };

  const text3DStyle = {
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.9), 0 0 15px rgba(0, 0, 0, 0.6)'
  };

  const title3DStyle = {
    textShadow: '3px 3px 6px rgba(0, 0, 0, 0.95), 0 0 25px rgba(34, 197, 94, 0.4)'
  };

  const btn3DStyle = {
    backgroundColor: '#16a34a',
    backgroundImage: 'linear-gradient(to bottom, #4ade80, #15803d)',
    color: '#ffffff',
    border: 'none',
    borderBottom: '4px solid #14532d',
    padding: '16px 36px',
    borderRadius: '16px',
    fontSize: '22px',
    fontWeight: '900',
    fontStyle: 'italic',
    textTransform: 'uppercase' as const,
    cursor: 'pointer',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.6), inset 0 2px 3px rgba(255, 255, 255, 0.4)',
    letterSpacing: '1.5px',
    textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
    transition: 'all 0.1s ease',
  };

  const btnSecondary3D = {
    backgroundColor: '#1e293b',
    backgroundImage: 'linear-gradient(to bottom, #334155, #0f172a)',
    color: '#ffffff',
    border: 'none',
    borderBottom: '4px solid #020617',
    padding: '10px 18px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '800',
    cursor: 'pointer',
    boxShadow: '0 6px 15px rgba(0, 0, 0, 0.5), inset 0 1px 2px rgba(255, 255, 255, 0.2)',
    textShadow: '1px 1px 3px rgba(0,0,0,0.9)',
    transition: 'all 0.1s ease',
  };

  const cardModuleStyle = {
    backgroundColor: config.cardColor,
    backdropFilter: 'blur(16px)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: '24px',
    padding: '32px 24px',
    textAlign: 'center' as const,
    cursor: 'pointer',
    boxShadow: '0 20px 40px -15px rgba(0,0,0,0.8), inset 0 1px 2px rgba(255,255,255,0.15)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundImage: `linear-gradient(135deg, rgba(3, 7, 18, 0.85) 0%, rgba(15, 23, 42, 0.75) 50%, rgba(3, 7, 18, 0.9) 100%), url(${config.bgImageUrl})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      color: '#f8fafc', 
      fontFamily: 'system-ui, sans-serif', 
      padding: '32px 16px' 
    }}>
      
      {/* 1. LANDING PAGE */}
      {view === 'landing' && (
        <div style={{ 
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '88vh', textAlign: 'center',
          borderRadius: '32px', padding: '50px', maxWidth: '1000px', margin: '0 auto',
          backgroundImage: `linear-gradient(to bottom, rgba(3, 7, 18, 0.6), rgba(3, 7, 18, 0.9)), url(${config.bgImageUrl})`,
          backgroundSize: 'cover', backgroundPosition: 'center', border: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.9)'
        }}>
          <div style={{ marginBottom: '24px', position: 'relative' }}>
            <div style={{ position: 'absolute', inset: '-6px', background: 'linear-gradient(to right, #eab308, #22c55e)', borderRadius: '50%', filter: 'blur(12px)', opacity: 0.6 }}></div>
            <img src={config.logoUrl} alt="Logo" style={{ position: 'relative', width: '120px', height: '120px', objectFit: 'cover', borderRadius: '50%', border: `3px solid #eab308`, backgroundColor: '#000', boxShadow: '0 10px 25px rgba(0,0,0,0.8)' }} />
          </div>
          <div style={{ maxWidth: '750px' }}>
            <h1 style={{ fontSize: '52px', fontWeight: '900', margin: '10px 0 40px 0', lineHeight: '1.1', color: '#ffffff', letterSpacing: '1px', textTransform: 'uppercase', fontStyle: 'italic', ...title3DStyle }}>
              {config.teamName}
            </h1>
            <button onClick={() => setView('login')} style={{ ...btn3DStyle, padding: '18px 42px', fontSize: '26px' }}>
              <span style={{ color: '#ffffff', WebkitTextStroke: '1px #022c22', textShadow: '2px 2px 0px #022c22, 0 0 10px rgba(255,255,255,0.8)' }}>NÓS SOMOS</span>{' '}
              <span style={{ color: '#facc15', fontSize: '34px', fontWeight: '900', WebkitTextStroke: '1.5px #713f12', textShadow: '2px 2px 0px #713f12, 0 0 25px rgba(250,204,21,1)' }}>UNIÃO!</span>
            </button>
          </div>
        </div>
      )}

      {/* 2. LOGIN */}
      {view === 'login' && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '85vh' }}>
          <div style={{ backgroundColor: config.cardColor, backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.08)', padding: '40px', borderRadius: '28px', width: '100%', maxWidth: '420px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.9)' }}>
            
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <img src={config.logoUrl} alt="Logo" style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '50%', border: '2px solid #eab308', boxShadow: '0 5px 15px rgba(0,0,0,0.8)' }} />
            </div>
            
            <h2 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '6px', textAlign: 'center', ...text3DStyle }}>Iniciar Sessão</h2>
            <p style={{ color: '#94a3b8', fontSize: '13px', textAlign: 'center', marginBottom: '28px', ...text3DStyle }}>Plataforma Oficial de Alta Performance</p>

            {erroLogin && (
              <div style={{ backgroundColor: 'rgba(127, 29, 29, 0.85)', color: '#fca5a5', padding: '12px', borderRadius: '12px', fontSize: '12px', marginBottom: '20px', textAlign: 'center', ...text3DStyle }}>
                {erroLogin}
              </div>
            )}

            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px', ...text3DStyle }}>Email</label>
                <input type="email" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} required style={{ width: '100%', padding: '12px 16px', backgroundColor: 'rgba(15, 23, 42, 0.85)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '12px', fontSize: '14px', outline: 'none', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.5)' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px', ...text3DStyle }}>Password</label>
                <input type="password" value={passInput} onChange={(e) => setPassInput(e.target.value)} required style={{ width: '100%', padding: '12px 16px', backgroundColor: 'rgba(15, 23, 42, 0.85)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '12px', fontSize: '14px', outline: 'none', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.5)' }} />
              </div>
              <button type="submit" style={{ ...btn3DStyle, width: '100%', padding: '14px', fontSize: '16px' }}>
                Entrar
              </button>
            </form>

            <div style={{ backgroundColor: 'rgba(15, 23, 42, 0.7)', padding: '14px', borderRadius: '12px', fontSize: '11px', color: '#94a3b8', marginBottom: '20px', border: '1px solid rgba(255,255,255,0.05)', ...text3DStyle }}>
              <p style={{ fontWeight: 'bold', color: '#38bdf8', margin: '0 0 4px 0' }}>Login Teste:</p>
              <p style={{ margin: '2px 0' }}>• <code>treinador@clube.pt</code> / <code>admin123</code></p>
            </div>
            <button onClick={() => setView('landing')} style={{ background: 'none', border: 'none', color: '#94a3b8', width: '100%', cursor: 'pointer', fontSize: '12px', ...text3DStyle }}>
              ← Voltar ao início
            </button>
          </div>
        </div>
      )}

      {/* 3. ÁREA DE TRABALHO */}
      {view === 'dashboard' && utilizadorLogado && (
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', backgroundColor: config.cardColor, backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.1)', padding: '24px 32px', borderRadius: '24px', marginBottom: '32px', boxShadow: '0 20px 40px -15px rgba(0,0,0,0.8)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <img src={config.logoUrl} alt="Logo" style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '50%', border: '2px solid #eab308', boxShadow: '0 4px 10px rgba(0,0,0,0.6)', flexShrink: 0 }} />
              <div>
                <h1 style={{ fontSize: '22px', fontWeight: '900', margin: 0, color: '#fff', whiteSpace: 'nowrap', ...text3DStyle }}>{config.teamName}</h1>
                <p style={{ color: '#94a3b8', fontSize: '12px', margin: '4px 0 0 0', ...text3DStyle }}>
                  Utilizador: <span style={{ color: 'white', fontWeight: 'bold' }}>{utilizadorLogado.nome}</span> • Perfil: <span style={{ color: '#eab308', textTransform: 'uppercase', fontWeight: 'bold' }}>{utilizadorLogado.perfil}</span>
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              {utilizadorLogado.perfil.includes('Admin') && (
                <button onClick={() => setView('admin')} style={{ ...btnSecondary3D, backgroundColor: '#15803d', backgroundImage: 'linear-gradient(to bottom, #22c55e, #15803d)', padding: '12px 18px', fontSize: '16px' }} title="Painel de Controlo">
                  ⚙️
                </button>
              )}
              <button onClick={() => { setUtilizadorLogado(null); setEmailInput(''); setPassInput(''); setView('login'); }} style={{ backgroundColor: 'rgba(255,255,255,0.08)', color: 'white', border: '1px solid rgba(255,255,255,0.15)', padding: '10px 20px', borderRadius: '12px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', ...text3DStyle }}>
                Sair
              </button>
            </div>
          </header>

          <div style={{ marginBottom: '20px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: '900', color: '#ffffff', marginBottom: '24px', fontStyle: 'italic', ...title3DStyle }}>
              ÁREA DE TRABALHO
            </h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
              
              <div onClick={() => setView('pmc')} style={cardModuleStyle}>
                <div style={{ fontSize: '42px', marginBottom: '14px' }}>📈</div>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#38bdf8', marginBottom: '10px', ...text3DStyle }}>Motor PMC & ACWR</h3>
                <p style={{ color: '#94a3b8', fontSize: '13px', margin: 0, ...text3DStyle }}>Curvas de Fitness (CTL), Fadiga (ATL), TSB e Alerta Preditivo de Lesão.</p>
              </div>

              <div onClick={() => setView('calendario')} style={cardModuleStyle}>
                <div style={{ fontSize: '42px', marginBottom: '14px' }}>📅</div>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#22c55e', marginBottom: '10px', ...text3DStyle }}>Calendário Operacional</h3>
                <p style={{ color: '#94a3b8', fontSize: '13px', margin: 0, ...text3DStyle }}>Calendário mensal, treinos, TSS=0 e Jogos Oficiais vs Amigáveis.</p>
              </div>

              <div onClick={() => setView('plantel')} style={cardModuleStyle}>
                <div style={{ fontSize: '42px', marginBottom: '14px' }}>👥</div>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#38bdf8', marginBottom: '10px', ...text3DStyle }}>Gestão de Plantel</h3>
                <p style={{ color: '#94a3b8', fontSize: '13px', margin: 0, ...text3DStyle }}>Consulta dos 22 atletas, dados biométricos e fichas completas.</p>
              </div>

              <div onClick={() => setView('jogo')} style={cardModuleStyle}>
                <div style={{ fontSize: '42px', marginBottom: '14px' }}>⏱️</div>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#22c55e', marginBottom: '10px', ...text3DStyle }}>Relatório de Jogo</h3>
                <p style={{ color: '#94a3b8', fontSize: '13px', margin: 0, ...text3DStyle }}>Registo detalhado por jornada, golos e ações disciplinares.</p>
              </div>

              <div onClick={() => setView('update')} style={cardModuleStyle}>
                <div style={{ fontSize: '42px', marginBottom: '14px' }}>🔄</div>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#60a5fa', marginBottom: '10px', ...text3DStyle }}>Módulo UPDATE (I/O)</h3>
                <p style={{ color: '#94a3b8', fontSize: '13px', margin: 0, ...text3DStyle }}>Importar Excel, exportar dados e sincronização global unificada.</p>
              </div>

              <div onClick={() => setView('antropometria')} style={cardModuleStyle}>
                <div style={{ fontSize: '42px', marginBottom: '14px' }}>📏</div>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#38bdf8', marginBottom: '10px', ...text3DStyle }}>Antropometria Temporal</h3>
                <p style={{ color: '#94a3b8', fontSize: '13px', margin: 0, ...text3DStyle }}>Registo temporal de peso, altura, IMC e massa gorda por data.</p>
              </div>

              <div onClick={() => setView('convocatoria')} style={cardModuleStyle}>
                <div style={{ fontSize: '42px', marginBottom: '14px' }}>📋</div>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#22c55e', marginBottom: '10px', ...text3DStyle }}>Convocatórias</h3>
                <p style={{ color: '#94a3b8', fontSize: '13px', margin: 0, ...text3DStyle }}>Gestão de convocados para o próximo jogo e alinhamento.</p>
              </div>

              <div onClick={() => setView('clinico')} style={cardModuleStyle}>
                <div style={{ fontSize: '42px', marginBottom: '14px' }}>🏥</div>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#ef4444', marginBottom: '10px', ...text3DStyle }}>Departamento Clínico</h3>
                <p style={{ color: '#94a3b8', fontSize: '13px', margin: 0, ...text3DStyle }}>Registo de lesões, boletim clínico e previsão de regresso.</p>
              </div>

              <div onClick={() => setView('stats')} style={cardModuleStyle}>
                <div style={{ fontSize: '42px', marginBottom: '14px' }}>⚽</div>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#10b981', marginBottom: '10px', ...text3DStyle }}>Estatísticas & Tática</h3>
                <p style={{ color: '#94a3b8', fontSize: '13px', margin: 0, ...text3DStyle }}>Registo completo dos 21 parâmetros do relatório oficial.</p>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* MÓDULO 1: MOTOR PMC & ACWR (COM FILTROS DE ORDENAÇÃO) */}
      {view === 'pmc' && (
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: config.cardColor, backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.1)', padding: '24px 32px', borderRadius: '24px', marginBottom: '28px', boxShadow: '0 20px 40px -15px rgba(0,0,0,0.8)' }}>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#38bdf8', margin: 0, ...text3DStyle }}>📈 Motor PMC (Performance Management Chart) & ACWR</h2>
              <p style={{ color: '#94a3b8', fontSize: '12px', margin: '4px 0 0 0', ...text3DStyle }}>💡 Clica nos cabeçalhos da tabela para ordenar por Fitness, Fadiga ou ACWR.</p>
            </div>
            <button onClick={() => setView('dashboard')} style={btnSecondary3D}>
              ← Voltar à Área de Trabalho
            </button>
          </header>

          <div style={{ backgroundColor: config.cardColor, backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.8)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
              <thead>
                <tr style={{ backgroundColor: 'rgba(3, 7, 18, 0.75)', color: '#94a3b8', fontSize: '11px', textTransform: 'uppercase', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  <th onClick={() => ordenarDados('nome', 'pmc')} style={{ padding: '18px 24px', cursor: 'pointer', color: ordenarColunaPMC === 'nome' ? '#38bdf8' : '#94a3b8' }}>Atleta {ordenarColunaPMC === 'nome' ? (direcaoOrdemPMC === 'asc' ? '▲' : '▼') : '↕'}</th>
                  <th onClick={() => ordenarDados('ctl', 'pmc')} style={{ padding: '18px 24px', textAlign: 'center', cursor: 'pointer', color: ordenarColunaPMC === 'ctl' ? '#38bdf8' : '#94a3b8' }}>Fitness (CTL - 42d) {ordenarColunaPMC === 'ctl' ? (direcaoOrdemPMC === 'asc' ? '▲' : '▼') : '↕'}</th>
                  <th onClick={() => ordenarDados('atl', 'pmc')} style={{ padding: '18px 24px', textAlign: 'center', cursor: 'pointer', color: ordenarColunaPMC === 'atl' ? '#38bdf8' : '#94a3b8' }}>Fadiga (ATL - 7d) {ordenarColunaPMC === 'atl' ? (direcaoOrdemPMC === 'asc' ? '▲' : '▼') : '↕'}</th>
                  <th onClick={() => ordenarDados('tsb', 'pmc')} style={{ padding: '18px 24px', textAlign: 'center', cursor: 'pointer', color: ordenarColunaPMC === 'tsb' ? '#38bdf8' : '#94a3b8' }}>Forma / Balanço (TSB) {ordenarColunaPMC === 'tsb' ? (direcaoOrdemPMC === 'asc' ? '▲' : '▼') : '↕'}</th>
                  <th onClick={() => ordenarDados('acwr', 'pmc')} style={{ padding: '18px 24px', textAlign: 'center', cursor: 'pointer', color: ordenarColunaPMC === 'acwr' ? '#38bdf8' : '#94a3b8' }}>Rácio ACWR {ordenarColunaPMC === 'acwr' ? (direcaoOrdemPMC === 'asc' ? '▲' : '▼') : '↕'}</th>
                  <th style={{ padding: '18px 24px', textAlign: 'center' }}>Alerta Preditivo de Lesão</th>
                </tr>
              </thead>
              <tbody>
                {plantelOrdenadoPMC.map((atleta) => {
                  const riscoLesao = atleta.acwr > 1.5;
                  return (
                    <tr key={atleta.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', backgroundColor: riscoLesao ? 'rgba(239,68,68,0.08)' : 'transparent' }}>
                      <td onClick={() => abrirFichaAtleta(atleta)} style={{ padding: '18px 24px', fontWeight: 'bold', color: '#38bdf8', cursor: 'pointer', textDecoration: 'underline' }}>{atleta.nome}</td>
                      <td style={{ padding: '18px 24px', textAlign: 'center', color: '#10b981', fontWeight: 'bold' }}>{atleta.ctl}</td>
                      <td style={{ padding: '18px 24px', textAlign: 'center', color: '#f59e0b', fontWeight: 'bold' }}>{atleta.atl}</td>
                      <td style={{ padding: '18px 24px', textAlign: 'center', color: atleta.tsb < 0 ? '#ef4444' : '#38bdf8', fontWeight: 'bold' }}>{atleta.tsb}</td>
                      <td style={{ padding: '18px 24px', textAlign: 'center', color: riscoLesao ? '#ef4444' : '#38bdf8', fontWeight: 'bold' }}>{atleta.acwr}</td>
                      <td style={{ padding: '18px 24px', textAlign: 'center' }}>
                        <span style={{ padding: '6px 12px', borderRadius: '8px', fontSize: '11px', fontWeight: 'bold', backgroundColor: riscoLesao ? 'rgba(239,68,68,0.2)' : 'rgba(16,185,129,0.2)', color: riscoLesao ? '#ef4444' : '#10b981', border: `1px solid ${riscoLesao ? '#ef4444' : '#10b981'}` }}>
                          {riscoLesao ? '⚠️ ALERTA: ACWR > 1.5' : 'Seguro / Ótimo'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MÓDULO 2: CALENDÁRIO OPERACIONAL (MODO CALENDÁRIO MENSAL VISUAL) */}
      {view === 'calendario' && (
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: config.cardColor, backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.1)', padding: '24px 32px', borderRadius: '24px', marginBottom: '28px', boxShadow: '0 20px 40px -15px rgba(0,0,0,0.8)' }}>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#22c55e', margin: 0, ...text3DStyle }}>📅 Calendário Operacional (Modo Mensal)</h2>
              <p style={{ color: '#94a3b8', fontSize: '12px', margin: '4px 0 0 0', ...text3DStyle }}>Visualização em grelha mensal de treinos, descanso (TSS=0) e jogos.</p>
            </div>
            <button onClick={() => setView('dashboard')} style={btnSecondary3D}>
              ← Voltar à Área de Trabalho
            </button>
          </header>

          <div style={{ backgroundColor: config.cardColor, backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.1)', padding: '28px', borderRadius: '24px', marginBottom: '28px', boxShadow: '0 20px 40px -15px rgba(0,0,0,0.8)' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#22c55e', marginBottom: '16px' }}>➕ Agendar Nova Sessão / Jogo</h3>
            <form onSubmit={adicionarSessaoCalendario} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', alignItems: 'flex-end' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Data</label>
                <input type="date" value={novoTreino.data} onChange={(e) => setNovoTreino({...novoTreino, data: e.target.value})} required style={{ width: '100%', padding: '10px', backgroundColor: 'rgba(15, 23, 42, 0.85)', border: '1px solid rgba(255,255,255,0.15)', color: 'white', borderRadius: '10px' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Tipo de Sessão / Evento</label>
                <select value={novoTreino.tipo} onChange={(e) => setNovoTreino({...novoTreino, tipo: e.target.value})} style={{ width: '100%', padding: '10px', backgroundColor: 'rgba(15, 23, 42, 0.85)', border: '1px solid rgba(255,255,255,0.15)', color: 'white', borderRadius: '10px' }}>
                  <option value="Treino Tático">Treino Tático</option>
                  <option value="Treino Físico (Força/CMJ)">Treino Físico (Força/CMJ)</option>
                  <option value="Descanso Total">Descanso Total (TSS = 0)</option>
                  <option value="Jogo Oficial">Jogo Oficial (Pico / Tapering)</option>
                  <option value="Jogo Amigável / Treino">Jogo Amigável / Treino (Rotação)</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Carga TSS</label>
                <input type="number" value={novoTreino.tss} onChange={(e) => setNovoTreino({...novoTreino, tss: Number(e.target.value)})} required style={{ width: '100%', padding: '10px', backgroundColor: 'rgba(15, 23, 42, 0.85)', border: '1px solid rgba(255,255,255,0.15)', color: 'white', borderRadius: '10px' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Descrição / Foco</label>
                <input type="text" value={novoTreino.desc} onChange={(e) => setNovoTreino({...novoTreino, desc: e.target.value})} required style={{ width: '100%', padding: '10px', backgroundColor: 'rgba(15, 23, 42, 0.85)', border: '1px solid rgba(255,255,255,0.15)', color: 'white', borderRadius: '10px' }} />
              </div>
              <button type="submit" style={{ ...btn3DStyle, padding: '10px 20px', fontSize: '14px', height: '42px' }}>
                Adicionar Sessão
              </button>
            </form>
          </div>

          {/* GRELHA DO CALENDÁRIO MENSAL */}
          <div style={{ backgroundColor: config.cardColor, backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.1)', padding: '28px', borderRadius: '24px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.8)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff', margin: 0 }}>Outubro 2026</h3>
              <input type="month" value={mesCalendario} onChange={(e) => setMesCalendario(e.target.value)} style={{ padding: '8px 12px', backgroundColor: 'rgba(15,23,42,0.85)', border: '1px solid rgba(255,255,255,0.15)', color: 'white', borderRadius: '10px' }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '10px', textAlign: 'center', marginBottom: '10px' }}>
              {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'].map(d => (
                <div key={d} style={{ fontWeight: 'bold', color: '#38bdf8', fontSize: '12px', padding: '8px' }}>{d}</div>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '10px' }}>
              {Array.from({ length: 31 }).map((_, index) => {
                const diaNum = index + 1;
                const diaStr = `2026-10-${diaNum < 10 ? '0' + diaNum : diaNum}`;
                const sessaoDia = calendarioSessoes.find(s => s.data === diaStr);

                let bgDia = 'rgba(15, 23, 42, 0.6)';
                let corBordo = 'rgba(255,255,255,0.08)';
                let tipoSessao = '';

                if (sessaoDia) {
                  if (sessaoDia.tipo.includes('Oficial')) {
                    bgDia = 'rgba(34, 197, 94, 0.2)';
                    corBordo = '#22c55e';
                    tipoSessao = '🏆 Jogo Oficial';
                  } else if (sessaoDia.tipo.includes('Descanso')) {
                    bgDia = 'rgba(100, 116, 139, 0.2)';
                    corBordo = '#64748b';
                    tipoSessao = '💤 Descanso (TSS=0)';
                  } else if (sessaoDia.tipo.includes('Amigável')) {
                    bgDia = 'rgba(59, 130, 246, 0.2)';
                    corBordo = '#3b82f6';
                    tipoSessao = '🤝 Amigável';
                  } else {
                    bgDia = 'rgba(245, 158, 11, 0.2)';
                    corBordo = '#f59e0b';
                    tipoSessao = '⚡ ' + sessaoDia.tipo;
                  }
                }

                return (
                  <div key={index} style={{ backgroundColor: bgDia, border: `1px solid ${corBordo}`, borderRadius: '14px', padding: '12px 8px', minHeight: '90px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 4px 10px rgba(0,0,0,0.3)' }}>
                    <div style={{ fontWeight: 'bold', fontSize: '13px', color: sessaoDia ? '#fff' : '#64748b' }}>{diaNum}</div>
                    {sessaoDia && (
                      <div>
                        <div style={{ fontSize: '10px', fontWeight: 'bold', color: corBordo, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{tipoSessao}</div>
                        <div style={{ fontSize: '9px', color: '#94a3b8' }}>TSS: {sessaoDia.tss}</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 4. GESTÃO DE PLANTEL (COM FILTROS DE ORDENAÇÃO) */}
      {view === 'plantel' && (
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: config.cardColor, backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.1)', padding: '24px 32px', borderRadius: '24px', marginBottom: '28px', boxShadow: '0 20px 40px -15px rgba(0,0,0,0.8)' }}>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#38bdf8', margin: 0, ...text3DStyle }}>👥 Plantel Oficial (22 Atletas)</h2>
              <p style={{ color: '#94a3b8', fontSize: '11px', margin: '4px 0 0 0', ...text3DStyle }}>💡 Clica nos cabeçalhos da tabela para ordenar por qualquer coluna.</p>
            </div>
            <button onClick={() => setView('dashboard')} style={btnSecondary3D}>
              ← Voltar à Área de Trabalho
            </button>
          </header>

          <div style={{ backgroundColor: config.cardColor, backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.8)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
              <thead>
                <tr style={{ backgroundColor: 'rgba(3, 7, 18, 0.75)', color: '#94a3b8', fontSize: '11px', textTransform: 'uppercase', borderBottom: '1px solid rgba(255,255,255,0.08)', ...text3DStyle }}>
                  <th onClick={() => ordenarDados('nome', 'plantel')} style={{ padding: '18px 24px', cursor: 'pointer', color: ordenarColuna === 'nome' ? '#38bdf8' : '#94a3b8' }}>Atleta {ordenarColuna === 'nome' ? (direcaoOrdem === 'asc' ? '▲' : '▼') : '↕'}</th>
                  <th onClick={() => ordenarDados('posicao', 'plantel')} style={{ padding: '18px 24px', textAlign: 'center', cursor: 'pointer', color: ordenarColuna === 'posicao' ? '#38bdf8' : '#94a3b8' }}>Posição {ordenarColuna === 'posicao' ? (direcaoOrdem === 'asc' ? '▲' : '▼') : '↕'}</th>
                  <th onClick={() => ordenarDados('peso', 'plantel')} style={{ padding: '18px 24px', textAlign: 'center', cursor: 'pointer', color: ordenarColuna === 'peso' ? '#38bdf8' : '#94a3b8' }}>Peso (kg) {ordenarColuna === 'peso' ? (direcaoOrdem === 'asc' ? '▲' : '▼') : '↕'}</th>
                  <th onClick={() => ordenarDados('altura', 'plantel')} style={{ padding: '18px 24px', textAlign: 'center', cursor: 'pointer', color: ordenarColuna === 'altura' ? '#38bdf8' : '#94a3b8' }}>Altura (m) {ordenarColuna === 'altura' ? (direcaoOrdem === 'asc' ? '▲' : '▼') : '↕'}</th>
                  <th onClick={() => ordenarDados('estado', 'plantel')} style={{ padding: '18px 24px', textAlign: 'center', cursor: 'pointer', color: ordenarColuna === 'estado' ? '#38bdf8' : '#94a3b8' }}>Estado {ordenarColuna === 'estado' ? (direcaoOrdem === 'asc' ? '▲' : '▼') : '↕'}</th>
                  <th style={{ padding: '18px 24px', textAlign: 'center' }}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {plantelOrdenado.map((atleta) => (
                  <tr key={atleta.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <td onClick={() => abrirFichaAtleta(atleta)} style={{ padding: '18px 24px', fontWeight: 'bold', color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', ...text3DStyle }} title="Ver Ficha Individual">
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22c55e', boxShadow: '0 0 10px #22c55e' }}></div>
                      <span style={{ textDecoration: 'underline' }}>{atleta.nome}</span>
                    </td>
                    <td style={{ padding: '18px 24px', textAlign: 'center', color: '#38bdf8' }}>{atleta.posicao}</td>
                    <td style={{ padding: '18px 24px', textAlign: 'center', color: '#10b981', fontWeight: 'bold' }}>{atleta.peso} kg</td>
                    <td style={{ padding: '18px 24px', textAlign: 'center', color: '#60a5fa' }}>{atleta.altura} m</td>
                    <td style={{ padding: '18px 24px', textAlign: 'center' }}>
                      <span style={{ 
                        padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 'bold',
                        backgroundColor: atleta.estado === 'Apto' ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)',
                        color: atleta.estado === 'Apto' ? '#10b981' : '#ef4444'
                      }}>
                        {atleta.estado}
                      </span>
                    </td>
                    <td style={{ padding: '18px 24px', textAlign: 'center' }}>
                      <button onClick={() => abrirFichaAtleta(atleta)} style={{ backgroundColor: '#15803d', backgroundImage: 'linear-gradient(to bottom, #22c55e, #15803d)', border: 'none', borderBottom: '2px solid #064e3b', color: 'white', padding: '8px 16px', borderRadius: '8px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.4)', ...text3DStyle }}>
                        Ver Ficha
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MÓDULO UNIFICADO: UPDATE (I/O) */}
      {view === 'update' && (
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: config.cardColor, backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.1)', padding: '24px 32px', borderRadius: '24px', marginBottom: '28px', boxShadow: '0 20px 40px -15px rgba(0,0,0,0.8)' }}>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#60a5fa', margin: 0, ...text3DStyle }}>🔄 Módulo UPDATE (Import / Export)</h2>
              <p style={{ color: '#94a3b8', fontSize: '12px', margin: '4px 0 0 0', ...text3DStyle }}>Sincronização de relatórios Excel e exportação de dados da equipa.</p>
            </div>
            <button onClick={() => setView('dashboard')} style={btnSecondary3D}>
              ← Voltar à Área de Trabalho
            </button>
          </header>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            <div style={{ backgroundColor: config.cardColor, backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '24px', padding: '32px', textAlign: 'center' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>📂</div>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#60a5fa', marginBottom: '10px' }}>Importar Relatório Excel</h3>
              <p style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '20px' }}>Atualiza o plantel com o ficheiro <code>athletes_report.xlsx</code>.</p>
              <input type="file" accept=".xlsx, .xls" onChange={simularImportacaoExcel} style={{ display: 'none' }} id="file-update-upload" />
              <label htmlFor="file-update-upload" style={{ ...btn3DStyle, display: 'inline-block', cursor: 'pointer', padding: '12px 24px', fontSize: '14px' }}>
                Carregar Excel
              </label>
            </div>

            <div style={{ backgroundColor: config.cardColor, backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '24px', padding: '32px', textAlign: 'center' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>📤</div>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#f59e0b', marginBottom: '10px' }}>Exportar Dados da Equipa</h3>
              <p style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '20px' }}>Descarrega a folha completa de dados estatísticos em formato CSV/Excel.</p>
              <button onClick={exportarExcelEquipa} style={btn3DStyle}>
                Descarregar Excel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* JOGO */}
      {view === 'jogo' && (
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: config.cardColor, backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.1)', padding: '24px 32px', borderRadius: '24px', marginBottom: '28px', boxShadow: '0 20px 40px -15px rgba(0,0,0,0.8)' }}>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#22c55e', margin: 0, ...text3DStyle }}>⏱️ Relatório de Jogo Detalhado por Jornada</h2>
            </div>
            <button onClick={() => setView('dashboard')} style={btnSecondary3D}>
              ← Voltar à Área de Trabalho
            </button>
          </header>

          <div style={{ backgroundColor: config.cardColor, backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.1)', padding: '28px', borderRadius: '24px', marginBottom: '28px', boxShadow: '0 20px 40px -15px rgba(0,0,0,0.8)' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#38bdf8', marginBottom: '16px' }}>📝 Dados do Jogo Atual</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Adversário</label>
                <input type="text" value={jornadaAtual.adversario} onChange={(e) => setJornadaAtual({...jornadaAtual, adversario: e.target.value})} style={{ width: '100%', padding: '10px', backgroundColor: 'rgba(15, 23, 42, 0.85)', border: '1px solid rgba(255,255,255,0.15)', color: 'white', borderRadius: '10px' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Data</label>
                <input type="date" value={jornadaAtual.data} onChange={(e) => setJornadaAtual({...jornadaAtual, data: e.target.value})} style={{ width: '100%', padding: '10px', backgroundColor: 'rgba(15, 23, 42, 0.85)', border: '1px solid rgba(255,255,255,0.15)', color: 'white', borderRadius: '10px' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Golos GMDUP</label>
                <input type="number" value={jornadaAtual.golsEquipa} onChange={(e) => setJornadaAtual({...jornadaAtual, golsEquipa: Number(e.target.value)})} style={{ width: '100%', padding: '10px', backgroundColor: 'rgba(15, 23, 42, 0.85)', border: '1px solid rgba(255,255,255,0.15)', color: 'white', borderRadius: '10px' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Golos Adversário</label>
                <input type="number" value={jornadaAtual.golsAdversario} onChange={(e) => setJornadaAtual({...jornadaAtual, golsAdversario: Number(e.target.value)})} style={{ width: '100%', padding: '10px', backgroundColor: 'rgba(15, 23, 42, 0.85)', border: '1px solid rgba(255,255,255,0.15)', color: 'white', borderRadius: '10px' }} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ANTROPOMETRIA */}
      {view === 'antropometria' && (
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: config.cardColor, backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.1)', padding: '24px 32px', borderRadius: '24px', marginBottom: '28px', boxShadow: '0 20px 40px -15px rgba(0,0,0,0.8)' }}>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#38bdf8', margin: 0, ...text3DStyle }}>📏 Antropometria & Dados Biológicos</h2>
            </div>
            <button onClick={() => setView('dashboard')} style={btnSecondary3D}>
              ← Voltar à Área de Trabalho
            </button>
          </header>
        </div>
      )}

      {/* CONVOCATORIA */}
      {view === 'convocatoria' && (
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: config.cardColor, backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.1)', padding: '24px 32px', borderRadius: '24px', marginBottom: '28px', boxShadow: '0 20px 40px -15px rgba(0,0,0,0.8)' }}>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#22c55e', margin: 0, ...text3DStyle }}>📋 Gestão de Convocatória</h2>
            </div>
            <button onClick={() => setView('dashboard')} style={btnSecondary3D}>
              ← Voltar à Área de Trabalho
            </button>
          </header>
        </div>
      )}

      {/* CLINICO (COM FILTROS DE ORDENAÇÃO) */}
      {view === 'clinico' && (
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: config.cardColor, backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.1)', padding: '24px 32px', borderRadius: '24px', marginBottom: '28px', boxShadow: '0 20px 40px -15px rgba(0,0,0,0.8)' }}>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#ef4444', margin: 0, ...text3DStyle }}>🏥 Departamento Clínico & Gestão de Lesões</h2>
              <p style={{ color: '#94a3b8', fontSize: '12px', margin: '4px 0 0 0', ...text3DStyle }}>💡 Clica nos cabeçalhos para ordenar por atleta ou estado clínico.</p>
            </div>
            <button onClick={() => setView('dashboard')} style={btnSecondary3D}>
              ← Voltar à Área de Trabalho
            </button>
          </header>

          <div style={{ backgroundColor: config.cardColor, backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.8)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
              <thead>
                <tr style={{ backgroundColor: 'rgba(3, 7, 18, 0.75)', color: '#94a3b8', fontSize: '11px', textTransform: 'uppercase', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  <th onClick={() => ordenarDados('nome', 'clinico')} style={{ padding: '18px 24px', cursor: 'pointer', color: ordenarColunaClinico === 'nome' ? '#38bdf8' : '#94a3b8' }}>Atleta {ordenarColunaClinico === 'nome' ? (direcaoOrdemClinico === 'asc' ? '▲' : '▼') : '↕'}</th>
                  <th onClick={() => ordenarDados('estado', 'clinico')} style={{ padding: '18px 24px', textAlign: 'center', cursor: 'pointer', color: ordenarColunaClinico === 'estado' ? '#38bdf8' : '#94a3b8' }}>Estado Clínico {ordenarColunaClinico === 'estado' ? (direcaoOrdemClinico === 'asc' ? '▲' : '▼') : '↕'}</th>
                  <th style={{ padding: '18px 24px', textAlign: 'center' }}>Tipo de Lesão</th>
                  <th style={{ padding: '18px 24px', textAlign: 'center' }}>Previsão de Regresso</th>
                </tr>
              </thead>
              <tbody>
                {plantelOrdenadoClinico.map((atleta) => (
                  <tr key={atleta.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <td onClick={() => abrirFichaAtleta(atleta)} style={{ padding: '18px 24px', fontWeight: 'bold', color: '#38bdf8', cursor: 'pointer', textDecoration: 'underline' }}>{atleta.nome}</td>
                    <td style={{ padding: '18px 24px', textAlign: 'center' }}>
                      <span style={{ padding: '6px 12px', borderRadius: '8px', fontSize: '11px', fontWeight: 'bold', backgroundColor: atleta.estado === 'Apto' ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)', color: atleta.estado === 'Apto' ? '#10b981' : '#ef4444' }}>{atleta.estado}</span>
                    </td>
                    <td style={{ padding: '18px 24px', textAlign: 'center', color: atleta.lesao === 'Nenhuma' ? '#94a3b8' : '#fca5a5', fontWeight: 'bold' }}>{atleta.lesao}</td>
                    <td style={{ padding: '18px 24px', textAlign: 'center', color: '#38bdf8', fontWeight: 'bold' }}>{atleta.previsao}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* STATS */}
      {view === 'stats' && (
        <div style={{ maxWidth: '1350px', margin: '0 auto' }}>
          <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: config.cardColor, backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.1)', padding: '24px 32px', borderRadius: '24px', marginBottom: '28px', boxShadow: '0 20px 40px -15px rgba(0,0,0,0.8)' }}>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#10b981', margin: 0, ...text3DStyle }}>⚽ Relatório Oficial & Ações Técnico-Táticas (21 Parâmetros do Excel)[cite: 1]</h2>
            </div>
            <button onClick={() => setView('dashboard')} style={btnSecondary3D}>
              ← Voltar à Área de Trabalho
            </button>
          </header>
        </div>
      )}

      {/* FICHA INDIVIDUAL COMPLETA (AGREGA TODA A INFORMAÇÃO DO ATLETA) */}
      {view === 'ficha' && atletaSelecionado && (() => {
        const fcMaxTanaka = calcularTanakaFCMax(atletaSelecionado.idade);
        const zonasKarvonen = calcularZonasKarvonen(fcMaxTanaka, atletaSelecionado.fcRep);
        const variacaoCMJ = calcularVariacaoCMJ(atletaSelecionado.cmj, atletaSelecionado.cmjBase);
        const semafaroCMJ = obterSemafaroCMJ(variacaoCMJ);
        const variacaoPeso = Number((atletaSelecionado.peso - atletaSelecionado.pesoBase).toFixed(1));

        return (
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: config.cardColor, backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.1)', padding: '24px 32px', borderRadius: '24px', marginBottom: '28px', boxShadow: '0 20px 40px -15px rgba(0,0,0,0.8)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
                <img src={config.logoUrl} alt="Logo" style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '50%', border: '2px solid #eab308', boxShadow: '0 4px 10px rgba(0,0,0,0.6)' }} />
                <div>
                  <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#ffffff', margin: 0, ...text3DStyle }}>Ficha Individual Completa: {atletaSelecionado.nome} ({atletaSelecionado.posicao})</h2>
                  <p style={{ color: '#94a3b8', fontSize: '12px', margin: '4px 0 0 0', ...text3DStyle }}>Nasc: {atletaSelecionado.nasc} ({atletaSelecionado.idade} anos) | PHV Offset: {atletaSelecionado.phvOffset}</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={() => exportarPDFAtleta(atletaSelecionado)} style={{ ...btnSecondary3D, backgroundColor: '#0284c7' }}>
                  🖨 Exportar PDF
                </button>
                <button onClick={() => setView('plantel')} style={btnSecondary3D}>
                  ← Voltar
                </button>
              </div>
            </header>

            {/* Bloco 1: Biometria e Antropometria */}
            <div style={{ backgroundColor: config.cardColor, backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.1)', padding: '28px', borderRadius: '24px', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#38bdf8', marginBottom: '16px' }}>📏 Biometria & Antropometria</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                <div style={{ backgroundColor: 'rgba(15,23,42,0.6)', padding: '16px', borderRadius: '12px' }}>
                  <span style={{ color: '#94a3b8', fontSize: '12px' }}>Altura Total</span>
                  <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff', margin: '6px 0 0 0' }}>{atletaSelecionado.altura} m</p>
                </div>
                <div style={{ backgroundColor: 'rgba(15,23,42,0.6)', padding: '16px', borderRadius: '12px' }}>
                  <span style={{ color: '#94a3b8', fontSize: '12px' }}>Peso Base vs Atual</span>
                  <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#10b981', margin: '6px 0 0 0' }}>{atletaSelecionado.pesoBase} kg → {atletaSelecionado.peso} kg</p>
                </div>
                <div style={{ backgroundColor: 'rgba(15,23,42,0.6)', padding: '16px', borderRadius: '12px' }}>
                  <span style={{ color: '#94a3b8', fontSize: '12px' }}>Variação Ponderal</span>
                  <p style={{ fontSize: '20px', fontWeight: 'bold', color: variacaoPeso > 0 ? '#f59e0b' : '#38bdf8', margin: '6px 0 0 0' }}>{variacaoPeso > 0 ? `+${variacaoPeso}` : variacaoPeso} kg</p>
                </div>
              </div>
            </div>

            {/* Bloco 2: Controlo Neuromuscular (CMJ) */}
            <div style={{ backgroundColor: config.cardColor, backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.1)', padding: '28px', borderRadius: '24px', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#22c55e', marginBottom: '16px' }}>⚡ Controlo Neuromuscular (CMJ)</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', alignItems: 'center' }}>
                <div style={{ backgroundColor: 'rgba(15,23,42,0.6)', padding: '16px', borderRadius: '12px' }}>
                  <span style={{ color: '#94a3b8', fontSize: '12px' }}>Salto Base vs Atual</span>
                  <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff', margin: '6px 0 0 0' }}>{atletaSelecionado.cmjBase} cm → {atletaSelecionado.cmj} cm</p>
                </div>
                <div style={{ backgroundColor: 'rgba(15,23,42,0.6)', padding: '16px', borderRadius: '12px' }}>
                  <span style={{ color: '#94a3b8', fontSize: '12px' }}>Variação Percentual</span>
                  <p style={{ fontSize: '20px', fontWeight: 'bold', color: variacaoCMJ >= 0 ? '#10b981' : '#ef4444', margin: '6px 0 0 0' }}>{variacaoCMJ >= 0 ? `+${variacaoCMJ}%` : `${variacaoCMJ}%`}</p>
                </div>
                <div style={{ backgroundColor: semafaroCMJ.bg, padding: '16px', borderRadius: '12px', border: `1px solid ${semafaroCMJ.cor}` }}>
                  <span style={{ color: '#94a3b8', fontSize: '12px' }}>Semáforo de Fadiga</span>
                  <p style={{ fontSize: '15px', fontWeight: 'bold', color: semafaroCMJ.cor, margin: '6px 0 0 0' }}>{semafaroCMJ.texto}</p>
                </div>
              </div>
            </div>

            {/* Bloco 3: Zonas Cardíacas e Fisiologia */}
            <div style={{ backgroundColor: config.cardColor, backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.1)', padding: '28px', borderRadius: '24px', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#f59e0b', marginBottom: '16px' }}>❤️ Fisiologia & Zonas de Treino (Tanaka & Karvonen)</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                <div style={{ backgroundColor: 'rgba(15,23,42,0.6)', padding: '14px', borderRadius: '10px' }}>
                  <span style={{ color: '#94a3b8', fontSize: '12px' }}>Pressão Arterial</span>
                  <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff', margin: '4px 0 0 0' }}>{atletaSelecionado.pa} mmHg</p>
                </div>
                <div style={{ backgroundColor: 'rgba(15,23,42,0.6)', padding: '14px', borderRadius: '10px' }}>
                  <span style={{ color: '#94a3b8', fontSize: '12px' }}>FC Repouso</span>
                  <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#38bdf8', margin: '4px 0 0 0' }}>{atletaSelecionado.fcRep} bpm</p>
                </div>
                <div style={{ backgroundColor: 'rgba(15,23,42,0.6)', padding: '14px', borderRadius: '10px' }}>
                  <span style={{ color: '#94a3b8', fontSize: '12px' }}>FC Máxima (Tanaka)</span>
                  <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#ef4444', margin: '4px 0 0 0' }}>{fcMaxTanaka} bpm</p>
                </div>
              </div>
              <div style={{ backgroundColor: 'rgba(15,23,42,0.7)', padding: '14px', borderRadius: '12px' }}>
                <span style={{ color: '#38bdf8', fontSize: '12px', fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>Zonas Karvonen:</span>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '8px', fontSize: '11px', textAlign: 'center' }}>
                  <div style={{ backgroundColor: 'rgba(16,185,129,0.15)', padding: '8px', borderRadius: '6px' }}><strong style={{ color: '#10b981' }}>Z1:</strong> {zonasKarvonen.z1}</div>
                  <div style={{ backgroundColor: 'rgba(56,189,248,0.15)', padding: '8px', borderRadius: '6px' }}><strong style={{ color: '#38bdf8' }}>Z2:</strong> {zonasKarvonen.z2}</div>
                  <div style={{ backgroundColor: 'rgba(245,158,11,0.15)', padding: '8px', borderRadius: '6px' }}><strong style={{ color: '#f59e0b' }}>Z3:</strong> {zonasKarvonen.z3}</div>
                  <div style={{ backgroundColor: 'rgba(239,68,68,0.15)', padding: '8px', borderRadius: '6px' }}><strong style={{ color: '#ef4444' }}>Z4:</strong> {zonasKarvonen.z4}</div>
                  <div style={{ backgroundColor: 'rgba(168,85,247,0.15)', padding: '8px', borderRadius: '6px' }}><strong style={{ color: '#a855f7' }}>Z5:</strong> {zonasKarvonen.z5}</div>
                </div>
              </div>
            </div>

            {/* Bloco 4: Estado Clínico, Nutrição, Notas e Estatísticas do Excel */}
            <div style={{ backgroundColor: config.cardColor, backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.1)', padding: '28px', borderRadius: '24px', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#ef4444', marginBottom: '16px' }}>🏥 Estatísticas, Clínica & Notas Técnicas</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                <div style={{ backgroundColor: 'rgba(15,23,42,0.6)', padding: '16px', borderRadius: '12px' }}>
                  <span style={{ color: '#94a3b8', fontSize: '12px' }}>Estado Clínico & Lesão</span>
                  <p style={{ fontSize: '15px', fontWeight: 'bold', color: atletaSelecionado.estado === 'Apto' ? '#10b981' : '#ef4444', margin: '6px 0 0 0' }}>{atletaSelecionado.estado} — {atletaSelecionado.lesao} (Regresso: {atletaSelecionado.previsao})</p>
                </div>
                <div style={{ backgroundColor: 'rgba(15,23,42,0.6)', padding: '16px', borderRadius: '12px' }}>
                  <span style={{ color: '#94a3b8', fontSize: '12px' }}>Nutrição & Suplementação</span>
                  <p style={{ fontSize: '14px', color: '#38bdf8', margin: '6px 0 0 0' }}>{atletaSelecionado.nutricao}</p>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px', marginBottom: '16px' }}>
                <div style={{ backgroundColor: 'rgba(15,23,42,0.6)', padding: '12px', borderRadius: '10px', textAlign: 'center' }}>
                  <span style={{ color: '#94a3b8', fontSize: '11px' }}>Treinos</span>
                  <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff', margin: '4px 0 0 0' }}>{atletaSelecionado.treinos}</p>
                </div>
                <div style={{ backgroundColor: 'rgba(15,23,42,0.6)', padding: '12px', borderRadius: '10px', textAlign: 'center' }}>
                  <span style={{ color: '#94a3b8', fontSize: '11px' }}>Minutos Treino</span>
                  <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#60a5fa', margin: '4px 0 0 0' }}>{atletaSelecionado.minTreino}</p>
                </div>
                <div style={{ backgroundColor: 'rgba(15,23,42,0.6)', padding: '12px', borderRadius: '10px', textAlign: 'center' }}>
                  <span style={{ color: '#94a3b8', fontSize: '11px' }}>Jogos</span>
                  <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff', margin: '4px 0 0 0' }}>{atletaSelecionado.jogos}</p>
                </div>
                <div style={{ backgroundColor: 'rgba(15,23,42,0.6)', padding: '12px', borderRadius: '10px', textAlign: 'center' }}>
                  <span style={{ color: '#94a3b8', fontSize: '11px' }}>Minutos Jogo</span>
                  <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#10b981', margin: '4px 0 0 0' }}>{atletaSelecionado.minJogo}</p>
                </div>
                <div style={{ backgroundColor: 'rgba(15,23,42,0.6)', padding: '12px', borderRadius: '10px', textAlign: 'center' }}>
                  <span style={{ color: '#94a3b8', fontSize: '11px' }}>Golos</span>
                  <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#10b981', margin: '4px 0 0 0' }}>{atletaSelecionado.golos}</p>
                </div>
                <div style={{ backgroundColor: 'rgba(15,23,42,0.6)', padding: '12px', borderRadius: '10px', textAlign: 'center' }}>
                  <span style={{ color: '#94a3b8', fontSize: '11px' }}>Assistências</span>
                  <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#60a5fa', margin: '4px 0 0 0' }}>{atletaSelecionado.assistencias}</p>
                </div>
              </div>

              <div style={{ backgroundColor: 'rgba(15,23,42,0.6)', padding: '16px', borderRadius: '12px' }}>
                <span style={{ color: '#94a3b8', fontSize: '12px' }}>Notas Confidenciais / Acompanhamento Técnico</span>
                <p style={{ fontSize: '14px', color: '#fff', margin: '6px 0 0 0', fontStyle: 'italic' }}>"{atletaSelecionado.notas}"</p>
              </div>
            </div>

          </div>
        );
      })()}

      {/* ADMIN */}
      {view === 'admin' && (
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: config.cardColor, backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.1)', padding: '24px 32px', borderRadius: '24px', marginBottom: '28px', boxShadow: '0 20px 40px -15px rgba(0,0,0,0.8)' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#38bdf8', margin: 0, ...text3DStyle }}>Painel de Controlo da Plataforma</h2>
            <button onClick={() => setView('dashboard')} style={btnSecondary3D}>
              ← Voltar à Área de Trabalho
            </button>
          </header>
        </div>
      )}

    </div>
  );
}