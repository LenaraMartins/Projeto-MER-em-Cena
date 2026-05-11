export function validarCenario(idCenario, elementosAtuais, conexoesAtuais) {
    let erros = [];
    const obterCardDaLigacao = (conexoesAtuais, nomeEntidade, nomeRelacionamento) => {
    const con = conexoesAtuais.find(c => {
        const n1 = c.el1.textContent.trim().toUpperCase();
        const n2 = c.el2.textContent.trim().toUpperCase();

        return (n1 === nomeEntidade && n2 === nomeRelacionamento) || 
               (n1 === nomeRelacionamento && n2 === nomeEntidade);
    });

    if (!con) return null;

    // Retorna a cardinalidade do lado que pertence à Entidade
    return (con.el1.textContent.trim().toUpperCase() === nomeEntidade) ? con.cardLado1 : con.cardLado2;
    };
    
    const nomesCanvas = Array.from(elementosAtuais).map(el => el.textContent.trim().toUpperCase());
    
    const temElemento = (nome) => nomesCanvas.includes(nome);
    const contarTipo = (tipo) => Array.from(elementosAtuais).filter(el => el.getAttribute('data-tipo') === tipo).length;

    // ==========================================
    // NOVAS REGRAS GLOBAIS DE HIGIENE DO QUADRO
    // ==========================================

    // 1. Regra Antilixo: Proíbe elementos com nomes padrão
    if (temElemento('ENTIDADE') || temElemento('ATRIBUTO') || temElemento('RELACIONAMENTO')) {
        erros.push("Corta! Você deixou formas vazias (com o nome padrão) no quadro. Renomeie com duplo clique ou apague-as!");
        return { valido: false, erros: erros }; // Para a validação na hora
    }

    // 2. Regra da Gravidade: Proíbe peças soltas flutuando
    if (elementosAtuais.length > 1) {
        const elementosConectados = new Set();
        conexoesAtuais.forEach(con => {
            elementosConectados.add(con.el1);
            elementosConectados.add(con.el2);
        });

        // Se algum elemento na tela não estiver no Set de conectados, ele está solto
        const temPecaSolta = Array.from(elementosAtuais).some(el => !elementosConectados.has(el));
        
        if (temPecaSolta) {
            erros.push("Existem elementos soltos pelo quadro! Tudo precisa estar conectado a alguma coisa antes de gravar a cena.");
            return { valido: false, erros: erros }; // Para a validação na hora
        }
    }

    // ==========================================
    // VERIFICADOR DE ATRIBUTOS (Agora caça duplicatas!)
    // ==========================================
    
    // Nova função: Conta QUANTOS atributos com esse nome estão ligados na entidade
    const contarAtributosDaEntidade = (nomeEntidade, nomeAtributo) => {
        const entidade = Array.from(elementosAtuais).find(e => 
            e.textContent.trim().toUpperCase() === nomeEntidade && 
            e.getAttribute('data-tipo') === 'entidade'
        );
        if (!entidade) return 0;

        return conexoesAtuais.filter(con => {
            const outro = (con.el1 === entidade) ? con.el2 : (con.el2 === entidade ? con.el1 : null);
            return outro && 
                   outro.getAttribute('data-tipo') === 'atributo' && 
                   outro.textContent.trim().toUpperCase() === nomeAtributo;
        }).length;
    };

    // A função antiga agora usa a contagem
    const entidadeTemAtributo = (nomeEntidade, nomeAtributo) => {
        return contarAtributosDaEntidade(nomeEntidade, nomeAtributo) > 0;
    };


    // ==========================================
    // CENA 1.1: Entidades e Atributos
    // ==========================================
    if (idCenario === 1) {
        if (temElemento('HELENA') || temElemento('ANA') || temElemento('MARIA')) {
            erros.push("Estamos nomeando indivíduos, não tipos. Pense de forma geral.");
        } else if (temElemento('PESSOA') || temElemento('PESSOAS')) {
            erros.push("Muito amplo. Pacientes e médicos possuem papéis diferentes no hospital.");
        } else if (!temElemento('PACIENTE') || !temElemento('MÉDICO')) {
            erros.push("Qual é o papel oficial dessas pessoas no hospital? Faltam entidades principais.");
        } 
        else {
            // Checa a existência básica
            if (!entidadeTemAtributo('PACIENTE', 'NOME') || !entidadeTemAtributo('PACIENTE', 'TELEFONE')) {
                erros.push("A entidade PACIENTE precisa ter seus próprios atributos NOME e TELEFONE conectados a ela.");
            } else if (!entidadeTemAtributo('MÉDICO', 'NOME') || !entidadeTemAtributo('MÉDICO', 'TELEFONE')) {
                erros.push("A entidade MÉDICO também precisa ter seus próprios atributos NOME e TELEFONE conectados a ela.");
            }
            // A NOVA REGRA: Checa por duplicatas exatas na mesma entidade!
            else if (contarAtributosDaEntidade('PACIENTE', 'NOME') > 1 || contarAtributosDaEntidade('PACIENTE', 'TELEFONE') > 1) {
                erros.push("A entidade PACIENTE tem atributos repetidos! Deixe apenas um NOME e um TELEFONE para ela.");
            }
            else if (contarAtributosDaEntidade('MÉDICO', 'NOME') > 1 || contarAtributosDaEntidade('MÉDICO', 'TELEFONE') > 1) {
                erros.push("A entidade MÉDICO tem atributos repetidos! Deixe apenas um NOME e um TELEFONE para ela.");
            }
        }
    }
    // ==========================================
    // CENA 1.2: Chave Primária
    // ==========================================
    if (idCenario === 2) {
    // 1. Verificação de Existência (Não proibimos mais Nome/Telefone aqui!)
    if (!temElemento('CPF')) {
        erros.push("A PACIENTE precisa de um identificador único. Adicione o atributo CPF.");
    }
    if (!temElemento('CRM')) {
        erros.push("O MÉDICO precisa de um identificador único. Adicione o atributo CRM.");
    }

    // 2. Verificação de Topologia (Ligação)
    if (temElemento('CPF') && !entidadeTemAtributo('PACIENTE', 'CPF')) {
        erros.push("O CPF não está ligado à Paciente! Puxe uma linha entre eles.");
    }
    if (temElemento('CRM') && !entidadeTemAtributo('MÉDICO', 'CRM')) {
        erros.push("O CRM precisa estar conectado diretamente ao Médico.");
    }

    // 3. Verificação Visual (Se é PK)
    const elCPF = Array.from(elementosAtuais).find(e => e.textContent.trim().toUpperCase() === 'CPF');
    const elCRM = Array.from(elementosAtuais).find(e => e.textContent.trim().toUpperCase() === 'CRM');

    if (elCPF && !elCPF.classList.contains('is-pk')) {
        erros.push("O CPF deve ser o Identificador Principal! Clique com o botão direito nele e marque como Chave Primária.");
    }
    if (elCRM && !elCRM.classList.contains('is-pk')) {
        erros.push("O CRM deve ser o Identificador Principal do Médico! Marque-o como Chave Primária.");
    }
}
    // ... restante das cenas
    // ==========================================
    // CENA 2.1: Relacionamentos
    // ==========================================
    if (idCenario === 3) {
        if (contarTipo('relacionamento') === 0) {
            erros.push("Falta o evento entre elas. O losango de relacionamento sumiu!");
        } else if (temElemento('SALA') || temElemento('MACA') || temElemento('PRONTUÁRIO')) {
            erros.push("Use uma ação (verbo), não um objeto físico. O que elas estão fazendo?");
        } else if (!temElemento('CONSULTA') && !temElemento('ATENDE')) {
            erros.push("Isso não representa o que acontece na cena. Tente verbos como 'Consulta' ou 'Atende'.");
        }
    }

    // ==========================================
    // CENA 2.2: Cardinalidade 1:N
    // ==========================================
    if (idCenario === 4) {
        // Tenta buscar a cardinalidade em 'CONSULTA' ou 'ATENDE'
        const relNome = temElemento('CONSULTA') ? 'CONSULTA' : 'ATENDE';
        const cardMedico = obterCardDaLigacao(conexoesAtuais, 'MÉDICO', relNome);
        const cardPaciente = obterCardDaLigacao(conexoesAtuais, 'PACIENTE', relNome);

        if (!cardMedico || !cardPaciente) {
            erros.push("Defina as cardinalidades clicando nas linhas que ligam os personagens ao relacionamento!");
        } else if (cardPaciente === '1' && cardMedico === '1') {
            erros.push("Um médico atende apenas uma pessoa na vida inteira? Pense no volume de pacientes do hospital.");
        } else if (cardPaciente === 'N' && cardMedico === '1') {
            erros.push("Você inverteu! Quantos médicos estão atendendo a Helena neste exato momento?");
        } else if (cardPaciente === 'N' && cardMedico === 'N') {
            erros.push("Considere o momento específico da consulta, como mostra o relógio na animação.");
        }
        // Se cardPaciente for '1' e cardMedico for 'N', ele passa direto (sucesso!)
    }

    // ==========================================
    // CENA 3.1: Cardinalidade N:M
    // ==========================================
    if (idCenario === 5) {
        const relNome = temElemento('PARTO') || temElemento('ATENDE') ? (temElemento('PARTO') ? 'PARTO' : 'ATENDE') : 'CONSULTA';
        const cardMedico = obterCardDaLigacao(conexoesAtuais, 'MÉDICO', relNome);
        const cardPaciente = obterCardDaLigacao(conexoesAtuais, 'PACIENTE', relNome);

        if (!cardMedico || !cardPaciente) {
            erros.push("O sistema precisa saber quantas pessoas participam do parto simultaneamente.");
        } else if (cardMedico === '1' || cardPaciente === '1') {
            erros.push("Corta! As luzes estão vermelhas e há vários médicos na sala. É uma relação de muitos para muitos.");
        }
        // Se ambos forem 'N', a missão é cumprida e o ATO III avança para a cena final!
    }

    // ==========================================
    // CENA 3.2: Forte vs Fraca
    // ==========================================
   if (idCenario === 6) {
        const elAcompanhante = Array.from(elementosAtuais).find(e => e.textContent.trim().toUpperCase() === 'ACOMPANHANTE');
        
        // Verifica se existe o relacionamento marcado como is-fraca (identificador)
        const relIdentificador = Array.from(elementosAtuais).some(e => 
            e.getAttribute('data-tipo') === 'relacionamento' && e.classList.contains('is-fraca')
        );

        if (elAcompanhante && !elAcompanhante.classList.contains('is-fraca')) {
            erros.push("O ACOMPANHANTE só existe se a Paciente existir. Marque-o como Entidade Fraca.");
        }
        
        if (elAcompanhante?.classList.contains('is-fraca') && !relIdentificador) {
            erros.push("Muito bem! Agora marque o Relacionamento que o liga como 'Identificador' (borda dupla).");
        }
    }
    return {
        valido: erros.length === 0,
        erros: erros
    };
}