# Description

Front End for: 
* Register users
* Authentication users
* Consulting recalls by API recalls (Back End) in 2 different categories, Electronics and Vehicles



In the folder documentation, you can find information about the population of collections through this API and external API's.


# Dependencies
    "axios": "^1.12.2",
    "next": "15.5.3",
    "react": "19.1.0",
    "react-dom": "19.1.0",
    "zod": "^4.1.12"

    
# Structure Project
The folder structure designed by our software architects ensures adherence to best practices:
src/app/
- `about`: Contains informative page public.
- `register`: Contain public register of user.
- `componnets`: Mininmal components for consult request.
- `interfaces`: Interfaces defined to manage objects internal componnets.
- `.env`: Stores environment variables, such as API URL, ans .
- `lib`: Contain function to request methods API (Auth, Register, Get Categories, get Manufacturers, get recalls).
- `styles`: Manages the customized css styles.'
- `layout.tsx`: Layouit general.
- `page.tsx`: Home Page.



This structure provides a solid foundation for building a well-organized, scalable backend service. By separating concerns into dedicated directories and files, your project remains clean, navigable, and easier to debug and extend.

# ENV configuration
API_URI  : Url API server included route base /api/
PROTECCION_BY_PASS= kind of by pass to use if you don't use NA
PASS_ENCODED= pass by bass encoded on base64

- NHTSA Datasets and APIs

NHTSA's New Car Assessment Program conducts crash tests to determine how well a vehicle protects its occupants during a crash, and rollover resistance tests to determine the risk of a vehicle rolling over in a single-vehicle crash. Also, NCAP conducts advanced driver assistance system tests to determine how well the system avoids a crash.   

https://www.nhtsa.gov/nhtsa-datasets-and-apis

- CPSC Recalls Retrieval  

The Recall Retrieval Web Services are part of the CPSC Recall Database project.  The services are implemented as REST 
web services and provide access to the Recall CThe Recall Retrieval Web Services are part of the CPSC Recall Database project.  The services are implemented as REST 

https://www.saferproducts.gov/


This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
