async function buscarPartidasSerieA() {
    // Mantendo o ID 71 (Série A) e focando no ano de 2024
    const url = "https://v3.football.api-sports.io/fixtures?league=71&season=2024";
    
    const minhaChaveReal = '00f704d2e7b0f6145b7fcbe06e84cb7d'; 

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'x-apisports-key': minhaChaveReal 
            }
        });

        const data = await response.json();

        if (data.response.length === 0) {
            console.log("Nenhuma partida encontrada para os critérios selecionados.");
            return;
        }

        // Formatando os dados para uma visualização clara
        const listaPartidas = data.response.map(item => {
            return {
                Data: new Date(item.fixture.date).toLocaleDateString('pt-BR'),
                Rodada: item.league.round,
                Confronto: `${item.teams.home.name} x ${item.teams.away.name}`,
                Placar: item.fixture.status.short === 'FT' 
                    ? `${item.goals.home} - ${item.goals.away}` 
                    : 'A iniciar',
                Status: item.fixture.status.long
            };
        });

        console.log(`✅ Foram encontradas ${listaPartidas.length} partidas na temporada 2024.`);
        
        // Exibe as 20 primeiras partidas (você pode remover o slice para ver todas)
        console.table(listaPartidas.slice(0, 20));

    } catch (error) {
        console.error('❌ Erro:', error.message);
    }
}

buscarPartidasSerieA();