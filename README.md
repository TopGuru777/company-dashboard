# Companies Directory

This project is a Next.js application that displays a list of companies. Users can view, select, and delete companies. The application uses infinite scrolling to load more companies as the user scrolls down.

## Table of Contents

- [Installation](#installation)
- [Running the Development Server](#running-the-development-server)
- [Building the Project](#building-the-project)
- [Running Tests](#running-tests)
- [Project Structure](#project-structure)
- [Additional Instructions](#additional-instructions)

## Installation

Ensure you have Node.js installed. This project requires Node.js and npm (Node Package Manager) installed on your development machine. You can download them from [nodejs.org](https://nodejs.org/).

Clone the repository:

```bash
git clone https://github.com/topguru777/company-dashboard.git
cd company-dashboard
```

Install dependencies:

```bash
npm install --legacy-peer-deps
```

## Running the Development Server

To start the development server, run:

```bash
npm run dev
```

This will start your Next.js application at [http://localhost:3000](http://localhost:3000).

## Building the Project

To build the project for production, use:

```bash
npm run build
```

This command will compile your application and prepare it for deployment by optimizing and minifying the code. The output will be in the `.next` directory.

## Running Tests

This project uses Jest and React Testing Library for testing. To run the tests, execute:

```bash
npm test
```

This will run all test suites and generate output detailing which tests passed and which failed. Make sure to add any necessary mock implementations for API requests as required by your test suites.

## Project Structure

- `pages/`: Contains the application's main pages, including `page.tsx`.
- `components/`: Contains reusable React components like `CompanyList` and `CompanyListItem`.
- `utils/`: Contains utility functions and API logic, such as `fetchCompanies` and `mockDeleteRequest`.

## Additional Instructions

- **API Integration**: Ensure that `fetchCompanies` and `mockDeleteRequest` are correctly configured in `utils/api.ts` or equivalent to make real API calls if applicable.
- **Styling & Libraries**:
  - Uses Tailwind CSS classes for styling components.
  - Includes `react-toastify` for notifications and `react-spinners` for loading indicators.
- **TypeScript**: This project is configured with TypeScript to enhance type safety and development experience.

Feel free to explore the documentation of these libraries for additional configuration and customization options.

---