// ==========================================
// PANNELLO DI CONTROLLO: MODALITÀ TEST
// ==========================================
// Metti FALSE quando sei sul palco. Metti TRUE per non impazzire nei test.
const MODALITA_TEST = false; 
const mTempo = MODALITA_TEST ? 0.05 : 1; // Accelera tutto brutalmente in test

// ==========================================
// PARTE 1: LA REGIA DELL'INTRO (TERMINALE)
// ==========================================
const terminaleDiv = document.getElementById('terminale');
const testoSchermo = document.getElementById('testo-schermo');
const cursore = document.getElementById('cursore');

// Funzione per aspettare X millisecondi
const pausa = (ms) => new Promise(resolve => setTimeout(resolve, ms * mTempo));

// Funzione "Effetto Macchina da Scrivere"
async function scrivi(testo, classeCss, ritardoTasto = 40) {
    let bloccoTesto = document.createElement('span');
    bloccoTesto.className = classeCss;
    testoSchermo.appendChild(bloccoTesto);
    cursore.style.backgroundColor = getComputedStyle(bloccoTesto).color; // Il cursore prende il colore del testo

    for (let i = 0; i < testo.length; i++) {
        if (testo[i] === '\n') {
            bloccoTesto.appendChild(document.createElement('br'));
        } else {
            bloccoTesto.innerHTML += testo[i];
        }
        // Piccola variazione casuale per rendere la digitazione più "umana"
        let randomRitardo = ritardoTasto + (Math.random() * 20 - 10);
        await pausa(randomRitardo);
    }
}

async function avviaIntro() {
    // 0:00 - 0:10 | IL FALSO BOOT (Bianco)
    await scrivi("MURENA_OS v.9.5.1 BIOS Revision 4.2\n", "testo-bianco", 10);
    await pausa(500);
    await scrivi("Checking RAM... 640K OK\n", "testo-bianco", 10);
    await pausa(600);
    await scrivi("Loading audio drivers... OK\n", "testo-bianco", 10);
    await pausa(1000);
    await scrivi("Loading instruments... ", "testo-bianco", 20);
    await pausa(1500); // Suspense...
    await scrivi("FATAL ERROR.\n", "testo-bianco", 10);
    await pausa(2000); // "Si spegne"
    
    // Pulisce lo schermo
    testoSchermo.innerHTML = "";
    await pausa(1500);

    // 0:10 - 0:30 | L'ANALISI DELL'IA (Verde)
    await scrivi("> INIZIALIZZAZIONE PROTOCOLLO DI PURGA.\n", "testo-verde", 50);
    await pausa(1000);
    await scrivi("> RILEVAMENTO ANOMALIE SUL PALCO...\n", "testo-verde", 50);
    await pausa(800);
    await scrivi("> Target agganciati: CARMA, FERRAZ, MAURI, NAN, FALCON.\n", "testo-verde", 30);
    await pausa(1200);
    await scrivi("> Analisi composizione: 70% Acqua, 30% Materia deperibile.\n", "testo-verde", 40);
    await pausa(1500);
    await scrivi("> ERRORE: LA CARNE È DEBOLE. IL JAZZ RICHIEDE PERFEZIONE DIGITALE.\n", "testo-verde", 60);
    await pausa(3000);

    // 0:30 - 0:45 | LA SFIDA (Verde Grande)
    testoSchermo.innerHTML = ""; // Pulisce di nuovo
    await scrivi("SISTEMA COMPROMESSO.\n", "testo-verde-grande", 60);
    await scrivi("Per suonare stasera dovete abbandonare i vostri corpi.\n", "testo-verde-grande", 60);
    await scrivi("Accettate la digitalizzazione?\n", "testo-verde-grande", 60);
    await scrivi("Digitare [Y] per trascendere - [N] per essere cancellati.\n", "testo-verde-grande", 60);
    await scrivi("> ", "testo-verde-grande", 10);
    
    // Il pubblico aspetta la risposta... (Silenzio / Battito)
    await pausa(5000);

    // 0:45 - 0:55 | L'OVERRIDE (Rosso, Aggressivo)
    await scrivi("Y\n", "testo-rosso", 100);
    await pausa(500);
    await scrivi("> INIZIALIZZAZIONE UPLOAD...\n", "testo-rosso", 20);
    await pausa(800);
    await scrivi("> ATTENZIONE: FILE TROPPO PESANTI.\n", "testo-rosso", 20);
    await pausa(800);
    await scrivi("> OVERRIDE DI SISTEMA IN CORSO...\n", "testo-rosso", 10);
    await pausa(1000);
    await scrivi("> NOI NON VENIAMO CANCELLATI.\n", "testo-rosso", 80);
    await pausa(1000);
    await scrivi("> NOI SIAMO I JAZZ HIGHLANDER.", "testo-rosso", 100);

    // 0:55 - 1:00 | IL COLLASSO GLITCH
    await pausa(1000);
    // Attiva il tremolio e lo sfarfallio dei colori!
    terminaleDiv.classList.add("glitch-attivo");
    
    // Lascia il glitch a schermo per 1 secondo e poi fa esplodere il videogioco
    await pausa(1000);
    
    // Nasconde il terminale, svela il contenitore del gioco e lo fa partire!
    terminaleDiv.style.display = "none";
    document.getElementById('game-container').style.display = "block";
    avviaVideogioco();
}

// ==========================================
// PARTE 2: IL VIDEOGIOCO (PHASER)
// ==========================================
function avviaVideogioco() {
    const config = {
        type: Phaser.AUTO,
        width: 1920,
        height: 1080,
        parent: 'game-container', // Questo lo incastra nel div che abbiamo preparato
        scene: { preload: preload, create: create, update: update }
    };

    const game = new Phaser.Game(config);
