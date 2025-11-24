# Product Search Application

## Overview

**Product Search** is a modern, responsive web application that allows users to search, filter, and browse products efficiently. The project demonstrates full-stack development using **MERN (MongoDB, Express, React, Node.js)** with enhanced UI/UX using **Tailwind CSS** and dynamic animations via **Framer Motion**.

Users can perform advanced searches, sort products by price, rating, alphabetical order, or recency, and view detailed product information.

---

## Features

* **Dynamic Product Search**: Search products in real-time with auto-suggestions.
* **Sorting & Filtering**: Sort by price, rating, alphabetical order, or recent entries.
* **Recent Searches**: Stores and displays the user's recent search terms.
* **Responsive Design**: Fully responsive across devices.
* **Dark Mode Support**: Light and dark themes for better UX.
* **Smooth Animations**: Engaging UI animations for product cards using Framer Motion.
* **Single Page Frontend**: Built entirely in React for a seamless experience.

---

## Technologies Used

* **Frontend**: React, Tailwind CSS, Framer Motion
* **Backend**: Node.js, Express.js
* **Database**: MongoDB (Atlas)
* **Others**: Axios, dotenv

---

## Installation

1. **Clone the repository**

```bash
git clone https://github.com/Mathesh-299/VisioinDock.git
cd product-search
```

2. **Backend Setup**

```bash
cd backend
npm install
cp .env.example .env
# Update MongoDB URI in .env file
npm run dev
```

3. **Frontend Setup**

```bash
cd frontend
npm install
npm start
```
backend on `https://visiondock.onrender.com`.

---

## API Endpoints

* **GET /api/products?query=&price=&rating=&alpha=&recent=**

  * Search and filter products dynamically
  * Parameters:

    * `query`: Search keyword
    * `price`: `asc` or `desc`
    * `rating`: `asc` or `desc`
    * `alpha`: `asc` or `desc`
    * `recent`: `true` or `false`

* **POST /api/recent-search**

  * Save a new search term.

* **GET /api/recent-search**

  * Fetch recent search terms.

---

## Database Model

**Product**

* `id`: String
* `name`: String
* `category`: String
* `price`: Number
* `rating`: Number
* `image`: String (URL)

**RecentSearch**

* `term`: String
* `createdAt`: Date

---

## Screenshots
### Landing Page
![alt text](image.png)
### Recent History
![alt text](image-1.png)
---

## Future Enhancements

* Pagination for large product datasets.
* Integrate **MeiliSearch** or Elasticsearch for faster search.
* User authentication & personalized recommendations.
* Wishlist or cart functionality.

---

## License

MIT License
