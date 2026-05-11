// cenarios.js
export const cenarios = {
    // === ATO I ===
    1: { // Cena 1.1 — Entidades e Atributos
        video: "download.mp4",
        texto: `<p><strong>Cena 1.1: O Elenco e seus Crachás</strong></p>
                <p>Uma maternidade deseja informatizar suas operações. Na recepção, várias <strong>PACIENTES</strong> aguardam atendimento. Uma <strong>MÉDICA</strong> circula pelo hospital.</p>
                <p>O sistema não registra pessoas específicas, mas sim TIPOS DE PARTICIPANTES.</p>`,
        dica: `Identifique os tipos de participantes e defina suas informações (Nome e Telefone).`,
        falaMascote: "Ação! Pense de forma geral, não em indivíduos específicos.",
        ferramentasLiberadas: ['entidade', 'atributo']
    },
    2: { // Cena 1.2 — Chave Primária
        video: "cena1_2.mp4",
        texto: `<p><strong>Cena 1.2: O Clone no Set</strong></p>
                <p>Ao cadastrar uma paciente chamada Maria Souza, o sistema encontra vários registros iguais. Problema: nomes podem se repetir.</p>
                <p>Cada registro precisa de um identificador único e estável.</p>`,
        dica: `Adicione um identificador único para Paciente (CPF) e Médico (CRM) e marque-os como Chave.`,
        falaMascote: "Corta! Temos clones no set. Precisamos de um identificador único para cada um.",
        ferramentasLiberadas: ['entidade', 'atributo']
    },
    
    // === ATO II ===
    3: { // Cena 2.1 — Relacionamentos
        video: "videoteste.mp4",
        texto: `<p><strong>Cena 2.1: A Ação no Set</strong></p>
                <p>Uma PACIENTE entra no consultório. A MÉDICA inicia o atendimento. Existe uma interação acontecendo entre elas agora mesmo.</p>`,
        dica: `Crie o elemento de interação e nomeie usando um verbo (Ação).`,
        falaMascote: "Luzes! Câmera! Ação! Liberei o losango para você unir o nosso elenco.",
        ferramentasLiberadas: ['entidade', 'atributo', 'relacionamento']
    },
    4: { // Cena 2.2 — Cardinalidade 1:N
        video: "cena2_2.mp4",
        texto: `<p><strong>Cena 2.2: Foco no Tempo</strong></p>
                <p>Uma MÉDICA atende várias pacientes ao longo do dia. Mas, focando em um <strong>momento específico</strong>, uma PACIENTE está com apenas UMA MÉDICA na sala.</p>`,
        dica: `Defina a quantidade de conexões usando o menu de cardinalidade (1 e N).`,
        falaMascote: "Quantas pessoas estão interagindo nesse exato momento da cena?",
        ferramentasLiberadas: ['entidade', 'atributo', 'relacionamento']
    },

    // === ATO III ===
    5: { // Cena 3.1 — Cardinalidade N:M
        video: "cena3_1.mp4",
        texto: `<p><strong>Cena 3.1: Plot Twist no Roteiro</strong></p>
                <p>Código Rosa! Durante um parto, vários profissionais atuam juntos. Uma paciente pode ter vários médicos e um médico atende várias pacientes nesse turno.</p>`,
        dica: `Ajuste a cardinalidade para refletir múltiplos participantes dos dois lados.`,
        falaMascote: "Essa é uma cena de grupo! Todos precisam participar ao mesmo tempo.",
        ferramentasLiberadas: ['entidade', 'atributo', 'relacionamento']
    },
    6: { // Cena 3.2 — Entidade Forte vs Fraca
        video: "cena3_2.mp4",
        texto: `<p><strong>Cena 3.2: O Protagonista e o Figurante</strong></p>
                <p>Um BEBÊ nasce e possui um registro próprio e permanente. Um ACOMPANHANTE só existe no sistema se estiver ligado a uma paciente.</p>`,
        dica: `Classifique as entidades. Independente é forte; dependente é fraca.`,
        falaMascote: "Quem consegue sobreviver no roteiro sozinho e quem depende de outro personagem?",
        ferramentasLiberadas: ['entidade', 'atributo', 'relacionamento']
    }
};