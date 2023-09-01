interface FacetsData {
  'variants.attributes.color.label.en': Facet;
  'variants.attributes.gender.label': Facet;
  'variants.attributes.size': Facet;
  'variants.attributes.style.label': Facet;
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

interface FiltersParams {
  colors: string[];
  sizes: string[];
  genders: string[];
  styles: string[];
  prices: {
    min: number;
    max: number;
  };
}

export const getFiltersParams = (facets: FacetsData) => {
  const colors = facets['variants.attributes.color.label.en'].terms.map(
    (item: Term) => item.term,
  );
  const sizes = facets['variants.attributes.size'].terms.map(
    (item: Term) => item.term,
  );
  const genders = facets['variants.attributes.gender.label'].terms.map(
    (item: Term) => item.term,
  );
  const styles = facets['variants.attributes.style.label'].terms.map(
    (item: Term) => item.term,
  );
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

  const filtersParams: FiltersParams = {
    colors,
    sizes,
    genders,
    styles,
    prices,
  };

  console.log(filtersParams);
  return filtersParams;
};
