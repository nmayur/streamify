
# Streamify Analytics Dashboard

Simple Analytics Dashboard with data visualizations using charts and graphs

Demo Link - [https://streamify-mauve.vercel.app/](https://streamify-mauve.vercel.app/)

## Tech Stack
- **NextJS**
- **TypeScipt**
- **OpenAI**
- **NextJS Api routes to mock data**
- TailwindCSS
- ShadcnUi
- Recharts
- MagicUI
- Depoyed on vercel

## Design

- For the design theme, I chose a dark gradient background and incorporated a glass UI effect on the cards.
- I also added subtle interactions and a fade-in animation on load to create an engaging user experience.

## Data visualizations

- Donut chart for Key metrics
- Pie chart for Revenue Data annd Location wise user segmentation
- Multi Line chart to show user growth and active users trends over past 12 months data
- Horizontal Bar Chart to show top 5 most streamed songs
- Data Table to show top streamd songs with actions including **Sort**, **Filter**, **Search**

## Additional Feature
I integrated **OpenAI** to provide valuable insights on Revenue and User Growth data. To access these AI-generated insights,  click the Star button located in the top-right corner of the Revenue and User Growth cards. 

## Unit testing

To ensure the quality and reliability of the code, unit tests were written using React Testing Library and Jest. 

Test case written for:
- Common Pie Chart Component
- Data Table
- Key metrics
- Shared utils functions 

## Additional Notes

I did not implement Redux for state management, as it was not necessary for this single-page dashboard. The state management needs were minimal, and React's built-in state management was sufficient to handle all required functionality.

But I'm aware and know how to implement Redux and Redux Toolkit.


## Getting Started

Install all the dependencies:

```bash
npm i
# or
npm install
```

Run the development server:

```bash
npm run dev
```

Run test cases:

```bash
npm run test
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.