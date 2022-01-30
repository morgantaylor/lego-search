import { TOKEN } from '../config'

const LEGO_API = 'https://rebrickable.com/api/v3/lego/'
const LEGO_SETS = `${LEGO_API}sets/`
const LEGO_MINIFIGS = `${LEGO_API}minifigs/`
const LEGO_COLORS = `${LEGO_API}colors/`
const LEGO_PARTS_CAT = `${LEGO_API}part_categories/`
const LEGO_PARTS = `${LEGO_API}parts/`

const KEY = TOKEN.API_TOKEN

const config = {
  'Access-Control-Allow-Origin': 'http://localhost:3000',
  'Access-Control-Allow-Headers': 'Content-Type'
}

export const getMiniFigures = (page, search) => {
  const query = `${LEGO_MINIFIGS}?key=${KEY}&page=${page}&page_size=12&search=${search}`
  return fetch(query, config)
    .then(response => response.json())
    .then(data => {
      return data
    })
}

export const getSets = (page, search) => {
  const query = `${LEGO_SETS}?key=${KEY}&page=${page}&page_size=12&ordering=-year&search=${search}`
  return fetch(query, config)
    .then(response => response.json())
    .then(data => {
      return data
    })
}

export const getColors = (page, search) => {
  const query = `${LEGO_COLORS}?key=${KEY}&page=${page}&page_size=12&search=${search}`
  return fetch(query, config)
    .then(response => response.json())
    .then(data => {
      return data
    })
}

export const getPartsCaregories = (page, search) => {
  const query = `${LEGO_PARTS_CAT}?key=${KEY}&page=${page}&page_size=12&search=${search}`
  return fetch(query, config)
    .then(response => response.json())
    .then(data => {
      return data
    })
}

export const getPart = (page, id, search) => {
  const query = `${LEGO_PARTS}?key=${KEY}&page=${page}&page_size=12&part_cat_id=${id}&search=${search}`
  return fetch(query, config)
    .then(response => response.json())
    .then(data => {
      console.log('getPart data: ', data)
      return data
    })
}

export const getPartPicture = (page, catID) => {
  const query = `${LEGO_PARTS}?key=${KEY}&page=${page}&page_size=12&part_cat_id=${catID}`
  return fetch(query, config)
    .then(response => response.json())
    .then(data => {
      return data.results.find(part => part.part_img_url)
    })
}
