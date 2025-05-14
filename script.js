document.addEventListener('DOMContentLoaded', () => {
    // Encontrar o audioPlayer (se existir)
    const audioPlayer = document.getElementById('audioPlayer');
    const tracks = document.querySelectorAll('.track');
    let currentTrack = null;

    if (audioPlayer) {
        console.log('audioPlayer encontrado:', audioPlayer);

        tracks.forEach(track => {
            const listenBtn = track.querySelector('.listen-btn');
            const playBtn = track.querySelector('.play-btn');
            const audioSrc = track.getAttribute('data-audio');

            if (!audioSrc) {
                listenBtn.disabled = true;
                console.log(`Faixa "${track.textContent.trim()}" não tem arquivo de áudio.`);
            } else {
                console.log(`Faixa "${track.textContent.trim()}" associada ao arquivo: ${audioSrc}`);
            }

            const playTrack = () => {
                console.log('Botão clicado para faixa:', track.textContent.trim());
                if (currentTrack === track) {
                    if (!audioPlayer.paused) {
                        console.log('Pausando áudio...');
                        audioPlayer.pause();
                        playBtn.classList.remove('playing');
                        listenBtn.textContent = 'Escutar Faixa';
                    } else {
                        console.log('Tentando reproduzir áudio com src:', audioPlayer.src);
                        audioPlayer.load();
                        audioPlayer.play().catch(error => {
                            console.error('Erro ao reproduzir áudio:', error.message);
                        });
                        playBtn.classList.add('playing');
                        listenBtn.textContent = 'Pausar';
                    }
                } else {
                    if (currentTrack) {
                        console.log('Parando a faixa atual:', currentTrack.textContent.trim());
                        const previousPlayBtn = currentTrack.querySelector('.play-btn');
                        const previousListenBtn = currentTrack.querySelector('.listenBtn');
                        previousPlayBtn.classList.remove('playing');
                        previousListenBtn.textContent = 'Escutar Faixa';
                        audioPlayer.pause();
                    }
                    if (audioSrc) {
                        console.log('Configurando nova faixa:', audioSrc);
                        audioPlayer.src = audioSrc;
                        audioPlayer.load();
                        audioPlayer.play().catch(error => {
                            console.error('Erro ao reproduzir áudio:', error.message);
                        });
                        playBtn.classList.add('playing');
                        listenBtn.textContent = 'Pausar';
                        currentTrack = track;
                    } else {
                        console.warn('Nenhum arquivo de áudio definido para esta faixa.');
                    }
                }
            };

            listenBtn.addEventListener('click', playTrack);
            playBtn.addEventListener('click', playTrack);
        });

        audioPlayer.addEventListener('ended', () => {
            if (currentTrack) {
                console.log('Áudio finalizado:', currentTrack.textContent.trim());
                const currentPlayBtn = currentTrack.querySelector('.play-btn');
                const currentListenBtn = currentTrack.querySelector('.listen-btn');
                currentPlayBtn.classList.remove('playing');
                currentListenBtn.textContent = 'Escutar Faixa';
                currentTrack = null;
            }
        });
    }

    // Botão de Tema Claro/Escuro
    const toggleThemeBtn = document.createElement('button');
    toggleThemeBtn.textContent = 'Mudar Tema';
    toggleThemeBtn.style.position = 'fixed';
    toggleThemeBtn.style.bottom = '20px';
    toggleThemeBtn.style.right = '20px';
    toggleThemeBtn.style.padding = '10px 20px';
    toggleThemeBtn.style.borderRadius = '5px';
    toggleThemeBtn.style.background = '#ffcc00';
    toggleThemeBtn.style.border = 'none';
    toggleThemeBtn.style.cursor = 'pointer';
    document.body.appendChild(toggleThemeBtn);

    let isDark = false;

    toggleThemeBtn.addEventListener('click', () => {
        const bodyClass = document.body.classList;

        if (isDark) {
            if (bodyClass.contains('super-page')) {
                document.body.style.background = 'linear-gradient(135deg, #96775e, #050a25)';
            } else if (bodyClass.contains('pirata-page')) {
                document.body.style.background = 'linear-gradient(135deg, #1e90ff, #4682b4)';
            } else if (bodyClass.contains('lobos-page')) {
                document.body.style.background = 'linear-gradient(135deg, #2f4f39, #57493f)';
            } else if (bodyClass.contains('anti-heroi-page')) {
                document.body.style.background = 'linear-gradient(135deg, #2d2f31, #5c5b68)';
            } else if (bodyClass.contains('home')) {
                document.body.style.background = 'linear-gradient(135deg, #1e90ff, #4682b4)'; /* Tema padrão para index.html */
            }
            document.body.style.color = bodyClass.contains('anti-heroi-page') ? '#fff' : '#fff';
        } else {
            if (bodyClass.contains('super-page')) {
                document.body.style.background = 'linear-gradient(135deg, #3d332b, #01030e)';
            } else if (bodyClass.contains('pirata-page')) {
                document.body.style.background = 'linear-gradient(135deg, #233b66, #273e69)';
            } else if (bodyClass.contains('lobos-page')) {
                document.body.style.background = 'linear-gradient(135deg, #1f3333, #5e2f0d)';
            } else if (bodyClass.contains('anti-heroi-page')) {
                document.body.style.background = 'linear-gradient(135deg, #121314, #242429)';
            } else if (bodyClass.contains('home')) {
                document.body.style.background = 'linear-gradient(135deg, #0a2a43, #15202b)'; /* Tema escuro para index.html */
            }
            document.body.style.color = '#fff';
        }
        isDark = !isDark;
    });
});