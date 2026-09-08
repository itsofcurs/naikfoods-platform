// Common Indian location abbreviation expansion helper

const ABBREVIATIONS = {
  apa: 'apartment',
  apt: 'apartment',
  apts: 'apartments',
  soc: 'society',
  socy: 'society',
  bldg: 'building',
  bldng: 'building',
  rd: 'road',
  st: 'street',
  nr: 'near',
  opp: 'opposite',
  ngr: 'nagar',
  ng: 'nagar',
  col: 'colony',
  clny: 'colony',
  hsg: 'housing',
  stn: 'station',
  chwk: 'chowk',
  chauk: 'chowk',
  mrg: 'marg',
  gln: 'galli',
  flt: 'flat',
  clg: 'college',
  coll: 'college',
  univ: 'university',
  inst: 'institute',
  tech: 'technology',
  engg: 'engineering'
};

/**
 * Expands common abbreviations in search queries for better search relevance.
 * e.g., "sujata apa" -> "sujata apartment", "fc rd" -> "fc road"
 * @param {string} query
 * @returns {string}
 */
export function expandAbbreviations(query) {
  if (!query) return '';
  return query
    .trim()
    .split(/\s+/)
    .map((w) => ABBREVIATIONS[w.toLowerCase()] || w)
    .join(' ');
}
