<h1 align="center">
	Server from ANNOTATIONS  
</h1>

<p align="center">NodeJS</p>

<p align="center">
  <img alt="License" src="https://img.shields.io/badge/NodeJS-green">
  <img alt="License" src="https://img.shields.io/badge/Biome-blue">
  <img alt="License" src="https://img.shields.io/badge/Postgres-blue">
  <img alt="License" src="https://img.shields.io/badge/TypeScript-blue">

  <a href="https://beacons.ai/dscostat7/" target="_blank">
    <img alt="by Diego Souza" src="https://img.shields.io/badge/Made%20by-Diego%20Souza-blue">
  </a>

  <a href="https://www.linkedin.com/in/dscostat7/" target="_blank">
    <img alt="Follow me Linkedin" src="https://img.shields.io/badge/Follow%20up-Diego%20Souza-2ecc71?style=social&logo=linkedin">
  </a>
</p>


## 🚀 Project

This is a server in NodeJS for application ANNOTATIONS.

## 🔧 Technologies

- NodeJS
- TypeScript
- Biome
- Postgres

## 🚧 Dev dependencies:

- Biome
- Drizzle Kit
- TSX
- TypeScript

## 🚧 Prod dependencies:

- Paralleldrive/cuid2
- DayJS
- Drizzle ORM
- Fastify
- Postgres
- Zod

## 💻 Commands for use

- Start container docker `docker-compose up -d`
- Run project local `npm install` and `npm run dev`
- Populate DB automatic examples `npm run seed`
- To see DB in interface web, run `npm drizzle-kit studio`

## 🎮 For add new columns in DB

Add in file `src/db/schema.ts`:
- After run `npx drizzle-kit generate` for generate a migrations file
- Run `npx drizzle-kit migrate` for run migrations


---

Developed by <a href="https://beacons.ai/dscostat7/" target="_blank">Diego Souza</a>

---
