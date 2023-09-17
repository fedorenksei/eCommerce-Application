export interface MemberData {
  name: string;
  surname: string;
  imageUrl: string;
  shortBio: string;
  roles: string[];
  github: string;
  contribution: {
    sprint1: string[];
    sprint2: string[];
    sprint3: string[];
    sprint4: string[];
  };
}

export const membersData: MemberData[] = [
  {
    name: 'Aleksei',
    surname: 'Fedorenko',
    imageUrl: './images/AlekseiFedorenko.png',
    shortBio:
      'I have been developing chat-bots on a platform using JavaScript (ES5) for 2 years. I am learning frontend at RSS since December from stage 0. This is my first React project',
    roles: ['team lead', 'developer'],
    github: 'fedorenksei',
    contribution: {
      sprint1: ['Github repository', 'Vite project', 'PR template'],
      sprint2: [
        'UI for Registration and Log in pages',
        'Template styles for buttons and text elements',
      ],
      sprint3: [
        'User profile page with info editing (both UI and API requests)',
        'UI for Catalog page',
        'UI for Product detailed page',
      ],
      sprint4: [
        'Authorization for anonymous users',
        'Promo codes for cart discounts',
        'About us page',
      ],
    },
  },
  {
    name: 'Dmitriy',
    surname: 'Romanenkov',
    imageUrl: './images/',
    shortBio: '',
    roles: ['tech lead', 'developer'],
    github: 'color-zebra',
    contribution: {
      sprint1: [
        'Trello board',
        'ESLint',
        'Prettier',
        'Jest',
        'Storybook',
        'Tailwind',
        'README',
        'FSD folder structure',
      ],
      sprint2: [
        'Routing',
        'Logic for registration and log in forms',
        'API requests',
        'Redux store',
        'Not found page',
        'Header',
      ],
      sprint3: [
        'API requests and logic for products filtering, searching, sorting and pagination',
        'Added facet filters logic',
        "API request for fetch a product's info",
        'Netlify deployment',
      ],
      sprint4: ['had a very long trip...'],
    },
  },
  {
    name: 'Mikalai',
    surname: 'Tserakhau',
    imageUrl: './images/',
    shortBio: '',
    roles: ['developer', 'commerce tools administrator'],
    github: 'nickbis',
    contribution: {
      sprint1: ['Commerce Tools project', 'Husky'],
      sprint2: ['had a very long trip...'],
      sprint3: ['Filled products data in the Commerce Tools'],
      sprint4: [
        'Implemented Basket page',
        'Implemented add, delete and edit quantity of products in Product, Catalog and Basket page',
      ],
    },
  },
];
