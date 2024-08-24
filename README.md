# Order Processing System

## Overview

This is a backend application for managing an order processing system using NestJS, Objection.js, Knex, and PostgreSQL. The application provides CRUD functionality for handling various entities like Orders, Meals, Brands, and CalculatedOrders.

## Features

- **NestJS Framework**: A scalable and maintainable structure for building server-side applications.
- **Objection.js**: A SQL-friendly ORM for managing database queries and schema in a more intuitive way.
- **Knex.js**: A SQL query builder used for handling migrations and complex queries.
- **PostgreSQL**: A reliable and robust relational database for storing application data.
- **WebSocket Gateway**: Real-time order status updates using WebSocket for enhanced user experience.

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- PostgreSQL (latest version recommended)
- yarn

### Installation

1. **Clone the Repository**:
    ```bash 
    git clone git@github.com:stepheng323/order-processing.git
    cd order-processing
    ```
]
2. **Install Dependencies**:
    ```bash
    yarn install
    ```

3. **Set Up Database**:
    - Install PostgreSQL and create a new database:
      ```bash
      createdb order_processing_db
      ```
    - Configure your database settings in the `.env` file:
      ```bash
      DATABASE_URL=DATABASE_URL=postgres://postgres:postgres@localhost:5432/order_processing_db
      ```

4. **Run Database Migrations**:
    ```bash
    yarn run migrate
    ```

5. **Start the Application**:
    ```bash
    npm run start:dev
    ```
### Project Structure

- `src/`
    - `resources/`
        - `orders/` - Contains the order-related modules, services, controllers, and DTOs.
        - `meals/` - Contains the meal-related modules, services, controllers, and DTOs.
        - `brands/` - Contains the brand-related modules, services, controllers, and DTOs.
        - `calculated-orders/` - Contains the calculated order-related modules, services, controllers, and DTOs.
    - `lib` - Contains shared modules. it contains database migrations, models etc
    - `utils` - Contains utility functions.
    - `repo/` - Contains query for each model.
- `knexfile.js` - Knex configuration file for migrations and seeds.

### Usage

1. **Create Orders**:
    - Use the `POST /orders` endpoint to create new orders.
2. **Get Orders**:
    - Use the `GET /orders` endpoint to retrieve a list of all orders.
3. **Update Orders**:
    - Use the `PATCH /orders/:id` endpoint to update an existing order.
4. **Delete Orders**:
    - Use the `DELETE /orders/:id` endpoint to remove an order.

