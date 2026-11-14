const MAPA_PODZIALU = `
<figure class="material mapa">
  <svg viewBox="0 0 390 238" role="img" aria-labelledby="tytul-mapy opis-mapy">
    <title id="tytul-mapy">Trzy obszary na ziemiach II Rzeczypospolitej</title>
  <desc id="opis-mapy">Obszar A na zachodzie obejmuje Poznań. Obszar B w centrum obejmuje Warszawę i Kraków. Obszar C na wschodzie obejmuje Lwów. Odcinek granicy między B a C biegnie wzdłuż Bugu.</desc>
    <path d="M44 75 64 56 91 59 104 37 132 43 156 50 164 62 198 59 208 102 167 116 152 143 143 164 111 153 97 139 72 136 53 108Z" fill="#c7deef" stroke="#364e61" stroke-width="2"/>
    <path d="M198 59 225 58 240 70 257 107 250 135 252 157 232 178 222 197 199 191 175 183 143 164 152 143 167 116 208 102Z" fill="#f3d7a2" stroke="#765c37" stroke-width="2"/>
    <path d="M225 58 246 51 263 34 282 48 302 33 329 53 326 76 343 92 329 108 342 131 329 154 324 176 335 198 304 196 283 211 251 213 222 197 232 178 252 157 250 135 257 107 240 70Z" fill="#d7e5bd" stroke="#51673f" stroke-width="2"/>
    <path d="M246 80 257 107 250 135 252 157 232 178" fill="none" stroke="#2c658c" stroke-width="3"/>
    <g fill="#27201a" font-family="Arial, sans-serif">
      <g font-size="24" font-weight="700">
        <text x="108" y="88">A</text><text x="207" y="155">B</text><text x="300" y="111">C</text>
      </g>
      <g font-size="13">
        <circle cx="111" cy="112" r="3"/><text x="78" y="129">Poznań</text>
        <circle cx="220" cy="111" r="3"/><text x="175" y="100">Warszawa</text>
        <circle cx="179" cy="172" r="3"/><text x="146" y="168">Kraków</text>
        <circle cx="268" cy="184" r="3"/><text x="275" y="182">Lwów</text>
        <text x="260" y="144" fill="#1f5478">Bug</text>
      </g>
    </g>
  </svg>
  <figcaption>Uproszczony schemat podziału ziem II Rzeczypospolitej na trzy główne obszary.</figcaption>
</figure>`;

const STRATY_INTELIGENCJI = [
  ['Naukowcy i nauczyciele', 9300],
  ['Inżynierowie i technicy', 12000],
  ['Lekarze i farmaceuci', 9400],
  ['Literaci i dziennikarze', 800],
  ['Duchowieństwo', 2900],
  ['Ekonomiści', 7900],
];

const WYKRES_STRAT = `
<figure class="material">
  <figcaption>Straty wybranych grup polskiej inteligencji podczas II wojny światowej</figcaption>
  <ul class="wykres">
    ${STRATY_INTELIGENCJI.map(([nazwa, liczba]) => `
      <li>
        <span>${nazwa}</span>
        <strong>${liczba.toLocaleString('pl-PL')}</strong>
        <span class="tor" aria-hidden="true"><span style="width:${liczba / 120}%"></span></span>
      </li>`).join('')}
  </ul>
</figure>`;

const material = (podpis, tekst) => `
  <figure class="material tekst-zrodlowy">
    <blockquote><p>${tekst}</p></blockquote>
    <figcaption>${podpis}</figcaption>
  </figure>`;

const ZRODLO_FRANK = material(
  'Na podstawie dziennika Hansa Franka · parafraza',
  'Koło Warszawy niemiecki pociąg wpadł na miny, a następnie został ostrzelany. Za atak na kolej Niemcy rozstrzelali grupę Polaków. Frank liczył, że rodziny straconych obwinią o ich śmierć sprawców zamachu.',
);

const ZRODLO_BANASZEK = material(
  'Na podstawie wspomnień Katarzyny Banaszek o wysiedleniu z Wielkopolski w grudniu 1939 r. · parafraza',
  'Niemieccy żandarmi wpędzili rodziny do starych, nieogrzewanych wagonów. Ludzie nie wiedzieli, dokąd jadą, a dzieci płakały z głodu i zimna.',
);

const ZRODLO_MAJSKI = material(
  'Na podstawie układu Sikorski–Majski, 30 lipca 1941 r. · parafraza',
  'Oba rządy zobowiązują się przywrócić stosunki dyplomatyczne i pomagać sobie w wojnie z Niemcami. ZSRS zgadza się na utworzenie armii polskiej na swoim terytorium.',
);

const ZRODLO_BOR = material(
  'Na podstawie meldunku gen. Tadeusza Komorowskiego „Bora” z sierpnia 1944 r. · parafraza',
  'Oddziały walczą bez czołgów, artylerii i wsparcia lotniczego. Wspiera je ludność Warszawy. Brakuje amunicji, a zaopatrzenie ze zrzutów jest znacznie mniejsze, niż potrzeba.',
);

const ZRODLO_TESTAMENT = material(
  'Na podstawie Testamentu Polski Walczącej, lipiec 1945 r. · parafraza',
  'Wojska sowieckie i policja polityczna powinny opuścić kraj. Należy zakończyć prześladowania polityczne. Wszystkie polskie stronnictwa demokratyczne powinny móc wziąć udział w wyborach.',
);

const ZRODLO_FRANCJA = material(
  'Na podstawie przykładowej klasówki · parafraza',
  'Po klęsce militarnej rząd francuski zgodził się na zawieszenie broni z Niemcami. Zgodnie z warunkami rozejmu wojska francuskie miały przerwać walki.',
);

// Odpowiedzi to indeksy od zera. Pole tekstowe przyjmuje podane warianty.
const wyborZadanie = (pytanie, opcje, klucz) => ({ pytanie, opcje, klucz });
const wpisz = (pytanie, pokaz, ...warianty) => ({ pytanie, pokaz, warianty: [pokaz, ...warianty] });
const rok = (pytanie, n) => ({
  ...wpisz(pytanie, String(n), n + ' r', n + ' roku'),
  liczba: true,
});
function data(pytanie, pokaz, ...warianty) {
  const dopiski = [pokaz, ...warianty].flatMap((zapis) => [zapis + ' r', zapis + ' roku']);
  return wpisz(pytanie, pokaz, ...warianty, ...dopiski);
}
const zadanie = (polecenie, wyjasnienie, pola, zrodlo = '') => ({ polecenie, wyjasnienie, pola, zrodlo });

function dopasuj(polecenie, opisy, wiersze, wyjasnienie) {
  const litery = opisy.map((_, i) => String.fromCharCode(65 + i));
  const lista = opisy.map((opis) => `<li>${opis}</li>`).join('');
  return zadanie(
    polecenie + ' Każdej litery użyj raz.',
    wyjasnienie,
    wiersze.map(([pytanie, klucz]) => ({ ...wyborZadanie(pytanie, litery, [klucz]), skrot: true })),
    `<ol class="material bank" type="A">${lista}</ol>`,
  );
}

function chronologia(polecenie, wiersze, wyjasnienie) {
  const pozycje = wiersze.map((_, i) => String(i + 1));
  return zadanie(
    polecenie,
    wyjasnienie,
    wiersze.map(([pytanie, pozycja]) => ({ ...wyborZadanie(pytanie, pozycje, [pozycja - 1]), skrot: true })),
  );
}

const WERSJA_A = [
  {
    temat: '1. Dwie okupacje',
    zadania: [
      zadanie('Odczytaj schemat i rozpoznaj podział ziem polskich.',
        'Poznań wcielono do III Rzeszy. Warszawa i Kraków znalazły się w Generalnym Gubernatorstwie. Lwów był pod okupacją sowiecką do napaści Niemiec na ZSRS w czerwcu 1941 r.',
        [
          wyborZadanie('Co stało się z obszarem A?', ['Wcielono go do ZSRS.', 'Włączono go do Generalnego Gubernatorstwa.', 'Wcielono go bezpośrednio do III Rzeszy.'], [2]),
          wyborZadanie('Jaka była nazwa obszaru B?', ['Kraj Warty', 'Generalne Gubernatorstwo', 'Wileńszczyzna'], [1]),
          wyborZadanie('Co pozwala rozpoznać podział sprzed czerwca 1941 r.?',
            ['Lwów znajduje się w tej samej strefie co Kraków.',
              'Warszawa jest na wschód od obszaru C.',
              'Lwów znajduje się w strefie sowieckiej, oddzielonej od Generalnego Gubernatorstwa.'], [2]),
        ], MAPA_PODZIALU),
      zadanie('Jaki był skutek traktatu niemiecko-sowieckiego z 28 września 1939 r.?',
        'Traktat skorygował podział ustalony w pakcie Ribbentrop–Mołotow. Linię podziału przesunięto z Wisły na Bug.',
        [wyborZadanie('', ['Zmieniono linię podziału między okupantami z Wisły na Bug.',
          'Ustalono, że Warszawa i Kraków trafią do ZSRS.', 'Uzgodniono włączenie całej Polski do Generalnego Gubernatorstwa.'], [0])]),
      zadanie('Zaznacz dwie metody stosowane przez władze sowieckie na zajętych ziemiach.',
        'Paszportyzacja oznaczała narzucanie obywatelstwa ZSRS. Nacjonalizacja i kolektywizacja wiązały się z przejmowaniem prywatnego majątku. Volkslista i policja granatowa należały do realiów okupacji niemieckiej.',
        [wyborZadanie('', ['Wpisywanie mieszkańców na volkslistę', 'Przymusowe nadawanie obywatelstwa sowieckiego',
          'Utworzenie policji granatowej', 'Nacjonalizacja zakładów i kolektywizacja wsi'], [1, 3])]),
      zadanie('Uzupełnij informacje o zbrodni katyńskiej.',
        'Wiosną 1940 r. NKWD zamordowało około 22 tys. polskich jeńców i więźniów. Katyń, Charków i Miednoje należą do miejsc związanych z tą zbrodnią.',
        [rok('Rok zbrodni', 1940),
          wyborZadanie('Która instytucja przeprowadziła egzekucje?', ['Gestapo', 'NKWD', 'Abwehra'], [1]),
          wyborZadanie('Dlaczego władze ZSRS uznały polskich oficerów i przedstawicieli elit za zagrożenie?',
            ['Byli związani z przedwojennym państwem polskim i mogli przeciwstawić się nowej władzy.',
              'Dowodzili oddziałami niemieckimi na ziemiach wcielonych do Rzeszy.', 'Zarządzali okupacyjnymi obozami pracy w ZSRS.'], [0])]),
    ],
  },
  {
    temat: '2. Władze na uchodźstwie i polskie wojsko',
    zadania: [
      dopasuj('Dopasuj osoby do funkcji.',
        ['Premier i Naczelny Wódz od 1939 r.', 'Prezydent RP na uchodźstwie od września 1939 r.',
          'Premier polskiego rządu na uchodźstwie po śmierci gen. Sikorskiego'],
        [['Władysław Raczkiewicz', 1], ['Władysław Sikorski', 0], ['Stanisław Mikołajczyk', 2]],
        'Raczkiewicz był prezydentem, Sikorski premierem i Naczelnym Wodzem, a po jego śmierci premierem został Mikołajczyk.'),
      zadanie('Gdzie działał rząd RP na uchodźstwie?',
        'Po internowaniu wcześniejszych władz w Rumunii odtworzono polskie władze we Francji. Po klęsce Francji w 1940 r. rząd przeniósł się do Londynu.',
        [wyborZadanie('', ['Najpierw w Rumunii, następnie w Lublinie.', 'Najpierw w Londynie, następnie w Angers.',
          'Najpierw we Francji, następnie w Londynie.'], [2])]),
      dopasuj('Dopasuj polskie formacje do miejsc lub walk.',
        ['Bitwa o Anglię', 'Obrona Tobruku', 'Walki o Narwik', 'Zdobycie Monte Cassino'],
        [['Samodzielna Brygada Strzelców Karpackich', 1], ['Dywizjon 303', 0], ['2. Korpus Polski gen. Andersa', 3],
          ['Samodzielna Brygada Strzelców Podhalańskich', 2]],
        'Strzelcy Karpaccy walczyli pod Tobrukiem, Dywizjon 303 w bitwie o Anglię, 2. Korpus Polski pod Monte Cassino, a Strzelcy Podhalańscy pod Narwikiem.'),
      zadanie('Co zmienił układ Sikorski–Majski?',
        'Układ podpisano 30 lipca 1941 r., po ataku Niemiec na ZSRS. Przywrócił stosunki dyplomatyczne i umożliwił uwolnienie polskich obywateli oraz tworzenie armii Andersa.',
        [rok('Rok podpisania układu', 1941),
          wyborZadanie('Zaznacz dwa skutki układu.', ['Władze RP przeniosły się do Lublina.', 'Przywrócono stosunki dyplomatyczne Polski z ZSRS.',
            'Utworzono Armię Krajową we Francji.', 'Można było tworzyć armię polską w ZSRS.'], [1, 3])]),
    ],
  },
  {
    temat: '3. Polskie Państwo Podziemne',
    zadania: [
      chronologia('Uporządkuj powstawanie organizacji konspiracyjnych. Wybierz 1 dla najwcześniejszej.',
        [['Armia Krajowa (AK)', 3], ['Służba Zwycięstwu Polski (SZP)', 1], ['Związek Walki Zbrojnej (ZWZ)', 2]],
        'We wrześniu 1939 r. powstała Służba Zwycięstwu Polski. Zastąpił ją ZWZ. W lutym 1942 r. ZWZ przekształcono w AK.'),
      zadanie('Jak działały cywilne struktury Polskiego Państwa Podziemnego? Zaznacz dwa przykłady.',
        'Delegatura Rządu RP na Kraj organizowała administrację cywilną podziemia, które podlegało władzom RP na uchodźstwie. Prowadzono tajne nauczanie i wydawano podziemną prasę. Działały też tajne sądy.',
        [wyborZadanie('', ['Prowadzenie tajnego nauczania', 'Organizowanie policji granatowej',
          'Wydawanie podziemnej prasy', 'Wydawanie okupacyjnej prasy na polecenie Niemców'], [0, 2])]),
      zadanie('Przeczytaj tekst i wskaż, jak okupant reagował na działania podziemia.',
        'Odwet na grupie Polaków za atak na kolej to przykład odpowiedzialności zbiorowej. Frank liczył, że terror osłabi poparcie dla podziemia.',
        [
          wyborZadanie('Co podziemie zrobiło w opisanym przypadku?', ['Przeprowadziło atak na pociąg.', 'Przejęło tajną radiostację.', 'Odbiło więźniów z aresztu.'], [0]),
          wyborZadanie('Co okupant chciał osiągnąć przez odwet?', ['Zapewnić rodzinom ofiar ochronę.', 'Zniechęcić ludność do wspierania ruchu oporu.',
            'Skierować uwagę Polaków na walkę z Armią Czerwoną.'], [1]),
          wpisz('Jak nazywa się zasada karania całej grupy za działania pojedynczych osób?', 'odpowiedzialność zbiorowa',
            'odpowiedzialność zbiorową', 'zasada odpowiedzialności zbiorowej', 'odpowiedzialności zbiorowej', 'zbiorowa odpowiedzialność'),
        ], ZRODLO_FRANK),
      dopasuj('Rozpoznaj akcje i działania podziemia.',
        ['Uwolnienie m.in. Jana Bytnara „Rudego”', 'Rozpoznanie tajnej broni i przekazanie informacji Brytyjczykom',
          'Wysadzenie torów wokół Warszawy', 'Atak na dowódcę SS i policji w dystrykcie warszawskim'],
        [['Akcja „Wieniec”', 2], ['Akcja pod Arsenałem', 0], ['Akcja „Kutschera”', 3], ['Wywiad dotyczący V-2', 1]],
        '„Wieniec” uderzył w transport kolejowy. Pod Arsenałem odbito „Rudego”. W 1944 r. zginął Franz Kutschera. Wywiad AK badał niemiecką broń V-2.'),
    ],
  },
  {
    temat: '4. Społeczeństwo pod okupacją',
    zadania: [
      chronologia('Uporządkuj kolejne etapy niemieckich prześladowań Żydów opisane w rozdziale.',
        [['Masowe deportacje z gett do obozów zagłady', 3], ['Nakaz noszenia oznaczeń, np. opaski z gwiazdą Dawida', 1],
          ['Zamykanie ludności żydowskiej w gettach', 2]],
        'Okupant wprowadzał oznaczenia i inne ograniczenia, potem izolował Żydów w gettach, a od 1942 r. masowo deportował ich do obozów zagłady.'),
      zadanie('Uzupełnij informacje o powstaniu w getcie warszawskim.',
        'Powstanie wybuchło 19 kwietnia 1943 r., gdy Niemcy przystąpili do ostatecznej likwidacji getta. Jedną z głównych sił oporu była Żydowska Organizacja Bojowa.',
        [rok('Rok wybuchu powstania w getcie', 1943),
          wyborZadanie('Którą organizacją dowodził Mordechaj Anielewicz?', ['Kierownictwem Dywersji', 'Radą Pomocy Żydom', 'Żydowską Organizacją Bojową'], [2])]),
      dopasuj('Dopasuj osoby lub organizację do działań podczas Zagłady.',
        ['Alarmował władze Wielkiej Brytanii i USA o losie Żydów', 'Rada, która organizowała pomoc dla ukrywających się Żydów',
          'Pomagała ratować dzieci z getta warszawskiego', 'Ukrywali Żydów w Markowej i zostali zamordowani przez Niemców'],
        [['Rodzina Ulmów', 3], ['Irena Sendlerowa', 2], ['Jan Karski', 0], ['„Żegota”', 1]],
        'Karski informował aliantów, Sendlerowa pomagała dzieciom, Ulmowie ukrywali Żydów w Markowej, a „Żegota” organizowała pomoc.'),
      zadanie('Rozpoznaj sprawców i datę kulminacji rzezi wołyńskiej.',
        'Ukraińska Powstańcza Armia i uczestnicząca w atakach część miejscowej ludności ukraińskiej mordowały polskich cywilów. Nasilenie ataków nastąpiło latem 1943 r., a w 1944 r. zbrodnie objęły także Galicję Wschodnią.',
        [
          wyborZadanie('Która formacja organizowała masowe ataki na polskich cywilów na Wołyniu?', ['Ukraińska Powstańcza Armia (UPA)',
            'Armia Ludowa (AL)', 'Bataliony Chłopskie (BCh)'], [0]),
          wyborZadanie('Kiedy miała miejsce tzw. krwawa niedziela?', ['11 lipca 1944 r.', '11 lipca 1943 r.', '19 kwietnia 1943 r.'], [1]),
        ]),
    ],
  },
  {
    temat: '5. Akcja „Burza” i powstanie warszawskie',
    zadania: [
      zadanie('Zaznacz dwa założenia planu „Burza”.',
        'AK miała uderzać na Niemców w miarę zbliżania się Armii Czerwonej. Wojskowi i cywilni przedstawiciele władz RP chcieli wystąpić na wyzwolonych ziemiach w roli gospodarza.',
        [wyborZadanie('', ['Rozbroić oddziały AK i podporządkować je PKWN.', 'Włączyć oddziały AK do walki z wycofującymi się Niemcami.',
          'Ujawnić legalne polskie władze cywilne przed Sowietami.', 'Zrezygnować z działań w miastach i wycofać się na Zachód.'], [1, 2])]),
      zadanie('Co wydarzyło się w ramach operacji „Ostra Brama”?',
        'W lipcu 1944 r. AK walczyła o Wilno. Po wspólnych walkach z Niemcami Sowieci aresztowali polskich oficerów i rozbroili oddziały. Podobnie potoczyły się wydarzenia we Lwowie.',
        [wyborZadanie('', ['W Warszawie polskie oddziały zdobyły lotniska.', 'Polscy komandosi zajęli niemieckie umocnienia we Włoszech.',
          'AK walczyła o Wilno, po czym Sowieci rozbroili jej oddziały.'], [2])]),
      zadanie('Podaj datę i godzinę wybuchu powstania warszawskiego.',
        'Godzina „W” to 17.00, 1 sierpnia 1944 r. Rozkaz rozpoczęcia walk wydał Komendant Główny AK, gen. Tadeusz Komorowski „Bór”.',
        [data('Data wybuchu (dzień, miesiąc i rok)', '1 sierpnia 1944', '1.08.1944', '01.08.1944', '1.8.1944', '1 VIII 1944', '01 VIII 1944',
          '1/08/1944', '01/08/1944', '1-08-1944', '1944-08-01'),
          wpisz('Godzina „W” (np. 12.00)', '17.00', '17', '17:00', '1700', '17:00:00', 'godz. 17', 'godz. 17.00', 'godz. 17:00', 'godzina 17', '17 godzina')]),
      zadanie('Dlaczego dowództwo AK zdecydowało się walczyć o Warszawę i jak zareagowały mocarstwa?',
        'AK chciała oswobodzić stolicę przed wkroczeniem Armii Czerwonej. Rozkaz przyspieszyły błędne doniesienia o sowieckich czołgach na Pradze. Powstańcy otrzymywali ograniczoną pomoc z lotniczych zrzutów. Początkowo Sowieci nie udostępnili lotnisk dla tych operacji.',
        [
          wyborZadanie('Jaki był cel polityczny powstania?', ['Szybko przekazać władzę w stolicy PKWN.', 'Ujawnić w Warszawie legalne władze RP przed wkroczeniem Sowietów.',
            'Zapewnić wojskom niemieckim odwrót z miasta.'], [1]),
          wyborZadanie('Co wpłynęło bezpośrednio na wybór momentu rozpoczęcia walk?', ['Ogłoszenie układu Sikorski–Majski.',
            'Wkroczenie polskiej armii z Włoch do Warszawy.', 'Doniesienie, że sowieckie czołgi są już na warszawskiej Pradze.'], [2]),
          wyborZadanie('Jakiej pomocy udzielono walczącej Warszawie?', ['Armia Czerwona natychmiast zajęła całą stolicę.',
            'Polscy i alianccy lotnicy dostarczali część pomocy w zrzutach.', 'Alianci wysłali do walki regularną brytyjską piechotę.'], [1]),
        ]),
    ],
  },
  {
    temat: '6. Sprawa polska pod koniec wojny',
    zadania: [
      zadanie('Rozpoznaj ośrodek władzy związany z manifestem z 22 lipca 1944 r.',
        'Manifest Polskiego Komitetu Wyzwolenia Narodowego ogłoszono 22 lipca 1944 r. Komitet uzależniony od ZSRS miał siedzibę w Lublinie i twierdził, że jest jedyną legalną władzą.',
        [wpisz('Skrót nazwy komitetu', 'PKWN', 'Polski Komitet Wyzwolenia Narodowego', 'P.K.W.N', 'Polskiego Komitetu Wyzwolenia Narodowego'),
          wyborZadanie('Gdzie działał ten ośrodek władzy?', ['W Londynie', 'W Lublinie', 'W Angers'], [1])]),
      zadanie('Co ustalono w sprawie polskich granic w Jałcie?',
        'Wschodnia granica miała się opierać na linii Curzona. Polska miała otrzymać nowe ziemie na północy i zachodzie. Po wojnie granicę zachodnią wytyczono na Odrze i Nysie Łużyckiej.',
        [wyborZadanie('Jakie ustalenia zapadły w Jałcie?', ['Polska miała zachować wszystkie granice z 1939 r.', 'Odrę wskazano jako podstawę granicy wschodniej Polski.',
          'Granicę wschodnią oparto na linii Curzona, a Polskę planowano powiększyć na północy i zachodzie.'], [2]),
          wyborZadanie('Które rzeki wyznaczały znaczną część powojennej granicy zachodniej Polski?', ['Odra i Nysa Łużycka', 'Bug i San', 'Wisła i Warta'], [0])]),
      zadanie('Co stało się z Armią Krajową i przywódcami podziemia w 1945 r.?',
        'Gen. Leopold Okulicki rozwiązał AK 19 stycznia 1945 r. Sowieci aresztowali przywódców Polskiego Państwa Podziemnego, których w czerwcu 1945 r. sądzono w Moskwie w procesie szesnastu.',
        [
          wyborZadanie('Kto wydał rozkaz rozwiązania AK?', ['Leopold Okulicki „Niedźwiadek”', 'Władysław Anders', 'Stefan Rowecki „Grot”'], [0]),
          wyborZadanie('Kogo sądzono w procesie szesnastu?', ['Niemieckich dowódców SS', 'Przywódców Polskiego Państwa Podziemnego',
            'Członków brytyjskiej misji lotniczej'], [1]),
        ]),
      zadanie('Rozpoznaj rząd powstały w czerwcu 1945 r. w wyniku ustaleń jałtańskich.',
        'Tymczasowemu Rządowi Jedności Narodowej przewodniczył Edward Osóbka-Morawski. Wicepremierem został m.in. Stanisław Mikołajczyk. Uznanie TRJN przez USA i Wielką Brytanię oznaczało cofnięcie uznania rządowi emigracyjnemu.',
        [wyborZadanie('Jaki to rząd?', ['Krajowa Rada Narodowa', 'Polski Komitet Wyzwolenia Narodowego', 'Tymczasowy Rząd Jedności Narodowej'], [2]),
          wyborZadanie('Kto został premierem?', ['Edward Osóbka-Morawski', 'Stanisław Mikołajczyk', 'Władysław Raczkiewicz'], [0])]),
    ],
  },
];

const WERSJA_B = [
  {
    temat: '1. Dwie okupacje',
    zadania: [
      dopasuj('Dopasuj działania niemieckiego okupanta do ich opisów.',
        ['Aresztowanie uczonych i wykładowców krakowskich uczelni w 1939 r.',
          'Mordowanie m.in. działaczy, nauczycieli i duchownych na początku okupacji',
          'Uderzenie w polskie elity w Generalnym Gubernatorstwie w 1940 r.',
          'Klasyfikowanie ludności według niemieckiej listy narodowościowej'],
        [['Akcja AB', 2], ['Volkslista', 3], ['Akcja „Tannenberg”', 1], ['Akcja Specjalna „Kraków”', 0]],
        'Akcja „Tannenberg”, akcja „Kraków” i akcja AB służyły niszczeniu polskich elit. Volkslista służyła germanizacji. Do wpisu na listę część ludności zmuszano.'),
      zadanie('Co różniło ziemie wcielone do III Rzeszy od Generalnego Gubernatorstwa?',
        'Na ziemiach wcielonych do Rzeszy likwidowano polskie szkolnictwo. W Generalnym Gubernatorstwie pozostawiono część szkół podstawowych i zawodowych pod kontrolą okupanta.',
        [
          wyborZadanie('Gdzie Niemcy zlikwidowali polskie szkolnictwo?', ['Na ziemiach wcielonych bezpośrednio do III Rzeszy',
            'W Generalnym Gubernatorstwie, łącznie ze szkolnictwem zawodowym', 'Wyłącznie we wschodniej Polsce pod okupacją sowiecką'], [0]),
          wyborZadanie('Kto zarządzał Generalnym Gubernatorstwem?', ['Ławrientij Beria', 'Heinz Guderian', 'Hans Frank'], [2]),
        ]),
      zadanie('Odpowiedz na pytania o deportacje sowieckie.',
        'Od lutego 1940 r. całe rodziny przewożono w głąb ZSRS, m.in. na Syberię i do Kazachstanu. Łagry były sowieckimi obozami pracy przymusowej.',
        [
          wyborZadanie('Dokąd władze sowieckie deportowały polskie rodziny?', ['Do zachodniej Francji', 'Na Syberię i do Kazachstanu', 'Do Generalnego Gubernatorstwa'], [1]),
          wyborZadanie('Czym był łagier?', ['Sowieckim obozem pracy przymusowej', 'Niemiecką listą narodowościową', 'Polską placówką wojskową na emigracji'], [0]),
        ]),
      zadanie('Przeczytaj wspomnienie o wysiedleniu i wskaż dwa wnioski.',
        'Niemcy wysiedlali Polaków z ziem wcielonych do Rzeszy m.in. do Generalnego Gubernatorstwa. Relacja pokazuje przymus, brak informacji i ciężkie warunki transportu.',
        [wyborZadanie('', ['Transport odbywał się w ciężkich warunkach, także dla dzieci.', 'Rodzinom zapewniono ciepło i wyżywienie.',
          'Wyjazd był dobrowolny i zorganizowany przez same rodziny.', 'Rodziny przewożono pod przymusem i nie wiedziały, dokąd jadą.'], [0, 3])], ZRODLO_BANASZEK),
      zadanie('Odczytaj wykres i oceń skutki strat.',
        'Wykres pokazuje, że największe straty spośród tych grup ponieśli inżynierowie i technicy (12 tys.). Utrata dużej liczby specjalistów utrudniała powojenną odbudowę.',
        [
          wyborZadanie('Która grupa na wykresie poniosła największe straty?', ['Naukowcy i nauczyciele', 'Lekarze i farmaceuci', 'Inżynierowie i technicy'], [2]),
          wyborZadanie('Który wniosek o powojennej Polsce jest uzasadniony?', ['Brakowało specjalistów potrzebnych do odbudowy państwa i gospodarki.',
            'Największe straty poniosła grupa literatów i dziennikarzy.', 'Straty inteligencji dotyczyły wyłącznie szkolnictwa.'], [0]),
        ], WYKRES_STRAT),
    ],
  },
  {
    temat: '2. Władze na uchodźstwie i polskie wojsko',
    zadania: [
      zadanie('Co się stało po ewakuacji polskich władz do Rumunii we wrześniu 1939 r.?',
        'Rumunia internowała członków polskich władz. Prezydent Ignacy Mościcki wyznaczył następcę. Pozwoliło to zachować ciągłość władz RP.',
        [wyborZadanie('', ['Rumunia przekazała od razu pełną władzę rządowi brytyjskiemu.',
          'Władze zostały internowane, a powołanie następcy prezydenta pozwoliło odtworzyć rząd za granicą.',
          'Rząd polski zakończył działalność, a jego obowiązki przejął PKWN.'], [1])]),
      zadanie('Przeczytaj tekst i odpowiedz na pytania o porozumienie z ZSRS.',
        'Zgodnie z układem na terytorium ZSRS powstała armia pod dowództwem Władysława Andersa. W 1942 r. ewakuowano ją przez Iran na Bliski Wschód. Do walki we Włoszech trafił później 2. Korpus Polski.',
        [
          wyborZadanie('Na jakie ustępstwo wojskowe zgodził się ZSRS?', ['Na utworzenie armii polskiej na swoim terytorium.',
            'Na przekazanie Armii Czerwonej pod komendę polską.', 'Na przeniesienie całej AK do Wielkiej Brytanii.'], [0]),
          wpisz('Nazwisko dowódcy tworzonej wtedy w ZSRS armii polskiej', 'Anders', 'Władysław Anders', 'gen. Władysław Anders', 'generał Władysław Anders', 'gen. Anders'),
          rok('Rok ewakuacji armii Andersa z ZSRS', 1942),
        ], ZRODLO_MAJSKI),
      dopasuj('Rozpoznaj polskie formacje walczące na frontach wojny.',
        ['Walki pod Arnhem', 'Bitwa pod Falaise', 'Chrzest bojowy pod Lenino', 'Polska Marynarka Wojenna'],
        [['ORP „Błyskawica”', 3], ['1. Dywizja Pancerna gen. Stanisława Maczka', 1],
          ['1. Samodzielna Brygada Spadochronowa gen. Stanisława Sosabowskiego', 0],
          ['1. Dywizja Piechoty im. Tadeusza Kościuszki', 2]],
        'Brygada Sosabowskiego walczyła pod Arnhem, dywizja Maczka pod Falaise, a dywizja utworzona pod dowództwem Zygmunta Berlinga pod Lenino. Polskie jednostki walczące u boku Armii Czerwonej uczestniczyły później w zdobywaniu Berlina. „Błyskawica” była niszczycielem.'),
      zadanie('Jaki był skutek ujawnienia grobów katyńskich w 1943 r.?',
        'Rząd RP poprosił o zbadanie sprawy Międzynarodowy Czerwony Krzyż. ZSRS obarczył Niemców winą za zbrodnię i zerwał stosunki dyplomatyczne z polskim rządem na uchodźstwie.',
        [wyborZadanie('', ['Zachodni alianci wystąpili z koalicji ze Stalinem.', 'Międzynarodowy Czerwony Krzyż przejął władzę na terenach zajętych przez ZSRS.',
          'ZSRS zerwał stosunki dyplomatyczne z rządem RP po jego prośbie o niezależne zbadanie zbrodni.'], [2])]),
    ],
  },
  {
    temat: '3. Polskie Państwo Podziemne',
    zadania: [
      zadanie('Rozpoznaj dowódcę jednego z pierwszych oddziałów partyzanckich.',
        'Major Henryk Dobrzański „Hubal” kontynuował walkę po kampanii wrześniowej m.in. na Kielecczyźnie. Niemcy stosowali brutalny odwet wobec ludności wspierającej oddział.',
        [wpisz('Pseudonim mjr. Henryka Dobrzańskiego', 'Hubal', '„Hubal”', 'Hubala')]),
      dopasuj('Dopasuj organizacje do ich opisów.',
        ['Formacja związana z ruchem ludowym, zaangażowana w obronę wsi',
          'Oddziały bojowe związane z konspiracyjną PPS, współpracujące z ZWZ i AK',
          'Formacja komunistyczna, którą w 1944 r. zastąpiła Armia Ludowa',
          'Formacja związana z obozem narodowym, częściowo scalona z AK'],
        [['Gwardia Ludowa WRN', 1], ['Narodowe Siły Zbrojne (NSZ)', 3],
          ['Gwardia Ludowa (GL)', 2], ['Bataliony Chłopskie (BCh)', 0]],
        'BCh wywodziły się z ruchu ludowego, NSZ z narodowego, a GL WRN była formacją PPS. Komunistyczna GL, później AL, pozostawała poza strukturami Polskiego Państwa Podziemnego.'),
      zadanie('Rozpoznaj działania konspiracji.',
        'Szare Szeregi to konspiracyjne harcerstwo. W ramach małego sabotażu młodzi harcerze malowali m.in. znak Polski Walczącej. Kedyw odpowiadał za dywersję i inne akcje bojowe AK.',
        [
          wyborZadanie('Które działanie to przykład małego sabotażu?', ['Regularna bitwa o most', 'Malowanie znaku Polski Walczącej na murach', 'Nalot samolotów na niemiecką fabrykę'], [1]),
          wyborZadanie('Za co odpowiadał Kedyw AK?', ['Za policję granatową', 'Za prowadzenie władz RP w Londynie', 'Za dywersję i organizowanie akcji bojowych'], [2]),
        ]),
      zadanie('Jak podziemie utrzymywało łączność z rządem RP w Londynie?',
        'Tajne radiostacje przekazywały wiadomości. Informacje dostarczali też kurierzy, m.in. Jan Karski i Jan Nowak-Jeziorański.',
        [wyborZadanie('', ['Za pomocą tajnych radiostacji i kurierów.', 'Za pośrednictwem wyłącznie niemieckiej poczty wojskowej.',
          'Przez działające oficjalnie polskie ambasady w okupowanym kraju.'], [0])]),
      zadanie('Rozpoznaj jedną z form tajnego nauczania.',
        'Tajne komplety były zajęciami szkolnymi organizowanymi w konspiracji, najczęściej w mieszkaniach prywatnych, by kontynuować naukę mimo zakazów okupanta.',
        [wpisz('Jak nazywano konspiracyjne lekcje odbywające się w małych grupach?', 'tajne komplety', 'tajnymi kompletami', 'komplety', 'tajne komplety szkolne')]),
    ],
  },
  {
    temat: '4. Społeczeństwo pod okupacją',
    zadania: [
      zadanie('Rozpoznaj przejawy okupacji i oporu w codziennym życiu Warszawy.',
        'Okupant dzielił ludność, m.in. wydzielając część pojazdów dla Niemców. Bojkot kin z niemiecką propagandą był formą cywilnego oporu.',
        [
          wyborZadanie('Który przykład świadczył o segregacji?', ['Organizowanie konspiracyjnych zajęć w mieszkaniach.',
            'Oddawanie niezależnych gazetek do czytania sąsiadom.', 'Wyznaczanie pojazdów komunikacji tylko dla Niemców.'], [2]),
          wyborZadanie('Które działanie było przykładem cywilnego oporu?', ['Bojkot seansów z niemiecką propagandą.',
            'Zamykanie Żydów w gettach.', 'Przejmowanie samochodów przez okupanta.'], [0]),
        ]),
      zadanie('Dlaczego Niemcy wysiedlali mieszkańców Zamojszczyzny?',
        'W ramach planów germanizacji i kolonizacji Niemcy usuwali mieszkańców Zamojszczyzny, by osadzić kolonistów niemieckich. Wysiedleniom próbowało się przeciwstawić polskie podziemie.',
        [wyborZadanie('', ['Aby przesiedlić do Polski żołnierzy armii Andersa.',
          'Aby zrobić miejsce dla niemieckich osadników.', 'Aby zorganizować ewakuację z terenów objętych akcją „Burza”.'], [1])]),
      zadanie('Kto przekazywał informacje o Zagładzie i czym było szmalcownictwo?',
        'Witold Pilecki przedostał się do Auschwitz, organizował tam konspirację i przekazywał informacje. Szmalcownicy wymuszali pieniądze lub wydawali ukrywających się Żydów.',
        [
          wyborZadanie('Kto zorganizował konspirację w Auschwitz i przygotowywał raporty o obozie?', ['Marek Edelman', 'Jan Nowak-Jeziorański', 'Witold Pilecki'], [2]),
          wyborZadanie('Które zachowanie było przykładem szmalcownictwa?', ['Szantażowanie ukrywających się Żydów dla pieniędzy.',
            'Wyrabianie fałszywych dokumentów dla ukrywających się.', 'Dostarczanie leków do getta przez członków „Żegoty”.'], [0]),
        ]),
      zadanie('Podaj cel powstańców w getcie warszawskim i skutki rzezi wołyńskiej.',
        'Bojownicy w getcie podjęli opór wobec planowanej likwidacji getta i Zagłady. Na Wołyniu i w Galicji Wschodniej ataki UPA przyniosły masowe ofiary wśród polskich cywilów i ich ucieczkę.',
        [
          wyborZadanie('Dlaczego bojownicy w getcie podjęli walkę w 1943 r.?', ['Chcieli włączyć getto do niemieckich struktur administracyjnych.',
            'Zbrojnie sprzeciwili się ostatecznej likwidacji getta i Zagładzie.', 'Chcieli uprzedzić utworzenie komunistycznego rządu w Lublinie.'], [1]),
          wyborZadanie('Jaki był skutek rzezi wołyńskiej?', ['Masowe ofiary i ucieczka polskiej ludności cywilnej.', 'Odzyskanie przez AK całej Galicji Wschodniej.',
            'Ewakuacja armii Andersa do Iranu.'], [0]),
        ]),
    ],
  },
  {
    temat: '5. Akcja „Burza” i powstanie warszawskie',
    zadania: [
      zadanie('Gdzie akcja „Burza” rozpoczęła się na początku 1944 r.?',
        'Pierwsze walki w ramach akcji „Burza” podjęto na Wołyniu, gdzie walczyła 27. Wołyńska Dywizja Piechoty AK. Później akcja objęła m.in. Wilno i Lwów.',
        [wyborZadanie('', ['W Poznaniu', 'W Lublinie', 'Na Wołyniu'], [2])]),
      zadanie('Odczytaj meldunek o walce w Warszawie.',
        'Powstańcy mieli zbyt mało broni i amunicji. Cywile wspierali walkę m.in. przez budowę barykad, organizację pomocy, poczty i łączności.',
        [
          wyborZadanie('Jaka trudność wynika z meldunku?', ['Niemcy nie dysponowali czołgami.', 'Powstańcom brakowało amunicji i ciężkiej broni.',
            'Warszawa miała więcej zaopatrzenia, niż mogła wykorzystać.'], [1]),
          wyborZadanie('Jak mieszkańcy mogli wesprzeć powstańców?', ['Pomagać budować barykady i przenosić meldunki.',
            'Dostarczać powstańcom ciężki sprzęt z niemieckich fabryk.', 'Uniemożliwiać działanie powstańczej poczty.'], [0]),
        ], ZRODLO_BOR),
      zadanie('Dopasuj nazwy do wydarzeń i działań w powstańczej Warszawie.',
        'Na Woli okupanci dokonali masowych mordów cywilów. Kanały służyły do łączności, przenoszenia sprzętu i ewakuacji. Poczta harcerska roznosiła przesyłki.',
        [
          wyborZadanie('Gdzie na początku sierpnia doszło do szczególnie masowych mordów ludności cywilnej?', ['Na Woli', 'Na Westerplatte', 'W Palmirach'], [0]),
          wyborZadanie('Do czego powstańcom przydawały się kanały?', ['Do przyjmowania zrzutów lotniczych', 'Do ukrywania samolotów', 'Do przechodzenia między odciętymi częściami miasta'], [2]),
        ]),
      zadanie('Uzupełnij informacje o zakończeniu powstania.',
        'Powstanie trwało 63 dni i zakończyło się podpisaniem kapitulacji 2 października 1944 r. Zginęło wielu cywilów, mieszkańców wypędzono, a Niemcy niszczyli miasto także po kapitulacji.',
        [wpisz('Ile dni trwało powstanie?', '63', '63 dni', 'sześćdziesiąt trzy'),
          data('Data podpisania kapitulacji (dzień, miesiąc i rok)', '2 października 1944', '2.10.1944', '02.10.1944', '2 X 1944', '02 X 1944',
            '2/10/1944', '02/10/1944', '2-10-1944', '1944-10-02'),
          wyborZadanie('Wybierz główny skutek powstania dla mieszkańców i miasta.', ['AK utrzymała stolicę pod władzą rządu RP.',
            'Ogromne straty cywilne, wypędzenie mieszkańców i zniszczenie znacznej części Warszawy.', 'Niemcy zgodzili się na odbudowę Warszawy jeszcze w 1944 r.'], [1])]),
    ],
  },
  {
    temat: '6. Sprawa polska pod koniec wojny',
    zadania: [
      zadanie('Rozpoznaj ośrodki komunistyczne działające przed końcem wojny.',
        'Bolesław Bierut przewodniczył Krajowej Radzie Narodowej. W ZSRS działał Związek Patriotów Polskich, z którym związana była m.in. Wanda Wasilewska.',
        [
          wyborZadanie('Któremu organowi przewodniczył Bolesław Bierut?', ['Delegaturze Rządu RP na Kraj', 'Krajowej Radzie Narodowej', 'Radzie Pomocy Żydom'], [1]),
          wyborZadanie('Która organizacja działała w ZSRS i była związana z Wandą Wasilewską?', ['Związek Patriotów Polskich (ZPP)',
            'Rada Jedności Narodowej (RJN)', 'Związek Walki Zbrojnej (ZWZ)'], [0]),
        ]),
      zadanie('Dlaczego dowództwo AK przygotowało organizację „NIE”?',
        'Organizacja „NIE” miała kontynuować działalność niepodległościową w razie podporządkowania ziem polskich ZSRS. Jej tworzeniem zajmował się m.in. gen. August Emil Fieldorf „Nil”.',
        [wyborZadanie('', ['Miała organizować wyłącznie zrzuty dla walczącej Warszawy.', 'Miała zastąpić polskie oddziały w bitwie o Anglię.',
          'Miała umożliwić dalszą działalność niepodległościową po zajęciu Polski przez Armię Czerwoną.'], [2])]),
      zadanie('Wskaż skład Wielkiej Trójki oraz ustalenie jałtańskie dotyczące wyborów w Polsce.',
        'W Teheranie i Jałcie spotkali się Józef Stalin, Winston Churchill i Franklin D. Roosevelt. W Jałcie zapowiedziano wolne wybory w Polsce, lecz bez zapewnienia międzynarodowej kontroli.',
        [
          wyborZadanie('Kto uczestniczył w obu konferencjach?', ['Stalin, Truman i Churchill', 'Roosevelt, de Gaulle i Raczkiewicz', 'Stalin, Churchill i Roosevelt'], [2]),
          wyborZadanie('Co zapowiedziano w sprawie powojennej Polski?', ['Przeprowadzenie wolnych wyborów.', 'Przekazanie władzy Delegaturze bez wyborów.',
            'Automatyczne przywrócenie całej przedwojennej administracji.'], [0]),
        ]),
      zadanie('Umieść konferencje w czasie i wskaż, w czyjej strefie wpływów znalazła się Polska.',
        'Konferencja w Teheranie odbyła się w 1943 r., a w Jałcie w 1945 r. Powojenna Polska znalazła się w sowieckiej strefie wpływów.',
        [rok('Rok konferencji w Teheranie', 1943), rok('Rok konferencji w Jałcie', 1945),
          wyborZadanie('W czyjej strefie wpływów znalazła się Polska po wojnie?', ['W strefie amerykańskiej', 'W strefie sowieckiej', 'W strefie brytyjskiej'], [1])]),
      zadanie('Przeczytaj postulaty podziemia i wskaż ich sens.',
        'Testament opublikowała Rada Jedności Narodowej, polityczna reprezentacja podziemia. Domagano się suwerenności, zakończenia represji i umożliwienia demokratycznym stronnictwom udziału w wyborach.',
        [
          wyborZadanie('Które działanie realizowałoby postulat zapisany w tekście?', ['Zachowanie sowieckiej policji politycznej w Polsce.',
            'Dopuszczenie różnych demokratycznych stronnictw do wyborów.', 'Zwiększenie zależności polskiego wojska od ZSRS.'], [1]),
          wyborZadanie('Jaki wspólny cel łączył te postulaty?', ['Utrzymanie niemieckiej okupacji.', 'Powrót do sojuszu z III Rzeszą.',
            'Odzyskanie swobody decydowania o własnym państwie.'], [2]),
        ], ZRODLO_TESTAMENT),
      zadanie('Co oznaczało międzynarodowe uznanie TRJN?',
        'Tymczasowy Rząd Jedności Narodowej powstał w czerwcu 1945 r. Uznanie go przez USA, Wielką Brytanię i inne państwa oznaczało cofnięcie uznania rządowi RP na uchodźstwie.',
        [wyborZadanie('', ['Uznanie TRJN przez zachodnich aliantów oznaczało, że przestali uznawać rząd RP na uchodźstwie.',
          'TRJN uznawał tylko ZSRS, a alianci zachodni nigdy tego nie zrobili.', 'Utworzenie TRJN przywróciło przedwojenne granice i zlikwidowało sowieckie wpływy.'], [0])]),
    ],
  },
];

const ZESTAW_DODATKOWY = [
  {
    temat: 'Kampania 1939 roku',
    zadania: [
      dopasuj('Dopasuj miejsca do opisów.',
        ['Amerykańska baza na Hawajach zaatakowana przez Japonię w 1941 r.',
          'Polska placówka wojskowa broniona w pierwszych dniach wojny w Gdańsku',
          'Miejsce bitwy zwanej „polskimi Termopilami”',
          'Rejon ostatniej dużej bitwy regularnych sił polskich w kampanii 1939 r.'],
        [['Kock', 3], ['Westerplatte', 1], ['Wizna', 2], ['Pearl Harbor', 0]],
        'Pod Kockiem walczyła Samodzielna Grupa Operacyjna „Polesie”. Westerplatte broniono w Gdańsku. Walki pod Wizną nazwano „polskimi Termopilami”, a Pearl Harbor leży na Hawajach.'),
      chronologia('Nadaj wydarzeniom z 1939 r. numery od najwcześniejszego do najpóźniejszego.',
        [['Kapitulacja Warszawy', 4], ['Atak Niemiec na Polskę', 2], ['Prowokacja gliwicka', 1],
          ['Wkroczenie wojsk ZSRS do Polski', 3]],
        'Prowokacja gliwicka miała miejsce 31 sierpnia. Wojska niemieckie zaatakowały Polskę 1 września, wojska ZSRS wkroczyły 17 września, a Warszawa skapitulowała 28 września 1939 r.'),
    ],
  },
  {
    temat: 'Francja, front wschodni i konferencje',
    zadania: [
      zadanie('Przeczytaj tekst o zawieszeniu broni we Francji.',
        'Francja podpisała rozejm z Niemcami 22 czerwca 1940 r. Później polskie władze i część polskich oddziałów przeniosły się do Wielkiej Brytanii.',
        [wyborZadanie('Kiedy podpisano ten rozejm?', ['1 września 1940 r.', '22 czerwca 1941 r.', '22 czerwca 1940 r.'], [2])],
        ZRODLO_FRANCJA),
      zadanie('Sprawdź daty i fakty o froncie wschodnim.',
        'Wojska niemieckie zaatakowały ZSRS 22 czerwca 1941 r. Warunki pogodowe utrudniały działania wojsk. Bitwa na łuku kurskim w 1943 r. należała do największych bitew pancernych II wojny światowej.',
        [
          wyborZadanie('Kiedy Niemcy napadły na ZSRS?', ['22 czerwca 1941 r.', '21 czerwca 1941 r.', '30 lipca 1941 r.'], [0]),
          wyborZadanie('Które zdanie jest prawdziwe?', ['Pogoda nie miała wpływu na warunki walk na froncie wschodnim.',
            'Na łuku kurskim w 1943 r. doszło do wielkiej bitwy pancernej.', 'Bitwę na łuku kurskim stoczono przed atakiem Niemiec na ZSRS.'], [1]),
        ]),
      zadanie('Które dwa zagadnienia obejmowały ustalenia Wielkiej Trójki?',
        'Alianci uzgadniali zasady okupacji pokonanych Niemiec i zmiany granic Polski. Konferencje Wielkiej Trójki nie podjęły decyzji o użyciu bomby atomowej przeciw Japonii.',
        [wyborZadanie('', ['Zasady okupacji Niemiec po zakończeniu walk', 'Decyzję o zrzuceniu bomby atomowej na Japonię',
          'Zmiany granic powojennej Polski', 'Przeniesienie rządu RP z Londynu do Francji'], [0, 2])]),
    ],
  },
  {
    temat: 'Pojęcia i wydarzenia z działu',
    zadania: [
      zadanie('Rozróżnij getto i obóz zagłady.',
        'Getto było wydzieloną dzielnicą, do której niemieccy okupanci przymusowo przesiedlali Żydów. Obóz zagłady służył masowemu, planowemu mordowaniu ludzi, przede wszystkim Żydów.',
        [
          wyborZadanie('Czym było getto?', ['Miejscem internowania polskiego rządu w Rumunii.',
            'Wydzieloną i odizolowaną dzielnicą, do której przymusowo przesiedlano Żydów.', 'Sowieckim obozem pracy poza granicami Polski.'], [1]),
          wyborZadanie('Jaki był podstawowy cel niemieckich obozów zagłady?', ['Masowe i planowe mordowanie ludzi.',
            'Przetrzymywanie wyłącznie żołnierzy wziętych do niewoli.', 'Prowadzenie tajnego nauczania dla ludności cywilnej.'], [0]),
        ]),
      chronologia('Uporządkuj wydarzenia związane z polskimi władzami i wojskiem.',
        [['Utworzenie armii Andersa w ZSRS', 3], ['Śmierć gen. Sikorskiego w katastrofie pod Gibraltarem', 4],
          ['Powstanie polskiego rządu na uchodźstwie', 1], ['Podpisanie układu Sikorski–Majski', 2]],
        'Rząd powstał w 1939 r. Układ z 30 lipca 1941 r. umożliwił zorganizowanie armii Andersa. Sikorski zginął 4 lipca 1943 r.'),
      zadanie('Odróżnij dwa powstania, do których doszło w Warszawie.',
        'Powstanie w getcie wybuchło w kwietniu 1943 r. Powstanie warszawskie, rozpoczęte przez AK, wybuchło 1 sierpnia 1944 r.',
        [
          wyborZadanie('Które powstanie było odpowiedzią na ostateczną likwidację getta?', ['Powstanie warszawskie w 1944 r.',
            'Powstanie w getcie warszawskim w 1943 r.', 'Operacja „Ostra Brama” w Wilnie.'], [1]),
          wyborZadanie('Które powstanie miało wyzwolić stolicę spod niemieckiej okupacji przed wkroczeniem Armii Czerwonej?',
            ['Powstanie w getcie warszawskim w 1943 r.', 'Powstanie w getcie białostockim.', 'Powstanie warszawskie w 1944 r.'], [2]),
        ]),
      zadanie('Połącz informację o AK z wydarzeniami z lat 1943–1945.',
        'Niemcy aresztowali gen. Roweckiego „Grota” w 1943 r. Dowództwo przejął gen. Komorowski „Bór”. Ostatni komendant AK, gen. Okulicki, rozwiązał organizację w styczniu 1945 r.',
        [
          wyborZadanie('Kto objął dowództwo AK po aresztowaniu Stefana Roweckiego „Grota”?', ['Tadeusz Komorowski „Bór”', 'Henryk Dobrzański „Hubal”', 'Zygmunt Berling'], [0]),
          rok('Rok rozwiązania AK', 1945),
        ]),
    ],
  },
];

const WERSJE = {
  a: { nazwa: 'Wersja A', instrukcja: 'Zaznacz lub wpisz odpowiedzi. Jeśli pytanie wymaga kilku wyborów, podano ich liczbę.', sekcje: WERSJA_A },
  b: { nazwa: 'Wersja B', instrukcja: 'Zaznacz lub wpisz odpowiedzi. W zadaniach z wykresem i tekstem skorzystaj z podanych materiałów.', sekcje: WERSJA_B },
  c: { nazwa: 'Zestaw dodatkowy', instrukcja: 'W zadaniach z kolejnością wybierz 1 dla najwcześniejszego wydarzenia.', sekcje: ZESTAW_DODATKOWY },
};

const CSS = `
#seria { text-align: right; }
.pasek .powrot { display: inline-flex; align-items: center; min-height: 44px; color: #533b2d; }
.kartka h1 { margin: 0 0 4px; color: #3e2f1c; font: 700 clamp(24px, 5vw, 34px)/1.2 'Segoe UI', Arial, sans-serif; }
.kartka h2 { margin: 30px 0 18px; padding: 0 0 6px; border-bottom: 1px solid #c4b5a9; color: #3e2f1c; font: 700 21px/1.25 'Segoe UI', Arial, sans-serif; }
.kartka .nag { margin: 0 0 8px; font-size: inherit; }
.kartka .nag .pk { flex: 0 0 auto; }
.kartka .zad { margin-bottom: 24px; }
.kartka .zad:focus { outline: 2px solid #1565c0; outline-offset: 4px; }
.kartka .pytanie { border: 0; min-width: 0; margin: 12px 0 0; }
.kartka .pytanie legend { padding: 0; }
.kartka label.podpunkt { display: block; }
.kartka .podpunkt { font-weight: 600; }
.kartka .opc { padding: 4px 6px; gap: 6px; }
.kartka .opc .l { min-width: 21px; }
.kartka .opc .t { border-radius: 8px; padding: 4px 7px; }
.kartka .opc.ok .t { background: #e8f5e9; }
.kartka .ocena-opcji { font-weight: 700; }
.kartka .ok .ocena-opcji, .kartka .brak .ocena-opcji { color: #1b5e20; }
.kartka .blad .ocena-opcji { color: #b71c1c; }
.kartka .skrot { display: flex; flex-wrap: wrap; gap: 6px; }
.kartka .skrot .opc { min-width: 44px; justify-content: center; }
.kartka .skrot .t { min-width: 34px; text-align: center; font-weight: 700; }
.kartka .odpowiedz-tekstowa { display: block; margin-top: 12px; }
.kartka .odpowiedz-tekstowa .linia { width: 100%; min-height: 44px; margin-top: 4px; font-family: 'Segoe UI', Arial, sans-serif; }
.kartka .material { margin: 12px 0 16px; padding: 12px; background: #f5f2ed; border-radius: 10px; }
.kartka .material figcaption { color: #4e392b; font: 600 15px/1.4 'Segoe UI', Arial, sans-serif; }
.kartka .mapa svg { display: block; width: 100%; max-width: 490px; height: auto; margin: 0 auto; }
.kartka .tekst-zrodlowy blockquote { margin: 0 0 8px; }
.kartka .bank { padding-left: 38px; }
.kartka .bank li + li { margin-top: 4px; }
.kartka .wykres { margin-top: 10px; list-style: none; font: 16px/1.35 'Segoe UI', Arial, sans-serif; }
.kartka .wykres li { display: grid; grid-template-columns: 1fr auto; gap: 3px 10px; margin-bottom: 8px; }
.kartka .tor { height: 7px; grid-column: 1 / -1; }
.kartka .tor > span { display: block; height: 100%; border-radius: 4px; background: #456e91; }
@media (max-width: 420px) {
  .kartka .nag { gap: 5px 8px; flex-wrap: wrap; }
  .kartka .nag .tr { flex-basis: 75%; }
  .pasek { align-items: start; }
  .pasek .powrot { margin-right: auto; }
  .pasek .seria { font-size: 14px; }
}
`;

function poleWyboru(pole, id, numer) {
  const opcje = pole.opcje.map((tekst, i) => {
    const litera = pole.skrot ? '' : `<span class="l">${String.fromCharCode(65 + i)}.</span>`;
    return `<div class="opc" role="button" tabindex="0" aria-pressed="false" data-i="${i}">${litera}<span class="t">${tekst}<span class="ocena-opcji"></span></span></div>`;
  }).join('');
  return `
    <fieldset class="pytanie">
      ${pole.pytanie ? `<legend class="podpunkt">${pole.pytanie}</legend>` : ''}
      <div class="grupa${pole.skrot ? ' skrot' : ''}" data-k="${id}" ${pole.klucz.length > 1 ? 'data-wiele' : ''}
           ${pole.pytanie ? '' : `role="group" aria-labelledby="polecenie-${numer}"`}>${opcje}</div>
    </fieldset>`;
}

function poleTekstowe(pole, id) {
  return `
    <div class="odpowiedz-tekstowa">
      <label class="podpunkt" for="${id}">${pole.pytanie}</label>
      <input id="${id}" class="linia" type="text" data-k="${id}" maxlength="80" ${pole.liczba ? 'inputmode="numeric"' : ''}>
    </div>`;
}

export function przygotujKartke(wersja, { jedno, wybor }) {
  const { nazwa, instrukcja, sekcje } = WERSJE[wersja];
  const tytul = `Historia - przekrój działu · ${nazwa}`;
  const pola = {};
  const zadania = [];
  let numer = 0;

  const tresc = sekcje.map(({ temat, zadania: tematyczne }) => `
    <section><h2>${temat}</h2>
      ${tematyczne.map(({ polecenie, wyjasnienie, pola: odpowiedzi, zrodlo }) => {
        numer++;
        const grupy = odpowiedzi.map((_, i) => [`z${numer}p${i + 1}`]);
        zadania.push({ z: String(numer), grupy });
        const miejsca = odpowiedzi.map((pole, i) => {
          const [id] = grupy[i];
          if (pole.opcje) {
            pola[id] = { f: wybor(pole.klucz), ok: pole.klucz };
            return poleWyboru(pole, id, numer);
          }
          pola[id] = { f: jedno(pole.warianty), pokaz: pole.pokaz };
          return poleTekstowe(pole, id);
        }).join('');

        return `
          <article class="zad">
            <h3 class="nag">
              <span class="tr" id="polecenie-${numer}">${numer}. ${polecenie}</span>
              <span class="pk" data-z="${numer}">(${grupy.length} p.)</span>
            </h3>
            ${zrodlo}${miejsca}
            <p class="wyj" data-wyj="${numer}" style="display:none">${wyjasnienie}</p>
          </article>`;
      }).join('')}
    </section>`).join('');

  return {
    tytul,
    css: CSS,
    powrot: { href: '../Historia/przekroj_dzialu.html', nazwa: 'Wybór kartki' },
    tresc: `<h1>${nazwa}</h1><p>Polacy podczas II wojny światowej</p>${tresc}`,
    karta: { tytul, instrukcja, przedmiot: 'Historia', pamiec: `historia_przekroj_${wersja}_v1`, skoczDoBledu: true, pola, zadania },
  };
}
