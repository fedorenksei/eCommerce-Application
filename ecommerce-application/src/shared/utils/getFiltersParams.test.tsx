import { getFiltersParams } from './getFiltersParams';

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

test('Util transform parameters fine', () => {
  const input: FacetsData = {
    'variants.attributes.brand.label': {
      total: 1,
      terms: [
        {
          count: 1,
          term: 'Vermont',
        },
      ],
    },
    'variants.attributes.color01.label': {
      total: 1,
      terms: [
        {
          count: 1,
          term: 'white',
        },
      ],
    },
    'variants.attributes.gender-01.label.en-US': {
      total: 1,
      terms: [
        {
          count: 1,
          term: 'Female',
        },
      ],
    },
    'variants.attributes.material.label': {
      total: 1,
      terms: [
        {
          count: 1,
          term: 'Steel',
        },
      ],
    },
    'variants.price.centAmount': {
      total: 1,
      terms: [
        {
          count: 1,
          term: '11305',
        },
      ],
    },
  };

  const res = getFiltersParams(input);
  expect(res.priceParams.max).toBe(11305);
  expect(res.priceParams.min).toBe(11305);
  expect(res.variantParams.colors[0]).toBe('white');
  expect(res.variantParams.materials[0]).toBe('Steel');
  expect(res.variantParams.genders[0]).toBe('Female');
  expect(res.variantParams.brands[0]).toBe('Vermont');
});
