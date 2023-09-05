# Skulmina - Next.js School Management Project

Welcome to Skulmina, a Next.js School Management Project! This README will guide you through the setup process and provide important information for getting started.

## Table of Contents

1. [Introduction](#introduction)
2. [Prerequisites](#prerequisites)
3. [Getting Started](#getting-started)
4. [Configuration](#configuration)
5. [Installation](#installation)
6. [Running the Project](#running-the-project)
7. [Contributing](#contributing)
8. [License](#license)

## 1. Introduction

Skulmina is a Next.js-based school management project designed to streamline various school administrative tasks. This README will help you set up the project on your local machine.

## 2. Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm (Node Package Manager) installed on your machine. You can download them from [nodejs.org](https://nodejs.org/).

## 3. Getting Started

To get started with Skulmina, follow these steps:

1. Clone the Skulmina repository to your local machine:

   ```bash
   git clone https://github.com/thekontinet/skulmina.git
   ```

2. Change into the project directory:

   ```bash
   cd skulmina
   ```

## 4. Configuration

Skulmina uses environment variables for configuration. You need to create a local configuration file based on the provided example:

1. Copy the `.env.example` file to `.env.local`:

   ```bash
   cp .env.example .env.local
   ```

2. Open the `.env.local` file in your preferred text editor and set the `NEXT_PUBLIC_API_ENDPOINT` variable to:

   ```bash
   NEXT_PUBLIC_API_ENDPOINT=https://skuminia.rolomtech.com/api/v1
   ```

   Replace `https://skuminia.rolomtech.com/api/v1` with the actual API endpoint you want to use.

## 5. Installation

To install the project dependencies, run the following command in the project directory:

```bash
npm install
```

## 6. Running the Project

Now that you have completed the setup, you can run the Skulmina project locally using the following command:

```bash
npm run dev
```

This will start the development server, and you can access the application in your web browser at `http://localhost:3000`.

## 7. Contributing

If you wish to contribute to Skulmina, please read our [Contributing Guidelines](CONTRIBUTING.md) for more information on how to get started.
