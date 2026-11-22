(() => {
  "use strict";

  const WA_NUMBER = "393332898394";
  const EMAIL_TARGET = "albergo.pigna@libero.it";

  let currentLang = "it";
  const state = {
    adults: 2,
    children: 0,
    tableGuests: 4,
    cat: "all",
    diet: "",
    query: "",
    season: "summer",
    lbIndex: 0,
    selectedDishes: new Set()
  };

  const GALLERY = [
    { src: "assets/ext-4.jpg", it: "Albergo Ristorante La Pigna — Facciata alpina e dehor a Croce di Salven", en: "Alpine facade & sunlit terrace at Croce di Salven", de: "Alpenfassade & Sonnenterrasse in Croce di Salven" },
    { src: "assets/room-1.jpg", it: "Camera panoramica con travi a vista in abete e balcone sul verde", en: "Panoramic room with exposed timber beams & balcony", de: "Panoramazimmer mit Holzbalken & Balkon" },
    { src: "assets/room-4.jpg", it: "Camera in dependance con boiserie artigianale in legno naturale", en: "Refurbished dependance room in alpine timber", de: "Renoviertes Zimmer in der Dependance mit Holzvertäfelung" },
    { src: "assets/room-3.jpg", it: "Vista dal balcone privato sulle pinete di Borno", en: "Private balcony view over Borno pine forest", de: "Blick vom Privatbalkon auf die Kiefernwälder von Borno" },
    { src: "assets/rest-2.jpg", it: "Sala ristorante panoramica con vetrate sul bosco", en: "Forest-view panoramic dining hall", de: "Speisesaal mit Panoramafenstern zum Wald" },
    { src: "assets/rest-1.jpg", it: "Bar alpino in legno e zona accoglienza della Famiglia Bertelli", en: "Family-run alpine bar & wooden reception", de: "Familiäre Hotelbar & Empfang in Berg-Holz" },
    { src: "assets/rest-4.jpg", it: "Gran buffet per banchetti, matrimoni e ricorrenze in montagna", en: "Celebration & wedding banquet buffet service", de: "Buffet für Hochzeiten, Bankette & Feiern" },
    { src: "assets/dint-2.jpg", it: "Sentieri CAI e mulattiere tra gli abeti direttamente dal parco", en: "CAI mountain forest trails right behind the hotel", de: "CAI-Wanderwege im Kiefernwald direkt hinter dem Hotel" },
    { src: "assets/dint-3.jpg", it: "Il centro storico di Borno e le tradizioni dell'Altopiano del Sole", en: "Historic Borno town square & local festivals", de: "Historisches Zentrum von Borno & Dorffeste" },
    { src: "assets/ext-1.jpg", it: "Vista aerea dell'Albergo La Pigna e delle vette della Valle Camonica", en: "Aerial view of La Pigna & Valle Camonica peaks", de: "Luftaufnahme von La Pigna & den Gipfeln des Valle Camonica" }
  ];

  const MENU_ITEMS = [
    {
      id: "ant-tagliere",
      cat: "antipasti",
      price: "13 €",
      priceVal: 13,
      tags: ["sg"],
      it: { name: "Tagliere dell'Alpeggio di Borno", desc: "Selezione di salumi tipici camuni e formaggi d'alpeggio stagionati nelle malghe del comprensorio." },
      en: { name: "Borno Alpine Cold Cuts & Cheese Board", desc: "Local mountain cured meats and artisanal cheeses aged in nearby summer pastures." },
      de: { name: "Brettljause der Almen von Borno", desc: "Auswahl an regionaler Bergwurst und würzigem Almkäse aus der Umgebung." }
    },
    {
      id: "ant-sciatt",
      cat: "antipasti",
      price: "12 €",
      priceVal: 12,
      tags: ["casa", "veg"],
      it: { name: "Sciatt Camuni Croccanti al Formaggio Fuso", desc: "Frittelle di grano saraceno dal cuore filante di formaggio di montagna su letto di cicorino." },
      en: { name: "Crispy Buckwheat Sciatt with Melted Alpine Cheese", desc: "Golden buckwheat fritters filled with molten mountain cheese over fresh greens." },
      de: { name: "Knusprige Buchweizen-Sciatt mit Bergkäse", desc: "Traditionelle Buchweizenbällchen mit geschmolzenem Almkäse." }
    },
    {
      id: "ant-ricotta",
      cat: "antipasti",
      price: "11 €",
      priceVal: 11,
      tags: ["casa", "veg", "sg"],
      it: { name: "Ricotta Fresca di Malga con Miele e Noci", desc: "Latticini genuini della zona serviti con miele millefiori di montagna e noci croccanti." },
      en: { name: "Fresh Mountain Ricotta, Wildflower Honey & Walnuts", desc: "Fresh local dairy paired with alpine wildflower honey and crunchy walnuts." },
      de: { name: "Frischer Alm-Ricotta mit Berghonig & Walnüssen", desc: "Hausgemachte Milchprodukte aus den Bergen mit Blütenhonig." }
    },
    {
      id: "ant-crostini",
      cat: "antipasti",
      price: "12 €",
      priceVal: 12,
      tags: ["casa", "veg"],
      it: { name: "Crostini Caldi ai Funghi Porcini e Burro d'Alpe", desc: "Pane casereccio tostato con funghi porcini trifolati raccolti nei boschi di Croce di Salven." },
      en: { name: "Toasted Country Bread with Wild Porcini Mushrooms", desc: "Warm rustic toast topped with mountain butter and locally foraged porcini." },
      de: { name: "Geröstetes Bauernbrot mit Steinpilzen & Almbutter", desc: "Mit frisch gesammelten Pilzen aus den Wäldern um Borno." }
    },
    {
      id: "pri-casoncelli",
      cat: "primi",
      price: "14 €",
      priceVal: 14,
      tags: ["casa"],
      it: { name: "Casoncelli della Tradizione Camuna", desc: "Pasta fresca fatta a mano ripiena secondo ricetta familiare, mantecata con burro d'alpeggio fuso, salvia e pancetta." },
      en: { name: "Handmade Camuno Casoncelli Pasta", desc: "Traditional stuffed alpine ravioli finished with melted mountain butter, sage and crispy pancetta." },
      de: { name: "Hausgemachte Camunische Casoncelli", desc: "Gefüllte Teigtaschen nach Familienrezept mit zerlassener Almbutter, Salbei & Speck." }
    },
    {
      id: "pri-pizzoccheri",
      cat: "primi",
      price: "14 €",
      priceVal: 14,
      tags: ["casa", "veg"],
      it: { name: "Pizzoccheri di Grano Saraceno della Montagna", desc: "Tagliatelle rustiche di grano saraceno con verza, patate, formaggio fuso d'alpeggio e burro dorato." },
      en: { name: "Mountain Buckwheat Pizzoccheri", desc: "Hearty buckwheat pasta tossed with savoy cabbage, potatoes, melted alpine cheese and butter." },
      de: { name: "Gebirgs-Pizzoccheri aus Buchweizen", desc: "Buchweizennudeln mit Wirsing, Kartoffeln, geschmolzenem Almkäse & Butter." }
    },
    {
      id: "pri-tagliatelle",
      cat: "primi",
      price: "15 €",
      priceVal: 15,
      tags: ["casa", "veg"],
      it: { name: "Tagliatelle Tirate a Mano ai Funghi Porcini", desc: "Sfoglia all'uovo fatta in casa condita con profumati funghi porcini dei boschi dell'Altopiano." },
      en: { name: "Handmade Egg Tagliatelle with Porcini Mushrooms", desc: "Fresh egg pasta ribbons tossed with fragrant forest porcini mushrooms." },
      de: { name: "Hausgemachte Tagliatelle mit Steinpilzen", desc: "Frische Bandnudeln mit duftenden Steinpilzen aus dem Wald." }
    },
    {
      id: "pri-gnocchi",
      cat: "primi",
      price: "14 €",
      priceVal: 14,
      tags: ["casa", "veg"],
      it: { name: "Gnocchi di Castagne al Burro di Malga e Ricotta Affumicata", desc: "Impasto artigianale con farina di castagne camune, burro nocciola e scaglie di ricotta." },
      en: { name: "Chestnut Gnocchi with Mountain Butter & Smoked Ricotta", desc: "Hand-rolled local chestnut gnocchi with browned alpine butter." },
      de: { name: "Kastanien-Gnocchi mit Almbutter & Räucherricotta", desc: "Hausgemachte Gnocchi aus Kastanienmehl mit brauner Bergbutter." }
    },
    {
      id: "sec-taragna",
      cat: "secondi",
      price: "16 €",
      priceVal: 16,
      tags: ["veg", "sg"],
      it: { name: "Polenta Taragna con Funghi Trifolati e Formaggio", desc: "Polenta fumante di mais e grano saraceno mantecata con formaggio di malga e funghi di bosco." },
      en: { name: "Polenta Taragna with Forest Mushrooms & Melted Cheese", desc: "Traditional buckwheat-cornmeal polenta served with sautéed forest mushrooms." },
      de: { name: "Polenta Taragna mit geschmortem Waldpilz & Käse", desc: "Kräftige Buchweizen-Polenta mit Pilzen und geschmolzenem Bergkäse." }
    },
    {
      id: "sec-cervo",
      cat: "secondi",
      price: "19 €",
      priceVal: 19,
      tags: ["sg"],
      it: { name: "Cervo in Salmì della Valle con Polenta Calda", desc: "Spezzatino di cervo marinato al vino rosso e bacche di ginepro, cotto lentamente e servito con polenta." },
      en: { name: "Slow-Braised Alpine Venison with Warm Polenta", desc: "Venison marinated in red wine and juniper berries with traditional polenta." },
      de: { name: "Hirschragout nach Tal-Art mit warmer Polenta", desc: "In Rotwein und Wacholder mariniertes Hirschfleisch mit Polenta." }
    },
    {
      id: "sec-brasato",
      cat: "secondi",
      price: "18 €",
      priceVal: 18,
      tags: ["sg"],
      it: { name: "Brasato di Manzo alle Erbe Alpine con Polenta", desc: "Cottura lenta per ore con erbette aromatiche di montagna e contorno di polenta nostrana." },
      en: { name: "Slow-Braised Beef with Alpine Herbs & Polenta", desc: "Tender slow-cooked mountain beef served with creamy rustic polenta." },
      de: { name: "Rinderschmorbraten mit Bergkräutern & Polenta", desc: "Langsam geschmort und mit heimischer Polenta serviert." }
    },
    {
      id: "sec-grigliata",
      cat: "secondi",
      price: "17 €",
      priceVal: 17,
      tags: ["sg"],
      it: { name: "Grigliata Mista di Montagna & Casolet alla Piastra", desc: "Selezione di carni alla brace con formaggio Casolet fuso e patate al forno alle erbe." },
      en: { name: "Mixed Alpine Grill & Griddled Casolet Cheese", desc: "Chargrilled mountain cuts with local Casolet cheese and herb potatoes." },
      de: { name: "Gemischter Berg-Grillteller & Casolet-Käse", desc: "Fleischauswahl vom Grill mit gebratenem Casolet und Kräuterkartoffeln." }
    },
    {
      id: "dol-mele",
      cat: "dolci",
      price: "6 €",
      priceVal: 6,
      tags: ["casa", "veg"],
      it: { name: "Torta Casereccia alle Mele e Cannella", desc: "Preparata in casa con mele di montagna, servita soffice con una spolverata di zucchero a velo." },
      en: { name: "Homemade Mountain Apple & Cinnamon Cake", desc: "Warm rustic apple cake baked daily in our family kitchen." },
      de: { name: "Hausgemachter Apfel-Zimt-Kuchen", desc: "Täglich frisch in unserer Familienküche gebacken." }
    },
    {
      id: "dol-strudel",
      cat: "dolci",
      price: "7 €",
      priceVal: 7,
      tags: ["casa", "veg"],
      it: { name: "Strudel Caldo di Montagna con Pinoli e Uvetta", desc: "Sfoglia sottile ripiena di mele, pinoli, uvetta e cannella servita tiepida." },
      en: { name: "Warm Alpine Apple Strudel with Pine Nuts", desc: "Crisp pastry filled with mountain apples, pine nuts and cinnamon." },
      de: { name: "Warmer Berg-Apfelstrudel mit Pinienkernen", desc: "Feiner Strudel mit Äpfeln, Rosinen und Zimt." }
    },
    {
      id: "dol-crostata",
      cat: "dolci",
      price: "6 €",
      priceVal: 6,
      tags: ["casa", "veg"],
      it: { name: "Crostata al Burro di Malga e Frutti di Bosco", desc: "Pasta frolla friabile preparata con burro d'alpeggio e confettura di mirtilli e lamponi." },
      en: { name: "Wild Berry & Alpine Butter Jam Tart", desc: "Shortcrust pastry baked with mountain butter and berry preserve." },
      de: { name: "Mürbeteigkuchen mit Almbutter & Waldbeeren", desc: "Knuspriger Boden mit Almbutter und fruchtiger Beerenkonfitüre." }
    },
    {
      id: "dol-semifreddo",
      cat: "dolci",
      price: "7 €",
      priceVal: 7,
      tags: ["casa", "veg", "sg"],
      it: { name: "Semifreddo alla Pigna con Salsa Calda ai Mirtilli", desc: "Dolce al cucchiaio della casa guarnito con coulis caldo di frutti di bosco." },
      en: { name: "La Pigna Semifreddo with Warm Blueberry Sauce", desc: "Creamy house dessert topped with warm blueberry and raspberry coulis." },
      de: { name: "Haus-Semifreddo mit warmer Heidelbeersauce", desc: "Cremiges Dessert mit warmem Waldbeeren-Topping." }
    }
  ];

  const SEASON_DATA = {
    summer: {
      it: [
        { dist: "0 MIN A PIEDI", t: "Sentieri CAI & Mulattiere dal Parco", d: "Direttamente dal giardino sul retro dell'albergo partono i sentieri CAI e le passeggiate ombreggiate nelle pinete verso il Monte Altissimo e Croce di Salven." },
        { dist: "6 MIN IN AUTO", t: "Riserva Naturale Boschi del Giovetto", d: "Oasi protetta celebre per le foreste di abeti rossi, la Formica Rufa, l'aria purissima e gli itinerari adatti a famiglie ed escursionisti." },
        { dist: "4 KM · CENTRO", t: "Parco delle Doline & Borgo Storico di Borno", d: "Esplora le doline carsiche, il centro medievale di Borno, i tour in e-bike/MTB, il Lago Moro e le incisioni rupestri UNESCO della Valle Camonica." }
      ],
      en: [
        { dist: "0 MIN WALK", t: "CAI Alpine Trails from Our Private Park", d: "Marked forest trails and gentle mountain paths start directly behind our garden through Borno's pine woods." },
        { dist: "6 MIN DRIVE", t: "Boschi del Giovetto Nature Reserve", d: "Protected spruce forest ideal for refreshing summer walks, wildlife observation and family excursions." },
        { dist: "4 KM · VILLAGE", t: "Doline Park, Lake Moro & Historic Borno", d: "Discover karst formations, ancient Borno summer festivals, mountain bike trails and UNESCO rock art." }
      ],
      de: [
        { dist: "0 MIN ZU FUSS", t: "CAI-Wanderwege direkt ab dem Hotelpark", d: "Schattige Forstwege durch die Kiefernwälder beginnen unmittelbar hinter unserem Garten." },
        { dist: "6 MIN FAHRT", t: "Naturschutzgebiet Boschi del Giovetto", d: "Herrliche Tannenwälder, reine Bergluft und familienfreundliche Panoramawege." },
        { dist: "4 KM · ZENTRUM", t: "Doline-Park, Lago Moro & Altstadt Borno", d: "Erkunden Sie Kalkstein-Dolinen, E-Bike-Routen, historische Sommerfeste und das UNESCO-Welterbe." }
      ]
    },
    winter: {
      it: [
        { dist: "5 MIN IN AUTO", t: "Ski Area Borno · Monte Altissimo", d: "Comprensorio sciistico panoramico a soli 5 minuti dall'albergo: piste soleggiate, campo scuola per bambini, snowboard e rifugi in quota." },
        { dist: "IN STRUTTURA", t: "Deposito Sci & Rientro al Caldo", d: "Custodia attrezzatura dedicata in albergo, camere riscaldate rivestite in legno e cena fumante con pizzoccheri, polenta taragna e brasato." },
        { dist: "0 MIN · BOSCO", t: "Ciaspolate nella Pineta & Mercatini", d: "Percorsi silenziosi con le ciaspole sulla neve attorno a Croce di Salven e atmosfere invernali nel borgo antico di Borno." }
      ],
      en: [
        { dist: "5 MIN DRIVE", t: "Borno · Monte Altissimo Ski Area", d: "Panoramic family-friendly slopes, ski school and snow park just a 5-minute drive from the hotel." },
        { dist: "ON SITE", t: "Private Ski Storage & Warm Alpine Dining", d: "Convenient ski room, heated timber bedrooms, and hearty pizzoccheri or polenta after a day on the snow." },
        { dist: "0 MIN · FOREST", t: "Snowshoeing & Winter Village Charm", d: "Peaceful snowy forest loops right from Croce di Salven and traditional winter events in Borno." }
      ],
      de: [
        { dist: "5 MIN FAHRT", t: "Skigebiet Borno · Monte Altissimo", d: "Panoramische Familienpisten und Skischulen in nur 5 Autominuten erreichbar." },
        { dist: "IM HAUS", t: "Skiraum & Warme Bergküche", d: "Praktischer Skiraum vor Ort sowie warme Holzzimmer und kräftige Polenta nach dem Skitag." },
        { dist: "0 MIN · WALD", t: "Schneeschuhwandern & Winterzauber", d: "Stille Winterpfade direkt ab Croce di Salven und stimmungsvolle Abende in Borno." }
      ]
    }
  };

  const I18N = {
    it: {
      nav_hotel: "Albergo & Camere",
      nav_menu: "La Tavola & Menù",
      nav_events: "Banchetti",
      nav_area: "Altopiano",
      nav_contact: "Contatti",
      nav_book: "Prenota Ora",
      hero_kicker: "FAMIGLIA BERTELLI · OSPITALITÀ ALPINA IN VALLE CAMONICA",
      hero_title: "Oasi di pace tra i boschi dell'Altopiano del Sole.",
      hero_sub: "A 1.200 metri d'altitudine nella pineta di Croce di Salven: camere panoramiche in legno con balcone sul verde, cucina tipica camuna fatta in casa e accoglienza familiare in ogni stagione.",
      hero_cta_book: "Prenota Camera o Tavolo",
      hero_cta_menu: "Sfoglia la Carta & Orari",
      gaz_tag: "CRONACA D'ALTA QUOTA",
      trust_rating: "Valutazione ospiti",
      trust_ski: "Comprensorio Sci",
      trust_park: "Quiet & Natura",
      trust_pets: "Accoglienza",
      trust_pets_val: "Animali benvenuti",
      book_eyebrow: "Prenotazione Camere & Ristorante",
      book_title: "Richiedi Disponibilità Camera o Riserva il Tuo Tavolo",
      tab_room: "Camera Albergo",
      tab_table: "Tavolo Ristorante",
      lbl_checkin: "Check-in",
      lbl_checkout: "Check-out",
      lbl_adults: "Adulti",
      lbl_children: "Bambini",
      lbl_roomtype: "Tipologia Camera",
      lbl_board: "Formula Soggiorno",
      lbl_extras: "Servizi richiesti:",
      ext_pet: "Animale domestico",
      ext_ski: "Deposito Sci",
      ext_crib: "Culla bimbi",
      ext_balc: "Balcone vista pineta",
      lbl_name: "Nome e Cognome",
      lbl_notes: "Orario arrivo o richieste",
      preview_note: "Richiesta rapida · Risposta dalla Famiglia Bertelli",
      btn_wa_room: "Invia su WhatsApp (+39 333 289 8394)",
      btn_mail_room: "Richiedi via Email",
      lbl_tdate: "Data",
      lbl_slot: "Servizio & Orario",
      lbl_guests: "Coperti",
      lbl_occasion: "Preferenza Sala",
      thu_title: "Giorno di chiusura settimanale:",
      thu_msg: "il giovedì il ristorante osserva il turno di riposo settimanale. Seleziona un giorno tra lunedì, martedì, mercoledì, venerdì, sabato o domenica.",
      lbl_allergies: "Piatti desiderati, allergie o seggiolone",
      btn_wa_table: "Prenota Tavolo su WhatsApp",
      btn_call_fixed: "Chiama +39 0364 311694",
      hotel_eyebrow: "Ospitalità Alpina dal Cuore Caldo",
      hotel_title: "L'Albergo & Le Nostre Camere in Legno",
      hotel_desc: "Ampie e luminose, rifinite con travi a vista e boiserie artigianale di montagna: ogni stanza dispone di bagno privato finestrato, Wi-Fi gratuito, TV e affaccio panoramico sui boschi o sui balconi fioriti della pineta.",
      cap_ext: "La casa, il dehor estivo e il piazzale a Croce di Salven",
      cap_room1: "Travi a vista & portafinestra sul balcone",
      cap_room4: "Boiserie artigianale in legno naturale",
      cap_balcony: "Affaccio sul parco privato & pinete",
      r1_tag: "Vista Pineta · Balcone Privato",
      r1_name: "Matrimoniale Panoramica",
      r1_desc: "Ideale per un soggiorno rigenerante in coppia: balcone privato affacciato sulla quiete del bosco, soffitto con travi in abete, bagno finestrato, Wi-Fi e TV a schermo piatto.",
      r2_tag: "Famiglie & Gruppi",
      r2_name: "Camera Familiare Alpina",
      r2_desc: "Spazi generosi studiati per famiglie e bambini, con possibilità di terzo/quarto letto o culla, esposizione soleggiata e accesso immediato al parco privato con giochi e sdraio.",
      r3_tag: "Ala Rinnovata · Legno",
      r3_name: "Camera in Dependance",
      r3_desc: "Ambienti caldi con rivestimenti in legno naturale nella nostra dependance immersa nel silenzio: ideale per coppie, escursionisti e sciatori con deposito attrezzatura dedicato.",
      r_cta: "Richiedi questa camera",
      am1_t: "Parco Privato & Area Bimbi",
      am1: "Giardino alberato sul retro con sdraio, tavolini all'aperto e giochi per bambini direttamente all'imbocco dei sentieri.",
      am2_t: "Dehor Soleggiato & Bar",
      am2: "Terrazza esterna con ombrelloni, sale soggiorno per lettura e bar a conduzione familiare aperto tutto il giorno.",
      am3_t: "Parcheggio Gratuito & Deposito Sci",
      am3: "Ampio parcheggio privato gratuito davanti all'ingresso, custodia sci/bici e impianti Monte Altissimo a 5 minuti.",
      am4_t: "Pet-Friendly & Accessibilità",
      am6: "Animali domestici accolti con piacere, camere non fumatori, Wi-Fi gratuito e ambienti privi di barriere architettoniche.",
      rest_eyebrow: "Tradizione, Genuinità e Territorio",
      rest_title: "La Tavola Camuna & Menù Digitale",
      rest_desc: "Una cucina di montagna sincera: pasta fresca tirata a mano, salumi, ricotte, burro e formaggi prodotti sugli alpeggi del comprensorio di Borno, funghi porcini dei nostri boschi e dolci sfornati in casa.",
      hrs_label: "Servizio cucina:",
      hrs_closed: "Chiuso il giovedì",
      hrs_pay: "Contanti & Carte di debito",
      btn_qr: "Mostra QR Code Menù da Tavolo",
      cap_hall: "Sala panoramica con vetrate sul bosco",
      cap_bar: "Bar alpino in legno & accoglienza familiare",
      cap_banquet: "Gran buffet per cerimonie & ricorrenze",
      sheet_kicker: "CARTA STAGIONALE · ALBERGO RISTORANTE LA PIGNA",
      sheet_title: "Specialità della Nostra Cucina",
      cat_all: "Tutti i Piatti",
      cat_ant: "Antipasti & Alpeggio",
      cat_primi: "Primi Camuni",
      cat_sec: "Secondi & Funghi",
      cat_dolci: "Dolci Caserecci",
      tag_home: "Fatto in casa",
      tag_veg: "Vegetariano",
      tag_gf: "Senza glutine su rich.",
      menu_note: "Tocca + accanto ai piatti per comporre il tuo menù degustazione o allegare le tue preferenze direttamente alla prenotazione del tavolo su WhatsApp.",
      menu_empty: "Nessun piatto corrisponde ai filtri selezionati.",
      menu_reset: "Mostra tutto il menù",
      tasting_apply: "Allega alla Prenotazione Tavolo →",
      banq_eye: "Ampia Sala Rinnovata & Parco",
      banq_title: "Matrimoni, Banchetti & Ricorrenze in Montagna",
      banq_desc: "Dalle grandi tavolate di famiglia ai ricevimenti nuziali: progettiamo menù degustazione su misura con aperitivo nel dehor estivo, servizio fotografico nella pineta privata e possibilità di pernottamento per gli invitati.",
      cfg_title: "Configura il Tuo Evento su Misura",
      cfg_type: "Tipologia Ricorrenza",
      cfg_formula: "Formula Gastronomica Preferita",
      cfg_guests: "Numero Indicativo Invitati",
      cfg_period: "Periodo o Data Indicativa",
      banq_cta: "Richiedi Proposta Menù Eventi su WhatsApp",
      area_eyebrow: "Borno & Valle Camonica · 4 Stagioni",
      area_title: "Natura, Sentieri CAI & Piste da Sci",
      area_desc: "Dal cancello del parco partono mulattiere e sentieri CAI nei boschi. In pochi minuti si raggiungono la Ski Area Borno – Monte Altissimo, la Riserva del Giovetto e il borgo storico di Borno.",
      sea_sum: "Estate & Sentieri",
      sea_win: "Inverno & Sci",
      cap_trail: "Sentieri CAI & Boschi del Giovetto",
      cap_borno: "Centro storico di Borno & eventi",
      cap_aerial: "Croce di Salven vista dall'alto tra le vette camune",
      cnt_eye: "Posizione & Recapiti Ufficiali",
      cnt_title: "Come Raggiungerci a Croce di Salven",
      cnt_lead: "Immersi nella pineta di Località Croce di Salven, a 4 km dal centro di Borno, con ampio parcheggio privato gratuito direttamente davanti all'albergo.",
      ci_addr: "Indirizzo",
      ci_phones: "Telefono Fisso & WhatsApp Diretto",
      ci_hours: "Orari Ristorante & Ricevimento",
      ci_hours_val: "Lun–Mer e Ven–Dom: 12:00–14:00 · 19:00–21:30\nGiovedì: chiuso per riposo settimanale",
      btn_maps: "Avvia Navigatore Google Maps",
      btn_chat_wa: "Scrivici su WhatsApp",
      footer_demo: "Progetto digitale su misura · Mazza Studio Web",
      st_call: "Chiama",
      st_menu: "Menù",
      st_book: "Prenota Ora"
    },
    en: {
      nav_hotel: "Hotel & Rooms",
      nav_menu: "Dining & Menu",
      nav_events: "Banquets",
      nav_area: "Altopiano",
      nav_contact: "Contacts",
      nav_book: "Book Now",
      hero_kicker: "BERTELLI FAMILY · ALPINE HOSPITALITY IN VALLE CAMONICA",
      hero_title: "A peaceful alpine retreat among the pines of Borno.",
      hero_sub: "At 1,200 meters in the pine forest of Croce di Salven: timber rooms with panoramic balconies, homemade Valle Camonica cuisine, and warm family hospitality in every season.",
      hero_cta_book: "Book a Room or Table",
      hero_cta_menu: "Explore Seasonal Menu",
      gaz_tag: "ALPINE DISPATCH",
      trust_rating: "Guest rating",
      trust_ski: "Ski Area",
      trust_park: "Nature & Quiet",
      trust_pets: "Hospitality",
      trust_pets_val: "Pets welcome",
      book_eyebrow: "Direct Hotel & Table Reservations",
      book_title: "Check Room Availability or Reserve Your Table",
      tab_room: "Hotel Room",
      tab_table: "Restaurant Table",
      lbl_checkin: "Check-in",
      lbl_checkout: "Check-out",
      lbl_adults: "Adults",
      lbl_children: "Children",
      lbl_roomtype: "Room Category",
      lbl_board: "Board Basis",
      lbl_extras: "Preferences:",
      ext_pet: "Pet-Friendly",
      ext_ski: "Ski Storage",
      ext_crib: "Baby Crib",
      ext_balc: "Pine-view balcony",
      lbl_name: "Full Name",
      lbl_notes: "Arrival time or extra notes",
      preview_note: "Fast inquiry · Reply from the Bertelli Family",
      btn_wa_room: "Send via WhatsApp (+39 333 289 8394)",
      btn_mail_room: "Request via Email",
      lbl_tdate: "Date",
      lbl_slot: "Service & Time",
      lbl_guests: "Guests",
      lbl_occasion: "Seating Preference",
      thu_title: "Weekly Closing Day:",
      thu_msg: "the restaurant is closed on Thursdays. Please select Monday–Wednesday or Friday–Sunday.",
      lbl_allergies: "Preferred dishes, allergies or highchair",
      btn_wa_table: "Book Table via WhatsApp",
      btn_call_fixed: "Call +39 0364 311694",
      hotel_eyebrow: "Warm Alpine Hospitality",
      hotel_title: "The Hotel & Our Timber Rooms",
      hotel_desc: "Bright, spacious rooms finished with exposed wooden beams and mountain timber paneling: each features a windowed private bathroom, free Wi-Fi, TV and forest views.",
      cap_ext: "Alpine facade, summer terrace & pine courtyard",
      cap_room1: "Exposed timber beams & balcony door",
      cap_room4: "Handcrafted natural timber dependance",
      cap_balcony: "View over the private park & pines",
      r1_tag: "Pine View · Private Balcony",
      r1_name: "Panoramic Double Room",
      r1_desc: "Ideal for a peaceful getaway: private balcony facing the forest, spruce ceiling beams, windowed en-suite bathroom, Wi-Fi and flat-screen TV.",
      r2_tag: "Families & Groups",
      r2_name: "Family Alpine Room",
      r2_desc: "Generous layout tailored for families and children, optional extra bed or crib, sunlit exposure and direct access to our rear park & playground.",
      r3_tag: "Refurbished Wing · Timber",
      r3_name: "Dependance Timber Room",
      r3_desc: "Warm handcrafted wood paneling in our quiet dependance wing, favored by couples, hikers and winter skiers with ski storage included.",
      r_cta: "Request this room",
      am1_t: "Private Park & Kids Play Area",
      am1: "Tree-lined rear garden with deckchairs, outdoor tables and kids playground right at the trailhead.",
      am2_t: "Sunlit Terrace & Family Bar",
      am2: "Outdoor terrace with parasols, cozy reading lounges and all-day family bar.",
      am3_t: "Free Parking & Ski Room",
      am3: "Large free private parking in front of the hotel, ski/bike storage and Monte Altissimo lifts 5 minutes away.",
      am4_t: "Pet-Friendly & Accessible",
      am6: "Pets warmly welcomed, non-smoking rooms, free Wi-Fi and step-free common areas.",
      rest_eyebrow: "Authenticity & Local Flavors",
      rest_title: "Valle Camonica Dining & Digital Menu",
      rest_desc: "Honest mountain cooking: handmade fresh pasta, local pasture cheeses and cured meats, wild forest porcini mushrooms and homemade cakes.",
      hrs_label: "Kitchen hours:",
      hrs_closed: "Closed Thursdays",
      hrs_pay: "Cash & Debit Cards accepted",
      btn_qr: "Show Table QR Code Menu",
      cap_hall: "Panoramic dining room facing the pines",
      cap_bar: "Wooden alpine bar & family welcome",
      cap_banquet: "Grand buffet for weddings & celebrations",
      sheet_kicker: "SEASONAL MENU · ALBERGO RISTORANTE LA PIGNA",
      sheet_title: "Specialties from Our Kitchen",
      cat_all: "All Dishes",
      cat_ant: "Starters & Pastures",
      cat_primi: "Homemade Pasta",
      cat_sec: "Mains & Mushrooms",
      cat_dolci: "Homemade Desserts",
      tag_home: "Homemade",
      tag_veg: "Vegetarian",
      tag_gf: "GF on request",
      menu_note: "Tap + next to any dish to build your tasting list or attach your favorite dishes directly to your WhatsApp table reservation.",
      menu_empty: "No dishes match your active filters.",
      menu_reset: "Show full menu",
      tasting_apply: "Attach to Table Reservation →",
      banq_eye: "Renovated Banquet Hall & Park",
      banq_title: "Weddings, Celebrations & Group Dining",
      banq_desc: "From family reunions to mountain weddings: custom tasting menus, summer terrace aperitifs, pine forest photo backdrops and overnight rooms for guests.",
      cfg_title: "Configure Your Custom Event",
      cfg_type: "Event Occasion",
      cfg_formula: "Preferred Dining Formula",
      cfg_guests: "Estimated Guests",
      cfg_period: "Preferred Date or Season",
      banq_cta: "Request Event Menu Quote on WhatsApp",
      area_eyebrow: "Borno & Valle Camonica · 4 Seasons",
      area_title: "Nature, CAI Trails & Ski Slopes",
      area_desc: "Marked CAI forest trails leave straight from the rear park; Borno – Monte Altissimo Ski Area, Giovetto Reserve and historic Borno are minutes away.",
      sea_sum: "Summer & Hiking",
      sea_win: "Winter & Skiing",
      cap_trail: "CAI trails & Boschi del Giovetto",
      cap_borno: "Historic Borno village & events",
      cap_aerial: "Aerial view of La Pigna & Camonica Alps",
      cnt_eye: "Location & Direct Contacts",
      cnt_title: "How to Reach Croce di Salven",
      cnt_lead: "Tucked among the pines of Croce di Salven, 4 km from Borno center with free private parking right outside.",
      ci_addr: "Address",
      ci_phones: "Landline & Direct WhatsApp",
      ci_hours: "Restaurant & Reception Hours",
      ci_hours_val: "Mon–Wed, Fri–Sun: 12:00–14:00 · 19:00–21:30\nThursday: closed",
      btn_maps: "Open Google Maps Navigation",
      btn_chat_wa: "Message Us on WhatsApp",
      footer_demo: "Bespoke digital preview · Mazza Studio Web",
      st_call: "Call",
      st_menu: "Menu",
      st_book: "Book Now"
    },
    de: {
      nav_hotel: "Hotel & Zimmer",
      nav_menu: "Küche & Menü",
      nav_events: "Bankette",
      nav_area: "Hochplateau",
      nav_contact: "Kontakt",
      nav_book: "Jetzt Buchen",
      hero_kicker: "FAMILIE BERTELLI · ALPINE GASTFREUNDSCHAFT IM VALLE CAMONICA",
      hero_title: "Eine ruhige Oase im Kiefernwald des Altopiano del Sole.",
      hero_sub: "Auf 1.200 Metern im Kiefernwald von Croce di Salven: Holzzimmer mit Panoramabalkon, hausgemachte Bergküche und herzliche Gastfreundschaft zu jeder Jahreszeit.",
      hero_cta_book: "Zimmer oder Tisch Buchen",
      hero_cta_menu: "Speisekarte & Zeiten",
      gaz_tag: "BERGBERICHT",
      trust_rating: "Gästebewertung",
      trust_ski: "Skigebiet",
      trust_park: "Ruhe & Natur",
      trust_pets: "Gastlichkeit",
      trust_pets_val: "Haustiere willkommen",
      book_eyebrow: "Zimmer- & Tischreservierung",
      book_title: "Zimmerverfügbarkeit oder Tisch Direkt Anfragen",
      tab_room: "Hotelzimmer",
      tab_table: "Restauranttisch",
      lbl_checkin: "Anreise",
      lbl_checkout: "Abreise",
      lbl_adults: "Erwachsene",
      lbl_children: "Kinder",
      lbl_roomtype: "Zimmerkategorie",
      lbl_board: "Verpflegung",
      lbl_extras: "Wünsche:",
      ext_pet: "Haustier",
      ext_ski: "Skiraum",
      ext_crib: "Kinderbett",
      ext_balc: "Balkon mit Waldblick",
      lbl_name: "Vor- und Nachname",
      lbl_notes: "Ankunftszeit oder Hinweise",
      preview_note: "Schnelle Anfrage · Antwort der Familie Bertelli",
      btn_wa_room: "Per WhatsApp Senden (+39 333 289 8394)",
      btn_mail_room: "Per E-Mail Anfragen",
      lbl_tdate: "Datum",
      lbl_slot: "Service & Uhrzeit",
      lbl_guests: "Personen",
      lbl_occasion: "Saalwunsch",
      thu_title: "Wöchentlicher Ruhetag:",
      thu_msg: "Donnerstags ist unser Restaurant geschlossen. Bitte wählen Sie einen anderen Tag.",
      lbl_allergies: "Wunschgerichte, Allergien oder Kinderstuhl",
      btn_wa_table: "Tisch per WhatsApp Reservieren",
      btn_call_fixed: "Anrufen +39 0364 311694",
      hotel_eyebrow: "Herzliche Alpine Gastfreundschaft",
      hotel_title: "Das Hotel & Unsere Holzzimmer",
      hotel_desc: "Geräumige, helle Zimmer mit sichtbaren Holzbalken und kunstvoller Vertäfelung: jedes Zimmer verfügt über ein Tageslichtbad, kostenloses WLAN, TV und Waldblick.",
      cap_ext: "Alpenchalet, Sommerterrasse & Kiefernplatz",
      cap_room1: "Holzbalken & Balkontür ins Grüne",
      cap_room4: "Handgefertigte Holzvertäfelung in der Dependance",
      cap_balcony: "Blick über den Privatpark & Kiefernwald",
      r1_tag: "Waldblick · Privatbalkon",
      r1_name: "Panoramazimmer",
      r1_desc: "Ideal für erholsame Tage zu zweit: eigener Balkon zum Wald, Fichtenholzbalken, Bad mit Fenster, WLAN und Flachbild-TV.",
      r2_tag: "Familien & Gruppen",
      r2_name: "Alpen-Familienzimmer",
      r2_desc: "Großzügig geschnitten für Familien, mit Zusatzbett oder Kinderbett und direktem Zugang zum Garten mit Spielplatz und Liegestühlen.",
      r3_tag: "Renovierter Flügel · Holz",
      r3_name: "Zimmer in der Dependance",
      r3_desc: "Warmes Naturholzambiente in unserer ruhigen Dependance — ideal für Paare, Wanderer und Skifahrer inklusive Skiraum.",
      r_cta: "Dieses Zimmer anfragen",
      am1_t: "Privatpark & Kinderspielplatz",
      am1: "Schattiger Garten hinter dem Haus mit Liegestühlen, Tischen und Spielplatz direkt am Wanderweg.",
      am2_t: "Sonnenterrasse & Hausbar",
      am2: "Außenterrasse mit Sonnenschirmen, gemütliche Lesestuben und familiäre Bar.",
      am3_t: "Gratis Parkplatz & Skiraum",
      am3: "Großer kostenloser Privatparkplatz vor dem Haus, Ski-/Raddepot und Pisten Monte Altissimo in 5 Minuten.",
      am4_t: "Haustierfreundlich & Barrierearm",
      am6: "Haustiere herzlich willkommen, Nichtraucherzimmer, kostenloses WLAN und barrierefreie Gemeinschaftsräume.",
      rest_eyebrow: "Tradition & Regionalität",
      rest_title: "Camunische Tafel & Digitale Speisekarte",
      rest_desc: "Ehrliche Bergküche: handgemachte Frischpasta, Almkäse und Bergwurst aus Borno, Steinpilze aus unseren Wäldern und hausgebackene Kuchen.",
      hrs_label: "Küchenzeiten:",
      hrs_closed: "Donnerstag Ruhetag",
      hrs_pay: "Barzahlung & Debitkarten",
      btn_qr: "QR-Code für Tischmenü anzeigen",
      cap_hall: "Panoramasaal mit großen Waldfenstern",
      cap_bar: "Gemütliche Holzbar & Familienempfang",
      cap_banquet: "Großes Buffet für Feiern & Hochzeiten",
      sheet_kicker: "SAISONKARTE · ALBERGO RISTORANTE LA PIGNA",
      sheet_title: "Spezialitäten Unserer Küche",
      cat_all: "Alle Gerichte",
      cat_ant: "Vorspeisen & Alm",
      cat_primi: "Hausgemachte Pasta",
      cat_sec: "Hauptgerichte & Pilze",
      cat_dolci: "Hausgemachte Desserts",
      tag_home: "Hausgemacht",
      tag_veg: "Vegetarisch",
      tag_gf: "Glutenfrei a. Anfrage",
      menu_note: "Tippen Sie auf + neben einem Gericht, um Ihre Wunschliste zusammenzustellen und direkt an Ihre Tischreservierung per WhatsApp anzuhängen.",
      menu_empty: "Keine Gerichte entsprechen den ausgewählten Filtern.",
      menu_reset: "Alle Gerichte anzeigen",
      tasting_apply: "An Tischreservierung anhängen →",
      banq_eye: "Renovierter Festsaal & Park",
      banq_title: "Hochzeiten, Bankette & Familienfeiern",
      banq_desc: "Von großen Familientischen bis zur Berghochzeit: maßgeschneiderte Menüs, Sommeraperitif auf der Terrasse, Fotokulisse im Kiefernwald und Gästezimmer.",
      cfg_title: "Ihr Festmenü Konfigurieren",
      cfg_type: "Art der Feier",
      cfg_formula: "Gewünschte Menüformel",
      cfg_guests: "Ungefähre Gästezahl",
      cfg_period: "Wunschtermin oder Zeitraum",
      banq_cta: "Menüvorschlag per WhatsApp Anfragen",
      area_eyebrow: "Borno & Valle Camonica · 4 Jahreszeiten",
      area_title: "Natur, CAI-Wanderwege & Skipisten",
      area_desc: "Direkt vom Hotelpark starten CAI-Wanderwege. Das Skigebiet Borno – Monte Altissimo, das Reservat Giovetto und Borno sind in wenigen Minuten erreichbar.",
      sea_sum: "Sommer & Wandern",
      sea_win: "Winter & Ski",
      cap_trail: "CAI-Wanderwege & Boschi del Giovetto",
      cap_borno: "Altstadt von Borno & Veranstaltungen",
      cap_aerial: "Luftaufnahme von Croce di Salven & den Alpen",
      cnt_eye: "Anfahrt & Offizielle Kontakte",
      cnt_title: "Anreise nach Croce di Salven",
      cnt_lead: "Inmitten des Kiefernwaldes von Croce di Salven, 4 km vom Zentrum Bornos entfernt, mit großem kostenfreiem Privatparkplatz.",
      ci_addr: "Adresse",
      ci_phones: "Festnetz & WhatsApp Direkt",
      ci_hours: "Öffnungszeiten Restaurant & Empfang",
      ci_hours_val: "Mo–Mi, Fr–So: 12:00–14:00 · 19:00–21:30\nDonnerstag: Ruhetag",
      btn_maps: "Google Maps Navigation Starten",
      btn_chat_wa: "Per WhatsApp Schreiben",
      footer_demo: "Maßgeschneiderte Vorschau · Mazza Studio Web",
      st_call: "Anruf",
      st_menu: "Menü",
      st_book: "Jetzt Buchen"
    }
  };

  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));

  function formatDateISO(d) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  }

  function formatDateIT(iso) {
    if (!iso) return "";
    const [y, m, d] = iso.split("-");
    return `${d}/${m}/${y}`;
  }

  function initDates() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const checkout = new Date(tomorrow);
    checkout.setDate(tomorrow.getDate() + 2);

    const ciEl = $("#roomCheckin");
    const coEl = $("#roomCheckout");
    const tdEl = $("#tableDate");

    ciEl.min = formatDateISO(today);
    ciEl.value = formatDateISO(tomorrow);
    coEl.min = formatDateISO(tomorrow);
    coEl.value = formatDateISO(checkout);

    const tblInit = new Date(tomorrow);
    if (tblInit.getDay() === 4) tblInit.setDate(tblInit.getDate() + 1);
    tdEl.min = formatDateISO(today);
    tdEl.value = formatDateISO(tblInit);
  }

  function applyLang(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;
    $$(".lang-btn").forEach((b) => b.classList.toggle("active", b.dataset.lang === lang));
    const dict = I18N[lang];
    $$("[data-i18n]").forEach((el) => {
      const k = el.dataset.i18n;
      if (dict[k]) {
        if (k === "ci_hours_val") {
          el.innerHTML = dict[k].replace("\n", "<br>");
        } else {
          el.textContent = dict[k];
        }
      }
    });
    const searchMap = {
      it: "Cerca casoncelli, funghi, pizzoccheri, cervo...",
      en: "Search casoncelli, mushrooms, venison, polenta...",
      de: "Suche nach Casoncelli, Pilzen, Hirsch, Polenta..."
    };
    $("#menuSearch").placeholder = searchMap[lang];
    updateLiveStatus();
    renderMenu();
    updateTastingTray();
    renderSeason();
    updateRoomPreview();
    updateTablePreview();
    updateEventPreview();
  }

  function updateLiveStatus() {
    const statusBox = $("#liveOpenStatus");
    const textEl = $("#liveOpenText");
    const clockEl = $("#romeClock");
    try {
      const now = new Date();
      const parts = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Europe/Rome",
        weekday: "short",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
      }).formatToParts(now);
      const weekday = parts.find((p) => p.type === "weekday")?.value || "";
      const hhStr = parts.find((p) => p.type === "hour")?.value || "12";
      const mmStr = parts.find((p) => p.type === "minute")?.value || "00";
      const hh = parseInt(hhStr, 10);
      const mm = parseInt(mmStr, 10);
      const mins = hh * 60 + mm;

      if (clockEl) {
        clockEl.textContent = `BORNO · ${hhStr}:${mmStr} CET`;
      }

      const isThu = weekday.startsWith("Thu");
      const inLunch = !isThu && mins >= 720 && mins <= 840;
      const inDinner = !isThu && mins >= 1140 && mins <= 1290;

      const labels = {
        it: {
          open: "Cucina aperta ora",
          thu: "Chiuso oggi (Giovedì · giorno di riposo)",
          nextLunch: "Apre oggi a pranzo dalle 12:00",
          nextDinner: "Apre stasera alle 19:00",
          tomorrow: "Cucina chiusa · Prossima apertura domani 12:00"
        },
        en: {
          open: "Kitchen open right now",
          thu: "Closed today (Thursday weekly rest)",
          nextLunch: "Opens today for lunch at 12:00",
          nextDinner: "Opens tonight at 19:00",
          tomorrow: "Kitchen closed · Next service tomorrow 12:00"
        },
        de: {
          open: "Küche jetzt geöffnet",
          thu: "Heute geschlossen (Donnerstag Ruhetag)",
          nextLunch: "Öffnet heute mittags um 12:00",
          nextDinner: "Öffnet heute abends um 19:00",
          tomorrow: "Küche geschlossen · Morgen ab 12:00 geöffnet"
        }
      }[currentLang];

      if (isThu) {
        statusBox.classList.add("closed");
        textEl.textContent = labels.thu;
      } else if (inLunch || inDinner) {
        statusBox.classList.remove("closed");
        textEl.textContent = labels.open;
      } else if (mins < 720) {
        statusBox.classList.add("closed");
        textEl.textContent = labels.nextLunch;
      } else if (mins < 1140) {
        statusBox.classList.add("closed");
        textEl.textContent = labels.nextDinner;
      } else {
        statusBox.classList.add("closed");
        textEl.textContent = labels.tomorrow;
      }
    } catch {
      statusBox.classList.remove("closed");
      textEl.textContent = "12:00–14:00 · 19:00–21:30 (Chiuso Giovedì)";
    }
  }

  function updateRoomPreview() {
    const ci = $("#roomCheckin").value;
    const co = $("#roomCheckout").value;
    const d1 = ci ? new Date(ci + "T12:00:00") : null;
    const d2 = co ? new Date(co + "T12:00:00") : null;

    if (d1 && d2 && d2 <= d1) {
      const nextDay = new Date(d1);
      nextDay.setDate(d1.getDate() + 1);
      $("#roomCheckout").value = formatDateISO(nextDay);
    }

    const finalCi = $("#roomCheckin").value;
    const finalCo = $("#roomCheckout").value;
    const nights = Math.max(1, Math.round((new Date(finalCo + "T12:00:00") - new Date(finalCi + "T12:00:00")) / 86400000));

    const nightWord = currentLang === "de" ? (nights === 1 ? "Nacht" : "Nächte") : currentLang === "en" ? (nights === 1 ? "night" : "nights") : (nights === 1 ? "notte" : "notti");
    $("#nightsBadge").textContent = `${nights} ${nightWord}`;

    const room = $("#roomType").value;
    const board = $("#boardType").value;
    const extras = $$(".room-extra:checked").map((x) => x.value);
    const guestName = $("#roomGuestName").value.trim();
    const notes = $("#roomNotes").value.trim();

    const msgLines = [
      `Buongiorno Albergo Ristorante La Pigna,`,
      `vorrei richiedere informazioni e disponibilità per un soggiorno:`,
      `• Soggiorno: dal ${formatDateIT(finalCi)} al ${formatDateIT(finalCo)} (${nights} ${nights === 1 ? "notte" : "notti"})`,
      `• Ospiti: ${state.adults} adulti${state.children > 0 ? `, ${state.children} bambini` : ""}`,
      `• Sistemazione: ${room} — ${board}`,
      extras.length ? `• Servizi: ${extras.join(", ")}` : "",
      notes ? `• Note: ${notes}` : "",
      guestName ? `Cordiali saluti, ${guestName}` : `Resto in attesa di un vostro cortese riscontro. Grazie.`
    ].filter(Boolean);

    const fullMsg = msgLines.join("\n");
    $("#roomSummaryText").textContent = `${formatDateIT(finalCi)} → ${formatDateIT(finalCo)} · ${nights} ${nightWord} · ${state.adults} adulti${state.children ? " + " + state.children + " bimbi" : ""} · ${room} (${board})`;
    $("#roomWaBtn").href = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(fullMsg)}`;
    $("#roomMailBtn").href = `mailto:${EMAIL_TARGET}?subject=${encodeURIComponent(`Richiesta soggiorno La Pigna (${formatDateIT(finalCi)} - ${formatDateIT(finalCo)})`)}&body=${encodeURIComponent(fullMsg)}`;
  }

  function updateTablePreview() {
    const tdVal = $("#tableDate").value;
    const slot = $("#tableSlot").value;
    const occ = $("#tableOccasion").value;
    const name = $("#tableGuestName").value.trim();
    const notes = $("#tableNotes").value.trim();

    const parsed = tdVal ? new Date(tdVal + "T12:00:00") : null;
    const isThursday = parsed ? parsed.getDay() === 4 : false;
    $("#thursdayAlert").hidden = !isThursday;

    const msgLines = [
      `Buongiorno Albergo Ristorante La Pigna,`,
      `vorrei prenotare un tavolo al ristorante:`,
      `• Data: ${formatDateIT(tdVal)} — ${slot}`,
      `• Coperti: ${state.tableGuests} persone (${occ})`,
      notes ? `• Preferenze / Note: ${notes}` : "",
      name ? `A nome di: ${name}` : `Grazie, attendo vostra conferma.`
    ].filter(Boolean);

    const fullMsg = msgLines.join("\n");
    $("#tableSummaryText").textContent = isThursday
      ? `Giovedì ${formatDateIT(tdVal)}: chiusura settimanale del ristorante. Seleziona un altro giorno per procedere.`
      : `${formatDateIT(tdVal)} · ${slot} · ${state.tableGuests} persone · ${occ}`;
    $("#tableWaBtn").href = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(fullMsg)}`;
  }

  function updateEventPreview() {
    const typeEl = $("#eventType");
    if (!typeEl) return;
    const evType = typeEl.value;
    const formula = $("#eventFormula").value;
    const guests = $("#eventGuestsRange").value;
    const period = $("#eventPeriod").value.trim();

    const guestWord = currentLang === "de" ? "Gäste" : currentLang === "en" ? "guests" : "ospiti";
    $("#eventGuestsOut").textContent = `${guests} ${guestWord}`;

    const msg = [
      `Buongiorno Albergo Ristorante La Pigna,`,
      `vorremmo informazioni per organizzare un evento presso la vostra struttura:`,
      `• Ricorrenza: ${evType}`,
      `• Numero invitati indicativo: circa ${guests} persone`,
      `• Formula preferita: ${formula}`,
      period ? `• Periodo/Data: ${period}` : "",
      `Restiamo in attesa di una vostra proposta. Grazie!`
    ].filter(Boolean).join("\n");

    $("#eventWaBtn").href = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
  }

  function renderMenu() {
    const list = $("#menuList");
    const empty = $("#menuEmpty");
    const q = state.query.trim().toLowerCase();

    const tagNames = {
      it: { casa: "Fatto in casa", veg: "Vegetariano", sg: "Senza glutine su rich." },
      en: { casa: "Homemade", veg: "Vegetarian", sg: "GF on request" },
      de: { casa: "Hausgemacht", veg: "Vegetarisch", sg: "Glutenfrei a. Anfrage" }
    }[currentLang];

    const filtered = MENU_ITEMS.filter((it) => {
      if (state.cat !== "all" && it.cat !== state.cat) return false;
      if (state.diet && !it.tags.includes(state.diet)) return false;
      if (q) {
        const txt = `${it[currentLang].name} ${it[currentLang].desc}`.toLowerCase();
        if (!txt.includes(q)) return false;
      }
      return true;
    });

    if (!filtered.length) {
      list.innerHTML = "";
      empty.hidden = false;
      return;
    }
    empty.hidden = true;

    list.innerHTML = filtered
      .map((it) => {
        const loc = it[currentLang];
        const isSel = state.selectedDishes.has(it.id);
        const badges = it.tags.map((t) => `<span class="dish-badge">${tagNames[t]}</span>`).join("");
        return `
          <article class="dish-item${isSel ? " is-selected" : ""}" data-dish-id="${it.id}">
            <div class="dish-main">
              <h4>${loc.name}</h4>
              <p>${loc.desc}</p>
              <div class="dish-badges">${badges}</div>
            </div>
            <div class="dish-right">
              <div class="dish-price">${it.price}</div>
              <button type="button" class="dish-pick-btn" data-pick-id="${it.id}" aria-label="${isSel ? "Rimuovi piatto" : "Aggiungi piatto"}">
                ${isSel ? "✓" : "+"}
              </button>
            </div>
          </article>
        `;
      })
      .join("");

    $$(".dish-pick-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.pickId;
        if (state.selectedDishes.has(id)) {
          state.selectedDishes.delete(id);
        } else {
          state.selectedDishes.add(id);
        }
        renderMenu();
        updateTastingTray();
      });
    });
  }

  function updateTastingTray() {
    const tray = $("#tastingTray");
    if (!tray) return;
    const chosen = MENU_ITEMS.filter((m) => state.selectedDishes.has(m.id));
    if (!chosen.length) {
      tray.hidden = true;
      return;
    }
    tray.hidden = false;
    const total = chosen.reduce((acc, m) => acc + m.priceVal, 0);
    const word = currentLang === "de" ? "Gerichte ausgewählt" : currentLang === "en" ? "dishes selected" : (chosen.length === 1 ? "piatto selezionato" : "piatti selezionati");
    $("#tastingCount").textContent = `${chosen.length} ${word}`;
    $("#tastingNames").textContent = chosen.map((m) => m[currentLang].name).join(" · ");
    $("#tastingTotal").textContent = `€ ${total}`;
  }

  function renderSeason() {
    const items = SEASON_DATA[state.season][currentLang];
    $("#areaCards").innerHTML = items
      .map((x) => `
        <article class="area-card">
          <div class="area-card-top">
            <h3>${x.t}</h3>
            <span class="area-dist">${x.dist}</span>
          </div>
          <p>${x.d}</p>
        </article>
      `)
      .join("");
  }

  function openLightbox(index) {
    state.lbIndex = (index + GALLERY.length) % GALLERY.length;
    const item = GALLERY[state.lbIndex];
    $("#lbImg").src = item.src;
    $("#lbImg").alt = item[currentLang];
    $("#lbCap").textContent = item[currentLang];
    $("#lightbox").hidden = false;
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    $("#lightbox").hidden = true;
    document.body.style.overflow = "";
  }

  function buildQrSvg() {
    const wrap = $("#qrSvgWrap");
    if (!wrap || wrap.dataset.rendered) return;
    wrap.dataset.rendered = "1";
    const size = 21;
    const grid = Array.from({ length: size }, () => Array(size).fill(0));
    const drawFinder = (r0, c0) => {
      for (let r = 0; r < 7; r++) {
        for (let c = 0; c < 7; c++) {
          const edge = r === 0 || r === 6 || c === 0 || c === 6;
          const core = r >= 2 && r <= 4 && c >= 2 && c <= 4;
          grid[r0 + r][c0 + c] = edge || core ? 1 : 0;
        }
      }
    };
    drawFinder(0, 0);
    drawFinder(0, size - 7);
    drawFinder(size - 7, 0);

    const seed = "https://manuuudev.github.io/albergo-la-pigna/#ristorante";
    let h = 2166136261;
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        const inTopLeft = r < 8 && c < 8;
        const inTopRight = r < 8 && c >= size - 8;
        const inBotLeft = r >= size - 8 && c < 8;
        if (inTopLeft || inTopRight || inBotLeft) continue;
        if (r === 6 || c === 6) {
          grid[r][c] = (r + c) % 2 === 0 ? 1 : 0;
          continue;
        }
        h ^= seed.charCodeAt((r * size + c) % seed.length);
        h = Math.imul(h, 16777619);
        grid[r][c] = (h >>> 3) & 1;
      }
    }

    let rects = "";
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (grid[r][c]) {
          rects += `<rect x="${c}" y="${r}" width="1" height="1" fill="#14241B"/>`;
        }
      }
    }
    wrap.innerHTML = `<svg viewBox="0 0 ${size} ${size}" width="164" height="164" shape-rendering="crispEdges" role="img" aria-label="QR Code">${rects}</svg>`;
  }

  function initCursorAndMotion() {
    // Scroll Progress & Hero Parallax
    const prog = $("#scrollProgress");
    const heroImg = $("#heroImg");
    const onScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      if (prog) {
        prog.style.transform = `scaleX(${Math.min(1, Math.max(0, scrollTop / docHeight))})`;
      }
      if (heroImg && scrollTop < 900) {
        heroImg.style.transform = `scale(1.04) translate3d(0, ${Math.round(scrollTop * 0.14)}px, 0)`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // Reveal Observer
    const reveals = $$(".reveal");
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.06, rootMargin: "100px 0px" }
      );
      reveals.forEach((el) => io.observe(el));
    } else {
      reveals.forEach((el) => el.classList.add("is-visible"));
    }

    // Custom Magnetic Cursor on Fine Pointer Devices
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!canHover) return;

    const dot = $("#cursorDot");
    const ring = $("#cursorRing");
    const label = $("#cursorLabel");
    if (!dot || !ring) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let initializedMouse = false;

    window.addEventListener(
      "pointermove",
      (e) => {
        if (e.pointerType && e.pointerType !== "mouse") {
          document.body.classList.remove("has-mouse");
          return;
        }
        mouseX = e.clientX;
        mouseY = e.clientY;
        if (!initializedMouse) {
          initializedMouse = true;
          ringX = mouseX;
          ringY = mouseY;
        }
        document.body.classList.add("has-mouse");
        dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      },
      { passive: true }
    );

    window.addEventListener(
      "touchstart",
      () => {
        document.body.classList.remove("has-mouse");
      },
      { passive: true }
    );

    const tick = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.transform = `translate3d(${ringX.toFixed(1)}px, ${ringY.toFixed(1)}px, 0)`;
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);

    // Interactive Hover States
    $$("a, button, select, input, .dish-item").forEach((el) => {
      el.addEventListener("mouseenter", () => document.body.classList.add("cursor-hover"));
      el.addEventListener("mouseleave", () => document.body.classList.remove("cursor-hover"));
    });

    $$("[data-cursor]").forEach((el) => {
      el.addEventListener("mouseenter", () => {
        const words = { it: "ESPLORA", en: "VIEW", de: "ANSICHT" };
        if (label) label.textContent = words[currentLang] || el.dataset.cursor;
        document.body.classList.add("cursor-media");
      });
      el.addEventListener("mouseleave", () => {
        document.body.classList.remove("cursor-media");
      });
    });

    // Magnetic Pull on Primary CTAs & Nav Links
    $$("[data-magnetic]").forEach((el) => {
      el.addEventListener("mousemove", (e) => {
        const rect = el.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        el.style.transform = `translate3d(${(dx * 0.16).toFixed(1)}px, ${(dy * 0.16).toFixed(1)}px, 0)`;
      });
      el.addEventListener("mouseleave", () => {
        el.style.transform = "";
      });
    });
  }

  function bindEvents() {
    // Mobile menu drawer
    $("#menuToggle").addEventListener("click", () => {
      const btn = $("#menuToggle");
      const drw = $("#mobileDrawer");
      const open = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!open));
      drw.hidden = open;
    });
    $$(".drawer-link").forEach((a) =>
      a.addEventListener("click", () => {
        $("#menuToggle").setAttribute("aria-expanded", "false");
        $("#mobileDrawer").hidden = true;
      })
    );

    // Language switch
    $$(".lang-btn").forEach((b) => b.addEventListener("click", () => applyLang(b.dataset.lang)));

    // Booking tabs
    $$(".tab-btn").forEach((btn) =>
      btn.addEventListener("click", () => {
        const target = btn.dataset.tab;
        $$(".tab-btn").forEach((b) => {
          const on = b === btn;
          b.classList.toggle("active", on);
          b.setAttribute("aria-selected", String(on));
        });
        $("#panelRoom").hidden = target !== "room";
        $("#panelTable").hidden = target !== "table";
        $("#panelRoom").classList.toggle("active", target === "room");
        $("#panelTable").classList.toggle("active", target === "table");
      })
    );

    // Steppers
    $$(".step-btn").forEach((btn) =>
      btn.addEventListener("click", () => {
        const tgt = btn.dataset.target;
        const delta = parseInt(btn.dataset.delta, 10);
        if (tgt === "adultsCount") {
          state.adults = Math.max(1, Math.min(8, state.adults + delta));
          $("#adultsCount").textContent = state.adults;
          updateRoomPreview();
        } else if (tgt === "childrenCount") {
          state.children = Math.max(0, Math.min(6, state.children + delta));
          $("#childrenCount").textContent = state.children;
          updateRoomPreview();
        } else if (tgt === "tableGuestsCount") {
          state.tableGuests = Math.max(1, Math.min(20, state.tableGuests + delta));
          $("#tableGuestsCount").textContent = state.tableGuests;
          updateTablePreview();
        }
      })
    );

    // Room form live bindings
    ["#roomCheckin", "#roomCheckout", "#roomType", "#boardType", "#roomGuestName", "#roomNotes"].forEach((s) => {
      $(s).addEventListener("input", updateRoomPreview);
      $(s).addEventListener("change", updateRoomPreview);
    });
    $$(".room-extra").forEach((cb) => cb.addEventListener("change", updateRoomPreview));

    // Table form live bindings
    ["#tableDate", "#tableSlot", "#tableOccasion", "#tableGuestName", "#tableNotes"].forEach((s) => {
      $(s).addEventListener("input", updateTablePreview);
      $(s).addEventListener("change", updateTablePreview);
    });

    // Event configurator bindings
    ["#eventType", "#eventFormula", "#eventGuestsRange", "#eventPeriod"].forEach((s) => {
      const el = $(s);
      if (el) {
        el.addEventListener("input", updateEventPreview);
        el.addEventListener("change", updateEventPreview);
      }
    });

    // Pick room shortcuts
    $$(".pick-room").forEach((btn) =>
      btn.addEventListener("click", () => {
        $("#tabRoom").click();
        $("#roomType").value = btn.dataset.room;
        updateRoomPreview();
        $("#prenota").scrollIntoView({ behavior: "smooth" });
      })
    );

    // Menu category, diet, search
    $$(".cat-pill").forEach((p) =>
      p.addEventListener("click", () => {
        state.cat = p.dataset.cat;
        $$(".cat-pill").forEach((x) => x.classList.toggle("active", x === p));
        renderMenu();
      })
    );

    $$(".diet-chip").forEach((c) =>
      c.addEventListener("click", () => {
        state.diet = state.diet === c.dataset.tag ? "" : c.dataset.tag;
        $$(".diet-chip").forEach((x) => x.classList.toggle("active", x.dataset.tag === state.diet));
        renderMenu();
      })
    );

    $("#menuSearch").addEventListener("input", (e) => {
      state.query = e.target.value;
      renderMenu();
    });

    $("#resetMenuBtn").addEventListener("click", () => {
      state.cat = "all";
      state.diet = "";
      state.query = "";
      $("#menuSearch").value = "";
      $$(".cat-pill").forEach((x) => x.classList.toggle("active", x.dataset.cat === "all"));
      $$(".diet-chip").forEach((x) => x.classList.remove("active"));
      renderMenu();
    });

    // Tasting tray actions
    $("#applyTastingToTableBtn").addEventListener("click", () => {
      const chosen = MENU_ITEMS.filter((m) => state.selectedDishes.has(m.id)).map((m) => m[currentLang].name);
      if (!chosen.length) return;
      $("#tabTable").click();
      $("#tableNotes").value = `Piatti scelti dal menù: ${chosen.join(", ")}`;
      updateTablePreview();
      $("#prenota").scrollIntoView({ behavior: "smooth" });
    });

    $("#clearTastingBtn").addEventListener("click", () => {
      state.selectedDishes.clear();
      renderMenu();
      updateTastingTray();
    });

    // QR Code Modal
    $("#openQrModalBtn").addEventListener("click", () => {
      buildQrSvg();
      $("#qrModal").hidden = false;
    });
    $("#closeQrModalBtn").addEventListener("click", () => {
      $("#qrModal").hidden = true;
    });
    $("#qrModal").addEventListener("click", (e) => {
      if (e.target.id === "qrModal") $("#qrModal").hidden = true;
    });

    // Season toggle
    $$(".season-btn").forEach((b) =>
      b.addEventListener("click", () => {
        state.season = b.dataset.season;
        $$(".season-btn").forEach((x) => x.classList.toggle("active", x === b));
        renderSeason();
      })
    );

    // Lightbox triggers & keys
    $$(".gallery-trigger").forEach((el) =>
      el.addEventListener("click", () => openLightbox(parseInt(el.dataset.idx, 10)))
    );
    $("#lbClose").addEventListener("click", closeLightbox);
    $("#lbPrev").addEventListener("click", () => openLightbox(state.lbIndex - 1));
    $("#lbNext").addEventListener("click", () => openLightbox(state.lbIndex + 1));
    $("#lightbox").addEventListener("click", (e) => {
      if (e.target.id === "lightbox") closeLightbox();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !$("#qrModal").hidden) {
        $("#qrModal").hidden = true;
        return;
      }
      if ($("#lightbox").hidden) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") openLightbox(state.lbIndex - 1);
      if (e.key === "ArrowRight") openLightbox(state.lbIndex + 1);
    });
  }

  initDates();
  bindEvents();
  applyLang("it");
  initCursorAndMotion();
})();
