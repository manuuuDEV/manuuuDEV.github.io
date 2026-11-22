(() => {
  "use strict";

  const WA_NUMBER = "393332898394";
  const EMAIL_TARGET = "albergo.pigna@libero.it";

  let currentLang = "it";
  let state = {
    adults: 2,
    children: 0,
    tableGuests: 4,
    cat: "all",
    diet: "",
    query: "",
    season: "summer",
    lbIndex: 0
  };

  const GALLERY = [
    { src: "assets/ext-4.jpg", it: "Albergo Ristorante La Pigna — Facciata alpina e dehor", en: "Alpine facade & outdoor terrace at Croce di Salven", de: "Alpenfassade & Sonnenterrasse in Croce di Salven" },
    { src: "assets/room-1.jpg", it: "Camera panoramica con travi a vista e balcone sul verde", en: "Panoramic room with exposed timber beams & balcony", de: "Panoramazimmer mit Holzbalken & Balkon" },
    { src: "assets/room-4.jpg", it: "Camera in dependance con boiserie e legno naturale", en: "Refurbished dependance room in alpine timber", de: "Renoviertes Zimmer in der Dependance mit Holzvertäfelung" },
    { src: "assets/room-3.jpg", it: "Vista dal balcone privato sulle pinete di Borno", en: "Private balcony view over Borno pine forest", de: "Blick vom Privatbalkon auf die Kiefernwälder von Borno" },
    { src: "assets/rest-2.jpg", it: "Sala ristorante panoramica immersa nei boschi", en: "Forest-view dining hall", de: "Speisesaal mit Panoramafenstern zum Wald" },
    { src: "assets/rest-1.jpg", it: "Bar e zona accoglienza a conduzione familiare", en: "Family-run alpine bar & reception", de: "Familiäre Hotelbar & Empfang in Berg-Holz" },
    { src: "assets/rest-4.jpg", it: "Gran buffet per banchetti, matrimoni e ricorrenze", en: "Celebration & banquet buffet service", de: "Buffet für Hochzeiten, Bankette & Feiern" },
    { src: "assets/dint-2.jpg", it: "Sentieri alpini e mulattiere tra gli abeti a due passi dall'hotel", en: "Mountain forest trails right behind the hotel", de: "Wanderwege im Kiefernwald direkt hinter dem Hotel" },
    { src: "assets/dint-3.jpg", it: "Il centro storico di Borno e le tradizioni dell'Altopiano del Sole", en: "Historic Borno town square & local festivals", de: "Historisches Zentrum von Borno & Dorffeste" },
    { src: "assets/ext-1.jpg", it: "Vista aerea dell'Albergo La Pigna e delle vette della Valle Camonica", en: "Aerial view of La Pigna & Valle Camonica peaks", de: "Luftaufnahme von La Pigna & den Gipfeln des Valle Camonica" }
  ];

  const MENU_ITEMS = [
    {
      cat: "antipasti",
      price: "13 €",
      tags: ["sg"],
      it: { name: "Tagliere dell'Alpeggio di Borno", desc: "Selezione di salumi tipici di montagna e formaggi locali prodotti sugli alpeggi del comprensorio." },
      en: { name: "Borno Alpine Cold Cuts & Cheese Board", desc: "Local mountain cured meats and artisanal cheeses from nearby summer pastures." },
      de: { name: "Brettljause der Almen von Borno", desc: "Auswahl an regionaler Bergwurst und würzigem Almkäse aus der Umgebung." }
    },
    {
      cat: "antipasti",
      price: "11 €",
      tags: ["casa", "veg", "sg"],
      it: { name: "Ricotta Fresca d'Alpeggio con Miele e Noci", desc: "Latticini genuini della zona serviti con miele millefiori di montagna e noci croccanti." },
      en: { name: "Fresh Mountain Ricotta, Wildflower Honey & Walnuts", desc: "Fresh local dairy paired with alpine wildflower honey and crunchy walnuts." },
      de: { name: "Frischer Alm-Ricotta mit Berghonig & Walnüssen", desc: "Hausgemachte Milchprodukte aus den Bergen mit Blütenhonig." }
    },
    {
      cat: "antipasti",
      price: "12 €",
      tags: ["casa", "veg"],
      it: { name: "Crostini Caldi con Funghi dei Boschi e Burro di Malga", desc: "Pane casereccio tostato con funghi trifolati raccolti nei boschi di Croce di Salven." },
      en: { name: "Toasted Country Bread with Wild Forest Mushrooms", desc: "Warm rustic toast topped with mountain butter and locally foraged mushrooms." },
      de: { name: "Geröstetes Bauernbrot mit Waldpilzen & Almbutter", desc: "Mit frisch gesammelten Pilzen aus den Wäldern um Borno." }
    },
    {
      cat: "primi",
      price: "14 €",
      tags: ["casa"],
      it: { name: "Casoncelli della Tradizione Camuna", desc: "Pasta fresca fatta in casa ripiena secondo ricetta familiare, mantecata con burro d'alpeggio fuso, salvia e pancetta croccante." },
      en: { name: "Homemade Camuno Casoncelli Pasta", desc: "Traditional stuffed alpine ravioli finished with melted mountain butter, sage and crispy pancetta." },
      de: { name: "Hausgemachte Camunische Casoncelli", desc: "Gefüllte Teigtaschen nach Familienrezept mit zerlassener Almbutter, Salbei & Speck." }
    },
    {
      cat: "primi",
      price: "14 €",
      tags: ["casa", "veg"],
      it: { name: "Pizzoccheri della Montagna", desc: "Tagliatelle di grano saraceno con verza, patate, formaggio fuso d'alpeggio, burro e aglio." },
      en: { name: "Mountain Buckwheat Pizzoccheri", desc: "Hearty buckwheat pasta tossed with savoy cabbage, potatoes, melted alpine cheese and butter." },
      de: { name: "Gebirgs-Pizzoccheri aus Buchweizen", desc: "Buchweizennudeln mit Wirsing, Kartoffeln, geschmolzenem Almkäse & Butter." }
    },
    {
      cat: "primi",
      price: "15 €",
      tags: ["casa", "veg"],
      it: { name: "Tagliatelle Fatte in Casa ai Funghi Porcini", desc: "Sfoglia tirata a mano condita con profumati funghi porcini raccolti nei boschi locali." },
      en: { name: "Handmade Tagliatelle with Porcini Mushrooms", desc: "Fresh egg pasta ribbons tossed with fragrant forest porcini mushrooms." },
      de: { name: "Hausgemachte Tagliatelle mit Steinpilzen", desc: "Frische Bandnudeln mit duftenden Steinpilzen aus dem Wald." }
    },
    {
      cat: "secondi",
      price: "16 €",
      tags: ["veg", "sg"],
      it: { name: "Polenta Taragna con Funghi Trifolati e Formaggio", desc: "Polenta fumante di mais e grano saraceno accompagnata da funghi di bosco e formaggio filante." },
      en: { name: "Polenta Taragna with Forest Mushrooms & Melted Cheese", desc: "Traditional buckwheat-cornmeal polenta served with sautéed forest mushrooms." },
      de: { name: "Polenta Taragna mit geschmortem Waldpilz & Käse", desc: "Kräftige Buchweizen-Polenta mit Pilzen und geschmolzenem Bergkäse." }
    },
    {
      cat: "secondi",
      price: "18 €",
      tags: ["sg"],
      it: { name: "Brasato di Manzo con Polenta Calda", desc: "Cottura lenta per ore con erbette aromatiche di montagna e contorno di polenta nostrana." },
      en: { name: "Slow-Braised Beef with Traditional Polenta", desc: "Tender slow-cooked mountain beef served with creamy rustic polenta." },
      de: { name: "Rinderschmorbraten mit warmer Polenta", desc: "Langsam mit Bergkräutern geschmort und mit heimischer Polenta serviert." }
    },
    {
      cat: "secondi",
      price: "17 €",
      tags: ["sg"],
      it: { name: "Grigliata Mista di Carne di Montagna", desc: "Selezione di tagli alla brace serviti con patate al forno alle erbe o verdura di stagione." },
      en: { name: "Mixed Alpine Wood-Grilled Meats", desc: "Chargrilled mountain cuts paired with herb roasted potatoes." },
      de: { name: "Gemischter Berg-Grillteller", desc: "Zarte Fleischauswahl vom Grill mit Kräuterkartoffeln oder Saisongemüse." }
    },
    {
      cat: "dolci",
      price: "6 €",
      tags: ["casa", "veg"],
      it: { name: "Torta Casereccia alle Mele e Cannella", desc: "Preparata in casa con mele di montagna, servita soffice con una spolverata di zucchero a velo." },
      en: { name: "Homemade Mountain Apple & Cinnamon Cake", desc: "Warm rustic apple cake baked daily in our family kitchen." },
      de: { name: "Hausgemachter Apfel-Zimt-Kuchen", desc: "Täglich frisch in unserer Familienküche gebacken." }
    },
    {
      cat: "dolci",
      price: "6 €",
      tags: ["casa", "veg"],
      it: { name: "Crostata ai Frutti di Bosco / Confettura", desc: "Pasta frolla burrosa con burro d'alpeggio e marmellata di bosco." },
      en: { name: "Wild Berry Alpine Jam Tart", desc: "Shortcrust pastry baked with mountain butter and berry preserve." },
      de: { name: "Mürbeteigkuchen mit Waldbeermarmelade", desc: "Knuspriger Boden mit Almbutter und fruchtiger Beerenkonfitüre." }
    },
    {
      cat: "dolci",
      price: "7 €",
      tags: ["veg", "sg"],
      it: { name: "Semifreddo alla Pigna con Salsa ai Frutti di Bosco", desc: "Dolce freddo al cucchiaio guarnito con salsa calda di mirtilli e lamponi." },
      en: { name: "La Pigna Semifreddo with Warm Berry Sauce", desc: "Creamy house dessert topped with warm blueberry and raspberry coulis." },
      de: { name: "Haus-Semifreddo mit warmer Waldbeersauce", desc: "Cremiges Dessert mit frischem Heidelbeer- und Himbeertopping." }
    }
  ];

  const SEASON_DATA = {
    summer: {
      it: [
        { t: "Sentieri CAI & Passeggiate nei Boschi", d: "Direttamente dal parco sul retro dell'albergo partono strade sterrate e mulattiere tra le pinete verso le cime dell'Altopiano del Sole." },
        { t: "Riserva Naturale Boschi del Giovetto", d: "A breve distanza: oasi protetta celebre per le foreste di abeti rossi, l'aria pura e i percorsi adatti a tutte le età." },
        { t: "Parco delle Doline & Borgo di Borno", d: "Esplora le caratteristiche doline carsiche e vivi l'estate tra il centro storico antico, la Transumanza e la Fiaccolata di San Fermo." }
      ],
      en: [
        { t: "CAI Alpine Trails Behind the Hotel", d: "Forest paths and gentle mountain trails start directly behind our private park through Borno's pine woods." },
        { t: "Boschi del Giovetto Nature Reserve", d: "Just minutes away: protected spruce forest ideal for refreshing summer walks and family excursions." },
        { t: "Doline Park & Historic Borno", d: "Discover karst limestone formations and vibrant summer village festivals in ancient Borno." }
      ],
      de: [
        { t: "CAI-Wanderwege ab dem Hotelpark", d: "Schattige Forstwege durch die Kiefernwälder beginnen direkt hinter unserem Garten." },
        { t: "Naturschutzgebiet Boschi del Giovetto", d: "Nur wenige Minuten entfernt: herrliche Tannenwälder, ideale Bergluft und familienfreundliche Wege." },
        { t: "Doline-Park & Altstadt von Borno", d: "Erkunden Sie die Kalkstein-Dolinen und traditionelle Sommerfeste im historischen Dorf." }
      ]
    },
    winter: {
      it: [
        { t: "Impianti Borno · Monte Altissimo a 5 minuti", d: "Comprensorio sciistico panoramico raggiungibile in 5 minuti d'auto, con piste per famiglie, snowboard e scuole sci." },
        { t: "Deposito Sci & Rientro al Caldo", d: "Rientrate comodamente in albergo con deposito attrezzatura, camere riscaldate con travi in legno e cucina calda tipica." },
        { t: "Ciaspolate & Tradizioni d'Inverno", d: "Itinerari silenziosi sulla neve nei boschi circostanti e atmosfere natalizie e del Palio di S. Martino nel borgo di Borno." }
      ],
      en: [
        { t: "Monte Altissimo Ski Slopes (5 Mins)", d: "Panoramic family-friendly slopes and ski schools at Borno Ski Area just a 5-minute drive away." },
        { t: "Ski Storage & Cozy Dining", d: "Enjoy convenient ski storage, warm wooden rooms, and hearty pizzoccheri or polenta after a day on the snow." },
        { t: "Snowshoeing & Alpine Traditions", d: "Peaceful snowy forest loops right from Croce di Salven and cozy village events." }
      ],
      de: [
        { t: "Skigebiet Monte Altissimo (5 Min.)", d: "Panoramische Familienpisten und Skischulen in nur 5 Autominuten erreichbar." },
        { t: "Skiraum & Warme Bergküche", d: "Praktischer Skiraum vor Ort sowie warme Holzzimmer und kräftige Polenta nach dem Skitag." },
        { t: "Schneeschuhwandern & Winterzauber", d: "Stille Winterpfade direkt ab Croce di Salven und stimmungsvolle Abende in Borno." }
      ]
    }
  };

  const I18N = {
    it: {
      nav_hotel: "Albergo",
      nav_menu: "Ristorante & Menù",
      nav_area: "Dintorni",
      nav_contact: "Contatti",
      nav_book: "Prenota Diretto",
      hero_kicker: "1.200 m · Croce di Salven, Borno (BS) · Valle Camonica",
      hero_title: "Oasi di pace tra i boschi dell'Altopiano del Sole.",
      hero_sub: "Accoglienza familiare, camere panoramiche con balcone sul verde e cucina tipica montana con casoncelli, pizzoccheri e funghi freschi.",
      hero_cta_book: "Prenota Diretto · Zero Commissioni",
      hero_cta_menu: "Esplora il Menù & Orari",
      trust_rating: "Valutazione ospiti",
      trust_ski: "Piste Monte Altissimo",
      trust_park: "Dehor, sdraio & parcheggio",
      trust_pets: "Animali benvenuti",
      book_eyebrow: "Contatto Diretto Senza Intermediari",
      book_title: "Prenota una Camera o un Tavolo in 30 Secondi",
      tab_room: "Camera Albergo",
      tab_table: "Tavolo Ristorante",
      lbl_checkin: "Check-in",
      lbl_checkout: "Check-out",
      lbl_adults: "Adulti",
      lbl_children: "Bambini",
      lbl_roomtype: "Tipologia Camera",
      lbl_board: "Trattamento",
      lbl_extras: "Esigenze particolari:",
      ext_pet: "Pet-Friendly",
      ext_ski: "Deposito Sci",
      ext_crib: "Culla bimbi",
      lbl_name: "Il tuo Nome",
      lbl_notes: "Note o richieste aggiuntive",
      preview_note: "La richiesta parte direttamente verso la direzione, senza portali né costi di agenzia.",
      btn_wa_room: "Invia Richiesta su WhatsApp (+39 333 289 8394)",
      btn_mail_room: "Richiedi via Email",
      lbl_tdate: "Data",
      lbl_slot: "Fascia Oraria",
      lbl_guests: "Coperti",
      lbl_occasion: "Occasione",
      thu_title: "Giorno di chiusura settimanale:",
      thu_msg: "il giovedì il ristorante osserva il turno di chiusura. Scegli un altro giorno tra lunedì, martedì, mercoledì, venerdì, sabato o domenica.",
      lbl_allergies: "Note o allergie alimentari",
      btn_wa_table: "Prenota Tavolo su WhatsApp",
      btn_call_fixed: "Chiama +39 0364 311694",
      hotel_eyebrow: "Ospitalità Alpina dal Cuore Caldo",
      hotel_title: "L'Albergo & Le Nostre Camere",
      hotel_desc: "Ampie e luminose, arredate con travi a vista e boiserie in legno di montagna: ogni stanza dispone di bagno privato con finestra e affaccio panoramico sul verde o sui balconi della pineta.",
      cap_ext: "Facciata, dehor e giardino a Croce di Salven",
      cap_room1: "Camere con travi a vista & balcone",
      cap_room4: "Dependance & interni in legno",
      cap_balcony: "Vista dal balcone sui boschi",
      r1_tag: "Vista Pineta",
      r1_name: "Matrimoniale Panoramica",
      r1_desc: "Ideale per un weekend romantico in montagna: balcone privato sul verde, travi a vista, bagno con finestra, Wi-Fi e TV a schermo piatto.",
      r2_tag: "Famiglie & Gruppi",
      r2_name: "Camera Familiare",
      r2_desc: "Spazi generosi pensati per adulti e bambini, con possibilità di letto aggiunto o culla, affacci luminosi e accesso diretto al parco giochi sul retro.",
      r3_tag: "Rinnovata",
      r3_name: "Camera in Dependance",
      r3_desc: "Ambienti caldi con boiserie artigianale nella nostra dependance immersa nella quiete: comodissima per coppie, sportivi e soggiorni sciistici.",
      r_cta: "Seleziona per preventivo diretto →",
      am1: "Parco privato con sdraio e giochi bimbi",
      am2: "Dehor esterno con tavolini e ombrelloni",
      am3: "Ampio parcheggio gratuito in loco",
      am4: "Deposito sci & vicinanza impianti",
      am5: "Soggiorni comuni per lettura e relax",
      am6: "Animali domestici ammessi",
      rest_eyebrow: "Tradizione, Genuinità e Territorio",
      rest_title: "Il Ristorante & Menù Digitale",
      rest_desc: "Cucina tipica camuna e di montagna con salumi, ricotte, burro e formaggi prodotti sugli alpeggi del comprensorio, funghi raccolti nei nostri boschi e pasta fresca fatta in casa.",
      hrs_label: "Orari cucina:",
      hrs_closed: "Chiuso il giovedì",
      hrs_pay: "Contanti & Carte di debito",
      cap_hall: "Sala panoramica sul bosco",
      cap_bar: "Bar & accoglienza familiare",
      cap_banquet: "Buffet cerimonie & ricorrenze",
      cat_all: "Tutti i Piatti",
      cat_ant: "Antipasti & Alpeggio",
      cat_primi: "Primi Camuni",
      cat_sec: "Secondi & Funghi",
      cat_dolci: "Dolci Caserecci",
      tag_home: "Fatto in casa",
      tag_veg: "Vegetariano",
      tag_gf: "Senza glutine su rich.",
      menu_note: "Esempio dimostrativo di menù digitale interattivo (compatibile con QR code al tavolo): piatti stagionali, fuori menù dei funghi e prezzi completamente modificabili dalla direzione.",
      menu_empty: "Nessun piatto corrisponde ai filtri selezionati.",
      menu_reset: "Mostra tutto il menù",
      banq_eye: "Ampia Sala Rinnovata",
      banq_title: "Matrimoni, Banchetti & Ricorrenze in Montagna",
      banq_desc: "Progettiamo menù su misura per matrimoni, battesimi, comunioni e pranzi di gruppo, con ampia sala interna, dehor estivo, parco privato per le foto e possibilità di pernottamento per gli ospiti.",
      banq_cta: "Chiedi Preventivo Eventi",
      area_eyebrow: "Borno & Valle Camonica",
      area_title: "Natura, Sentieri & Tradizioni tutto l'Anno",
      area_desc: "Dal parco dell'albergo partono mulattiere e sentieri CAI nei boschi. In pochi minuti si raggiungono gli impianti del Monte Altissimo, i Boschi del Giovetto e il borgo storico di Borno.",
      sea_sum: "Estate & Sentieri",
      sea_win: "Inverno & Sci",
      cap_trail: "Sentieri CAI & Boschi del Giovetto",
      cap_borno: "Centro storico di Borno & eventi",
      cap_aerial: "Croce di Salven vista dall'alto con le vette camune",
      cnt_eye: "Posizione & Recapiti Diretti",
      cnt_title: "Come Raggiungerci a Borno",
      cnt_lead: "Immersi nella pineta di Località Croce di Salven, a circa 4 km dal centro di Borno, con ampio parcheggio privato gratuito direttamente davanti alla struttura.",
      ci_addr: "Indirizzo",
      ci_phones: "Telefono & WhatsApp Diretto",
      ci_hours: "Orari Ristorante",
      ci_hours_val: "Lun–Mer e Ven–Dom: 12:00–14:00 · 19:00–21:30\nGiovedì: chiuso per riposo settimanale",
      btn_maps: "Avvia Navigatore Google Maps",
      btn_chat_wa: "Chatta su WhatsApp",
      footer_demo: "Anteprima digitale su misura · Mazza Studio Web",
      st_call: "Chiama",
      st_menu: "Menù",
      st_book: "Prenota Diretto"
    },
    en: {
      nav_hotel: "Hotel",
      nav_menu: "Dining & Menu",
      nav_area: "Surroundings",
      nav_contact: "Contacts",
      nav_book: "Direct Booking",
      hero_kicker: "1,200 m · Croce di Salven, Borno (BS) · Italian Alps",
      hero_title: "A peaceful alpine retreat among the pines of Borno.",
      hero_sub: "Family hospitality, bright rooms with mountain-view balconies, and traditional Valle Camonica cuisine featuring homemade casoncelli, pizzoccheri and local forest mushrooms.",
      hero_cta_book: "Book Direct · Best Rate",
      hero_cta_menu: "Explore Digital Menu",
      trust_rating: "Guest rating",
      trust_ski: "Monte Altissimo slopes",
      trust_park: "Private park & parking",
      trust_pets: "Pets welcome",
      book_eyebrow: "Direct Hotel & Table Reservations",
      book_title: "Book Your Stay or Table in 30 Seconds",
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
      lbl_name: "Your Name",
      lbl_notes: "Arrival time or extra notes",
      preview_note: "Sent directly to the owners via WhatsApp or Email with zero portal fees.",
      btn_wa_room: "Send via WhatsApp (+39 333 289 8394)",
      btn_mail_room: "Request via Email",
      lbl_tdate: "Date",
      lbl_slot: "Sitting",
      lbl_guests: "Guests",
      lbl_occasion: "Occasion",
      thu_title: "Weekly Closing Day:",
      thu_msg: "the restaurant is closed on Thursdays. Please select Monday–Wednesday or Friday–Sunday.",
      lbl_allergies: "Allergies or seating notes",
      btn_wa_table: "Book Table via WhatsApp",
      btn_call_fixed: "Call +39 0364 311694",
      hotel_eyebrow: "Warm Alpine Hospitality",
      hotel_title: "The Hotel & Our Rooms",
      hotel_desc: "Spacious, bright rooms decorated with exposed wooden beams and warm timber paneling. Every room features a windowed private bathroom and opens onto lush green balconies.",
      cap_ext: "Chalet exterior, terrace & pine garden",
      cap_room1: "Rooms with timber beams & balcony",
      cap_room4: "Refurbished timber dependance rooms",
      cap_balcony: "Private balcony view over pinewoods",
      r1_tag: "Forest View",
      r1_name: "Panoramic Double Room",
      r1_desc: "Ideal for a peaceful mountain getaway: private balcony overlooking pinewoods, wooden ceiling beams, windowed en-suite, Wi-Fi and flat-screen TV.",
      r2_tag: "Families",
      r2_name: "Family Alpine Room",
      r2_desc: "Generous layout tailored for families and children, optional crib/extra bed, and direct access to our rear meadow park & playground.",
      r3_tag: "Updated Wing",
      r3_name: "Dependance Timber Room",
      r3_desc: "Handcrafted wooden boiserie in our quiet dependance wing, favored by couples, hikers and winter skiers.",
      r_cta: "Select for direct quote →",
      am1: "Private meadow park with loungers & kids area",
      am2: "Sunlit front terrace with parasols",
      am3: "Large free private on-site parking",
      am4: "Ski storage · 5 mins to slopes",
      am5: "Cozy shared reading & lounge rooms",
      am6: "Pets welcome on request",
      rest_eyebrow: "Authenticity & Local Flavors",
      rest_title: "Restaurant & Interactive Digital Menu",
      rest_desc: "Traditional alpine recipes prepared with local mountain pasture cheeses, cured meats, forest porcini mushrooms and handmade pasta.",
      hrs_label: "Kitchen hours:",
      hrs_closed: "Closed Thursdays",
      hrs_pay: "Cash & Debit Cards accepted",
      cap_hall: "Wood-framed dining room facing pines",
      cap_bar: "Warm mountain bar & reception",
      cap_banquet: "Banquet & wedding buffet service",
      cat_all: "All Dishes",
      cat_ant: "Starters & Cheeses",
      cat_primi: "Homemade Pasta",
      cat_sec: "Mains & Mushrooms",
      cat_dolci: "Homemade Desserts",
      tag_home: "Homemade",
      tag_veg: "Vegetarian",
      tag_gf: "GF on request",
      menu_note: "Interactive digital menu preview (QR-code ready): seasonal mushroom specials and prices can be customized anytime by the hotel.",
      menu_empty: "No dishes match your active filters.",
      menu_reset: "Show full menu",
      banq_eye: "Spacious Banquet Hall",
      banq_title: "Weddings, Celebrations & Group Dining",
      banq_desc: "Custom menus for weddings, family reunions and group events with our renovated hall, garden photo backdrop and overnight accommodation.",
      banq_cta: "Inquire About Events",
      area_eyebrow: "Borno & Valle Camonica",
      area_title: "Nature, Hiking & Skiing All Year",
      area_desc: "Marked CAI hiking trails leave straight from the rear pine park; ski lifts, nature reserves and historic Borno are only minutes away.",
      sea_sum: "Summer & Hiking",
      sea_win: "Winter & Skiing",
      cap_trail: "CAI trails & Boschi del Giovetto",
      cap_borno: "Historic Borno village & events",
      cap_aerial: "Aerial view of La Pigna & Alps",
      cnt_eye: "Location & Direct Contacts",
      cnt_title: "Find Us in Borno",
      cnt_lead: "Peacefully tucked among the pines of Croce di Salven, 4 km from Borno center with free private parking right outside.",
      ci_addr: "Address",
      ci_phones: "Phone & Direct WhatsApp",
      ci_hours: "Restaurant Hours",
      ci_hours_val: "Mon–Wed, Fri–Sun: 12:00–14:00 · 19:00–21:30\nThursday: closed",
      btn_maps: "Open Google Maps Directions",
      btn_chat_wa: "Chat on WhatsApp",
      footer_demo: "Custom digital preview · Mazza Studio Web",
      st_call: "Call",
      st_menu: "Menu",
      st_book: "Book Direct"
    },
    de: {
      nav_hotel: "Hotel",
      nav_menu: "Restaurant & Menü",
      nav_area: "Umgebung",
      nav_contact: "Kontakt",
      nav_book: "Direkt Buchen",
      hero_kicker: "1.200 m · Croce di Salven, Borno (BS) · Italienische Alpen",
      hero_title: "Eine ruhige Oase im Kiefernwald des Altopiano del Sole.",
      hero_sub: "Familiäre Gastfreundschaft, helle Zimmer mit Panoramabalkon und traditionelle Bergküche mit hausgemachten Casoncelli, Pizzoccheri und frischen Pilzen.",
      hero_cta_book: "Direkt Buchen · Ohne Gebühren",
      hero_cta_menu: "Speisekarte Entdecken",
      trust_rating: "Gästebewertung",
      trust_ski: "Skigebiet Monte Altissimo",
      trust_park: "Privatpark & Parkplatz",
      trust_pets: "Haustiere willkommen",
      book_eyebrow: "Direktbuchung Ohne Vermittler",
      book_title: "Zimmer oder Tisch in 30 Sekunden Anfragen",
      tab_room: "Hotelzimmer",
      tab_table: "Restauranttisch",
      lbl_checkin: "Anreise",
      lbl_checkout: "Abreise",
      lbl_adults: "Erwachsene",
      lbl_children: "Kinder",
      lbl_roomtype: "Zimmertyp",
      lbl_board: "Verpflegung",
      lbl_extras: "Wünsche:",
      ext_pet: "Haustier erlaubt",
      ext_ski: "Skiraum",
      ext_crib: "Kinderbett",
      lbl_name: "Ihr Name",
      lbl_notes: "Ankunftszeit oder Hinweise",
      preview_note: "Geht direkt an die Hotelleitung per WhatsApp oder E-Mail ohne Portalgebühren.",
      btn_wa_room: "Per WhatsApp Senden (+39 333 289 8394)",
      btn_mail_room: "Per E-Mail Anfragen",
      lbl_tdate: "Datum",
      lbl_slot: "Tischzeit",
      lbl_guests: "Personen",
      lbl_occasion: "Anlass",
      thu_title: "Ruhetag:",
      thu_msg: "Donnerstags ist unser Restaurant geschlossen. Bitte wählen Sie einen anderen Tag.",
      lbl_allergies: "Allergien oder Sonderwünsche",
      btn_wa_table: "Tisch per WhatsApp Reservieren",
      btn_call_fixed: "Anrufen +39 0364 311694",
      hotel_eyebrow: "Herzliche Gastfreundschaft",
      hotel_title: "Das Hotel & Unsere Zimmer",
      hotel_desc: "Geräumige, helle Zimmer mit sichtbaren Holzbalken und warmer Vertäfelung: jedes Zimmer bietet ein eigenes Bad mit Fenster und Blick ins Grüne.",
      cap_ext: "Alpenchalet & Terrasse in Croce di Salven",
      cap_room1: "Zimmer mit Holzbalken & Balkon",
      cap_room4: "Dependance im alpinen Holzstil",
      cap_balcony: "Balkonblick in den Kiefernwald",
      r1_tag: "Waldblick",
      r1_name: "Panoramazimmer",
      r1_desc: "Ideal für erholsame Tage zu zweit: eigener Balkon, sichtbare Holzbalken, Tageslichtbad, WLAN und TV.",
      r2_tag: "Familien",
      r2_name: "Familienzimmer",
      r2_desc: "Großzügig geschnitten für Eltern und Kinder, auf Wunsch mit Babybett und direktem Zugang zum Garten mit Spielbereich.",
      r3_tag: "Modernisiert",
      r3_name: "Zimmer in der Dependance",
      r3_desc: "Gemütliches Holzambiente in unserer ruhigen Dependance — sehr beliebt bei Wanderern und Skifahrern.",
      r_cta: "Für Direktangebot auswählen →",
      am1: "Privatpark mit Liegestühlen & Spielplatz",
      am2: "Sonnenterrasse mit Schirmen vor dem Haus",
      am3: "Großer kostenloser Privatparkplatz",
      am4: "Skiraum · 5 Min. zu den Pisten",
      am5: "Gemütliche Aufenthalts- & Leseräume",
      am6: "Haustiere willkommen",
      rest_eyebrow: "Tradition & Regionalität",
      rest_title: "Restaurant & Digitale Speisekarte",
      rest_desc: "Echte Bergküche aus dem Valle Camonica mit Almkäse, Bergwurst, frisch gesammelten Waldpilzen und hausgemachter Pasta.",
      hrs_label: "Küchenzeiten:",
      hrs_closed: "Donnerstag Ruhetag",
      hrs_pay: "Barzahlung & Debitkarten",
      cap_hall: "Heller Speisesaal mit Waldblick",
      cap_bar: "Gemütliche Hausbar & Rezeption",
      cap_banquet: "Bankette, Hochzeiten & Feiern",
      cat_all: "Alle Gerichte",
      cat_ant: "Vorspeisen & Alm",
      cat_primi: "Hausgemachte Pasta",
      cat_sec: "Hauptgerichte & Pilze",
      cat_dolci: "Hausgemachte Desserts",
      tag_home: "Hausgemacht",
      tag_veg: "Vegetarisch",
      tag_gf: "Glutenfrei a. Anfrage",
      menu_note: "Interaktive QR-Speisekarte (Vorschau): Saisonale Pilzgerichte und Preise können jederzeit flexibel angepasst werden.",
      menu_empty: "Keine Gerichte entsprechen den ausgewählten Filtern.",
      menu_reset: "Alle Gerichte anzeigen",
      banq_eye: "Großer Festsaal",
      banq_title: "Hochzeiten, Feiern & Gruppen in den Bergen",
      banq_desc: "Individuelle Menüs für Familienfeiern und Hochzeiten im renovierten Saal mit Gartenbereich und Übernachtungsmöglichkeit.",
      banq_cta: "Event Anfragen",
      area_eyebrow: "Borno & Valle Camonica",
      area_title: "Natur, Wandern & Skifahren das ganze Jahr",
      area_desc: "Direkt vom Hotelgarten starten CAI-Wanderwege. Die Skilifte Monte Altissimo und Borno liegen nur wenige Minuten entfernt.",
      sea_sum: "Sommer & Wandern",
      sea_win: "Winter & Ski",
      cap_trail: "CAI-Wanderwege & Boschi del Giovetto",
      cap_borno: "Altstadt von Borno & Traditionen",
      cap_aerial: "Luftaufnahme von Croce di Salven & den Bergen",
      cnt_eye: "Anfahrt & Direkte Kontakte",
      cnt_title: "So Finden Sie Uns in Borno",
      cnt_lead: "Mitten in der Natur von Croce di Salven, rund 4 km vom Zentrum Bornos entfernt, mit großem kostenfreiem Parkplatz.",
      ci_addr: "Adresse",
      ci_phones: "Telefon & WhatsApp Direkt",
      ci_hours: "Öffnungszeiten Restaurant",
      ci_hours_val: "Mo–Mi, Fr–So: 12:00–14:00 · 19:00–21:30\nDonnerstag: Ruhetag",
      btn_maps: "Google Maps Route Starten",
      btn_chat_wa: "Per WhatsApp Schreiben",
      footer_demo: "Maßgeschneiderte Vorschau · Mazza Studio Web",
      st_call: "Anruf",
      st_menu: "Menü",
      st_book: "Direkt Buchen"
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

    // Pick next non-Thursday for initial table date
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
      it: "Cerca casoncelli, funghi, pizzoccheri...",
      en: "Search casoncelli, mushrooms, polenta...",
      de: "Suche nach Casoncelli, Pilzen, Polenta..."
    };
    $("#menuSearch").placeholder = searchMap[lang];
    updateLiveStatus();
    renderMenu();
    renderSeason();
    updateRoomPreview();
    updateTablePreview();
  }

  function updateLiveStatus() {
    const statusBox = $("#liveOpenStatus");
    const textEl = $("#liveOpenText");
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
      const hh = parseInt(parts.find((p) => p.type === "hour")?.value || "12", 10);
      const mm = parseInt(parts.find((p) => p.type === "minute")?.value || "0", 10);
      const mins = hh * 60 + mm;

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
      `vorrei richiedere disponibilità diretta senza intermediari:`,
      `• Soggiorno: dal ${formatDateIT(finalCi)} al ${formatDateIT(finalCo)} (${nights} ${nights === 1 ? "notte" : "notti"})`,
      `• Ospiti: ${state.adults} adulti${state.children > 0 ? `, ${state.children} bambini` : ""}`,
      `• Sistemazione: ${room} — ${board}`,
      extras.length ? `• Extra: ${extras.join(", ")}` : "",
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
      `vorrei prenotare un tavolo:`,
      `• Data: ${formatDateIT(tdVal)} — ${slot}`,
      `• Coperti: ${state.tableGuests} persone (${occ})`,
      notes ? `• Note/Allergie: ${notes}` : "",
      name ? `A nome di: ${name}` : `Grazie, attendo conferma.`
    ].filter(Boolean);

    const fullMsg = msgLines.join("\n");
    $("#tableSummaryText").textContent = isThursday
      ? `⚠️ Giovedì ${formatDateIT(tdVal)}: chiusura settimanale del ristorante. Seleziona un'altra data per procedere.`
      : `${formatDateIT(tdVal)} · ${slot} · ${state.tableGuests} persone · ${occ}`;
    $("#tableWaBtn").href = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(fullMsg)}`;
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
        const badges = it.tags.map((t) => `<span class="dish-badge">${tagNames[t]}</span>`).join("");
        return `
          <article class="dish-item">
            <div class="dish-main">
              <h4>${loc.name}</h4>
              <p>${loc.desc}</p>
              <div class="dish-badges">${badges}</div>
            </div>
            <div class="dish-price">${it.price}</div>
          </article>
        `;
      })
      .join("");
  }

  function renderSeason() {
    const items = SEASON_DATA[state.season][currentLang];
    $("#areaCards").innerHTML = items
      .map((x) => `<article class="area-card"><h3>${x.t}</h3><p>${x.d}</p></article>`)
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
      if ($("#lightbox").hidden) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") openLightbox(state.lbIndex - 1);
      if (e.key === "ArrowRight") openLightbox(state.lbIndex + 1);
    });
  }

  initDates();
  bindEvents();
  applyLang("it");
})();
