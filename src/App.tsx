import React, { useState } from 'react';

export default function App() {
  const [view, setView] = useState<'landing' | 'login' | 'dashboard' | 'plantel' | 'stats' | 'analytics' | 'fisiologia' | 'ficha' | 'convocatoria' | 'treino' | 'clinico' | 'antropometria' | 'admin'>('landing');
  
  const [emailInput, setEmailInput] = useState('');
  const [passInput, setPassInput] = useState('');
  const [erroLogin, setErroLogin] = useState('');
  
  const [utilizadorLogado, setUtilizadorLogado] = useState<any>(null);
  const [atletaSelecionado, setAtletaSelecionado] = useState<any>(null);

  // Estados para ordenação de colunas
  const [ordenarColuna, setOrdenarColuna] = useState<string>('nome');
  const [direcaoOrdem, setDirecaoOrdem] = useState<'asc' | 'desc'>('asc');

  // Atletas convocados para o próximo jogo
  const [convocados, setConvocados] = useState<number[]>([5, 10, 18, 19, 22, 1, 4, 8, 12, 13, 15, 16, 17, 20]);

  // Registo histórico de Antropometria (Controlo Temporal por Data)
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

  // Base de dados completa dos 22 atletas extraída diretamente de athletes_report.xlsx[cite: 1]
  const plantel = [
    { id: 1, nome: "Agostinho", posicao: "Ala", nasc: "2011-03-12", idade: 15, pesoBase: 57.2, peso: 58.0, altura: 1.70, cmjBase: 40.0, cmj: 38.2, pa: "116/74", fcRep: 60, phvOffset: "+1.2", treinos: 12, minTreino: 1200, jogos: 5, minJogo: 40, titular: 0, suplente: 4, golos: 0, assistencias: 0, subEntra: 0, subSai: 0, amarelo: 0, intercecao: 0, segundoAmarelo: 0, vermelho: 0, recuperacao: 0, autoGolo: 0, faltaSofrida: 0, faltaCometida: 0, perdaBola: 0, goloSofrido: 0, acwr: 1.05, rpeMedio: 7.2, cargaSessao: 648, estado: "Apto", lesao: "Nenhuma", previsao: "Disponível", nutricao: "Hidratação isotónica + Tailwind", notas: "Excelente disciplina tática e capacidade de transição." },
    { id: 2, nome: "André Pereira", posicao: "Fixo", nasc: "2011-06-20", idade: 15, pesoBase: 59.8, peso: 60.5, altura: 1.73, cmjBase: 39.0, cmj: 39.1, pa: "118/76", fcRep: 62, phvOffset: "+1.4", treinos: 12, minTreino: 1200, jogos: 5, minJogo: 48, titular: 0, suplente: 4, golos: 0, assistencias: 0, subEntra: 0, subSai: 0, amarelo: 0, intercecao: 0, segundoAmarelo: 0, vermelho: 0, recuperacao: 0, autoGolo: 0, faltaSofrida: 0, faltaCometida: 0, perdaBola: 0, goloSofrido: 0, acwr: 1.08, rpeMedio: 7.5, cargaSessao: 675, estado: "Apto", lesao: "Nenhuma", previsao: "Disponível", nutricao: "Maltodextrina pré-treino", notas: "Bom sentido de cobertura defensiva." },
    { id: 3, nome: "André Silva", posicao: "Pivot", nasc: "2011-09-05", idade: 15, pesoBase: 56.5, peso: 57.0, altura: 1.68, cmjBase: 37.0, cmj: 36.5, pa: "115/72", fcRep: 64, phvOffset: "+1.0", treinos: 9, minTreino: 915, jogos: 3, minJogo: 23, titular: 0, suplente: 2, golos: 0, assistencias: 0, subEntra: 0, subSai: 0, amarelo: 0, intercecao: 0, segundoAmarelo: 0, vermelho: 0, recuperacao: 0, autoGolo: 0, faltaSofrida: 0, faltaCometida: 0, perdaBola: 0, goloSofrido: 0, acwr: 0.95, rpeMedio: 6.8, cargaSessao: 520, estado: "Apto", lesao: "Nenhuma", previsao: "Disponível", nutricao: "Proteína de soro pós-treino", notas: "Forte jogo de costas para a baliza." },
    { id: 4, nome: "Baião", posicao: "Ala", nasc: "2011-01-18", idade: 15, pesoBase: 60.2, peso: 61.0, altura: 1.74, cmjBase: 38.5, cmj: 37.8, pa: "120/78", fcRep: 59, phvOffset: "+1.5", treinos: 12, minTreino: 1200, jogos: 6, minJogo: 81, titular: 2, suplente: 3, golos: 0, assistencias: 0, subEntra: 0, subSai: 0, amarelo: 0, intercecao: 0, segundoAmarelo: 0, vermelho: 0, recuperacao: 0, autoGolo: 0, faltaSofrida: 0, faltaCometida: 0, perdaBola: 0, goloSofrido: 0, acwr: 1.12, rpeMedio: 7.8, cargaSessao: 710, estado: "Apto", lesao: "Nenhuma", previsao: "Disponível", nutricao: "Gel energético de rápida absorção", notas: "Grande raio de ação ofensiva." },
    { id: 5, nome: "Diogo", posicao: "Guarda-Redes", nasc: "2011-04-10", idade: 15, pesoBase: 61.2, peso: 62.0, altura: 1.75, cmjBase: 39.5, cmj: 41.0, pa: "114/70", fcRep: 58, phvOffset: "+1.6", treinos: 10, minTreino: 990, jogos: 6, minJogo: 116, titular: 6, suplente: 0, golos: 0, assistencias: 0, subEntra: 0, subSai: 0, amarelo: 0, intercecao: 0, segundoAmarelo: 0, vermelho: 0, recuperacao: 0, autoGolo: 0, faltaSofrida: 0, faltaCometida: 0, perdaBola: 0, goloSofrido: 0, acwr: 1.25, rpeMedio: 8.2, cargaSessao: 790, estado: "Apto", lesao: "Nenhuma", previsao: "Disponível", nutricao: "Hidratação avançada com eletrólitos", notas: "Excelente jogo de pés e liderança defensiva." },
    { id: 6, nome: "Diogo Andrade", posicao: "Ala", nasc: "2011-12-01", idade: 14, pesoBase: 56.0, peso: 56.5, altura: 1.67, cmjBase: 36.0, cmj: 35.2, pa: "112/70", fcRep: 63, phvOffset: "+0.8", treinos: 8, minTreino: 740, jogos: 3, minJogo: 35, titular: 0, suplente: 3, golos: 0, assistencias: 0, subEntra: 0, subSai: 0, amarelo: 0, intercecao: 0, segundoAmarelo: 0, vermelho: 0, recuperacao: 0, autoGolo: 0, faltaSofrida: 0, faltaCometida: 0, perdaBola: 0, goloSofrido: 0, acwr: 0.90, rpeMedio: 6.5, cargaSessao: 480, estado: "Apto", lesao: "Nenhuma", previsao: "Disponível", nutricao: "Dieta equilibrada padrão", notas: "Atleta em fase de afirmação no modelo tático." },
    { id: 7, nome: "Enzo Almeida", posicao: "Universal", nasc: "2011-08-14", idade: 15, pesoBase: 54.5, peso: 55.0, altura: 1.65, cmjBase: 34.5, cmj: 34.0, pa: "110/68", fcRep: 65, phvOffset: "+0.7", treinos: 7, minTreino: 735, jogos: 1, minJogo: 0, titular: 0, suplente: 0, golos: 0, assistencias: 0, subEntra: 0, subSai: 0, amarelo: 0, intercecao: 0, segundoAmarelo: 0, vermelho: 0, recuperacao: 0, autoGolo: 0, faltaSofrida: 0, faltaCometida: 0, perdaBola: 0, goloSofrido: 0, acwr: 0.82, rpeMedio: 6.0, cargaSessao: 420, estado: "Apto", lesao: "Nenhuma", previsao: "Disponível", nutricao: "Reforço calórico ligeiro", notas: "Polivalência interessante nas posições de rotação." },
    { id: 8, nome: "Guilherme", posicao: "Fixo", nasc: "2011-02-22", idade: 15, pesoBase: 58.5, peso: 59.0, altura: 1.71, cmjBase: 38.0, cmj: 38.0, pa: "116/74", fcRep: 61, phvOffset: "+1.3", treinos: 11, minTreino: 1090, jogos: 5, minJogo: 55, titular: 1, suplente: 3, golos: 0, assistencias: 0, subEntra: 0, subSai: 0, amarelo: 0, intercecao: 0, segundoAmarelo: 0, vermelho: 0, recuperacao: 0, autoGolo: 0, faltaSofrida: 0, faltaCometida: 0, perdaBola: 0, goloSofrido: 0, acwr: 1.02, rpeMedio: 7.0, cargaSessao: 610, estado: "Apto", lesao: "Nenhuma", previsao: "Disponível", nutricao: "Maltodextrina e barras energéticas", notas: "Sólido nos duelos defensivos individuais." },
    { id: 9, nome: "Ivo Aguiar", posicao: "Ala", nasc: "2011-05-30", idade: 15, pesoBase: 58.0, peso: 58.5, altura: 1.70, cmjBase: 37.5, cmj: 37.5, pa: "115/72", fcRep: 60, phvOffset: "+1.1", treinos: 11, minTreino: 1080, jogos: 6, minJogo: 53, titular: 0, suplente: 4, golos: 0, assistencias: 0, subEntra: 0, subSai: 0, amarelo: 0, intercecao: 0, segundoAmarelo: 0, vermelho: 0, recuperacao: 0, autoGolo: 0, faltaSofrida: 0, faltaCometida: 0, perdaBola: 0, goloSofrido: 0, acwr: 1.00, rpeMedio: 7.1, cargaSessao: 620, estado: "Apto", lesao: "Nenhuma", previsao: "Disponível", nutricao: "Hidratação padrão", notas: "Boa capacidade de progressão lateral com bola." },
    { id: 10, nome: "Jacob M.", posicao: "Pivot", nasc: "2011-10-12", idade: 15, pesoBase: 62.0, peso: 63.0, altura: 1.76, cmjBase: 39.5, cmj: 40.5, pa: "122/80", fcRep: 57, phvOffset: "+1.7", treinos: 12, minTreino: 1200, jogos: 6, minJogo: 114, titular: 5, suplente: 1, golos: 0, assistencias: 0, subEntra: 0, subSai: 0, amarelo: 0, intercecao: 0, segundoAmarelo: 0, vermelho: 0, recuperacao: 0, autoGolo: 0, faltaSofrida: 0, faltaCometida: 0, perdaBola: 0, goloSofrido: 0, acwr: 1.22, rpeMedio: 8.0, cargaSessao: 760, estado: "Apto", lesao: "Nenhuma", previsao: "Disponível", nutricao: "Suplementação proteica intensiva", notas: "Atleta referência na finalização e apoio frontal." },
    { id: 11, nome: "José M.", posicao: "Ala", nasc: "2011-07-19", idade: 15, pesoBase: 54.5, peso: 54.0, altura: 1.64, cmjBase: 35.0, cmj: 33.5, pa: "110/68", fcRep: 66, phvOffset: "+0.6", treinos: 5, minTreino: 555, jogos: 2, minJogo: 14, titular: 0, suplente: 1, golos: 0, assistencias: 0, subEntra: 0, subSai: 0, amarelo: 0, intercecao: 0, segundoAmarelo: 0, vermelho: 0, recuperacao: 0, autoGolo: 0, faltaSofrida: 0, faltaCometida: 0, perdaBola: 0, goloSofrido: 0, acwr: 0.78, rpeMedio: 5.5, cargaSessao: 310, estado: "Recuperação", lesao: "Entorse Tornozelo Esq.", previsao: "1 Semana", nutricao: "Suplemento de colagénio e ómega-3", notas: "Em processo de reabilitação com o departamento clínico." },
    { id: 12, nome: "Liedson Tavares", posicao: "Ala", nasc: "2011-03-25", idade: 15, pesoBase: 59.5, peso: 60.0, altura: 1.72, cmjBase: 38.0, cmj: 38.9, pa: "117/75", fcRep: 61, phvOffset: "+1.2", treinos: 10, minTreino: 990, jogos: 6, minJogo: 82, titular: 3, suplente: 2, golos: 0, assistencias: 0, subEntra: 0, subSai: 0, amarelo: 0, intercecao: 0, segundoAmarelo: 0, vermelho: 0, recuperacao: 0, autoGolo: 0, faltaSofrida: 0, faltaCometida: 0, perdaBola: 0, goloSofrido: 0, acwr: 1.10, rpeMedio: 7.4, cargaSessao: 650, estado: "Apto", lesao: "Nenhuma", previsao: "Disponível", nutricao: "Tailwind e hidratos complexos", notas: "Forte ritmo de transição defesa-ataque." },
    { id: 13, nome: "Lourenço", posicao: "Fixo", nasc: "2011-01-05", idade: 15, pesoBase: 60.0, peso: 60.8, altura: 1.73, cmjBase: 38.0, cmj: 39.0, pa: "118/76", fcRep: 60, phvOffset: "+1.3", treinos: 12, minTreino: 1200, jogos: 6, minJogo: 84, titular: 2, suplente: 3, golos: 0, assistencias: 0, subEntra: 0, subSai: 0, amarelo: 0, intercecao: 0, segundoAmarelo: 0, vermelho: 0, recuperacao: 0, autoGolo: 0, faltaSofrida: 0, faltaCometida: 0, perdaBola: 0, goloSofrido: 0, acwr: 1.15, rpeMedio: 7.6, cargaSessao: 680, estado: "Apto", lesao: "Nenhuma", previsao: "Disponível", nutricao: "Bebida isotónica regular", notas: "Excelente leitura do timing de interceção." },
    { id: 14, nome: "Lourenço Cerqueira", posicao: "Ala", nasc: "2011-11-15", idade: 14, pesoBase: 57.0, peso: 57.5, altura: 1.69, cmjBase: 36.5, cmj: 36.0, pa: "114/72", fcRep: 62, phvOffset: "+0.9", treinos: 8, minTreino: 825, jogos: 4, minJogo: 38, titular: 0, suplente: 3, golos: 0, assistencias: 0, subEntra: 0, subSai: 0, amarelo: 0, intercecao: 0, segundoAmarelo: 0, vermelho: 0, recuperacao: 0, autoGolo: 0, faltaSofrida: 0, faltaCometida: 0, perdaBola: 0, goloSofrido: 0, acwr: 0.96, rpeMedio: 6.9, cargaSessao: 530, estado: "Apto", lesao: "Nenhuma", previsao: "Disponível", nutricao: "Dieta mediterrânica adaptada", notas: "Boa margem de progressão física." },
    { id: 15, nome: "Louro", posicao: "Universal", nasc: "2011-04-08", idade: 15, pesoBase: 58.2, peso: 58.8, altura: 1.70, cmjBase: 37.0, cmj: 37.2, pa: "115/73", fcRep: 61, phvOffset: "+1.1", treinos: 12, minTreino: 1195, jogos: 5, minJogo: 55, titular: 0, suplente: 4, golos: 0, assistencias: 0, subEntra: 0, subSai: 0, amarelo: 0, intercecao: 0, segundoAmarelo: 0, vermelho: 0, recuperacao: 0, autoGolo: 0, faltaSofrida: 0, faltaCometida: 0, perdaBola: 0, goloSofrido: 0, acwr: 1.04, rpeMedio: 7.2, cargaSessao: 640, estado: "Apto", lesao: "Nenhuma", previsao: "Disponível", nutricao: "Barras de cereais e água", notas: "Versatilidade tática permitindo jogar em várias posições." },
    { id: 16, nome: "Miguel", posicao: "Ala", nasc: "2011-06-11", idade: 15, pesoBase: 58.5, peso: 59.2, altura: 1.71, cmjBase: 37.5, cmj: 37.9, pa: "116/74", fcRep: 60, phvOffset: "+1.2", treinos: 11, minTreino: 1110, jogos: 6, minJogo: 55, titular: 0, suplente: 5, golos: 0, assistencias: 0, subEntra: 0, subSai: 0, amarelo: 0, intercecao: 0, segundoAmarelo: 0, vermelho: 0, recuperacao: 0, autoGolo: 0, faltaSofrida: 0, faltaCometida: 0, perdaBola: 0, goloSofrido: 0, acwr: 1.01, rpeMedio: 7.0, cargaSessao: 620, estado: "Apto", lesao: "Nenhuma", previsao: "Disponível", nutricao: "Hidratos de carbono complexos", notas: "Bom entendimento das dinâmicas de 4x4." },
    { id: 17, nome: "Pestana", posicao: "Fixo", nasc: "2011-09-28", idade: 15, pesoBase: 57.5, peso: 58.0, altura: 1.69, cmjBase: 37.0, cmj: 36.8, pa: "115/72", fcRep: 62, phvOffset: "+1.0", treinos: 11, minTreino: 1100, jogos: 4, minJogo: 40, titular: 0, suplente: 3, golos: 0, assistencias: 0, subEntra: 0, subSai: 0, amarelo: 0, intercecao: 0, segundoAmarelo: 0, vermelho: 0, recuperacao: 0, autoGolo: 0, faltaSofrida: 0, faltaCometida: 0, perdaBola: 0, goloSofrido: 0, acwr: 0.98, rpeMedio: 6.8, cargaSessao: 590, estado: "Apto", lesao: "Nenhuma", previsao: "Disponível", nutricao: "Fruta e água", notas: "Postura muito concentrada nos momentos defensivos." },
    { id: 18, nome: "Rafael R.", posicao: "Pivot", nasc: "2011-02-14", idade: 15, pesoBase: 63.0, peso: 64.0, altura: 1.77, cmjBase: 40.0, cmj: 41.2, pa: "120/78", fcRep: 56, phvOffset: "+1.8", treinos: 12, minTreino: 1200, jogos: 6, minJogo: 120, titular: 2, suplente: 4, golos: 0, assistencias: 0, subEntra: 0, subSai: 0, amarelo: 0, intercecao: 0, segundoAmarelo: 0, vermelho: 0, recuperacao: 0, autoGolo: 0, faltaSofrida: 0, faltaCometida: 0, perdaBola: 0, goloSofrido: 0, acwr: 1.28, rpeMedio: 8.4, cargaSessao: 810, estado: "Apto", lesao: "Nenhuma", previsao: "Disponível", nutricao: "Suplemento proteico e batido de recuperação", notas: "Excelente presença física na frente de ataque." },
    { id: 19, nome: "Salvador", posicao: "Ala", nasc: "2011-01-02", idade: 15, pesoBase: 64.0, peso: 65.0, altura: 1.78, cmjBase: 40.5, cmj: 42.0, pa: "122/80", fcRep: 55, phvOffset: "+1.9", treinos: 12, minTreino: 1200, jogos: 6, minJogo: 120, titular: 6, suplente: 0, golos: 0, assistencias: 0, subEntra: 0, subSai: 0, amarelo: 0, intercecao: 0, segundoAmarelo: 0, vermelho: 0, recuperacao: 0, autoGolo: 0, faltaSofrida: 0, faltaCometida: 0, perdaBola: 0, goloSofrido: 0, acwr: 1.30, rpeMedio: 8.5, cargaSessao: 830, estado: "Apto", lesao: "Nenhuma", previsao: "Disponível", nutricao: "Nutrição desportiva avançada", notas: "Atleta com índices físicos de topo no grupo." },
    { id: 20, nome: "Suarez", posicao: "Ala", nasc: "2011-05-18", idade: 15, pesoBase: 58.0, peso: 58.5, altura: 1.70, cmjBase: 37.5, cmj: 37.4, pa: "115/73", fcRep: 61, phvOffset: "+1.1", treinos: 11, minTreino: 1110, jogos: 5, minJogo: 53, titular: 0, suplente: 4, golos: 0, assistencias: 0, subEntra: 0, subSai: 0, amarelo: 0, intercecao: 0, segundoAmarelo: 0, vermelho: 0, recuperacao: 0, autoGolo: 0, faltaSofrida: 0, faltaCometida: 0, perdaBola: 0, goloSofrido: 0, acwr: 0.99, rpeMedio: 7.1, cargaSessao: 630, estado: "Apto", lesao: "Nenhuma", previsao: "Disponível", nutricao: "Hidratação isotónica", notas: "Boa regularidade exibicional ao longo da época." },
    { id: 21, nome: "Xavi", posicao: "Fixo", nasc: "2011-10-30", idade: 14, pesoBase: 53.5, peso: 53.0, altura: 1.63, cmjBase: 34.0, cmj: 32.8, pa: "108/66", fcRep: 67, phvOffset: "+0.5", treinos: 6, minTreino: 560, jogos: 1, minJogo: 0, titular: 0, suplente: 0, golos: 0, assistencias: 0, subEntra: 0, subSai: 0, amarelo: 0, intercecao: 0, segundoAmarelo: 0, vermelho: 0, recuperacao: 0, autoGolo: 0, faltaSofrida: 0, faltaCometida: 0, perdaBola: 0, goloSofrido: 0, acwr: 0.72, rpeMedio: 5.0, cargaSessao: 280, estado: "Fadiga Elevada", lesao: "Sobrecarga Muscular", previsao: "3 Dias", nutricao: "Magnésio e hidratação reforçada", notas: "A necessitar de gestão de minutos devido a fadiga." },
    { id: 22, nome: "Éder", posicao: "Ala", nasc: "2011-01-10", idade: 15, pesoBase: 64.5, peso: 65.5, altura: 1.79, cmjBase: 40.0, cmj: 41.8, pa: "124/82", fcRep: 54, phvOffset: "+2.0", treinos: 11, minTreino: 1095, jogos: 6, minJogo: 123, titular: 3, suplente: 3, golos: 0, assistencias: 0, subEntra: 0, subSai: 0, amarelo: 0, intercecao: 0, segundoAmarelo: 0, vermelho: 0, recuperacao: 0, autoGolo: 0, faltaSofrida: 0, faltaCometida: 0, perdaBola: 0, goloSofrido: 0, acwr: 1.32, rpeMedio: 8.6, cargaSessao: 850, estado: "Apto", lesao: "Nenhuma", previsao: "Disponível", nutricao: "Plano de alto rendimento estrito", notas: "Um dos motores da equipa em termos físicos e competitivos." }
  ];

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

  const ordenarDados = (coluna: string) => {
    if (ordenarColuna === coluna) {
      setDirecaoOrdem(direcaoOrdem === 'asc' ? 'desc' : 'asc');
    } else {
      setOrdenarColuna(coluna);
      setDirecaoOrdem('asc');
    }
  };

  const plantelOrdenado = [...plantel].sort((a: any, b: any) => {
    let valorA = a[ordenarColuna];
    let valorB = b[ordenarColuna];

    if (typeof valorA === 'string') {
      return direcaoOrdem === 'asc' 
        ? valorA.localeCompare(valorB) 
        : valorB.localeCompare(valorA);
    } else {
      return direcaoOrdem === 'asc' 
        ? valorA - valorB 
        : valorB - valorA;
    }
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
            <div style={{ position: 'absolute', inset: '-6px', background: 'linear-gradient(to right, #22c55e, #3b82f6)', borderRadius: '50%', filter: 'blur(12px)', opacity: 0.6 }}></div>
            <img src={config.logoUrl} alt="Logo" style={{ position: 'relative', width: '120px', height: '120px', objectFit: 'cover', borderRadius: '50%', border: `3px solid #22c55e`, backgroundColor: '#000', boxShadow: '0 10px 25px rgba(0,0,0,0.8)' }} />
          </div>
          <div style={{ maxWidth: '750px' }}>
            <h1 style={{ fontSize: '52px', fontWeight: '900', margin: '10px 0 40px 0', lineHeight: '1.1', color: '#ffffff', letterSpacing: '1px', textTransform: 'uppercase', fontStyle: 'italic', ...title3DStyle }}>
              {config.teamName}
            </h1>
            <button onClick={() => setView('login')} style={btn3DStyle}>
              NÓS SOMOS <span style={{ color: '#86efac', textShadow: '0 0 15px rgba(134,239,172,0.9)' }}>UNIÃO!</span>
            </button>
          </div>
        </div>
      )}

      {/* 2. LOGIN */}
      {view === 'login' && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '85vh' }}>
          <div style={{ backgroundColor: config.cardColor, backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.08)', padding: '40px', borderRadius: '28px', width: '100%', maxWidth: '420px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.9)' }}>
            
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <img src={config.logoUrl} alt="Logo" style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '50%', border: '2px solid #22c55e', boxShadow: '0 5px 15px rgba(0,0,0,0.8)' }} />
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
              <img src={config.logoUrl} alt="Logo" style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '50%', border: '2px solid #22c55e', boxShadow: '0 4px 10px rgba(0,0,0,0.6)', flexShrink: 0 }} />
              <div>
                <h1 style={{ fontSize: '22px', fontWeight: '900', margin: 0, color: '#fff', whiteSpace: 'nowrap', ...text3DStyle }}>{config.teamName}</h1>
                <p style={{ color: '#94a3b8', fontSize: '12px', margin: '4px 0 0 0', ...text3DStyle }}>
                  Utilizador: <span style={{ color: 'white', fontWeight: 'bold' }}>{utilizadorLogado.nome}</span> • Perfil: <span style={{ color: '#22c55e', textTransform: 'uppercase', fontWeight: 'bold' }}>{utilizadorLogado.perfil}</span>
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
              
              <div onClick={() => setView('plantel')} style={cardModuleStyle}>
                <div style={{ fontSize: '42px', marginBottom: '14px' }}>👥</div>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#38bdf8', marginBottom: '10px', ...text3DStyle }}>Gestão de Plantel</h3>
                <p style={{ color: '#94a3b8', fontSize: '13px', margin: 0, ...text3DStyle }}>Consulta dos 22 atletas, dados biométricos e fichas completas.</p>
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

              <div onClick={() => setView('treino')} style={cardModuleStyle}>
                <div style={{ fontSize: '42px', marginBottom: '14px' }}>⚡</div>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#f59e0b', marginBottom: '10px', ...text3DStyle }}>Carga & sRPE (CT)</h3>
                <p style={{ color: '#94a3b8', fontSize: '13px', margin: 0, ...text3DStyle }}>Monitorização de esforço, Carga de Treino (CT) e prontidão.</p>
              </div>

              <div onClick={() => setView('clinico')} style={cardModuleStyle}>
                <div style={{ fontSize: '42px', marginBottom: '14px' }}>🏥</div>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#ef4444', marginBottom: '10px', ...text3DStyle }}>Departamento Clínico</h3>
                <p style={{ color: '#94a3b8', fontSize: '13px', margin: 0, ...text3DStyle }}>Registo de lesões, boletim clínico e previsão de regresso.</p>
              </div>

              <div onClick={() => setView('fisiologia')} style={cardModuleStyle}>
                <div style={{ fontSize: '42px', marginBottom: '14px' }}>🧬</div>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#38bdf8', marginBottom: '10px', ...text3DStyle }}>Fisiologia & CMJ</h3>
                <p style={{ color: '#94a3b8', fontSize: '13px', margin: '0', ...text3DStyle }}>Controlo neuromuscular, salto vertical e rácio de carga ACWR.</p>
              </div>

              <div onClick={() => setView('stats')} style={cardModuleStyle}>
                <div style={{ fontSize: '42px', marginBottom: '14px' }}>⚽</div>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#10b981', marginBottom: '10px', ...text3DStyle }}>Estatísticas & Tática</h3>
                <p style={{ color: '#94a3b8', fontSize: '13px', margin: 0, ...text3DStyle }}>Registo completo dos 21 parâmetros do relatório oficial.</p>
              </div>

              <div onClick={() => setView('analytics')} style={cardModuleStyle}>
                <div style={{ fontSize: '42px', marginBottom: '14px' }}>📊</div>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#f59e0b', marginBottom: '10px', ...text3DStyle }}>Fair-Play & Análise</h3>
                <p style={{ color: '#94a3b8', fontSize: '13px', margin: 0, ...text3DStyle }}>Distribuição equitativa de minutos e top de utilização coletiva.</p>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* 4. GESTÃO DE PLANTEL */}
      {view === 'plantel' && (
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: config.cardColor, backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.1)', padding: '24px 32px', borderRadius: '24px', marginBottom: '28px', boxShadow: '0 20px 40px -15px rgba(0,0,0,0.8)' }}>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#38bdf8', margin: 0, ...text3DStyle }}>👥 Plantel Oficial (22 Atletas)</h2>
              <p style={{ color: '#94a3b8', fontSize: '11px', margin: '4px 0 0 0', ...text3DStyle }}>💡 Clica no nome do atleta para abrir a Ficha Individual completa (Biometria, Zonas FC, CMJ, PHV e Notas).</p>
            </div>
            <button onClick={() => setView('dashboard')} style={btnSecondary3D}>
              ← Voltar à Área de Trabalho
            </button>
          </header>

          <div style={{ backgroundColor: config.cardColor, backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.8)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
              <thead>
                <tr style={{ backgroundColor: 'rgba(3, 7, 18, 0.75)', color: '#94a3b8', fontSize: '11px', textTransform: 'uppercase', borderBottom: '1px solid rgba(255,255,255,0.08)', ...text3DStyle }}>
                  <th onClick={() => ordenarDados('nome')} style={{ padding: '18px 24px', cursor: 'pointer', color: ordenarColuna === 'nome' ? '#38bdf8' : '#94a3b8' }}>
                    Atleta {ordenarColuna === 'nome' ? (direcaoOrdem === 'asc' ? '▲' : '▼') : '↕'}
                  </th>
                  <th onClick={() => ordenarDados('posicao')} style={{ padding: '18px 24px', textAlign: 'center', cursor: 'pointer', color: ordenarColuna === 'posicao' ? '#38bdf8' : '#94a3b8' }}>
                    Posição {ordenarColuna === 'posicao' ? (direcaoOrdem === 'asc' ? '▲' : '▼') : '↕'}
                  </th>
                  <th onClick={() => ordenarDados('peso')} style={{ padding: '18px 24px', textAlign: 'center', cursor: 'pointer', color: ordenarColuna === 'peso' ? '#38bdf8' : '#94a3b8' }}>
                    Peso (kg) {ordenarColuna === 'peso' ? (direcaoOrdem === 'asc' ? '▲' : '▼') : '↕'}
                  </th>
                  <th onClick={() => ordenarDados('altura')} style={{ padding: '18px 24px', textAlign: 'center', cursor: 'pointer', color: ordenarColuna === 'altura' ? '#38bdf8' : '#94a3b8' }}>
                    Altura (m) {ordenarColuna === 'altura' ? (direcaoOrdem === 'asc' ? '▲' : '▼') : '↕'}
                  </th>
                  <th onClick={() => ordenarDados('estado')} style={{ padding: '18px 24px', textAlign: 'center', cursor: 'pointer', color: ordenarColuna === 'estado' ? '#38bdf8' : '#94a3b8' }}>
                    Estado {ordenarColuna === 'estado' ? (direcaoOrdem === 'asc' ? '▲' : '▼') : '↕'}
                  </th>
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

      {/* 5. ANTROPOMETRIA TEMPORAL */}
      {view === 'antropometria' && (
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: config.cardColor, backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.1)', padding: '24px 32px', borderRadius: '24px', marginBottom: '28px', boxShadow: '0 20px 40px -15px rgba(0,0,0,0.8)' }}>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#38bdf8', margin: 0, ...text3DStyle }}>📏 Antropometria & Dados Biológicos (Controlo Temporal)</h2>
              <p style={{ color: '#94a3b8', fontSize: '12px', margin: '4px 0 0 0', ...text3DStyle }}>Registo de peso, altura, IMC e evolução temporal por data.</p>
            </div>
            <button onClick={() => setView('dashboard')} style={btnSecondary3D}>
              ← Voltar à Área de Trabalho
            </button>
          </header>

          <div style={{ backgroundColor: config.cardColor, backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.1)', padding: '24px 32px', borderRadius: '24px', marginBottom: '28px', boxShadow: '0 20px 40px -15px rgba(0,0,0,0.8)' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#22c55e', marginBottom: '16px', ...text3DStyle }}>➕ Registar Nova Avaliação Antropométrica</h3>
            <form onSubmit={adicionarRegistoAntropometrico} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', alignItems: 'flex-end' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Data da Avaliação</label>
                <input type="date" value={novoRegisto.data} onChange={(e) => setNovoRegisto({...novoRegisto, data: e.target.value})} required style={{ width: '100%', padding: '10px', backgroundColor: 'rgba(15, 23, 42, 0.85)', border: '1px solid rgba(255,255,255,0.15)', color: 'white', borderRadius: '10px' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Atleta</label>
                <select value={novoRegisto.atletaId} onChange={(e) => setNovoRegisto({...novoRegisto, atletaId: Number(e.target.value)})} style={{ width: '100%', padding: '10px', backgroundColor: 'rgba(15, 23, 42, 0.85)', border: '1px solid rgba(255,255,255,0.15)', color: 'white', borderRadius: '10px' }}>
                  {plantel.map(a => <option key={a.id} value={a.id}>{a.nome}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Peso (kg)</label>
                <input type="number" step="0.1" value={novoRegisto.peso} onChange={(e) => setNovoRegisto({...novoRegisto, peso: Number(e.target.value)})} required style={{ width: '100%', padding: '10px', backgroundColor: 'rgba(15, 23, 42, 0.85)', border: '1px solid rgba(255,255,255,0.15)', color: 'white', borderRadius: '10px' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Altura (m)</label>
                <input type="number" step="0.01" value={novoRegisto.altura} onChange={(e) => setNovoRegisto({...novoRegisto, altura: Number(e.target.value)})} required style={{ width: '100%', padding: '10px', backgroundColor: 'rgba(15, 23, 42, 0.85)', border: '1px solid rgba(255,255,255,0.15)', color: 'white', borderRadius: '10px' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Massa Gorda (%)</label>
                <input type="number" step="0.1" value={novoRegisto.massaGorda} onChange={(e) => setNovoRegisto({...novoRegisto, massaGorda: Number(e.target.value)})} required style={{ width: '100%', padding: '10px', backgroundColor: 'rgba(15, 23, 42, 0.85)', border: '1px solid rgba(255,255,255,0.15)', color: 'white', borderRadius: '10px' }} />
              </div>
              <button type="submit" style={{ ...btn3DStyle, padding: '10px 20px', fontSize: '14px', height: '42px' }}>
                Guardar Registo
              </button>
            </form>
          </div>

          <div style={{ backgroundColor: config.cardColor, backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.8)' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#fff', padding: '24px 32px 0 32px', margin: 0 }}>Histórico Temporal de Avaliações</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px', marginTop: '16px' }}>
              <thead>
                <tr style={{ backgroundColor: 'rgba(3, 7, 18, 0.75)', color: '#94a3b8', fontSize: '11px', textTransform: 'uppercase', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  <th style={{ padding: '18px 24px' }}>Data</th>
                  <th style={{ padding: '18px 24px' }}>Atleta</th>
                  <th style={{ padding: '18px 24px', textAlign: 'center' }}>Peso (kg)</th>
                  <th style={{ padding: '18px 24px', textAlign: 'center' }}>Altura (m)</th>
                  <th style={{ padding: '18px 24px', textAlign: 'center' }}>IMC</th>
                  <th style={{ padding: '18px 24px', textAlign: 'center' }}>Massa Gorda (%)</th>
                </tr>
              </thead>
              <tbody>
                {historicoAntropometria.map((item) => (
                  <tr key={item.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <td style={{ padding: '18px 24px', color: '#38bdf8', fontWeight: 'bold' }}>{item.data}</td>
                    <td style={{ padding: '18px 24px', fontWeight: 'bold', color: 'white' }}>{item.atletaNome}</td>
                    <td style={{ padding: '18px 24px', textAlign: 'center', color: '#10b981', fontWeight: 'bold' }}>{item.peso} kg</td>
                    <td style={{ padding: '18px 24px', textAlign: 'center', color: '#60a5fa' }}>{item.altura} m</td>
                    <td style={{ padding: '18px 24px', textAlign: 'center', color: '#f59e0b', fontWeight: 'bold' }}>{item.imc}</td>
                    <td style={{ padding: '18px 24px', textAlign: 'center' }}>{item.massaGorda}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 6. GESTÃO DE CONVOCATÓRIAS */}
      {view === 'convocatoria' && (
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: config.cardColor, backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.1)', padding: '24px 32px', borderRadius: '24px', marginBottom: '28px', boxShadow: '0 20px 40px -15px rgba(0,0,0,0.8)' }}>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#22c55e', margin: 0, ...text3DStyle }}>📋 Gestão de Convocatória (Próximo Jogo)</h2>
              <p style={{ color: '#94a3b8', fontSize: '12px', margin: '4px 0 0 0', ...text3DStyle }}>Atletas Convocados: <span style={{ color: '#fff', fontWeight: 'bold' }}>{convocados.length} / 22</span></p>
            </div>
            <button onClick={() => setView('dashboard')} style={btnSecondary3D}>
              ← Voltar à Área de Trabalho
            </button>
          </header>

          <div style={{ backgroundColor: config.cardColor, backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.8)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
              <thead>
                <tr style={{ backgroundColor: 'rgba(3, 7, 18, 0.75)', color: '#94a3b8', fontSize: '11px', textTransform: 'uppercase', borderBottom: '1px solid rgba(255,255,255,0.08)', ...text3DStyle }}>
                  <th onClick={() => ordenarDados('nome')} style={{ padding: '18px 24px', cursor: 'pointer', color: ordenarColuna === 'nome' ? '#38bdf8' : '#94a3b8' }}>
                    Atleta {ordenarColuna === 'nome' ? (direcaoOrdem === 'asc' ? '▲' : '▼') : '↕'}
                  </th>
                  <th onClick={() => ordenarDados('estado')} style={{ padding: '18px 24px', textAlign: 'center', cursor: 'pointer', color: ordenarColuna === 'estado' ? '#38bdf8' : '#94a3b8' }}>
                    Estado Físico {ordenarColuna === 'estado' ? (direcaoOrdem === 'asc' ? '▲' : '▼') : '↕'}
                  </th>
                  <th onClick={() => ordenarDados('minJogo')} style={{ padding: '18px 24px', textAlign: 'center', cursor: 'pointer', color: ordenarColuna === 'minJogo' ? '#38bdf8' : '#94a3b8' }}>
                    Min. Acumulados {ordenarColuna === 'minJogo' ? (direcaoOrdem === 'asc' ? '▲' : '▼') : '↕'}
                  </th>
                  <th style={{ padding: '18px 24px', textAlign: 'center' }}>Estado da Convocatória</th>
                </tr>
              </thead>
              <tbody>
                {plantelOrdenado.map((atleta) => {
                  const isConvocado = convocados.includes(atleta.id);
                  return (
                    <tr key={atleta.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', backgroundColor: isConvocado ? 'rgba(34, 197, 94, 0.04)' : 'transparent' }}>
                      <td onClick={() => abrirFichaAtleta(atleta)} style={{ padding: '18px 24px', fontWeight: 'bold', color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', ...text3DStyle }} title="Ver Ficha Individual">
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: isConvocado ? '#22c55e' : '#64748b', boxShadow: isConvocado ? '0 0 10px #22c55e' : 'none' }}></div>
                        <span style={{ textDecoration: 'underline' }}>{atleta.nome}</span>
                      </td>
                      <td style={{ padding: '18px 24px', textAlign: 'center', ...text3DStyle }}>
                        <span style={{ 
                          padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 'bold',
                          backgroundColor: atleta.estado === 'Apto' ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)',
                          color: atleta.estado === 'Apto' ? '#10b981' : '#ef4444'
                        }}>
                          {atleta.estado}
                        </span>
                      </td>
                      <td style={{ padding: '18px 24px', textAlign: 'center', color: '#38bdf8', fontWeight: 'bold', ...text3DStyle }}>{atleta.minJogo} min</td>
                      <td style={{ padding: '18px 24px', textAlign: 'center' }}>
                        <button onClick={() => toggleConvocatoria(atleta.id)} style={{ 
                          backgroundColor: isConvocado ? '#15803d' : '#334155', 
                          backgroundImage: isConvocado ? 'linear-gradient(to bottom, #22c55e, #15803d)' : 'linear-gradient(to bottom, #475569, #1e293b)', 
                          border: 'none', color: 'white', padding: '8px 18px', borderRadius: '8px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.4)', ...text3DStyle 
                        }}>
                          {isConvocado ? 'Convocado ✓' : 'Não Convocado'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 7. CARGA DE TREINO & sRPE (CT) */}
      {view === 'treino' && (
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: config.cardColor, backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.1)', padding: '24px 32px', borderRadius: '24px', marginBottom: '28px', boxShadow: '0 20px 40px -15px rgba(0,0,0,0.8)' }}>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#f59e0b', margin: 0, ...text3DStyle }}>⚡ Monitorização de Carga & sRPE (CT)</h2>
              <p style={{ color: '#94a3b8', fontSize: '11px', margin: '4px 0 0 0', ...text3DStyle }}>Controlo de esforço subjetivo e Carga de Treino (CT) da sessão.</p>
            </div>
            <button onClick={() => setView('dashboard')} style={btnSecondary3D}>
              ← Voltar à Área de Trabalho
            </button>
          </header>

          <div style={{ backgroundColor: config.cardColor, backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.8)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
              <thead>
                <tr style={{ backgroundColor: 'rgba(3, 7, 18, 0.75)', color: '#94a3b8', fontSize: '11px', textTransform: 'uppercase', borderBottom: '1px solid rgba(255,255,255,0.08)', ...text3DStyle }}>
                  <th onClick={() => ordenarDados('nome')} style={{ padding: '18px 24px', cursor: 'pointer', color: ordenarColuna === 'nome' ? '#38bdf8' : '#94a3b8' }}>
                    Atleta {ordenarColuna === 'nome' ? (direcaoOrdem === 'asc' ? '▲' : '▼') : '↕'}
                  </th>
                  <th onClick={() => ordenarDados('rpeMedio')} style={{ padding: '18px 24px', textAlign: 'center', cursor: 'pointer', color: ordenarColuna === 'rpeMedio' ? '#38bdf8' : '#94a3b8' }}>
                    RPE Médio (1-10) {ordenarColuna === 'rpeMedio' ? (direcaoOrdem === 'asc' ? '▲' : '▼') : '↕'}
                  </th>
                  <th onClick={() => ordenarDados('cargaSessao')} style={{ padding: '18px 24px', textAlign: 'center', cursor: 'pointer', color: ordenarColuna === 'cargaSessao' ? '#38bdf8' : '#94a3b8' }}>
                    Carga de Treino (CT) {ordenarColuna === 'cargaSessao' ? (direcaoOrdem === 'asc' ? '▲' : '▼') : '↕'}
                  </th>
                  <th style={{ padding: '18px 24px', textAlign: 'center' }}>Classificação de Esforço</th>
                </tr>
              </thead>
              <tbody>
                {plantelOrdenado.map((atleta) => (
                  <tr key={atleta.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <td onClick={() => abrirFichaAtleta(atleta)} style={{ padding: '18px 24px', fontWeight: 'bold', color: '#38bdf8', cursor: 'pointer', ...text3DStyle }} title="Ver Ficha Individual">
                      <span style={{ textDecoration: 'underline' }}>{atleta.nome}</span>
                    </td>
                    <td style={{ padding: '18px 24px', textAlign: 'center', color: '#f59e0b', fontWeight: 'bold', ...text3DStyle }}>{atleta.rpeMedio} / 10</td>
                    <td style={{ padding: '18px 24px', textAlign: 'center', color: '#38bdf8', fontWeight: 'bold', ...text3DStyle }}>{atleta.cargaSessao} CT</td>
                    <td style={{ padding: '18px 24px', textAlign: 'center', ...text3DStyle }}>
                      <span style={{ 
                        padding: '6px 12px', borderRadius: '8px', fontSize: '11px', fontWeight: 'bold',
                        backgroundColor: atleta.rpeMedio > 8 ? 'rgba(239,68,68,0.2)' : (atleta.rpeMedio > 7 ? 'rgba(245,158,11,0.2)' : 'rgba(16,185,129,0.2)'),
                        color: atleta.rpeMedio > 8 ? '#ef4444' : (atleta.rpeMedio > 7 ? '#f59e0b' : '#10b981'),
                        border: `1px solid ${atleta.rpeMedio > 8 ? '#ef4444' : (atleta.rpeMedio > 7 ? '#f59e0b' : '#10b981')}`
                      }}>
                        {atleta.rpeMedio > 8 ? 'Muito Elevada' : (atleta.rpeMedio > 7 ? 'Elevada' : 'Ótima')}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 8. DEPARTAMENTO CLÍNICO & LESÕES */}
      {view === 'clinico' && (
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: config.cardColor, backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.1)', padding: '24px 32px', borderRadius: '24px', marginBottom: '28px', boxShadow: '0 20px 40px -15px rgba(0,0,0,0.8)' }}>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#ef4444', margin: 0, ...text3DStyle }}>🏥 Departamento Clínico & Gestão de Lesões</h2>
              <p style={{ color: '#94a3b8', fontSize: '11px', margin: '4px 0 0 0', ...text3DStyle }}>Boletim clínico e previsão de regresso à competição.</p>
            </div>
            <button onClick={() => setView('dashboard')} style={btnSecondary3D}>
              ← Voltar à Área de Trabalho
            </button>
          </header>

          <div style={{ backgroundColor: config.cardColor, backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.8)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
              <thead>
                <tr style={{ backgroundColor: 'rgba(3, 7, 18, 0.75)', color: '#94a3b8', fontSize: '11px', textTransform: 'uppercase', borderBottom: '1px solid rgba(255,255,255,0.08)', ...text3DStyle }}>
                  <th onClick={() => ordenarDados('nome')} style={{ padding: '18px 24px', cursor: 'pointer', color: ordenarColuna === 'nome' ? '#38bdf8' : '#94a3b8' }}>
                    Atleta {ordenarColuna === 'nome' ? (direcaoOrdem === 'asc' ? '▲' : '▼') : '↕'}
                  </th>
                  <th onClick={() => ordenarDados('estado')} style={{ padding: '18px 24px', textAlign: 'center', cursor: 'pointer', color: ordenarColuna === 'estado' ? '#38bdf8' : '#94a3b8' }}>
                    Estado Clínico {ordenarColuna === 'estado' ? (direcaoOrdem === 'asc' ? '▲' : '▼') : '↕'}
                  </th>
                  <th style={{ padding: '18px 24px', textAlign: 'center' }}>Tipo de Lesão / Queixa</th>
                  <th style={{ padding: '18px 24px', textAlign: 'center' }}>Previsão de Regresso</th>
                </tr>
              </thead>
              <tbody>
                {plantelOrdenado.map((atleta) => (
                  <tr key={atleta.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <td onClick={() => abrirFichaAtleta(atleta)} style={{ padding: '18px 24px', fontWeight: 'bold', color: '#38bdf8', cursor: 'pointer', ...text3DStyle }} title="Ver Ficha Individual">
                      <span style={{ textDecoration: 'underline' }}>{atleta.nome}</span>
                    </td>
                    <td style={{ padding: '18px 24px', textAlign: 'center', ...text3DStyle }}>
                      <span style={{ 
                        padding: '6px 12px', borderRadius: '8px', fontSize: '11px', fontWeight: 'bold',
                        backgroundColor: atleta.estado === 'Apto' ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)',
                        color: atleta.estado === 'Apto' ? '#10b981' : '#ef4444',
                        border: `1px solid ${atleta.estado === 'Apto' ? '#10b981' : '#ef4444'}`
                      }}>
                        {atleta.estado}
                      </span>
                    </td>
                    <td style={{ padding: '18px 24px', textAlign: 'center', color: atleta.lesao === 'Nenhuma' ? '#94a3b8' : '#fca5a5', fontWeight: 'bold', ...text3DStyle }}>
                      {atleta.lesao}
                    </td>
                    <td style={{ padding: '18px 24px', textAlign: 'center', color: '#38bdf8', fontWeight: 'bold', ...text3DStyle }}>
                      {atleta.previsao}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 9. FISIOLOGIA & CMJ */}
      {view === 'fisiologia' && (
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: config.cardColor, backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.1)', padding: '24px 32px', borderRadius: '24px', marginBottom: '28px', boxShadow: '0 20px 40px -15px rgba(0,0,0,0.8)' }}>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#38bdf8', margin: 0, ...text3DStyle }}>🧬 Controlo Fisiológico: Salto CMJ & Rácio de Carga (ACWR)</h2>
              <p style={{ color: '#94a3b8', fontSize: '11px', margin: '4px 0 0 0', ...text3DStyle }}>💡 Clica no nome para abrir a ficha ou nos cabeçalhos para ordenar.</p>
            </div>
            <button onClick={() => setView('dashboard')} style={btnSecondary3D}>
              ← Voltar à Área de Trabalho
            </button>
          </header>

          <div style={{ backgroundColor: config.cardColor, backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.8)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
              <thead>
                <tr style={{ backgroundColor: 'rgba(3, 7, 18, 0.75)', color: '#94a3b8', fontSize: '11px', textTransform: 'uppercase', borderBottom: '1px solid rgba(255,255,255,0.08)', ...text3DStyle }}>
                  <th onClick={() => ordenarDados('nome')} style={{ padding: '18px 24px', cursor: 'pointer', color: ordenarColuna === 'nome' ? '#38bdf8' : '#94a3b8' }}>
                    Atleta {ordenarColuna === 'nome' ? (direcaoOrdem === 'asc' ? '▲' : '▼') : '↕'}
                  </th>
                  <th onClick={() => ordenarDados('cmj')} style={{ padding: '18px 24px', textAlign: 'center', cursor: 'pointer', color: ordenarColuna === 'cmj' ? '#38bdf8' : '#94a3b8' }}>
                    Salto CMJ (cm) {ordenarColuna === 'cmj' ? (direcaoOrdem === 'asc' ? '▲' : '▼') : '↕'}
                  </th>
                  <th onClick={() => ordenarDados('acwr')} style={{ padding: '18px 24px', textAlign: 'center', cursor: 'pointer', color: ordenarColuna === 'acwr' ? '#38bdf8' : '#94a3b8' }}>
                    Rácio ACWR {ordenarColuna === 'acwr' ? (direcaoOrdem === 'asc' ? '▲' : '▼') : '↕'}
                  </th>
                  <th onClick={() => ordenarDados('estado')} style={{ padding: '18px 24px', textAlign: 'center', cursor: 'pointer', color: ordenarColuna === 'estado' ? '#38bdf8' : '#94a3b8' }}>
                    Estado Físico {ordenarColuna === 'estado' ? (direcaoOrdem === 'asc' ? '▲' : '▼') : '↕'}
                  </th>
                </tr>
              </thead>
              <tbody>
                {plantelOrdenado.map((atleta) => (
                  <tr key={atleta.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <td onClick={() => abrirFichaAtleta(atleta)} style={{ padding: '18px 24px', fontWeight: 'bold', color: '#38bdf8', cursor: 'pointer', ...text3DStyle }} title="Ver Ficha Individual">
                      <span style={{ textDecoration: 'underline' }}>{atleta.nome}</span>
                    </td>
                    <td style={{ padding: '18px 24px', textAlign: 'center', color: '#38bdf8', fontWeight: 'bold', ...text3DStyle }}>{atleta.cmj} cm</td>
                    <td style={{ padding: '18px 24px', textAlign: 'center', color: atleta.acwr > 1.2 ? '#f59e0b' : '#10b981', fontWeight: 'bold', ...text3DStyle }}>{atleta.acwr}</td>
                    <td style={{ padding: '18px 24px', textAlign: 'center', ...text3DStyle }}>
                      <span style={{ 
                        padding: '6px 12px', borderRadius: '8px', fontSize: '11px', fontWeight: 'bold',
                        backgroundColor: atleta.estado === 'Apto' ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)',
                        color: atleta.estado === 'Apto' ? '#10b981' : '#ef4444',
                        border: `1px solid ${atleta.estado === 'Apto' ? '#10b981' : '#ef4444'}`
                      }}>
                        {atleta.estado}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 10. ESTATÍSTICAS TÉCNICO-TÁTICAS */}
      {view === 'stats' && (
        <div style={{ maxWidth: '1350px', margin: '0 auto' }}>
          <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: config.cardColor, backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.1)', padding: '24px 32px', borderRadius: '24px', marginBottom: '28px', boxShadow: '0 20px 40px -15px rgba(0,0,0,0.8)' }}>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#10b981', margin: 0, ...text3DStyle }}>⚽ Relatório Oficial & Ações Técnico-Táticas (21 Parâmetros do Excel)</h2>
              <p style={{ color: '#94a3b8', fontSize: '11px', margin: '4px 0 0 0', ...text3DStyle }}>💡 Dados completos extraídos de athletes_report.xlsx[cite: 1]. Clica no nome para abrir a ficha ou ordena por coluna.</p>
            </div>
            <button onClick={() => setView('dashboard')} style={btnSecondary3D}>
              ← Voltar à Área de Trabalho
            </button>
          </header>

          <div style={{ backgroundColor: config.cardColor, backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '24px', overflowX: 'auto', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.8)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px', whiteSpace: 'nowrap' }}>
              <thead>
                <tr style={{ backgroundColor: 'rgba(3, 7, 18, 0.75)', color: '#94a3b8', fontSize: '11px', textTransform: 'uppercase', borderBottom: '1px solid rgba(255,255,255,0.08)', ...text3DStyle }}>
                  <th onClick={() => ordenarDados('nome')} style={{ padding: '16px 20px', cursor: 'pointer', color: ordenarColuna === 'nome' ? '#38bdf8' : '#94a3b8' }}>Atleta ↕</th>
                  <th onClick={() => ordenarDados('treinos')} style={{ padding: '16px 12px', textAlign: 'center', cursor: 'pointer' }}>Treinos ↕</th>
                  <th onClick={() => ordenarDados('minTreino')} style={{ padding: '16px 12px', textAlign: 'center', cursor: 'pointer' }}>Min Treino ↕</th>
                  <th onClick={() => ordenarDados('jogos')} style={{ padding: '16px 12px', textAlign: 'center', cursor: 'pointer' }}>Jogos ↕</th>
                  <th onClick={() => ordenarDados('minJogo')} style={{ padding: '16px 12px', textAlign: 'center', cursor: 'pointer' }}>Min Jogo ↕</th>
                  <th onClick={() => ordenarDados('titular')} style={{ padding: '16px 12px', textAlign: 'center', cursor: 'pointer' }}>Titular ↕</th>
                  <th onClick={() => ordenarDados('suplente')} style={{ padding: '16px 12px', textAlign: 'center', cursor: 'pointer' }}>Suplente ↕</th>
                  <th onClick={() => ordenarDados('golos')} style={{ padding: '16px 12px', textAlign: 'center', cursor: 'pointer', color: '#10b981' }}>Golos ↕</th>
                  <th onClick={() => ordenarDados('assistencias')} style={{ padding: '16px 12px', textAlign: 'center', cursor: 'pointer' }}>Assist. ↕</th>
                  <th onClick={() => ordenarDados('subEntra')} style={{ padding: '16px 12px', textAlign: 'center', cursor: 'pointer' }}>Sub (Entra) ↕</th>
                  <th onClick={() => ordenarDados('subSai')} style={{ padding: '16px 12px', textAlign: 'center', cursor: 'pointer' }}>Sub (Sai) ↕</th>
                  <th onClick={() => ordenarDados('amarelo')} style={{ padding: '16px 12px', textAlign: 'center', cursor: 'pointer' }}>Amarelo ↕</th>
                  <th onClick={() => ordenarDados('intercecao')} style={{ padding: '16px 12px', textAlign: 'center', cursor: 'pointer' }}>Interc. ↕</th>
                  <th onClick={() => ordenarDados('segundoAmarelo')} style={{ padding: '16px 12px', textAlign: 'center', cursor: 'pointer' }}>2º Amarelo ↕</th>
                  <th onClick={() => ordenarDados('vermelho')} style={{ padding: '16px 12px', textAlign: 'center', cursor: 'pointer', color: '#ef4444' }}>Vermelho ↕</th>
                  <th onClick={() => ordenarDados('recuperacao')} style={{ padding: '16px 12px', textAlign: 'center', cursor: 'pointer' }}>Recup. ↕</th>
                  <th onClick={() => ordenarDados('autoGolo')} style={{ padding: '16px 12px', textAlign: 'center', cursor: 'pointer' }}>Auto Golo ↕</th>
                  <th onClick={() => ordenarDados('faltaSofrida')} style={{ padding: '16px 12px', textAlign: 'center', cursor: 'pointer' }}>F. Sofrida ↕</th>
                  <th onClick={() => ordenarDados('faltaCometida')} style={{ padding: '16px 12px', textAlign: 'center', cursor: 'pointer' }}>F. Cometida ↕</th>
                  <th onClick={() => ordenarDados('perdaBola')} style={{ padding: '16px 12px', textAlign: 'center', cursor: 'pointer', color: '#f59e0b' }}>Perda Bola ↕</th>
                  <th onClick={() => ordenarDados('goloSofrido')} style={{ padding: '16px 12px', textAlign: 'center', cursor: 'pointer' }}>Golo Sofrido ↕</th>
                </tr>
              </thead>
              <tbody>
                {plantelOrdenado.map((a) => (
                  <tr key={a.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <td onClick={() => abrirFichaAtleta(a)} style={{ padding: '16px 20px', fontWeight: 'bold', color: '#38bdf8', cursor: 'pointer', textDecoration: 'underline' }}>{a.nome}</td>
                    <td style={{ padding: '16px 12px', textAlign: 'center' }}>{a.treinos}</td>
                    <td style={{ padding: '16px 12px', textAlign: 'center', color: '#60a5fa' }}>{a.minTreino}</td>
                    <td style={{ padding: '16px 12px', textAlign: 'center' }}>{a.jogos}</td>
                    <td style={{ padding: '16px 12px', textAlign: 'center', color: '#10b981', fontWeight: 'bold' }}>{a.minJogo}</td>
                    <td style={{ padding: '16px 12px', textAlign: 'center' }}>{a.titular}</td>
                    <td style={{ padding: '16px 12px', textAlign: 'center' }}>{a.suplente}</td>
                    <td style={{ padding: '16px 12px', textAlign: 'center', color: '#10b981', fontWeight: 'bold' }}>{a.golos}</td>
                    <td style={{ padding: '16px 12px', textAlign: 'center' }}>{a.assistencias}</td>
                    <td style={{ padding: '16px 12px', textAlign: 'center' }}>{a.subEntra}</td>
                    <td style={{ padding: '16px 12px', textAlign: 'center' }}>{a.subSai}</td>
                    <td style={{ padding: '16px 12px', textAlign: 'center', color: '#f59e0b' }}>{a.amarelo}</td>
                    <td style={{ padding: '16px 12px', textAlign: 'center' }}>{a.intercecao}</td>
                    <td style={{ padding: '16px 12px', textAlign: 'center' }}>{a.segundoAmarelo}</td>
                    <td style={{ padding: '16px 12px', textAlign: 'center', color: '#ef4444' }}>{a.vermelho}</td>
                    <td style={{ padding: '16px 12px', textAlign: 'center' }}>{a.recuperacao}</td>
                    <td style={{ padding: '16px 12px', textAlign: 'center' }}>{a.autoGolo}</td>
                    <td style={{ padding: '16px 12px', textAlign: 'center' }}>{a.faltaSofrida}</td>
                    <td style={{ padding: '16px 12px', textAlign: 'center' }}>{a.faltaCometida}</td>
                    <td style={{ padding: '16px 12px', textAlign: 'center', color: '#f59e0b' }}>{a.perdaBola}</td>
                    <td style={{ padding: '16px 12px', textAlign: 'center' }}>{a.goloSofrido}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 11. ANÁLISE & FAIR-PLAY */}
      {view === 'analytics' && (
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: config.cardColor, backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.1)', padding: '24px 32px', borderRadius: '24px', marginBottom: '28px', boxShadow: '0 20px 40px -15px rgba(0,0,0,0.8)' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#38bdf8', margin: 0, ...text3DStyle }}>Análise Coletiva & Fair-Play de Utilização</h2>
            <button onClick={() => setView('dashboard')} style={btnSecondary3D}>
              ← Voltar à Área de Trabalho
            </button>
          </header>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginBottom: '28px' }}>
            <div style={{ backgroundColor: config.cardColor, backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.1)', padding: '28px', borderRadius: '24px', boxShadow: '0 20px 40px -15px rgba(0,0,0,0.8)' }}>
              <span style={{ fontSize: '12px', color: '#94a3b8', ...text3DStyle }}>Média de Minutos de Jogo</span>
              <p style={{ fontSize: '32px', fontWeight: '900', color: '#10b981', margin: '10px 0 0 0', ...text3DStyle }}>61.3 min / atleta</p>
            </div>
            <div style={{ backgroundColor: config.cardColor, backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.1)', padding: '28px', borderRadius: '24px', boxShadow: '0 20px 40px -15px rgba(0,0,0,0.8)' }}>
              <span style={{ fontSize: '12px', color: '#94a3b8', ...text3DStyle }}>Média de Presença em Treinos</span>
              <p style={{ fontSize: '32px', fontWeight: '900', color: '#60a5fa', margin: '10px 0 0 0', ...text3DStyle }}>10.2 treinos (1022 min)</p>
            </div>
          </div>

          <div style={{ backgroundColor: config.cardColor, backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.1)', padding: '32px', borderRadius: '24px', boxShadow: '0 20px 40px -15px rgba(0,0,0,0.8)' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#22c55e', marginBottom: '20px', ...text3DStyle }}>Top 5 Atletas com Mais Minutos de Jogo</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { nome: "Éder", min: 123, jogos: 6 },
                { nome: "Salvador", min: 120, jogos: 6 },
                { nome: "Rafael R.", min: 120, jogos: 6 },
                { nome: "Diogo", min: 116, jogos: 6 },
                { nome: "Jacob M.", min: 114, jogos: 6 }
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(15, 23, 42, 0.7)', padding: '16px 20px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.05)', boxShadow: '0 4px 10px rgba(0,0,0,0.4)' }}>
                  <span style={{ fontWeight: 'bold', color: 'white', fontSize: '14px', ...text3DStyle }}>{idx + 1}. {item.nome}</span>
                  <span style={{ color: '#10b981', fontWeight: 'bold', ...text3DStyle }}>{item.min} minutos ({item.jogos} jogos)</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 12. FICHA INDIVIDUAL COMPLETA (BLUEPRINT) */}
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
                <img src={config.logoUrl} alt="Logo" style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '50%', border: '2px solid #22c55e', boxShadow: '0 4px 10px rgba(0,0,0,0.6)' }} />
                <div>
                  <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#ffffff', margin: 0, ...text3DStyle }}>Ficha Individual: {atletaSelecionado.nome} ({atletaSelecionado.posicao})</h2>
                  <p style={{ color: '#94a3b8', fontSize: '12px', margin: '4px 0 0 0', ...text3DStyle }}>Nasc: {atletaSelecionado.nasc} ({atletaSelecionado.idade} anos) | PHV Offset: {atletaSelecionado.phvOffset}</p>
                </div>
              </div>
              <button onClick={() => setView('plantel')} style={btnSecondary3D}>
                ← Voltar ao Plantel
              </button>
            </header>

            {/* Secção 1: Biometria & Antropometria */}
            <div style={{ backgroundColor: config.cardColor, backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.1)', padding: '28px', borderRadius: '24px', marginBottom: '24px', boxShadow: '0 20px 40px -15px rgba(0,0,0,0.8)' }}>
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

            {/* Secção 2: Controlo Neuromuscular (CMJ) & Fadiga */}
            <div style={{ backgroundColor: config.cardColor, backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.1)', padding: '28px', borderRadius: '24px', marginBottom: '24px', boxShadow: '0 20px 40px -15px rgba(0,0,0,0.8)' }}>
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

            {/* Secção 3: Avaliação Fisiológica de Repouso & Zonas Karvonen / Tanaka */}
            <div style={{ backgroundColor: config.cardColor, backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.1)', padding: '28px', borderRadius: '24px', marginBottom: '24px', boxShadow: '0 20px 40px -15px rgba(0,0,0,0.8)' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#f59e0b', marginBottom: '16px' }}>❤️ Fisiologia de Repouso & Zonas de Treino (Tanaka & Karvonen)</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '20px' }}>
                <div style={{ backgroundColor: 'rgba(15,23,42,0.6)', padding: '16px', borderRadius: '12px' }}>
                  <span style={{ color: '#94a3b8', fontSize: '12px' }}>Pressão Arterial (PA)</span>
                  <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff', margin: '6px 0 0 0' }}>{atletaSelecionado.pa} mmHg</p>
                </div>
                <div style={{ backgroundColor: 'rgba(15,23,42,0.6)', padding: '16px', borderRadius: '12px' }}>
                  <span style={{ color: '#94a3b8', fontSize: '12px' }}>FC Repouso (FC_rep)</span>
                  <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#38bdf8', margin: '6px 0 0 0' }}>{atletaSelecionado.fcRep} bpm</p>
                </div>
                <div style={{ backgroundColor: 'rgba(15,23,42,0.6)', padding: '16px', borderRadius: '12px' }}>
                  <span style={{ color: '#94a3b8', fontSize: '12px' }}>FC Máxima (Tanaka)</span>
                  <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#ef4444', margin: '6px 0 0 0' }}>{fcMaxTanaka} bpm</p>
                </div>
              </div>
              <div style={{ backgroundColor: 'rgba(15,23,42,0.7)', padding: '18px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <span style={{ color: '#38bdf8', fontSize: '13px', fontWeight: 'bold', display: 'block', marginBottom: '10px' }}>Zonas de Treino (Karvonen - Reserva Cardíaca):</span>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '10px', fontSize: '12px' }}>
                  <div style={{ backgroundColor: 'rgba(16,185,129,0.15)', padding: '10px', borderRadius: '8px', textAlign: 'center' }}><strong style={{ color: '#10b981' }}>Z1 (Recup):</strong> {zonasKarvonen.z1}</div>
                  <div style={{ backgroundColor: 'rgba(56,189,248,0.15)', padding: '10px', borderRadius: '8px', textAlign: 'center' }}><strong style={{ color: '#38bdf8' }}>Z2 (Aeróbico):</strong> {zonasKarvonen.z2}</div>
                  <div style={{ backgroundColor: 'rgba(245,158,11,0.15)', padding: '10px', borderRadius: '8px', textAlign: 'center' }}><strong style={{ color: '#f59e0b' }}>Z3 (Tempo):</strong> {zonasKarvonen.z3}</div>
                  <div style={{ backgroundColor: 'rgba(239,68,68,0.15)', padding: '10px', borderRadius: '8px', textAlign: 'center' }}><strong style={{ color: '#ef4444' }}>Z4 (Limiar):</strong> {zonasKarvonen.z4}</div>
                  <div style={{ backgroundColor: 'rgba(168,85,247,0.15)', padding: '10px', borderRadius: '8px', textAlign: 'center' }}><strong style={{ color: '#a855f7' }}>Z5 (Máximo):</strong> {zonasKarvonen.z5}</div>
                </div>
              </div>
            </div>

            {/* Secção 4: Gestão Clínica, Nutrição e Notas Confidenciais */}
            <div style={{ backgroundColor: config.cardColor, backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.1)', padding: '28px', borderRadius: '24px', marginBottom: '24px', boxShadow: '0 20px 40px -15px rgba(0,0,0,0.8)' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#ef4444', marginBottom: '16px' }}>🏥 Gestão Clínica, Nutrição & Notas da Equipa Técnica</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                <div style={{ backgroundColor: 'rgba(15,23,42,0.6)', padding: '16px', borderRadius: '12px' }}>
                  <span style={{ color: '#94a3b8', fontSize: '12px' }}>Estado Clínico & Lesão</span>
                  <p style={{ fontSize: '16px', fontWeight: 'bold', color: atletaSelecionado.estado === 'Apto' ? '#10b981' : '#ef4444', margin: '6px 0 0 0' }}>{atletaSelecionado.estado} — {atletaSelecionado.lesao} (Regresso: {atletaSelecionado.previsao})</p>
                </div>
                <div style={{ backgroundColor: 'rgba(15,23,42,0.6)', padding: '16px', borderRadius: '12px' }}>
                  <span style={{ color: '#94a3b8', fontSize: '12px' }}>Nutrição & Suplementação</span>
                  <p style={{ fontSize: '15px', color: '#38bdf8', margin: '6px 0 0 0' }}>{atletaSelecionado.nutricao}</p>
                </div>
              </div>
              <div style={{ marginTop: '16px', backgroundColor: 'rgba(15,23,42,0.6)', padding: '16px', borderRadius: '12px' }}>
                <span style={{ color: '#94a3b8', fontSize: '12px' }}>Notas Confidenciais / Acompanhamento Técnico</span>
                <p style={{ fontSize: '14px', color: '#fff', margin: '6px 0 0 0', fontStyle: 'italic' }}>"{atletaSelecionado.notas}"</p>
              </div>
            </div>

          </div>
        );
      })()}

      {/* 13. PAINEL ADMIN */}
      {view === 'admin' && (
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: config.cardColor, backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.1)', padding: '24px 32px', borderRadius: '24px', marginBottom: '28px', boxShadow: '0 20px 40px -15px rgba(0,0,0,0.8)' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#38bdf8', margin: 0, ...text3DStyle }}>Painel de Controlo da Plataforma</h2>
            <button onClick={() => setView('dashboard')} style={btnSecondary3D}>
              ← Voltar à Área de Trabalho
            </button>
          </header>

          <div style={{ backgroundColor: config.cardColor, backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.1)', padding: '36px', borderRadius: '24px', display: 'flex', flexDirection: 'column', gap: '24px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.8)' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#60a5fa', margin: 0, ...text3DStyle }}>Configuração Ativa</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '13px' }}>
              <div>
                <label style={{ display: 'block', color: '#94a3b8', marginBottom: '6px', ...text3DStyle }}>Nome da Equipa</label>
                <input type="text" value={config.teamName} onChange={(e) => setConfig({...config, teamName: e.target.value})} style={{ width: '100%', padding: '12px 16px', backgroundColor: 'rgba(15, 23, 42, 0.85)', border: '1px solid rgba(255,255,255,0.15)', color: 'white', borderRadius: '12px' }} />
              </div>
              <div>
                <label style={{ display: 'block', color: '#94a3b8', marginBottom: '6px', ...text3DStyle }}>URL do Logótipo</label>
                <input type="text" value={config.logoUrl} onChange={(e) => setConfig({...config, logoUrl: e.target.value})} style={{ width: '100%', padding: '12px 16px', backgroundColor: 'rgba(15, 23, 42, 0.85)', border: '1px solid rgba(255,255,255,0.15)', color: 'white', borderRadius: '12px' }} />
              </div>
              <div>
                <label style={{ display: 'block', color: '#94a3b8', marginBottom: '6px', ...text3DStyle }}>URL da Imagem de Fundo</label>
                <input type="text" value={config.bgImageUrl} onChange={(e) => setConfig({...config, bgImageUrl: e.target.value})} style={{ width: '100%', padding: '12px 16px', backgroundColor: 'rgba(15, 23, 42, 0.85)', border: '1px solid rgba(255,255,255,0.15)', color: 'white', borderRadius: '12px' }} />
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}