import { FiltersState } from '../types/interfaces';

interface FacetsData {
  'variants.attributes.color01.label': Facet;
  'variants.attributes.gender-01.label.en-US': Facet;
  'variants.attributes.material.label': Facet;
  'variants.attributes.brand.label': Facet;
  'variants.price.centAmount': Facet;
}

interface Facet {
  total: number;
  terms: Term[];
}

interface Term {
  term: string;
  count: number;
}

export const getFiltersParams = (facets: FacetsData) => {
  console.log(facets);
  const colors = facets['variants.attributes.color01.label'].terms
    .map((item: Term) => item.term)
    .sort();
  const materials = facets['variants.attributes.material.label'].terms
    .map((item: Term) => item.term)
    .sort();
  const genders = facets['variants.attributes.gender-01.label.en-US'].terms
    .map((item: Term) => item.term)
    .sort();
  const brands = facets['variants.attributes.brand.label'].terms
    .map((item: Term) => item.term)
    .sort();
  const prices = {
    min: Math.min.apply(
      null,
      facets['variants.price.centAmount'].terms.map((item: Term) => +item.term),
    ),
    max: Math.max.apply(
      null,
      facets['variants.price.centAmount'].terms.map((item: Term) => +item.term),
    ),
  };

  const filtersParams: FiltersState = {
    variantParams: {
      colors,
      materials,
      genders,
      brands,
    },
    priceParams: {
      max: prices.max,
      min: prices.min,
    },
  };

  console.log(filtersParams);
  return filtersParams;
};
