export interface MemberData {
  name: string;
  surname: string;
  imageUrl: string;
  shortBio: string;
  roles: string[];
  github: string;
  contribution: {
    label: string;
    items: string[];
    comma?: boolean;
  }[];
}

export const membersData: MemberData[] = [
  {
    name: 'Aleksei',
    surname: 'Fedorenko',
    imageUrl: './images/AlekseiFedorenko.png',
    shortBio:
      'I have been developing chat-bots on a platform using JavaScript (ES5) for 2 years. I am learning frontend at RSS since December from stage 0. This is my first React project',
    roles: ['team lead', 'developer', 'UI design'],
    github: 'fedorenksei',
    contribution: [
      {
        label: 'Sprint #1',
        items: ['Github repository', 'Vite project', 'PR template'],
      },
      {
        label: 'Sprint #2',
        items: [
          'UI for Registration and Log in pages',
          'Template styles for buttons and text elements',
        ],
      },
      {
        label: 'Sprint #3',
        items: [
          'User profile page with info editing (both UI and API requests)',
          'UI for Catalog page',
          'UI for Product detailed page',
        ],
      },
      {
        label: 'Sprint #4',
        items: [
          'Authorization for anonymous users',
          'Promo codes for cart discounts',
          'About us page',
        ],
      },
    ],
  },
  {
    name: 'Dmitriy',
    surname: 'Romanenkov',
    imageUrl: './images/DmitriyRomanenkov.jpg',
    shortBio:
      'I have no relevant development experience, I studied frontend at Rolling Scopes since 2022, this is my second React project.',
    roles: ['tech lead', 'developer'],
    github: 'color-zebra',
    contribution: [
      {
        label: 'Sprint #1',
        items: [
          'Trello board',
          'ESLint',
          'Prettier',
          'Jest',
          'Storybook',
          'Tailwind',
          'README',
          'FSD folder structure',
        ],
        comma: true,
      },
      {
        label: 'Sprint #2',
        items: [
          'Routing',
          'Logic for registration and log in forms',
          'API requests',
          'Redux store',
          'Not found page',
          'Header',
        ],
      },
      {
        label: 'Sprint #3',
        items: [
          'API requests and logic for products filtering, searching, sorting and pagination',
          'Added facet filters logic',
          "API request for fetch a product's info",
          'Netlify deployment',
        ],
      },
      {
        label: 'Sprint #4',
        items: ['had a very long trip...'],
      },
    ],
  },
  {
    name: 'Mikalai',
    surname: 'Tserakhau',
    imageUrl: './images/MikalaiTserakhau.png',
    shortBio:
      'I work as a specialist in the support, repair and sale of computer equipment. I want to become a developer. I like to study frontend at RS since 2022. This is my first React project.',
    roles: ['developer', 'commerce tools administrator'],
    github: 'nickbis',
    contribution: [
      {
        label: 'Sprint #1',
        items: ['Commerce Tools project', 'Husky'],
      },
      {
        label: 'Sprint #2',
        items: ['had a very long trip...'],
      },
      {
        label: 'Sprint #3',
        items: ['Filled products data in the Commerce Tools'],
      },
      {
        label: 'Sprint #4',
        items: [
          'Implemented Basket page',
          'Implemented add, delete and edit quantity of products in Product, Catalog and Basket page',
        ],
      },
    ],
  },
];
