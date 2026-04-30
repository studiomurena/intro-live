// ==========================================
// PANNELLO DI CONTROLLO: MODALITÀ TEST
// ==========================================
// Metti FALSE quando sei sul palco. Metti TRUE per non impazzire nei test.
const MODALITA_TEST = true; 
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

    // -- QUI SOTTO È ESATTAMENTE IL CODICE DEL GIOCO CHE GIÀ AVEVAMO --
    
    let cielo, skyline, rovine, pavimento;
    let furgone; 
    let pali = [], ostacoli = [], nemiciSprites = [];
    let bandSprites = {}; 

    let faseVideo = 1; 
    let statoRissa = 0; 
    let rissaEvent; 

    const membri = ['carma', 'ferraz', 'mauri', 'nan', 'falcon'];
    const cattivi = ['copzombie', 'drogato']; 
    const animazioni = ['idle', 'attack', 'walk', 'jump', 'hurt', 'fall', 'explode']; 

    function preload() {
        this.load.image('cielo', 'assets/cielo.png');
        this.load.image('skyline', 'assets/skyline.png');
        this.load.image('rovine', 'assets/rovine.png'); 
        this.load.image('pavimento', 'assets/pavimento.png');
        this.load.image('palo1', 'assets/palo1.png');
        this.load.image('palo2', 'assets/palo2.png');
        this.load.image('gommoni', 'assets/gommoni.png'); 

        this.load.spritesheet('furgone_idle', 'assets/furgone-idle.png', { frameWidth: 256, frameHeight: 256, endFrame: 24 });
        this.load.spritesheet('furgone_run', 'assets/furgone-run.png', { frameWidth: 256, frameHeight: 256, endFrame: 24 });
        this.load.spritesheet('furgone_spins', 'assets/furgone-spins.png', { frameWidth: 256, frameHeight: 256, endFrame: 24 });
        this.load.spritesheet('barili_animati', 'assets/barili.png', { frameWidth: 256, frameHeight: 256, endFrame: 24 });

        [...membri, ...cattivi].forEach(char => {
            animazioni.forEach(anim => {
                this.load.spritesheet(`${char}_${anim}`, `assets/${char}-${anim}.png`, { frameWidth: 256, frameHeight: 256, endFrame: 24 });
            });
        });
    }

    function create() {
        cielo = this.add.tileSprite(960, 540, 1920, 1080, 'cielo').setDepth(0);
        
        skyline = this.add.tileSprite(960, 540, 1920, 1080, 'skyline').setDepth(0).setVisible(false);
        skyline.tileScaleY = 2; skyline.tileScaleX = 2; 

        rovine = this.add.tileSprite(960, 540, 1920, 1080, 'rovine').setDepth(0).setVisible(false);
        rovine.tileScaleY = 2; rovine.tileScaleX = 2;

        let ombraSfondo = this.add.graphics();
        ombraSfondo.fillGradientStyle(0x000000, 0x000000, 0x000000, 0x000000, 0, 0, 0.9, 0.9);
        ombraSfondo.fillRect(0, 680, 1920, 100).setDepth(1.5);

        pavimento = this.add.tileSprite(960, 930, 1920, 300, 'pavimento').setDepth(2);

        let ombraPavimento = this.add.graphics();
        ombraPavimento.fillGradientStyle(0x000000, 0x000000, 0x000000, 0x000000, 0.9, 0.9, 0, 0);
        ombraPavimento.fillRect(0, 780, 1920, 60).setDepth(2.1);

        if (this.textures.exists('furgone_idle')) this.anims.create({ key: 'furgone_idle_anim', frames: this.anims.generateFrameNumbers('furgone_idle', { start: 0, end: 24 }), frameRate: 15, repeat: -1 });
        if (this.textures.exists('furgone_run')) this.anims.create({ key: 'furgone_run_anim', frames: this.anims.generateFrameNumbers('furgone_run', { start: 0, end: 24 }), frameRate: 22, repeat: -1 });
        if (this.textures.exists('furgone_spins')) this.anims.create({ key: 'furgone_spins_anim', frames: this.anims.generateFrameNumbers('furgone_spins', { start: 0, end: 24 }), frameRate: 25, repeat: -1 });
        if (this.textures.exists('barili_animati')) this.anims.create({ key: 'barili_fuoco', frames: this.anims.generateFrameNumbers('barili_animati', { start: 0, end: 24 }), frameRate: 12, repeat: -1 });

        [...membri, ...cattivi].forEach(char => {
            animazioni.forEach(anim => {
                if (this.textures.exists(`${char}_${anim}`)) {
                    let isDeath = (anim === 'fall' || anim === 'explode');
                    this.anims.create({ key: `${char}_${anim}_anim`, frames: this.anims.generateFrameNumbers(`${char}_${anim}`, { start: 0, end: 24 }), frameRate: 15, repeat: isDeath ? 0 : -1 });
                }
            });
        });

        pali.push(this.add.image(2000, 540, 'palo1').setDepth(10).setScale(1.5));
        pali.push(this.add.image(3000, 540, 'palo2').setDepth(10).setScale(1.5));

        furgone = this.add.sprite(960, 700, 'furgone_run').setDepth(3).setScale(3.5);
        if (this.anims.exists('furgone_run_anim')) furgone.play('furgone_run_anim');

        let posizioniBandX = { 'carma': 350, 'ferraz': 600, 'mauri': 850, 'nan': 1100, 'falcon': 1350 };
        membri.forEach(m => {
            bandSprites[m] = this.add.sprite(posizioniBandX[m], 780, `${m}_walk`).setDepth(4).setScale(1.5).setVisible(false);
        });

        let configOstacoli = [
            { x: 2100, y: 770, type: 'barili_animati' }, { x: 2300, y: 840, type: 'gommoni' },
            { x: 2500, y: 790, type: 'barili_animati' }, { x: 2800, y: 850, type: 'gommoni' },
            { x: 3000, y: 780, type: 'barili_animati' }
        ];
        configOstacoli.forEach(ost => {
            let el = ost.type === 'barili_animati' ? this.add.sprite(ost.x, ost.y, 'barili_animati') : this.add.image(ost.x, ost.y, 'gommoni');
            if (ost.type === 'barili_animati' && this.anims.exists('barili_fuoco')) el.play('barili_fuoco');
            el.setDepth(3).setScale(1.1);
            ostacoli.push(el);
        });

        let copioneNemici = [
            { tipo: 'copzombie', targetX: 450,  bersaglio: 'carma',  y: 770 },
            { tipo: 'copzombie', targetX: 500,  bersaglio: 'carma',  y: 810 },
            { tipo: 'drogato',   targetX: 700,  bersaglio: 'ferraz', y: 790 },
            { tipo: 'drogato',   targetX: 950,  bersaglio: 'mauri',  y: 780 },
            { tipo: 'copzombie', targetX: 1200, bersaglio: 'nan',    y: 800 },
            { tipo: 'drogato',   targetX: 1450, bersaglio: 'falcon', y: 790 }
        ];

        copioneNemici.forEach((n, i) => {
            let nemico = this.add.sprite(2500 + (i * 200), n.y, `${n.tipo}_walk`).setDepth(4).setScale(1.5).setFlipX(true); 
            if (this.anims.exists(`${n.tipo}_walk_anim`)) nemico.play(`${n.tipo}_walk_anim`);
            nemico.targetX = n.targetX; nemico.bersaglioNome = n.bersaglio;
            nemiciSprites.push(nemico);
        });

        innescaLampi(this);

        this.time.delayedCall(18000 * mTempo, () => {
            if (this.anims.exists('furgone_spins_anim')) { furgone.play('furgone_spins_anim'); furgone.y = 650; furgone.setScale(3.15); }
        });

        this.time.delayedCall(20000 * mTempo, () => {
            faseVideo = 2; 
            cielo.setVisible(false); skyline.setVisible(true);
            pali.forEach(p => p.setVisible(false));

            if (this.anims.exists('furgone_run_anim')) furgone.play('furgone_run_anim'); 
            furgone.y = 700; furgone.setScale(3.5); 
            
            this.tweens.add({ targets: furgone, x: -1000, duration: 4000 * mTempo, ease: 'Power2' });
            
            membri.forEach(m => {
                let s = bandSprites[m];
                s.setVisible(true); s.y = 700;
                if (this.anims.exists(`${m}_walk_anim`)) s.play(`${m}_walk_anim`);
                this.tweens.add({ targets: s, y: 780, duration: 500 * mTempo, ease: 'Bounce.easeOut' });
            });
        });

        this.time.delayedCall(50000 * mTempo, () => {
            faseVideo = 3; 
            skyline.setVisible(false); rovine.setVisible(true);
            
            membri.forEach(m => { if (this.anims.exists(`${m}_idle_anim`)) bandSprites[m].play(`${m}_idle_anim`); });
            this.tweens.add({ targets: ostacoli, x: '-=1200', duration: 3000 * mTempo, ease: 'Power2' });
            
            nemiciSprites.forEach(n => {
                this.tweens.add({
                    targets: n, x: n.targetX, duration: 3000 * mTempo, ease: 'Power2',
                    onComplete: () => { 
                        let nome = n.texture.key.split('_')[0];
                        if (this.anims.exists(`${nome}_attack_anim`)) n.play(`${nome}_attack_anim`); 
                    }
                });
            });
            this.time.delayedCall(3000 * mTempo, () => iniziaRissa(this));
        });

        this.time.delayedCall(75000 * mTempo, () => { statoRissa = 1; }); 
        this.time.delayedCall(82000 * mTempo, () => {
            statoRissa = 2; 
            if(rissaEvent) rissaEvent.remove(); 
            
            membri.forEach(m => { if (this.anims.exists(`${m}_idle_anim`)) bandSprites[m].play(`${m}_idle_anim`); }); 

            nemiciSprites.forEach(n => {
                let nome = n.texture.key.split('_')[0];
                let animMorte = nome === 'copzombie' ? 'fall' : 'explode';
                if (this.anims.exists(`${nome}_${animMorte}_anim`)) {
                    n.play(`${nome}_${animMorte}_anim`).once('animationcomplete', () => {
                        this.tweens.add({ targets: n, alpha: 0, duration: 1500 * mTempo }); 
                    });
                }
            });
        });

        this.time.delayedCall(90000 * mTempo, () => {
            faseVideo = 4;
            rovine.setVisible(false); skyline.setVisible(true);
            
            membri.forEach(m => this.tweens.add({ targets: bandSprites[m], alpha: 0, duration: 500 * mTempo }));
            ostacoli.forEach(o => this.tweens.add({ targets: o, alpha: 0, duration: 500 * mTempo }));

            furgone.x = -800; furgone.setVisible(true);
            if (this.anims.exists('furgone_run_anim')) furgone.play('furgone_run_anim'); 
            
            this.tweens.add({ targets: furgone, x: 960, duration: 2500 * mTempo, ease: 'Power2' });
            pali.forEach(p => p.setVisible(true)); 
        });

        this.time.delayedCall(105000 * mTempo, () => {
            faseVideo = 5;
            skyline.setVisible(false); cielo.setVisible(true);
        });
    }

    function iniziaRissa(scene) {
        rissaEvent = scene.time.addEvent({
            delay: 1000,
            callback: () => {
                if (statoRissa === 0) {
                    nemiciSprites.forEach(n => {
                        let nome = n.texture.key.split('_')[0];
                        if (Math.random() > 0.5) {
                            if (scene.anims.exists(`${nome}_attack_anim`)) n.play(`${nome}_attack_anim`);
                            let bersaglio = bandSprites[n.bersaglioNome];
                            if (scene.anims.exists(`${n.bersaglioNome}_hurt_anim`)) {
                                bersaglio.play(`${n.bersaglioNome}_hurt_anim`).once('animationcomplete', () => {
                                    if (scene.anims.exists(`${n.bersaglioNome}_idle_anim`)) bersaglio.play(`${n.bersaglioNome}_idle_anim`);
                                });
                            }
                        } else { if (scene.anims.exists(`${nome}_idle_anim`)) n.play(`${nome}_idle_anim`); }
                    });

                    membri.forEach(m => {
                        let sprite = bandSprites[m];
                        if (sprite.anims.currentAnim && sprite.anims.currentAnim.key.includes('hurt')) return;
                        let mossa = Math.random() > 0.5 ? 'attack' : 'jump';
                        if (scene.anims.exists(`${m}_${mossa}_anim`)) {
                            sprite.play(`${m}_${mossa}_anim`).once('animationcomplete', () => {
                                if (sprite.anims.currentAnim && sprite.anims.currentAnim.key.includes(mossa) && scene.anims.exists(`${m}_idle_anim`)) {
                                    sprite.play(`${m}_idle_anim`);
                                }
                            });
                        }
                    });
                } else if (statoRissa === 1) {
                    membri.forEach(m => { if (scene.anims.exists(`${m}_attack_anim`)) bandSprites[m].play(`${m}_attack_anim`); });
                    nemiciSprites.forEach(n => {
                        let nome = n.texture.key.split('_')[0];
                        if (scene.anims.exists(`${nome}_hurt_anim`)) n.play(`${nome}_hurt_anim`);
                    });
                }
            },
            loop: true
        });
    }

    function innescaLampi(scene) {
        let flashRect = scene.add.rectangle(960, 540, 1920, 1080, 0xffaa00).setDepth(1).setAlpha(0).setBlendMode(Phaser.BlendModes.ADD);
        function prossimoLampo() {
            scene.time.delayedCall(Phaser.Math.Between(5000, 12000) * mTempo, () => {
                flashRect.fillColor = Phaser.Math.RND.pick([0xff8800, 0xffaa00, 0xffcc00]);
                scene.tweens.add({
                    targets: flashRect, alpha: 0.5, duration: 60, yoyo: true, repeat: Phaser.Math.Between(1, 2), 
                    onComplete: () => { prossimoLampo(); }
                });
            });
        }
        prossimoLampo(); 
    }

    function update() {
        let spd = MODALITA_TEST ? 2 : 1; 
        if (faseVideo === 1 || faseVideo === 4 || faseVideo === 5) {
            if(faseVideo === 1) cielo.tilePositionX += 1 * spd;
            if(faseVideo === 4) skyline.tilePositionX += 2 * spd;
            if(faseVideo === 5) cielo.tilePositionX += 1 * spd;
            
            pavimento.tilePositionX += 30 * spd;
            pali.forEach(p => { p.x -= 50 * spd; if (p.x < -200) p.x = 2500 + Math.random() * 1000; });
        } else if (faseVideo === 2) {
            skyline.tilePositionX += 1 * spd; pavimento.tilePositionX += 5 * spd; 
        } else if (faseVideo === 3) { rovine.tilePositionX += 0.5 * spd; }
    }
}

// ==========================================
// L'AZIONE PARTE DA QUI!
// ==========================================
// Fa partire la sequenza di Intro testuale
avviaIntro();
