const scheduleData = {
  Thursday: {
    dayStart: "18:00",
    stages: [
      {
        name: "BLUE",
        color: "#0ADDF0",
        events: [
          { name: "Vertile", start: "18:00", end: "19:00" },
          { name: "Wildstylez", start: "19:00", end: "20:00" },
          { name: "Sub Zero Project", start: "20:00", end: "21:00" },
          { name: "Warface & Rooler", start: "21:00", end: "22:00" },
          { name: "TNT", start: "22:00", end: "22:45" },
        ],
      },
      {
        name: "BLACK",
        color: "#808080",
        events: [
          { name: "Angerfist", start: "18:00", end: "19:00" },
          { name: "Endymion & The Viper", start: "19:00", end: "20:00" },
          { name: "Hysta", start: "20:00", end: "21:00" },
          { name: "N-Vitral", start: "21:00", end: "22:00" },
          { name: "Dimitri K & MC Robs", start: "22:00", end: "23:00" },
        ],
      },
      {
        name: "INDIGO",
        color: "#3641D7",
        events: [
          { name: "Vexxed", start: "18:00", end: "18:45" },
          { name: "Adaro & Unresolved", start: "18:45", end: "19:30" },
          { name: "Rejecta & Deluzion", start: "19:30", end: "20:15" },
          { name: "The Saints", start: "20:15", end: "21:15" },
          { name: "Coldax", start: "21:15", end: "22:00" },
          { name: "Lunakorpz & Amigo", start: "22:00", end: "22:45" },
        ],
      },
      {
        name: "BROWN - SILENT",
        color: "#8B4D10",
        events: [
          { name: "Ricardo Moreno", start: "18:00", end: "19:00" },
          { name: "Bass Chaserz & Hans Glock", start: "19:00", end: "20:00" },
          { name: "Noiseflow", start: "20:00", end: "21:00" },
          { name: "Mr. Bassmeister", start: "21:00", end: "22:00" },
          { name: "Opgekonkerd", start: "22:00", end: "23:00" },
        ],
      },
      {
        name: "MAGENTA - SILENT",
        color: "#FF008B",
        events: [
          { name: "Zelecter", start: "18:00", end: "19:00" },
          { name: "EMS", start: "19:00", end: "20:00" },
          { name: "Mickyg & Twstd", start: "20:00", end: "21:00" },
          { name: "Ephoric", start: "21:00", end: "22:15" },
          { name: "Act of Rage & Wasted Penguinz", start: "22:15", end: "23:15" },
          { name: "Invector & Demi Kanon", start: "23:15", end: "00:30" },
          { name: "Psyko Punkz", start: "00:30", end: "02:00" },
        ],
      },
    ],
  },
  Friday: {
    dayStart: "11:00",
    stages: [
      {
        name: "RED",
        color: "#FF0000",
        events: [
          { name: "The Opening Ceremony with DR Peacock", start: "13:00", end: "14:00" },
          { name: "Galactixx", start: "14:00", end: "15:00" },
          { name: "Atmozfears & Adrenalize", start: "15:00", end: "16:00" },
          { name: "D-Sturb & Aversion", start: "16:00", end: "16:45" },
          { name: "Dual Damage", start: "16:45", end: "17:15" },
          { name: "Coone", start: "17:15", end: "18:00" },
          { name: "Red Race Winner", start: "18:00", end: "18:30" },
          { name: "Sound Rush", start: "18:30", end: "19:15" },
          { name: "Zatox", start: "19:15", end: "20:00" },
          { name: "Brennen Heart", start: "20:00", end: "20:45" },
          { name: "Outsiders", start: "20:45", end: "21:30" },
          { name: "B-Front", start: "21:30", end: "22:20" },
          { name: "THE SPOTLIGHT D-BLOCK & S-TE-FAN", start: "22:30", end: "23:00" }
        ]
      },
      {
        name: "BLUE",
        color: "#0ADDF0",
        events: [
          { name: "Radianze & Sub Sonik", start: "11:00", end: "12:30" },
          { name: "Jason Payne Presents Dark Energy", start: "12:30", end: "13:00" },
          { name: "Wolv", start: "13:00", end: "13:30" },
          { name: "Crypsis pres. My i'll style", start: "13:30", end: "14:15" },
          { name: "Cryex", start: "14:15", end: "15:00" },
          { name: "Act Of Rage", start: "15:00", end: "16:00" },
          { name: "Rooler", start: "16:00", end: "17:00" },
          { name: "Rejecta", start: "17:00", end: "18:00" },
          { name: "E-Force", start: "18:00", end: "18:45" },
          { name: "Warface", start: "18:45", end: "19:45" },
          { name: "Unresolved", start: "19:45", end: "20:45" },
          { name: "Multilator", start: "20:45", end: "21:30" },
          { name: "Cybergore: Nightmare Engine", start: "21:30", end: "22:00" },
          { name: "END OF LINE: BLOODLUST, D-Sturb, Warface", start: "23:30", end: "01:00" }

        ],
      },
      {
        name: "BLACK",
        color: "#808080",
        events: [
          { name: "Karun", start: "11:00", end: "12:30" },
          { name: "Hardcore Confessions with Audiofreq", start: "12:30", end: "13:30" },
          { name: "Never Surrender", start: "13:30", end: "14:30" },
          { name: "Promo", start: "14:30", end: "15:45" },
          { name: "Restrained: Rulebreaking Rampage LIVE", start: "15:45", end: "16:30" },
          { name: "Dither is G.A.B.B.E.R", start: "16:30", end: "17:00" },
          { name: "Nosferatu & Tha Playah - Combined Forces", start: "17:00", end: "18:00" },
          { name: "Spitnoise", start: "18:00", end: "19:00" },
          { name: "Lunakorpz Live", start: "19:00", end: "19:30" },
          { name: "Deadly Guns", start: "19:30", end: "20:30" },
          { name: "Lil Texas", start: "20:30", end: "21:30" },
          { name: "Major Conspiracy", start: "21:30", end: "22:30" },
          { name: "THE SPOTLIGHT PARTYRAISER", start: "22:30", end: "23:00" }
        ],
      },
      {
        name: "UV",
        color: "#D492FF",
        events: [
          { name: "Sephyx", start: "11:00", end: "12:00" },
          { name: "Demi Kanon", start: "12:00", end: "13:00" },
          { name: "Refuzion", start: "13:00", end: "14:00" },
          { name: "Wasted Penguinz", start: "14:00", end: "15:00" },
          { name: "Bass Modulators", start: "15:00", end: "16:00" },
          { name: "Mandy", start: "16:00", end: "17:00" },
          { name: "Melo-3 By Ecstatic, Jay Reeve & Solstice", start: "17:00", end: "17:45" },
          { name: "Bioweapon", start: "17:45", end: "18:15" },
          { name: "Devin Wild", start: "18:15", end: "19:00" },
          { name: "Da Tweekaz", start: "19:00", end: "19:45" },
          { name: "Da Tweekaz & Darren Styles", start: "19:45", end: "20:30" },
          { name: "EZG Live", start: "20:30", end: "21:00" },
          { name: "Doris Presents The Final Elixir", start: "21:00", end: "21:30" },
          { name: "Gezeelige Uptempo Presents The Greatest Shitshow", start: "21:30", end: "22:15" }
        ],
      },
      {
        name: "MAGENTA",
        color: "#FF008A",
        events: [
          { name: "2Faced", start: "11:00", end: "12:30" },
          { name: "Alpha Twins", start: "12:30", end: "14:00" },
          { name: "Degos & Re-done", start: "14:00", end: "15:00" },
          { name: "Deetox", start: "15:00", end: "16:00" },
          { name: "Bass Chaserz", start: "16:00", end: "17:00" },
          { name: "Crypsis & Chain Reaction pres. Unlike Others", start: "17:00", end: "18:00" },
          { name: "Digital Punk", start: "18:00", end: "19:00" },
          { name: "Frequencerz", start: "19:00", end: "20:00" },
          { name: "Titan", start: "20:00", end: "20:45" },
          { name: "Dj Thera Pres. 25 years of Heartstyle", start: "20:45", end: "21:30" },
          { name: "Spoontech Classics", start: "21:30", end: "22:00" },
          { name: "CEM", start: "23:30", end: "0:15" },
          { name: "Bass-D", start: "0:15", end: "1:00" }

        ],
      },
      {
        name: "INDIGO",
        color: "#3842DA",
        events: [
          { name: "Viva La Fist", start: "11:00", end: "12:00" },
          { name: "PL4Y", start: "12:00", end: "13:00" },
          { name: "Required LIVE", start: "13:00", end: "13:30" },
          { name: "Udex", start: "13:30", end: "14:15" },
          { name: "Revolve & Cold Confusion", start: "14:15", end: "15:00" },
          { name: "Malice & Kenai", start: "15:00", end: "15:45" },
          { name: "Sanctuary", start: "15:45", end: "16:30" },
          { name: "Amduscias & Captivator", start: "16:30", end: "17:15" },
          { name: "Invector", start: "17:15", end: "18:00" },
          { name: "Dark Entities", start: "18:00", end: "19:00" },
          { name: "Element", start: "19:00", end: "20:00" },
          { name: "Infliction", start: "20:00", end: "20:45" },
          { name: "Sparkz", start: "20:45", end: "21:15" },
          { name: "Mortis & Spitfire [Album Showcase]", start: "21:15", end: "22:15" },
          { name: "Faceless", start: "22:15", end: "23:00" }
        ],
      },
      {
        name: "YELLOW",
        color: "#F1E300",
        events: [
          { name: "Revellers", start: "11:00", end: "12:00" },
          { name: "Aradia", start: "12:00", end: "12:45" },
          { name: "STV", start: "12:45", end: "13:45" },
          { name: "Roosterz", start: "13:45", end: "14:45" },
          { name: "Amigo", start: "14:45", end: "15:30" },
          { name: "Complex", start: "15:30", end: "16:30" },
          { name: "Irradiate", start: "16:30", end: "17:00" },
          { name: "Unproven", start: "17:00", end: "17:45" },
          { name: "Lekkerfaces & Rosbeek", start: "17:45", end: "18:30" },
          { name: "Dynamic Noise & Tukkertempo", start: "18:30", end: "19:15" },
          { name: "Aalst & Screecher pres/ Dragonized LIVE", start: "19:15", end: "19:45" },
          { name: "F.Noize & Mind Compressor", start: "19:45", end: "20:30" },
          { name: "Soulblast (Album showcase)", start: "20:30", end: "21:15" },
          { name: "Ditzkickz", start: "21:15", end: "22:00" }
        ],
      },
      {
        name: "GOLD",
        color: "#BB9551",
        events: [
          { name: "Zearø", start: "12:00", end: "13:00" },
          { name: "Gizmo", start: "13:00", end: "14:00" },
          { name: "DJ Ruffian", start: "14:00", end: "15:00" },
          { name: "Rob Gee", start: "15:00", end: "16:00" },
          { name: "Charly Lownoise", start: "16:00", end: "17:00" },
          { name: "The Viper", start: "17:00", end: "18:00" },
          { name: "Tommyknocker", start: "18:00", end: "19:00" },
          { name: "Painbringer", start: "19:00", end: "20:00" },
          { name: "Day-Mar 20 Years", start: "20:00", end: "21:00" },
          { name: "System Overload: Back To The Roots", start: "21:00", end: "22:00" }
        ],
      },
      {
        name: "ORANGE",
        color: "#FF6500",
        events: [
          { name: "Cro & Steenwolk", start: "12:00", end: "13:00" },
          { name: "Stoik", start: "13:00", end: "14:00" },
          { name: "Dj Thera Tranceparency set", start: "14:00", end: "15:00" },
          { name: "Geck-o Get On The Train", start: "15:00", end: "16:30" },
          { name: "Koarse pres. cut sphere", start: "16:30", end: "18:00" },
          { name: "Anderex & Desudo - Orange Heart", start: "18:00", end: "19:30" },
          { name: "Scot Project", start: "19:30", end: "21:00" },
          { name: "A*S*Y*S", start: "21:00", end: "22:15" }
        ],
      },
      {
        name: "PINK",
        color: "#EE81A0",
        events: [
          { name: "Themen", start: "11:00", end: "12:00" },
          { name: "Yussi", start: "12:00", end: "13:00" },
          { name: "Atmos", start: "13:00", end: "14:15" },
          { name: "Wes s & $avvy", start: "14:15", end: "15:45" },
          { name: "Arcando", start: "15:45", end: "17:00" },
          { name: "T & Sugah", start: "17:00", end: "18:30" },
          { name: "Pythius", start: "18:30", end: "20:00" },
          { name: "Murdock", start: "20:00", end: "21:00" },
          { name: "Used", start: "21:00", end: "22:00" }
        ],
      },
      {
        name: "STAMPKROEG",
        color: "#B6D7A8",
        events: [
          { name: "Fiesto", start: "12:00", end: "13:30" },
          { name: "Atjoow Show", start: "13:30", end: "15:30" },
          { name: "Zanger Bas (LIVE)", start: "15:30", end: "16:00" },
          { name: "FeestDJRuud Het Feestuurtje", start: "16:00", end: "17:00" },
          { name: "Galactixx classics set", start: "17:00", end: "17:30" },
          { name: "John Tana (LIVE)", start: "17:30", end: "18:00" },
          { name: "Gullie (LIVE)", start: "18:00", end: "18:30" },
          { name: "STYN", start: "18:30", end: "19:30" },
          { name: "Frok&Roll + Sdonnie", start: "19:30", end: "20:30" },
          { name: "FeeestDJRuthless", start: "20:30", end: "22:00" }
        ],
      },
    ],
  },
  Saturday: {
    dayStart: "11:00",
    stages: [
      {
        name: "RED",
        color: "#FF0000",
        events: [
          { name: "The Warming Up with Jones", start: "11:00", end: "12:00" },
          { name: "Warrior Workout", start: "12:00", end: "12:30" },
          { name: "Primeshock", start: "12:30", end: "13:15" },
          { name: "Phuture Noize & Devin WIld", start: "13:15", end: "14:00" },
          { name: "Dj Isaac", start: "14:00", end: "15:00" },
          { name: "Vertile", start: "15:00", end: "16:00" },
          { name: "Power Hour", start: "16:00", end: "17:00" },
          { name: "Daybreak session with Geck-o", start: "17:00", end: "17:30" },
          { name: "Sickmode", start: "17:30", end: "18:15" },
          { name: "Adjuzt pres. LVLDUP - ENDGAME", start: "18:15", end: "18:45" },
          { name: "Paul Elstak", start: "18:45", end: "19:30" },
          { name: "The Purge Presents HYTRIP", start: "19:30", end: "20:15" },
          { name: "Ran-D", start: "20:15", end: "21:00" },
          { name: "Sub Zero Project & Hard Driver", start: "21:00", end: "21:45" },
          { name: "Rebelion", start: "21:45", end: "22:30" },
          { name: "THE ENDSHOW", start: "22:30", end: "23:00" }
        ]
      },
      {
        name: "BLUE",
        color: "#0ADBEF",
        events: [
          { name: "Nightcraft", start: "11:00", end: "12:00" },
          { name: "Deetox", start: "12:00", end: "13:00" },
          { name: "Imperatorz", start: "13:00", end: "14:00" },
          { name: "Bloodlust", start: "14:00", end: "15:00" },
          { name: "Kronos pres: The Final Kryptonite", start: "15:00", end: "15:30" },
          { name: "So Juice & Anderex * Deezl", start: "15:30", end: "16:15" },
          { name: "Bmberjck & Sparkz - Legacy of sound LIVE", start: "16:15", end: "16:45" },
          { name: "Chapter Vasto", start: "16:45", end: "17:15" },
          { name: "Killshot & Toza & Vexxed", start: "17:15", end: "18:15" },
          { name: "The Straikerz", start: "18:15", end: "19:00" },
          { name: "Fraw", start: "19:00", end: "19:45" },
          { name: "Mish", start: "19:45", end: "20:30" },
          { name: "Omnya", start: "20:30", end: "21:15" },
          { name: "Riot Shift", start: "21:15", end: "22:00" },
          { name: "AR Gang Krowdexx Levenkhan Malice Mish Riot Shift Rooler Sickmode", start: "23:30", end: "00:45" }
        ]
      },
      {
        name: "BLACK",
        color: "#808080",
        events: [
          { name: "Gridkiller", start: "11:30", end: "12:30" },
          { name: "Noiseflow presents: WE ARE KRACH", start: "12:30", end: "13:00" },
          { name: "Bulletproof", start: "13:00", end: "14:00" },
          { name: "Korsakoff", start: "14:00", end: "15:00" },
          { name: "XRTN pres. EXERTION", start: "15:00", end: "16:00" },
          { name: "Namara & Yoshiko", start: "17:00", end: "18:30" },
          { name: "Evil Activities", start: "18:30", end: "19:30" },
          { name: "Juliex", start: "19:30", end: "20:15" },
          { name: "Barber", start: "20:15", end: "21:00" },
          { name: "Noxiouz", start: "21:00", end: "22:00" },
          { name: "Triple6 LIVE: DRS & MBK & EQUAL2", start: "22:00", end: "23:00" }
        ]
      },
      {
        name: "UV",
        color: "#D492FF",
        events: [
          { name: "Solstice", start: "12:00", end: "13:00" },
          { name: "Toneshifterz", start: "13:00", end: "14:00" },
          { name: "Stormerz", start: "14:00", end: "15:00" },
          { name: "The Pitcher - 25 years", start: "15:00", end: "15:45" },
          { name: "Audiotricz", start: "17:00", end: "18:00" },
          { name: "Jay Reeve: Pursuit Of A Dream [Album Showcase]", start: "18:00", end: "18:45" },
          { name: "Keltek", start: "18:45", end: "19:30" },
          { name: "Ecstatic presents 'The essense'", start: "19:30", end: "20:15" },
          { name: "Code Black", start: "20:15", end: "21:00" },
          { name: "Frontliner", start: "21:00", end: "21:45" },
          { name: "Noisecontrollers pres. 'Harmony'", start: "21:45", end: "22:30" }
        ]
      },
      {
        name: "MAGENTA",
        color: "#FE008B",
        events: [
          { name: "Sunny D", start: "11:00", end: "12:30" },
          { name: "Pat B", start: "12:30", end: "14:00" },
          { name: "Zany", start: "14:00", end: "15:00" },
          { name: "DJ Ghost", start: "15:00", end: "16:00" },
          { name: "DJ Pila", start: "16:00", end: "17:00" },
          { name: "Ruthless *Freestyle classics*", start: "17:00", end: "18:00" },
          { name: "Pavo", start: "18:00", end: "19:00" },
          { name: "Deepack 35 Year Special", start: "19:00", end: "19:45" },
          { name: "Tatanka", start: "19:45", end: "20:45" },
          { name: "Luna", start: "20:45", end: "21:30" },
          { name: "Donkey Rollers", start: "21:30", end: "22:00" },
          { name: "Bassbrain", start: "23:00", end: "0:00" },
          { name: "Altijd Larstig & Rob GasD'rOp", start: "0:00", end: "0:30" },
          { name: "Bier Fence", start: "0:30", end: "1:00" }
        ]
      },
      {
        name: "GREEN",
        color: "#00FF00",
        events: [
          { name: "Luna Fields", start: "11:00", end: "12:00" },
          { name: "GD_Connect", start: "12:00", end: "13:00" },
          { name: "Vyral", start: "13:00", end: "14:00" },
          { name: "STLTH", start: "14:00", end: "15:00" },
          { name: "Catalyst", start: "15:00", end: "16:00" },
          { name: "Eczodia", start: "16:00", end: "17:00" },
          { name: "The Purge Hybrid", start: "17:00", end: "18:00" },
          { name: "Manji", start: "18:00", end: "19:00" },
          { name: "Luna", start: "19:00", end: "20:00" },
          { name: "Dikke Baap", start: "20:00", end: "21:00" },
          { name: "Spoontechno", start: "21:00", end: "22:00" }
        ]
      },
      {
        name: "YELLOW",
        color: "#F1E300",
        events: [
          { name: "Mat Weasel Busters", start: "11:00", end: "12:00" },
          { name: "D'ort", start: "12:00", end: "12:45" },
          { name: "Dr Donk", start: "12:45", end: "13:30" },
          { name: "Guizcore", start: "13:30", end: "14:15" },
          { name: "Unlocked", start: "14:15", end: "15:00" },
          { name: "S-Kill", start: "15:00", end: "15:45" },
          { name: "Satirized", start: "15:45", end: "16:30" },
          { name: "Spiady", start: "16:30", end: "17:15" },
          { name: "Manifest Destiny", start: "17:15", end: "18:00" },
          { name: "Cryogenic & Kili", start: "18:00", end: "19:00" },
          { name: "The Dope Doctor", start: "19:00", end: "19:45" },
          { name: "Trespassed", start: "19:45", end: "20:30" },
          { name: "Pinotello", start: "20:30", end: "21:15" },
          { name: "Chaotic Hostility & DR. Z", start: "21:15", end: "22:00" }
        ]
      },
      {
        name: "GOLD",
        color: "#BB9551",
        events: [
          { name: "Artcore with Ruffneck", start: "11:00", end: "12:00" },
          { name: "Elitepauper DJ Team", start: "12:00", end: "13:00" },
          { name: "Dano", start: "13:00", end: "14:00" },
          { name: "Critical Mass", start: "14:00", end: "15:00" },
          { name: "The Raver", start: "15:00", end: "16:15" },
          { name: "Rob & MC Joe", start: "16:15", end: "17:15" },
          { name: "Mental Theo", start: "17:15", end: "18:00" },
          { name: "The Darkraver & MD&A", start: "18:00", end: "19:00" },
          { name: "Endymion", start: "19:00", end: "20:00" },
          { name: "Bass-D", start: "20:00", end: "21:00" },
          { name: "Partyraiser", start: "21:00", end: "21:30" },
          { name: "The Sickest Squad", start: "21:30", end: "22:30" }
        ]
      },
      {
        name: "SILVER",
        color: "#C8D3D9",
        events: [
          { name: "Le Petit Dejeuner Du Frenchcore Avec Doris & D'ort", start: "11:00", end: "12:00" },
          { name: "Nightshift", start: "12:00", end: "13:00" },
          { name: "Nanostorm", start: "13:00", end: "14:00" },
          { name: "Kilbourne & Sova", start: "14:00", end: "15:00" },
          { name: "The Silence", start: "15:00", end: "16:00" },
          { name: "Rabbeat & Densha Crisis", start: "16:00", end: "17:15" },
          { name: "Dither", start: "17:15", end: "18:00" },
          { name: "Ophidian & Furyan", start: "18:00", end: "19:00" },
          { name: "The Outside Agency & Deathmachine", start: "19:00", end: "20:30" },
          { name: "Akira & Bruhze", start: "20:30", end: "22:00" }
        ]
      },
      {
        name: "PURPLE",
        color: "#A100FE",
        events: [
          { name: "Kelvin Farheaven", start: "11:00", end: "12:00" },
          { name: "RED RACE #4", start: "12:00", end: "12:45" },
          { name: "Digital Madness", start: "12:45", end: "13:30" },
          { name: "Rayzen", start: "13:30", end: "14:15" },
          { name: "Valido", start: "14:15", end: "15:00" },
          { name: "Cardination", start: "15:00", end: "16:00" },
          { name: "Suspect", start: "16:00", end: "17:00" },
          { name: "RED RACE #3", start: "17:00", end: "17:45" },
          { name: "RED RACE #2", start: "17:45", end: "18:30" },
          { name: "Savage Academy: Outlined & Point Break & Revizion & Synapze", start: "18:30", end: "20:00" },
          { name: "T.M.O", start: "20:00", end: "20:30" },
          { name: "Udow", start: "20:30", end: "21:15" },
          { name: "Double Trouble", start: "21:15", end: "22:00" }
        ]
      },
      {
        name: "STAMPKROEG",
        color: "#B6D7A8",
        events: [
          { name: "Outsiders Vroeg Pieken", start: "12:30", end: "14:00" },
          { name: "Re-X & A-More Raw Classics", start: "14:00", end: "16:00" },
          { name: "Kale Toeter LIVE", start: "17:00", end: "17:30" },
          { name: "Hans Glock Niet Klagen Maar Zagen", start: "17:30", end: "18:15" },
          { name: "Dokter Bruine Beer LIVE", start: "18:15", end: "19:00" },
          { name: "Klapperkebab", start: "19:00", end: "19:45" },
          { name: "Kili", start: "19:45", end: "20:30" },
          { name: "Noiseflow & Vane & Schlot & Cyber Gunz Pres. Deutscher Krach Take-over", start: "20:30", end: "21:15" },
          { name: "Invaderz", start: "21:15", end: "22:00" }
        ]
      },

    ],
  },
  Sunday: {
    dayStart: "11:00",
    stages: [
      {
        name: "RED",
        color: "#FF0000",
        events: [
          { name: "DEFQON.1 LEGENDS", start: "18:00", end: "22:45" },
          { name: "THE CLOSING RITUAL", start: "22:45", end: "23:00" }
        ]
      },
      {
        name: "BLUE",
        color: "#0BDBEF",
        events: [
          { name: "Voidax & Luner", start: "11:00", end: "12:00" },
          { name: "Digital Punk & Level One", start: "12:00", end: "13:00" },
          { name: "Deluzion", start: "13:00", end: "14:00" },
          { name: "Sanctuary & Coldax & Infliction", start: "14:00", end: "15:00" },
          { name: "Phuture Noize", start: "15:00", end: "16:00" },
          { name: "Anderex", start: "16:00", end: "16:45" },
          { name: "The Purge & The Saints", start: "16:45", end: "17:30" },
          { name: "Sickmode & Krowdexx NEW LA", start: "17:30", end: "18:00" },
          { name: "Mutilator & The Straikerz", start: "18:00", end: "18:45" },
          { name: "The Smiler", start: "18:45", end: "19:30" },
          { name: "Revelation LIVE", start: "19:30", end: "20:00" },
          { name: "Exproz & Kruelty", start: "20:00", end: "20:45" },
          { name: "15Y Spoontech Pres. Jailbreak", start: "21:00", end: "23:00" }
        ]
      },
            {
        name: "BLACK",
        color: "#878787",
        events: [
          { name: "Open Airbed Concert with JDX", start: "11:00", end: "12:30" },
          { name: "The Darkraver & Vince", start: "12:30", end: "14:00" },
          { name: "D-Fence", start: "14:00", end: "15:00" },
          { name: "Mad Dog", start: "15:00", end: "16:00" },
          { name: "Anime", start: "16:00", end: "17:00" },
          { name: "Miss K8", start: "17:00", end: "18:00" },
          { name: "BillX", start: "18:00", end: "19:00" },
          { name: "Barbaric Records LIVE", start: "19:00", end: "20:00" }
        ]
      },
            {
        name: "UV",
        color: "#D492FF",
        events: [
          { name: "Daani & Ginia", start: "11:00", end: "12:30" },
          { name: "Potato", start: "12:30", end: "13:30" },
          { name: "Stuk", start: "13:30", end: "14:00" },
          { name: "LNY TNZ", start: "14:00", end: "15:00" },
          { name: "Altijd Larstig & Rob GasD'rOp", start: "15:00", end: "16:00" },
          { name: "Outsiders & Adaro", start: "16:00", end: "17:00" },
          { name: "Bass Chaserz SPECIAL", start: "17:00", end: "18:00" },
          { name: "Mark with a K & MC Chucky", start: "18:00", end: "19:00" },
          { name: "FeestDJRuud", start: "19:00", end: "20:00" },
          { name: "Jebroer", start: "20:00", end: "20:45" },
          { name: "Uptempolonaise Gezellige Uptempo & Unlocked", start: "20:45", end: "21:15" },
          { name: "GPF", start: "21:15", end: "22:15" },
          { name: "Unicorn On K", start: "22:15", end: "23:00" }
        ]
      },
            {
        name: "MAGENTA",
        color: "#FF008B",
        events: [
          { name: "Consequent", start: "11:00", end: "12:00" },
          { name: "Jones", start: "12:00", end: "13:00" },
          { name: "Toneshifterz", start: "13:00", end: "14:00" },
          { name: "Dr Rude *Jump Classics*", start: "14:00", end: "15:00" },
          { name: "Bass Modulators REWIND", start: "15:00", end: "16:00" },
          { name: "Max Enforcer", start: "16:00", end: "17:00" },
          { name: "Atmozfears", start: "17:00", end: "18:00" }
        ]
      },
            {
        name: "GREEN",
        color: "#00FF00",
        events: [
            { name: "Dae", start: "11:00", end: "12:00" },
            { name: "Klugt", start: "12:00", end: "13:00" },
            { name: "Janks", start: "13:00", end: "14:00" },
            { name: "Apøthic", start: "14:00", end: "15:30" },
            { name: "XRTN", start: "15:30", end: "17:00" },
            { name: "Oguz", start: "17:00", end: "18:30" },
            { name: "Mad Dog Downtempo", start: "18:30", end: "20:00" },
            { name: "Cynthia Spiering", start: "20:00", end: "21:30" },
            { name: "Ketting", start: "21:30", end: "23:00" }
        ]
      },
            {
        name: "YELLOW",
        color: "#F1E300",
        events: [
          { name: "Super Trash Bros LIVE", start: "11:00", end: "11:45" },
          { name: "D-Frek", start: "11:45", end: "12:30" },
          { name: "Akimbo", start: "12:30", end: "13:45" },
          { name: "Maissouille & Radium", start: "13:45", end: "14:45" },
          { name: "Elite Enemy", start: "14:45", end: "15:30" },
          { name: "Remzcore & Levenkhan", start: "15:30", end: "16:15" },
          { name: "Kroefoe", start: "16:15", end: "17:00" },
          { name: "Tharoza", start: "17:00", end: "17:30" },
          { name: "Eraized", start: "17:30", end: "18:00" },
          { name: "Samynator LIVE", start: "18:00", end: "18:30" },
          { name: "Jur Terreur & Abaddon", start: "18:30", end: "19:15" },
          { name: "The Vizitor & Vandal!sm", start: "19:15", end: "20:00" }
        ]
      },
            {
        name: "GOLD",
        color: "#BB9551",
        events: [
          { name: "T-Go & Noxa", start: "11:00", end: "12:00" },
          { name: "Buzz Fuzz", start: "12:00", end: "13:00" },
          { name: "DJ J.D.A.", start: "13:00", end: "13:45" },
          { name: "Tjerhakkers", start: "13:45", end: "14:15" },
          { name: "Ruffneck", start: "14:15", end: "15:15" },
          { name: "JDX - Oldschool Set", start: "15:15", end: "16:00" },
          { name: "Panic", start: "16:00", end: "17:00" },
          { name: "Korsakoff", start: "17:00", end: "18:00" }
        ]
      },
      {
        name: "WHITE",
        color: "#F9FBFD",
        events: [
          { name: "Bold Action", start: "11:00", end: "12:30" },
          { name: "S1ngular", start: "12:30", end: "13:15" },
          { name: "D00D", start: "13:15", end: "14:00" },
          { name: "Geck-O Qult Classics", start: "14:00", end: "15:00" },
          { name: "Acti", start: "15:00", end: "16:00" },
          { name: "Alex Kidd", start: "16:00", end: "17:00" },
          { name: "Geck-O & Mish", start: "17:00", end: "18:00" },
          { name: "BRK3 aka Audiofreq & Code Black", start: "18:00", end: "19:00" }
        ]
      },
            {
        name: "PURPLE",
        color: "#A100FE",
        events: [
          { name: "Testarossa", start: "11:00", end: "12:00" },
          { name: "Yeyo", start: "12:00", end: "13:00" },
          { name: "Releazer", start: "13:00", end: "14:00" },
          { name: "Spectre", start: "14:00", end: "14:45" },
          { name: "Dâvinø", start: "14:45", end: "15:30" },
          { name: "More Kords Pres. Zaagphoric", start: "15:30", end: "16:15" },
          { name: "Fracture & Insurgent", start: "16:15", end: "17:00" },
          { name: "Anamorphic", start: "17:00", end: "17:45" },
          { name: "Resilience", start: "17:45", end: "18:30" },
          { name: "Exoform", start: "18:30", end: "19:15" },
          { name: "Repeller", start: "19:15", end: "20:00" }
        ]
      },
            {
        name: "STAMPKROEG",
        color: "#B6D7A8",
        events: [
          { name: "Coenfetti", start: "12:00", end: "12:30" },
          { name: "Walter Mellow", start: "12:30", end: "13:00" },
          { name: "A-Motion", start: "13:00", end: "13:30" },
          { name: "Albert Stamp", start: "13:30", end: "13:45" },
          { name: "HAHA Bier Jongen & Altijd Larstig & Rob GasD'rOp Pres. Breng Ons Bier", start: "13:45", end: "14:15" },
          { name: "Bassfeest", start: "14:15", end: "14:45" },
          { name: "Dansado & De Feestmeester", start: "14:45", end: "15:30" },
          { name: "Loud & Fout", start: "15:30", end: "16:00" },
          { name: "Feestnation", start: "16:00", end: "16:45" },
          { name: "Altijd Larstig & Rob GasD'rOp & FeestDJRuud", start: "16:45", end: "17:30" },
          { name: "Altijd Larstig & Rob GasD'rOp & Hans Glock Lam Zullen We Raven", start: "17:30", end: "18:00" },
          { name: "Altijd Larstig & Rob GasD'rOp & Outsiders & Dr Rude & Bass Chaserz", start: "18:00", end: "19:00" }
        ]
      },
    ],
  },
};

export default scheduleData;

