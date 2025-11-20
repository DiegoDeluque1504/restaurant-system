## 📘 SYSTEM DOCUMENTATION – Restaurant Management System

## 1. Project Information

Project Name: _Restaurant Management System_\
Student Name: _Diego Armando De Luque Castillo_\
Course: _Bases de datos 2_\
Semester: _2025-2_\
Date: _20/11/2025_\
Instructor: _Jaider Quintero_

Short Project Description:\
This project is a web application for managing a restaurant. It allows the user to handle categories, dishes, tables, orders and deliveries, with a separate frontend (Angular) and backend (Django + Django REST Framework). The main goal is to practice full-stack development using REST APIs, authentication and basic CRUD operations.

---

## 2. System Architecture Overview

### 2.1 Architecture Description

The system follows a classic **client–server** structure:

- The **frontend** is an Angular SPA that runs in the browser and communicates with the backend using HTTP requests with JSON.
- The **backend** is built with Django and Django REST Framework. It exposes REST endpoints, manages business rules, performs validations and handles authentication/authorization using JWT.
- A **relational database** (MySQL by default) stores all persistent data (categories, dishes, orders, etc.).

In development, the typical setup is:

- Angular dev server: `http://localhost:4200`
- Django backend: `http://localhost:8000`

The frontend calls endpoints such as `/api/viewset/categories/`, `/api/generic/dishes/`, `/api/apiview/orders/`, `/api/decorator/deliveries/` and `/api/auth/*`.

### 2.2 Technologies Used

- **Frontend**:
  - Angular
  - TypeScript
  - HTML, CSS

- **Backend**:
  - Python
  - Django
  - Django REST Framework (DRF)
  - `djangorestframework-simplejwt` for JWT-based authentication

- **Database Engine**:
  - Default: MySQL (`django.db.backends.mysql`)
  - Optional support (configurable via environment variables): PostgreSQL, MSSQL, Oracle

- **Additional Libraries / Tools**:
  - `python-decouple` for environment configuration
  - `django-cors-headers` to configure CORS and allow the Angular app to call the API
  - REST Client `.http` files in `backend/tests/api` for manual API testing

### 2.3 Visual explanation of the system’s operation

```text
  Browser (User)
        |
        v
  Angular Frontend (SPA)
        |
   HTTP / JSON
        |
        v
  Django + DRF Backend
        |
        v
 Relational Database (MySQL / others)
```

---

## 3. Database Documentation

### 3.1 Database Description

The system uses a relational database to store all the information needed to operate the restaurant. The main ideas are:

- Each **category** groups several dishes.
- Each **dish** belongs to one category and has a price and a status.
- A **table** represents a physical table in the restaurant and has a capacity and a status.
- An **order** can be linked to a table (dine-in) and/or a delivery (home delivery).
- The **order details** store the list of dishes included in each order, with quantity and prices.
- A **delivery** contains information about the delivery address, customer, cost and delivery person.
- A **delivery person** is the user who physically takes the order to the customer.

### 3.2 ERD – Entity Relationship Diagram

The following diagram is a simplified textual version of the ERD:

```text
Category (1) --------< (N) Dish

Table (1) ----------< (N) Order

DeliveryPerson (1) -< (N) Delivery

Delivery (1) ------< (N) Order

Order (1) ---------< (N) OrderDetail >-------- (1) Dish
```

### 3.3 Logical Model

Main entities and their meaning:

- **Category**: logical group of dishes (for example, starters, main courses, desserts).
- **Dish**: item that can be ordered by a customer. It has a name, description, price, category and status.
- **Table**: physical table in the restaurant, identified by a number and with a capacity and a status.
- **Order**: represents a customer order. It has a date, status, type (dine-in, takeout, delivery), total and references to table and delivery (when applicable).
- **OrderDetail**: line of an order that represents one dish, with its quantity, unit price and subtotal.
- **DeliveryPerson**: person in charge of doing the delivery; includes name, phone and status.
- **Delivery**: stores information about address, phone, customer name, cost and the assigned delivery person.
- **User**: Django built-in auth user model, used for authentication and permissions.

### 3.4 Physical Model (Tables)


| Table            | Column              | Type           | PK/FK | Description                                              |
|------------------|---------------------|----------------|-------|----------------------------------------------------------|
| `categories`     | `id`                | int (auto)     | PK    | Category identifier                                      |
|                  | `name`              | varchar(100)   |       | Category name                                            |
|                  | `description`       | text           |       | Category description                                     |
|                  | `status`            | varchar(8)     |       | `ACTIVE` or `INACTIVE`                                  |
| `dishes`         | `id`                | int (auto)     | PK    | Dish identifier                                          |
|                  | `name`              | varchar(100)   |       | Dish name                                                |
|                  | `description`       | text           |       | Dish description                                         |
|                  | `price`             | decimal(10,2)  |       | Dish price                                               |
|                  | `category_id`       | int            | FK    | References `categories.id`                               |
|                  | `status`            | varchar(8)     |       | `ACTIVE` or `INACTIVE`                                  |
| `tables`         | `id`                | int (auto)     | PK    | Table identifier                                         |
|                  | `number`            | int (unique)   |       | Table number                                             |
|                  | `capacity`          | int            |       | Maximum number of people                                 |
|                  | `status`            | varchar(10)    |       | `AVAILABLE`, `OCCUPIED`, `RESERVED`                      |
| `orders`         | `id`                | int (auto)     | PK    | Order identifier                                         |
|                  | `date`              | datetime       |       | Order date and time                                      |
|                  | `status`            | varchar(10)    |       | `PENDING`, `PREPARING`, `READY`, `DELIVERED`, `CANCELLED` |
|                  | `total`             | decimal(10,2)  |       | Order total                                              |
|                  | `order_type`        | varchar(10)    |       | `DINE_IN`, `TAKEOUT`, `DELIVERY`                        |
|                  | `table_id`          | int (nullable) | FK    | References `tables.id`                                   |
|                  | `delivery_id`       | int (nullable) | FK    | References `deliveries.id`                               |
| `order_details`  | `id`                | int (auto)     | PK    | Order detail identifier                                  |
|                  | `order_id`          | int            | FK    | References `orders.id`                                   |
|                  | `dish_id`           | int            | FK    | References `dishes.id`                                   |
|                  | `quantity`          | int            |       | Quantity of the dish                                     |
|                  | `unit_price`        | decimal(10,2)  |       | Unit price                                               |
|                  | `subtotal`          | decimal(10,2)  |       | Subtotal for this dish in the order                      |
| `delivery_persons` | `id`              | int (auto)     | PK    | Delivery person identifier                               |
|                  | `name`              | varchar(100)   |       | Delivery person name                                     |
|                  | `phone`             | varchar(20)    |       | Phone number                                             |
|                  | `status`            | varchar(10)    |       | `AVAILABLE`, `BUSY`, `OFFLINE`                           |
| `deliveries`     | `id`                | int (auto)     | PK    | Delivery identifier                                      |
|                  | `address`           | varchar(255)   |       | Delivery address                                         |
|                  | `phone`             | varchar(20)    |       | Contact phone                                            |
|                  | `customer_name`     | varchar(100)   |       | Customer name                                            |
|                  | `cost`              | decimal(10,2)  |       | Delivery cost                                            |
|                  | `delivery_person_id`| int (nullable) | FK    | References `delivery_persons.id`                         |
| `auth_user`      | `id`                | int (auto)     | PK    | Django user identifier                                   |
|                  | ...                 | ...            |       | Standard Django auth fields                              |

---

## 4. Use Cases – CRUD

Below is an example of CRUD use cases for **Category**.  
The same structure can be applied to other entities (Dish, Table, Order, Delivery) if needed.

### 4.1 Use Case: Create Category

Actor:\
Admin or authorized staff user.

Description:\
Create a new category that will be used to classify dishes.

Preconditions:\
The user must be authenticated and have permission to access the category module.

Postconditions:\
A new category is stored in the database and becomes available in the dish module.

Main Flow:

1. The user opens the **Categories** page in the frontend.
2. The user clicks the **“New Category”** button.
3. The system shows a form requesting name, description and status.
4. The user fills in the fields and submits the form.
5. The frontend sends a `POST /api/mixins/categories/` or `POST /api/viewset/categories/` request.
6. The backend validates the data and creates the new record.
7. The API returns a 201 Created response with the category data.
8. The category appears in the category list on the frontend.

### 4.2 Use Case: Read Category

Actor:\
Admin or authorized staff user.

Description:\
View the list of existing categories and, optionally, inspect the details of one category.

Preconditions:\
There is at least one category stored in the database.

Postconditions:\
No change to the system state (read-only action).

Main Flow:

1. The user opens the Categories page.
2. The frontend sends a `GET /api/mixins/categories/` (or viewset equivalent).
3. The backend returns a list of categories in JSON format.
4. The frontend displays the categories in a table.
5. The user can click a row to see details (depending on the UI design).

### 4.3 Use Case: Update Category

Actor:\
Admin or authorized staff user.

Description:\
Update information (name, description, status) of an existing category.

Preconditions:\
The category exists and the user has permission to modify it.

Postconditions:\
The category data in the database is updated.

Main Flow:

1. The user selects a category from the list.
2. The user clicks the **Edit** button.
3. The system shows a form with current values.
4. The user modifies the desired fields and submits.
5. The frontend sends a `PUT` or `PATCH` request to `/api/mixins/categories/:id/` (or viewset).
6. The backend validates and updates the record.
7. The API returns the updated category.
8. The frontend refreshes the list or the details view with the new information.

### 4.4 Use Case: Delete Category

Actor:\
Admin or authorized staff user.

Description:\
Delete a category that is no longer needed in the system.

Preconditions:\
The category exists and the system allows it to be deleted (no blocking business rules).

Postconditions:\
The category is removed from the database (or marked as inactive, depending on the implementation).

Main Flow:

1. The user selects the category to delete from the list.
2. The user clicks the **Delete** button.
3. The system asks the user to confirm the deletion.
4. The frontend sends a `DELETE /api/mixins/categories/:id/` request.
5. The backend deletes the record or marks it as inactive.
6. The API returns a success status code (for example 204 No Content).
7. The frontend removes the category from the visible list.

---

## 5. Backend Documentation

### 5.1 Backend Architecture

The backend is organized as a typical Django project with multiple apps:

- Project folder: `backend/`
- Main project (settings and URLs): `backend/siterestaurant/`
- Apps under `backend/myapps/`:
  - `categories`
  - `dishes`
  - `orders`
  - `deliveries`
  - `users`
  - `utils` (custom permissions)

Django REST Framework is configured in `siterestaurant/settings.py` with JWT authentication and pagination.  
The main URL router is defined in `siterestaurant/urls.py`, where the different app routers and paths are included.

### 5.2 Folder Structure

```text
backend/
  manage.py
  requirements.txt
  siterestaurant/
    settings.py
    urls.py
    wsgi.py
    asgi.py
  myapps/
    categories/
      models.py
      serializers.py
      views.py
      views_viewset.py
      views_mixins.py
      urls.py
      urls_viewset.py
      urls_mixins.py
      templates/...
    dishes/
      models.py
      serializers.py
      views.py
      views_generic.py
      urls.py
      urls_generic.py
      templates/...
    orders/
      models.py
      serializers.py
      views.py
      views_apiview.py
      views_apiview_rewrite.py
      views_viewset.py
      urls.py
      urls_apiview.py
      urls_apiview_rewrite.py
      urls_viewset.py
      templates/...
    deliveries/
      models.py
      serializers.py
      views.py
      views_apiview_decorator.py
      urls.py
      urls_apiview_decorator.py
      templates/...
    users/
      models.py
      serializers.py
      views.py
      urls.py
    utils/
      permissions.py
  tests/
    api/
      auth.http
      categories.http
      deliveries.http
      dishes.http
      orders.http
```

### 5.3 API Documentation (REST)

Below are some of the main REST endpoints (prefixes come from `siterestaurant/urls.py`):

- **Categories (ViewSet + router)**  
  - `GET /api/viewset/categories/` – list categories  
  - `POST /api/viewset/categories/` – create category  
  - `GET /api/viewset/categories/:id/` – retrieve category  
  - `PUT/PATCH /api/viewset/categories/:id/` – update category  
  - `DELETE /api/viewset/categories/:id/` – delete category  

- **Categories (Mixins + GenericAPIView)**  
  - `GET /api/mixins/categories/`  
  - `POST /api/mixins/categories/`  
  - `GET /api/mixins/categories/:id/`  
  - `PUT/PATCH /api/mixins/categories/:id/`  
  - `DELETE /api/mixins/categories/:id/`  

- **Dishes (GenericAPIView)**  
  - `GET /api/generic/dishes/` – list dishes  
  - `POST /api/generic/dishes/` – create dish  
  - `GET /api/generic/dishes/:id/` – retrieve dish  
  - `PUT/PATCH /api/generic/dishes/:id/` – update dish  
  - `DELETE /api/generic/dishes/:id/` – delete dish  

- **Orders (APIView)**  
  - `GET /api/apiview/orders/` – list orders  
  - `POST /api/apiview/orders/` – create order  
  - `GET /api/apiview/orders/:id/` – retrieve order  
  - `PUT/PATCH /api/apiview/orders/:id/` – update order  
  - `DELETE /api/apiview/orders/:id/` – delete order  

- **Tables (ViewSet)**  
  - `GET /api/viewset/tables/` – list tables  
  - `POST /api/viewset/tables/` – create table  
  - `GET /api/viewset/tables/:id/` – retrieve table  
  - `PUT/PATCH /api/viewset/tables/:id/` – update table  
  - `DELETE /api/viewset/tables/:id/` – delete table  

- **Deliveries (APIView with decorator)**  
  - `GET /api/decorator/deliveries/` – list deliveries  
  - `POST /api/decorator/deliveries/` – create delivery  
  - `GET /api/decorator/deliveries/:id/` – retrieve delivery  
  - `PUT/PATCH /api/decorator/deliveries/:id/` – update delivery  
  - `DELETE /api/decorator/deliveries/:id/` – delete delivery  

- **Authentication (users)**  
  - `POST /api/auth/register/` – register new user  
  - `POST /api/auth/login/` – obtain access and refresh tokens  
  - `POST /api/auth/logout/` – logout (token blacklist or client-side remove)  
  - `GET /api/auth/profile/` – get logged in user profile  
  - `POST /api/auth/token/refresh/` – refresh access token  

#### Example: Create Dish

Method Path: `POST /api/generic/dishes/`

Purpose:\
Create a new dish associated with an existing category.

Request Body Example:

```json
{
  "name": "Pasta Bolognese",
  "description": "Traditional pasta with meat sauce",
  "price": 19.99,
  "category": 1,
  "status": "ACTIVE"
}
```

Possible responses:

- **201 Created** – dish created successfully.
- **400 Bad Request** – validation errors (missing fields, wrong types, etc.).

### 5.4 REST Client

For manual testing of the API, the project includes `.http` files (for VS Code REST Client or similar) under `backend/tests/api/`:

- `auth.http`
- `categories.http`
- `deliveries.http`
- `dishes.http`
- `orders.http`

Each file contains sample HTTP requests that can be executed directly to verify that the endpoints are working as expected.

---

## 6. Frontend Documentation

### 6.1 Technical Frontend Documentation

Framework Used:\
Angular (standalone components and Angular Router).

Folder Structure (simplified):

```text
frontend/
  src/
    app/
      app.ts
      app.routes.ts
      core/
        guards/
          auth-guard.ts
          no-auth-guard.ts
        interceptors/
          auth.interceptor.ts
          error.interceptor.ts
        models/
          category.model.ts
          dish.model.ts
          order.model.ts
          table.model.ts
          delivery.model.ts
          user.model.ts
        services/
          api.ts
          auth.ts
          categories.service.ts
          dishes.service.ts
          orders.service.ts
          deliveries.service.ts
          tables.service.ts
          storage.ts
          loading.ts
      features/
        auth/
          login/
          register/
        home/
        categories/
          category-list/
          category-form/
        dishes/
          dish-list/
          dish-form/
        orders/
          ...
        tables/
          ...
        deliveries/
          ...
      shared/
        components/
          (reusable UI components)
    environments/
      environment.ts
      environment.prod.ts
```

Models, services and Components:

- **Models** (under `core/models`):  
  Define TypeScript interfaces that mirror backend entities, for example:
  - `Category`, `Dish`, `Order`, `OrderDetail`, `Table`, `Delivery`, `DeliveryPerson`.
  - They also define enums like `OrderStatus`, `OrderType`, `TableStatus`, `DeliveryPersonStatus`.

- **Services** (under `core/services`):  
  Encapsulate HTTP calls and business logic for the frontend:
  - `auth.ts`: login, registration, token management.
  - `api.ts`: shared HTTP logic (base URL, request helpers).
  - `categories.service.ts`, `dishes.service.ts`, `orders.service.ts`, `deliveries.service.ts`, `tables.service.ts`: CRUD operations for each entity.
  - `storage.ts`: localStorage/sessionStorage abstraction for tokens and user data.
  - `loading.ts`: simple loading state management.

- **Guards**:
  - `auth-guard.ts`: only allows access to certain routes if the user is authenticated (valid token present).
  - `no-auth-guard.ts`: prevents authenticated users from going back to login/register pages.

- **Interceptors**:
  - `auth.interceptor.ts`: adds the `Authorization: Bearer <token>` header to each outgoing request if a token is available.
  - `error.interceptor.ts`: central place to handle HTTP errors (for example, redirect on 401).

### 6.2 Visual explanation of the system’s operation

High level flow:

```text
User -> Angular Router -> Feature Component -> Service -> HTTP -> Django API -> Database
```

Typical example:

1. User clicks on “Categories” in the menu.
2. Angular router loads the category list component.
3. The component calls `CategoriesService`.
4. The service sends `GET /api/viewset/categories/`.
5. The backend returns JSON with category data.
6. The component displays the result in a table.

---

## 7. Frontend–Backend Integration

- The base API URL is defined in `environment.ts` (for example, `http://localhost:8000`).
- All domain-specific services (`categories.service.ts`, `dishes.service.ts`, `orders.service.ts`, etc.) build URLs using that base.
- Authentication:
  - When a user logs in, the backend returns an **access token** and possibly a **refresh token**.
  - The frontend stores these tokens using `storage.ts`.
  - For each request, `auth.interceptor.ts` reads the token and attaches it as a `Bearer` token in the `Authorization` header.
- Error handling:
  - If the backend returns `401 Unauthorized`, the error interceptor can clear tokens and redirect to the login page.

In general, the integration is “thin”: the frontend is responsible for presentation and basic validation, while the backend enforces business rules and data consistency.

---

## 8. Conclusions & Recommendations

- The separation between Angular (frontend) and Django + DRF (backend) makes the system easier to maintain and extend.
- The use of REST and JWT is aligned with modern web application practices.
- The project demonstrates several DRF approaches (ViewSet + Router, GenericAPIView, APIView, decorators), which is useful from an educational point of view.

Some possible improvements for future versions:

- Add role-based access control (for example, admin vs waiter vs delivery person).
- Improve the UI/UX with more detailed feedback (toasts, spinners, better error messages).
- Add automated tests for both backend and frontend to increase reliability.
- Document an OpenAPI/Swagger specification directly from the backend.

---
