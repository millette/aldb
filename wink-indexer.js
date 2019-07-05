'use strict'

// core
const fs = require('fs')

// npm
const level = require('level')
// Load wink-bm25-text-search
const bm25 = require('wink-bm25-text-search')
// Load NLP utilities
const nlp = require( 'wink-nlp-utils' )

const db = level('dbdbdoo', { valueEncoding: 'json' })

// Create search engine's instance
const engine = bm25()
// Load sample data (load any other JSON data instead of sample)
// var docs = require( '../sample-data/data-for-wink-bm25.json' );

// Define preparatory task pipe!
var pipe = [
  nlp.string.lowerCase,
  nlp.string.tokenize0,
  nlp.tokens.removeWords,
  nlp.tokens.stem,
  nlp.tokens.propagateNegations
]
// Contains search query.
// var query;

// Step I: Define config
// Only field weights are required in this example.

const fldWeights = {
  /*
  "custom-profile": 1,
  "nom-russe": 1,
  "custom-twitter-card": 1,
  "type-de-acteur": 1,
  "custom-doaj-start-year": 1,
  "custom-doaj-date-added": 1,
  "lead-direction": 1,
  "langue-edition": 1,
  "domaine-2": 1,
  "custom-https-//api.w.org/": 1,
  "robot-titre": 1,
  "custom-pingback": 1,
  "identifiant-issn": 1,
  "custom-shortlink": 1,
  "url-sitemap-eux": 1,
  "custom-wlwmanifest": 1,
  "custom-edituri": 1,
  "section": 1,
  "sujet": 1,
  "sigle": 1,
  "custom-robots": 1,
  "sigle-org": 1,
  "patterns-interdits": 1,
  "mots-clefs": 2,
  "personne-nom-prenom": 2,
  "personne-nom-famille": 2,
  "sitemap-nous": 2,
  "generateur": 2,
  "format-autres": 2,
  "identifiant-drupal-parent": 2,
  "nom-arabe": 2,
  "description": 2,
  "robot-a-partir-de": 2,
  "nom-espagnol": 2,
  "nom-italien": 2,
  "nom-anglais": 2,
  "sigle-nom": 2,
  "tip": 2,
  "target-machine": 2,
  "target-card": 2,
  "identifiant-drupal": 2,
  "custom-type-de-contenu": 2,
  "apercu": 2,
  "chemin-JSON": 2,
  "is-in-springeropen": 2,
  "is-in-revuesorg": 2,
  "is-in-journalseek": 2,
  "is-in-overblog": 2,
  "is-in-naf": 2,
  "is-in-journaltoc": 2,
  "is-in-cairn": 2,
  "is-in-persee": 2,
  "is-in-erudit": 2,
  "is-not-free": 2,
  "url-domaine": 2,
  "langue organisation": 2,
  "langue sigle-org": 2,
  "langue mots-clefs": 2,
  "fiches": 2,
  "patterns-documents": 2,
  "patterns-flux": 2,
  "patterns-images": 2,
  "robot-obtenir-sitemaps": 3,
  "robot-transformer-informations": 3,
  "robot-obtenir-robots-txt": 3,
  "robot-repeter": 3,
  "langue url-canonique": 3,
  "langue date-edition": 3,
  "langue sigle-nom": 3,
  "langue nom": 3,
  "langue apercu": 3,
  "langue description": 3,
  "urls-equivalents": 3,
  "url-robots-txt": 3,
  "ajouter-aux-favoris": 3,
  "url-effectif": 3,
  "protocol": 3,
  "dans-la-corbeille": 3,
  "is-in-overBlog": 3,
  "is-in-JournalTOC": 3,
  "is-in-Journalseek": 3,
  "is-in-revuesOrg": 3,
  "is-in-springerOpen": 3,
  "is-in-NAF": 3,
  "title": 3,
  "thumb-float": 3,
  "thumb-beside": 3,
  "direction": 3,
  "affichage": 3,
  "titre": 3,
  "path": 3,
  "organisation": 3,
  "synonyme": 3,
  "chemin-alias": 3,
  "provenance": 3,
  "racine": 4,
  "nom-francais": 4,
  "nom-folder": 4,
  "breadcrumb": 4,
  "url-accueil": 4,
  "is-accueil": 4,
  "robot-interdit": 4,
  "robot-frequence": 4,
  "moment-disponible": 4,
  "moment-copyright": 4,
  "moment-acceptation": 4,
  "moment-publication": 4,
  "moment-proposition": 4,
  "robot-periode": 4,
  "periodicite": 4,
  "robot-transformer-resultats": 5,
  "robot-effectuer-analyse-custom": 5,
  "robot-effectuer-analyse-correlative": 5,
  "moment-mise-a-jour-robots-txt": 5,
  "is-defectueux": 5,
  "is-in-blogspot": 5,
  "is-for-sale": 5,
  "is-interdit": 5,
  "is-in-dialnet": 5,
  "is-in-doaj": 5,
  "is-in-dspace": 5,
  "is-in-hypotheses": 5,
  "is-in-blog4ever": 5,
  "is-open-access": 5,
  "is-in-elsevier": 5,
  "is-in-sage": 5,
  "is-copyright": 5,
  "is-in-wordpress": 5,
  "is-in-metapress": 5,
  "is-peer-reviewed": 5,
  "robot-priorite": 5,
  "domaine": 5,
  "chemin-json": 5,
  "moment-mise-a-jour-sitemap": 5,
  "fiche-defectueuse": 6,
  "format": 6,
  "site-id": 6,
  "type-de-ressource": 6,
  "robot-obtenir-du-fichier": 6,
  "robot-obtenir-du-web": 6,
  "robot-parcourir": 6,
  "robot-obtenir-de-la-cache": 6,
  "robot-parcouru": 6,
  "traduction": 6,
  "robot-version-1": 6,
  "target-stack": 6,
  "url-propose": 7,
  "is-doublon": 7,
  "parent": 7,
  "repertoire-depart": 7,
  "encodage": 8,
  "site-de-diffusion": 8,
  "url-canonique": 8,
  "importance": 9,
  "fiche-publiee": 11,
  "a-completer": 11,
  */
  "moment-creation": 11,
  "moment-mise-a-jour": 11,
  "moment-modification": 11,
  "nom-machine": 11,
  "sous-type": 11,
  "type": 11,
  "nom": 11
}


engine.defineConfig({ fldWeights })
// Step II: Define PrepTasks pipe.
// Set up 'default' preparatory tasks i.e. for everything else
engine.definePrepTasks( pipe )

const now = Date.now()
engine.importJSON(fs.readFileSync('el-index.json', 'utf8'))
console.error('import', Date.now() - now)

/*
// Step III: Add Docs
// Add documents now...
docs.forEach( function ( doc, i ) {
  // Note, 'i' becomes the unique id for 'doc'
  engine.addDoc( doc, i )
} );
*/

// const jj = engine.exportJSON()
// console.log(jj)

const doit2 = async () => {
  return engine

  let nErrors = 0
  const stream = db.createReadStream({
    gt: "file:"
  })
  for await (const { key, value: { json } } of stream) {
    try {
      engine.addDoc(json, key)
    } catch (e) {
      console.error('oups', key, e)
      ++nErrors
    }
  }
  console.error('nErrors (missing fields):', nErrors)
  // return engine.exportJSON()

  return engine

}

doit2().then((eng) => {
  // return console.log(eng.exportJSON())
  const now = Date.now()
  eng.consolidate()
  console.error('consolidate', Date.now() - now)

  const jj = eng.exportJSON()
  console.log(jj)


  // All set, start searching!
  const query = 'montreal'
  // `results` is an array of [ doc-id, score ], sorted by score
  const n2 = Date.now()
  var results = eng.search( query );
  console.error('search', Date.now() - n2)
  // Print number of results.
  console.error( '%d entries found.', results.length );
  // -> 1 entries found.
  // results[ 0 ][ 0 ] i.e. the top result is:
  // console.log( results );
  db.get(results[0][0])
    .then((oy) => console.error(oy))
  // -> George Walker Bush (born July 6, 1946) is an...
  // -> ... He never studied Law...


}).catch(console.error)


/*
const doit = async () => {
  // let cnt = 0
  const mm = new Map()
  const stream = db.createValueStream({
    gt: "file:"
  })
  for await (const { json } of stream) {
    // ++cnt
    for (let r in json) {
      const v = mm.get(r)
      if (v) {
        mm.set(r, v + 1)
      } else {
        mm.set(r, 1)
      }
    }
    // if (cnt > 2) break
  }
  // console.log(mm)
  return mm
}

doit().then(async (d) => {
  const x = Array.from(d)
    .filter(([, cnt]) => cnt > 900)
    .sort((a, b) => {
      if (a[1] > b[1]) return 1
      if (a[1] < b[1]) return -1
    })
    .map(([y, z]) => [y, 1 + Math.round(z / 7825)])
    // .reverse()
    // .slice(0, 25)

  const xx = {}
  x.forEach(([k, v]) => xx[k] = v)
  console.log(JSON.stringify(xx, null, '  '))
  // for await (const a of d) console.log(a)
})
.catch(console.error)
*/
