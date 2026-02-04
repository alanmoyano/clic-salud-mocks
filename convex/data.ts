import { equipos, type Entorno, type Equipo } from "@/types/users";
import type { UserDataInsertion } from "./tasks";

export const cuilsPersonasEnEquipos: Record<string, Equipo> = {
  // ---- Desarrollo ----
  // Rodri
  "20394442594": equipos.desarrollo,
  // Lu
  "27435597586": equipos.desarrollo,
  // Nico
  "20393264293": equipos.desarrollo,
  // Agus
  "20442009202": equipos.desarrollo,
  // Pablo
  "20361446705": equipos.desarrollo,
  // Andrés
  "20363575707": equipos.desarrollo,
  // Amilcar
  "27436933261": equipos.desarrollo,
  // Mati
  "20387489755": equipos.desarrollo,

  // ---- Testing ----
  // Gio
  "27422584388": equipos.testing,
  // Mati Efector
  "27052945521": equipos.testing,
  // Mati Agente
  "20257947581": equipos.testing,
  // Lau Efector
  "27277724486": equipos.testing,
  // Lau Agente (Marcela De Lourdes, Valle)
  "27214016090": equipos.testing,
  // Mica Efector
  "27414405261": equipos.testing,
  // Belen
  "27412803014": equipos.testing,

  // ---- Análisis ----
  // Azul
  "27416005473": equipos.analisis,
  // Gonza
  "20385590920": equipos.analisis,
  // Martin
  "20396242363": equipos.analisis,

  // ---- VIP ----
  // Ana
  "27224919021": equipos.VIP,
  // Felipe
  "20252692550": equipos.VIP,
  // Maria Fabiana, Gili
  "27176711006": equipos.VIP,
};

export const insertionData: Record<Entorno, UserDataInsertion[]> = {
  dev: [
    {
      CUIL: "20394442594",
      NOMBRE: "Rodrigo, Tosco",
      ROLES: "1,4,5,6,7,8",
    },
    {
      CUIL: "23405181789",
      NOMBRE: "Emiliano, Romero",
      ROLES: "3",
    },
    {
      CUIL: "20428964994",
      NOMBRE: "Gabriel, Arancio",
      ROLES: "3",
    },
    {
      CUIL: "27435597586",
      NOMBRE: "Luciana, Castro Barrionuevo",
      ROLES: "1,4,5,6,7,8",
    },
    {
      CUIL: "27438114330",
      NOMBRE: "Maria Sol, Vega",
      ROLES: "3",
    },
    {
      CUIL: "20393264293",
      NOMBRE: "Nicolas Exequiel, Marchiori",
      ROLES: "3",
    },
    {
      CUIL: "27277724486",
      NOMBRE: "Laura Del Valle, Torres",
      ROLES: "3",
    },
    {
      CUIL: "27422584388",
      NOMBRE: "Giovanna, Marandino",
      ROLES: "3",
    },
    {
      CUIL: "27052945521",
      NOMBRE: "Mercedes Noemi, Lopez",
      ROLES: "4,5,6",
    },
    {
      CUIL: "20421882348",
      NOMBRE: "Valentin, Tapia Torti",
      ROLES: "3",
    },
    {
      CUIL: "20432711979",
      NOMBRE: "Matias Jesus, Galanti",
      ROLES: "3",
    },
    {
      CUIL: "20257947581",
      NOMBRE: "Andres Federico, Galanti",
      ROLES: "4,5,6",
    },
    {
      CUIL: "27183974659",
      NOMBRE: "Marcela Ines, Martinez",
      ROLES: "4,5,6",
    },
    {
      CUIL: "20214448884",
      NOMBRE: "Myrian, Barrionuevo",
      ROLES: "3",
    },
    {
      CUIL: "20396242363",
      NOMBRE: "Martin Roberto, Molina",
      ROLES: "3",
    },
    {
      CUIL: "27367062903",
      NOMBRE: "Carla Micaela, Molina",
      ROLES: "3",
    },
    {
      CUIL: "20342031022",
      NOMBRE: "Rodrigo, Bautista",
      ROLES: "3",
    },
    {
      CUIL: "20431328217",
      NOMBRE: "Valentin Eduardo, Martini",
      ROLES: "3",
    },

    {
      CUIL: "20402022605",
      NOMBRE: "Facundo Leonel, Acosta",
      ROLES: "3",
    },
    {
      CUIL: "20207282031",
      NOMBRE: "Alejandro Fabian, Acosta",
      ROLES: "3",
    },
    {
      CUIL: "20385590920",
      NOMBRE: "Gonzalo Nahuel, Albarracin",
      ROLES: "3",
    },
    {
      CUIL: "20252692550",
      NOMBRE: "Felipe, Steffolani",
      ROLES: "4,5,6",
    },
    {
      CUIL: "27469728439",
      NOMBRE: "María Abril, Vega",
      ROLES: "3",
    },
    {
      CUIL: "27416261276",
      NOMBRE: "Mariana, Castro Barrionuevo",
      ROLES: "3",
    },
    {
      CUIL: "20435616780",
      NOMBRE: "Francisco, Ferraro",
      ROLES: "1",
    },

    {
      CUIL: "20449704850",
      NOMBRE: "Federico, Ferraro",
      ROLES: "4,5",
    },

    {
      CUIL: "23396935244",
      NOMBRE: "Athina, Bringas",
      ROLES: "6",
    },
    {
      CUIL: "20442009202",
      NOMBRE: "Agustin, Schmira",
      ROLES: "3",
    },
    {
      CUIL: "27275494505",
      NOMBRE: "Romina Gabriela, Teicher",
      ROLES: "3",
    },
    {
      CUIL: "20361446705",
      NOMBRE: "Pablo Mathias, Heredia",
      ROLES: "3",
    },
    {
      CUIL: "27208708681",
      NOMBRE: "Andrea Viviana, Diaz",
      ROLES: "3",
    },
    {
      CUIL: "27214016090",
      NOMBRE: "Marcela De Lourdes, Valle",
      ROLES: "4,5,6",
    },
    {
      CUIL: "27414405261",
      NOMBRE: "Micaela, Barberis Valle",
      ROLES: "3",
    },
    {
      CUIL: "27428536903",
      NOMBRE: "Sofia Anahi, Cabeza Diaz",
      ROLES: "4,5,6",
    },
    {
      CUIL: "27450928777",
      NOMBRE: "Gisela Alejandra, Huelva",
      ROLES: "4,6",
    },
    {
      CUIL: "23064555839",
      NOMBRE: "Celestino, Barttolini",
      ROLES: "4,5,6",
    },
    {
      CUIL: "27027785226",
      NOMBRE: "Haydee Nelly, Serres",
      ROLES: "1",
    },
    {
      CUIL: "27412803014",
      NOMBRE: "Micaela Belen, Huelva",
      ROLES: "3",
    },
    {
      CUIL: "20363575707",
      NOMBRE: "Andres, Claro Cordoba",
      ROLES: "3",
    },
    {
      CUIL: "27176711006",
      NOMBRE: "Maria Fabiana, Gili",
      ROLES: "3",
    },
    {
      CUIL: "27436933261",
      NOMBRE: "Amilcar, Ayarzabal Fernandez",
      ROLES: "4,5,6,7,8",
    },

    {
      CUIL: "20387489755",
      NOMBRE: "Mati, Galizio",
      ROLES: "1,4,5,6,7,8",
    },
  ],
  test: [
    {
      CUIL: "20394442594",
      NOMBRE: "Rodrigo, Tosco",
      ROLES: "1,4,5,6,7",
    },
    {
      CUIL: "23405181789",
      NOMBRE: "Emiliano, Romero",
      ROLES: "3",
    },
    {
      CUIL: "20428964994",
      NOMBRE: "Gabriel, Arancio",
      ROLES: "3",
    },
    {
      CUIL: "27435597586",
      NOMBRE: "Luciana, Castro Barrionuevo",
      ROLES: "1,5",
    },
    {
      CUIL: "27438114330",
      NOMBRE: "Maria Sol, Vega",
      ROLES: "3",
    },
    {
      CUIL: "20393264293",
      NOMBRE: "Nicolas Exequiel, Marchiori",
      ROLES: "3",
    },
    {
      CUIL: "27277724486",
      NOMBRE: "Laura Del Valle, Torres",
      ROLES: "3",
    },
    {
      CUIL: "27422584388",
      NOMBRE: "Giovanna, Marandino",
      ROLES: "3",
    },
    {
      CUIL: "27052945521",
      NOMBRE: "Mercedes Noemi, Lopez",
      ROLES: "4,5,6,7,8",
    },
    {
      CUIL: "20421882348",
      NOMBRE: "Valentin, Tapia Torti",
      ROLES: "3",
    },
    {
      CUIL: "20432711979",
      NOMBRE: "Matias Jesus, Galanti",
      ROLES: "3",
    },
    {
      CUIL: "20257947581",
      NOMBRE: "Andres Federico, Galanti",
      ROLES: "4,5,6,7",
    },
    {
      CUIL: "27183974659",
      NOMBRE: "Marcela Ines, Martinez",
      ROLES: "4,5,6,7,8",
    },
    {
      CUIL: "20396242363",
      NOMBRE: "Martin Roberto, Molina",
      ROLES: "3",
    },
    {
      CUIL: "27367062903",
      NOMBRE: "Carla Micaela, Molina",
      ROLES: "1,4,5,6,7",
    },
    {
      CUIL: "20342031022",
      NOMBRE: "Rodrigo, Bautista",
      ROLES: "3",
    },
    {
      CUIL: "20431328217",
      NOMBRE: "Valentin Eduardo, Martini",
      ROLES: "3",
    },

    {
      CUIL: "20402022605",
      NOMBRE: "Facundo Leonel, Acosta",
      ROLES: "3",
    },
    {
      CUIL: "20207282031",
      NOMBRE: "Alejandro Fabian, Acosta",
      ROLES: "5",
    },
    {
      CUIL: "20385590920",
      NOMBRE: "Gonzalo Nahuel, Albarracin",
      ROLES: "3",
    },
    {
      CUIL: "27469728439",
      NOMBRE: "María Abril, Vega",
      ROLES: "4,5",
    },
    {
      CUIL: "27416261276",
      NOMBRE: "Mariana, Castro Barrionuevo",
      ROLES: "4,5",
    },
    {
      CUIL: "20275525563",
      NOMBRE: "Agustin, Martini",
      ROLES: "5",
    },

    {
      CUIL: "27438139163",
      NOMBRE: "Agostina, Avalle",
      ROLES: "3",
    },
    {
      CUIL: "20266719036",
      NOMBRE: "Federico Carlos, Avalle",
      ROLES: "5",
    },
    {
      CUIL: "23364285159",
      NOMBRE: "Carlos Fernando, Castro Barrionuevo",
      ROLES: "3",
    },
    {
      CUIL: "20417183559",
      NOMBRE: "Agustin Tomas, Specterman Zabala",
      ROLES: "3",
    },
    {
      CUIL: "27275494505",
      NOMBRE: "Romina Gabriela, Teicher",
      ROLES: "3",
    },
    {
      CUIL: "23064555839",
      NOMBRE: "Celestino, Barttolini",
      ROLES: "3",
    },
    {
      CUIL: "27027785226",
      NOMBRE: "Haydee Nelly, Serres",
      ROLES: "1",
    },
    {
      CUIL: "20406309909",
      NOMBRE: "Martin Isac, Specterman Zabala",
      ROLES: "5,6",
    },
    {
      CUIL: "27100471375",
      NOMBRE: "Silvia Beatriz, Nuñez",
      ROLES: "3",
    },
    {
      CUIL: "20433695829",
      NOMBRE: "Tomas Santiago, Moreno Juarez",
      ROLES: "3",
    },

    {
      CUIL: "20361446705",
      NOMBRE: "Pablo Mathias, Heredia",
      ROLES: "3",
    },
    {
      CUIL: "20311428439",
      NOMBRE: "Germán Darío, Ghione",
      ROLES: "3",
    },
    {
      CUIL: "20144767064",
      NOMBRE: "Oscar Eduardo, Molina",
      ROLES: "3",
    },
    {
      CUIL: "27414405261",
      NOMBRE: "Micaela, Barberis Valle",
      ROLES: "3",
    },
    {
      CUIL: "27214016090",
      NOMBRE: "Marcela De Lourdes, Valle",
      ROLES: "4,5,6,7,8",
    },
    {
      CUIL: "27412803014",
      NOMBRE: "Micaela Belen, Huelva",
      ROLES: "3",
    },
    {
      CUIL: "27450928777",
      NOMBRE: "Gisela Alejandra, Huelva",
      ROLES: "4,5,6,7,8",
    },
    {
      CUIL: "27224919021",
      NOMBRE: "Ana Maria, Strub",
      ROLES: "3",
    },
    {
      CUIL: "27428536903",
      NOMBRE: "Sofia Anahi, Cabeza Diaz",
      ROLES: "4,5",
    },
    {
      CUIL: "20928549063",
      NOMBRE: "Fabian Horacio, Avila Ortega",
      ROLES: "3",
    },
    {
      CUIL: "2720870868e",
      NOMBRE: "Andrea Viviana, Diaz",
      ROLES: "3",
    },
    {
      CUIL: "27416005473",
      NOMBRE: "Maria Azul, Talavera",
      ROLES: "3",
    },

    {
      CUIL: "20432711978",
      NOMBRE: "matias, galantiiiiii",
      ROLES: "6",
    },
    {
      CUIL: "27416005155",
      NOMBRE: "Catalina, Jorge",
      ROLES: "3",
    },
    {
      CUIL: "23396935244",
      NOMBRE: "Athina, Bringas",
      ROLES: "4,5,6,7",
    },

    {
      CUIL: "27208708681",
      NOMBRE: "Andrea Viviana, Diaz",
      ROLES: "3",
    },
    {
      CUIL: "20357855749",
      NOMBRE: "Agustin Nicolas, Mateo",
      ROLES: "3",
    },
    {
      CUIL: "27176711006",
      NOMBRE: "Maria Fabiana, Gili",
      ROLES: "3",
    },
    {
      CUIL: "20442009202",
      NOMBRE: "Agustin, Schmira",
      ROLES: "3",
    },
    {
      CUIL: "23261819899",
      NOMBRE: "Felix Ariel, Perez",
      ROLES: "3",
    },
    {
      CUIL: "20363575707",
      NOMBRE: "Andres, Claro Cordoba",
      ROLES: "3",
    },
    {
      CUIL: "20352579972",
      NOMBRE: "Tomas, Torres Hansen",
      ROLES: "3",
    },
    {
      CUIL: "27110434443",
      NOMBRE: "Patricia Carmen, Luchina",
      ROLES: "3",
    },
    {
      CUIL: "20427850480",
      NOMBRE: "Tobias, Ben",
      ROLES: "3",
    },
    {
      CUIL: "273667062903",
      NOMBRE: "Carla Micaela, Molina",
      ROLES: "5,6",
    },
    {
      CUIL: "27185759941",
      NOMBRE: "Claudia Liliana, Scurti",
      ROLES: "3",
    },
    {
      CUIL: "20440772790",
      NOMBRE: "Facundo Samuel, Riccio",
      ROLES: "4,5,6,7",
    },

    {
      CUIL: "20460337691",
      NOMBRE: "Maximo Samir, Tabares",
      ROLES: "4,5,6",
    },
    {
      CUIL: "27219676056",
      NOMBRE: "Monica Noemi De Lourdes, Guzman",
      ROLES: "3",
    },
    {
      CUIL: "20412803117",
      NOMBRE: "PEDRO, STERPONE",
      ROLES: "8",
    },
  ],
  demo: [
    {
      CUIL: "20394442594",
      NOMBRE: "Rodrigo, Tosco",
      ROLES: "4,5,6",
    },
    {
      CUIL: "23405181789",
      NOMBRE: "Emiliano, Romero",
      ROLES: "3",
    },
    {
      CUIL: "20428964994",
      NOMBRE: "Gabriel, Arancio",
      ROLES: "3",
    },
    {
      CUIL: "27435597586",
      NOMBRE: "Luciana, Castro Barrionuevo",
      ROLES: "1,4,5,6",
    },
    {
      CUIL: "27438114330",
      NOMBRE: "Maria Sol, Vega",
      ROLES: "3",
    },
    {
      CUIL: "20393264293",
      NOMBRE: "Nicolas Exequiel, Marchiori",
      ROLES: "3",
    },
    {
      CUIL: "27277724486",
      NOMBRE: "Laura Del Valle, Torres",
      ROLES: "3",
    },
    {
      CUIL: "27422584388",
      NOMBRE: "Giovanna, Marandino",
      ROLES: "3",
    },
    {
      CUIL: "27052945521",
      NOMBRE: "Mercedes Noemi, Lopez",
      ROLES: "4,5,6",
    },
    {
      CUIL: "20421882348",
      NOMBRE: "Valentin, Tapia Torti",
      ROLES: "3",
    },
    {
      CUIL: "20432711979",
      NOMBRE: "Matias Jesus, Galanti",
      ROLES: "3",
    },
    {
      CUIL: "20257947581",
      NOMBRE: "Andres Federico, Galanti",
      ROLES: "4,5,6",
    },
    {
      CUIL: "27183974659",
      NOMBRE: "Marcela Ines, Martinez",
      ROLES: "4,5,6",
    },
    {
      CUIL: "20214448884",
      NOMBRE: "Myrian, Barrionuevo",
      ROLES: "3",
    },
    {
      CUIL: "20396242363",
      NOMBRE: "Martin Roberto, Molina",
      ROLES: "3",
    },
    {
      CUIL: "20342031022",
      NOMBRE: "Rodrigo, Bautista",
      ROLES: "3",
    },
    {
      CUIL: "20431328217",
      NOMBRE: "Valentin Eduardo, Martini",
      ROLES: "3",
    },

    {
      CUIL: "20402022605",
      NOMBRE: "Facundo Leonel, Acosta",
      ROLES: "3",
    },
    {
      CUIL: "20207282031",
      NOMBRE: "Alejandro Fabian, Acosta",
      ROLES: "3",
    },
    {
      CUIL: "20385590920",
      NOMBRE: "Gonzalo Nahuel, Albarracin",
      ROLES: "3",
    },
    {
      CUIL: "20252692550",
      NOMBRE: "Felipe, Steffolani",
      ROLES: "4,5,6",
    },
    {
      CUIL: "27469728439",
      NOMBRE: "María Abril, Vega",
      ROLES: "3",
    },
    {
      CUIL: "27416261276",
      NOMBRE: "Mariana, Castro Barrionuevo",
      ROLES: "3",
    },
    {
      CUIL: "20435616780",
      NOMBRE: "Francisco, Ferraro",
      ROLES: "1",
    },

    {
      CUIL: "20449704850",
      NOMBRE: "Federico, Ferraro",
      ROLES: "4,5,6",
    },
    {
      CUIL: "23396935244",
      NOMBRE: "Athina, Bringas",
      ROLES: "4,5,6",
    },
    {
      CUIL: "20442009202",
      NOMBRE: "Agustin, Schmira",
      ROLES: "3",
    },
    {
      CUIL: "27275494505",
      NOMBRE: "Romina Gabriela, Teicher",
      ROLES: "3",
    },
    {
      CUIL: "20361446705",
      NOMBRE: "Pablo Mathias, Heredia",
      ROLES: "3",
    },
    {
      CUIL: "27208708681",
      NOMBRE: "Andrea Viviana, Diaz",
      ROLES: "3",
    },
    {
      CUIL: "27214016090",
      NOMBRE: "Marcela De Lourdes, Valle",
      ROLES: "4,5,6",
    },
    {
      CUIL: "27414405261",
      NOMBRE: "Micaela, Barberis Valle",
      ROLES: "3",
    },
    {
      CUIL: "27428536903",
      NOMBRE: "Sofia Anahi, Cabeza Diaz",
      ROLES: "4,5,6",
    },
    {
      CUIL: "27450928777",
      NOMBRE: "Gisela Alejandra, Huelva",
      ROLES: "4,5,6",
    },
    {
      CUIL: "23064555839",
      NOMBRE: "Celestino, Barttolini",
      ROLES: "4,5,6",
    },
    {
      CUIL: "27027785226",
      NOMBRE: "Haydee Nelly, Serres",
      ROLES: "1",
    },
    {
      CUIL: "27412803014",
      NOMBRE: "Micaela Belen, Huelva",
      ROLES: "3",
    },
    {
      CUIL: "20363575707",
      NOMBRE: "Andres, Claro Cordoba",
      ROLES: "3",
    },
    {
      CUIL: "27176711006",
      NOMBRE: "Maria Fabiana, Gili",
      ROLES: "5,6",
    },
    {
      CUIL: "27436933261",
      NOMBRE: "Amilcar, Ayarzabal Fernandez",
      ROLES: "3",
    },
    {
      CUIL: "20181759349",
      NOMBRE: "Guillermo César, Martinez",
      ROLES: "4,5",
    },
    {
      CUIL: "27278794674",
      NOMBRE: "Georgina Silvana, Rossi",
      ROLES: "5",
    },
    {
      CUIL: "27414409860",
      NOMBRE: "Gilda Soledad Gabriela, Gordillo",
      ROLES: "4,5",
    },
    {
      CUIL: "27266928756",
      NOMBRE: "Noelia Patricia, Rodriguez",
      ROLES: "4,5,6",
    },
    {
      CUIL: "27359663914",
      NOMBRE: "Ludmila Del Milagro, Peralta Marquez",
      ROLES: "5,6",
    },
    {
      CUIL: "27428435392",
      NOMBRE: "Arianna, Saienni Blanco",
      ROLES: "5",
    },
    {
      CUIL: "20431853109",
      NOMBRE: "Lorenzo, Fuchs Herrera",
      ROLES: "5",
    },
    {
      CUIL: "27301228371",
      NOMBRE: "Lucia Guadalupe, Balverdi",
      ROLES: "5,6",
    },
    {
      CUIL: "20376302459",
      NOMBRE: "Mauro Exequiel, Figueroa",
      ROLES: "5,6",
    },
    {
      CUIL: "20427850480",
      NOMBRE: "Tobias, Ben",
      ROLES: "5,6",
    },
    {
      CUIL: "27416005473",
      NOMBRE: "Maria Azul, Talavera",
      ROLES: "3",
    },
    {
      CUIL: "20445787745",
      NOMBRE: "Nicolas Agustin, Steffolani",
      ROLES: "3",
    },
    {
      CUIL: "27367062903",
      NOMBRE: "Carla Micaela, Molina",
      ROLES: "1,4,5,6",
    },

    {
      CUIL: "20928549063",
      NOMBRE: "Fabian Horacio, Avila Ortega",
      ROLES: "3",
    },
    {
      CUIL: "27171556010",
      NOMBRE: "Cecilia, Contesso",
      ROLES: "3",
    },
    {
      CUIL: "20440772790",
      NOMBRE: "Facundo Samuel, Riccio",
      ROLES: "3",
    },
    {
      CUIL: "27219676056",
      NOMBRE: "Monica Noemi De Lourdes, Guzman",
      ROLES: "3",
    },
  ],
  staging: [],
};
