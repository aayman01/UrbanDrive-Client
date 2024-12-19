# UrbanDrive Car Rental Website

UrbanDrive is an advanced car rental platform providing a seamless experience for users to browse, book, and manage rental cars. The project features a responsive, interactive frontend, secure backend, and various functionalities designed for ease of use across devices. This repository showcases both frontend and backend code to deliver a comprehensive car rental solution.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Setup and Installation](#setup-and-installation)
5. [Usage](#usage)
6. [Challenges](#challenges)
7. [Future Improvements](#future-improvements)
8. [Contributions](#contributions)

---

### Project Overview

UrbanDrive is developed to make renting cars convenient and efficient. It provides users with real-time data on car availability, a secure booking process, and streamlined communication through live chat support. The admin dashboard enables easy moderation and approval of car listings.

### Features

- **Responsive Design**: Optimized for desktops, tablets, and mobile devices.
- **Dynamic Car Listings**: Real-time data fetching for up-to-date car availability.
- **Car Details & Booking**: Users can view car details, select rental durations, and calculate total costs dynamically.
- **Review and Rating System**: Allows users to submit and view car reviews and ratings.
- **Checkout and Payment**: Multi-step checkout form with real-time input validation and secure data handling.
- **Car Hosting System**: Hosts can submit cars with complete rental details and await admin approval.
- **Admin Controls**: Pending car approval system for maintaining a high-quality selection of available vehicles.
- **Live Chat Support**: Real-time communication for users with Stream Chat integration.

### Technologies Used

#### Frontend
- **React** (TypeScript)
- **Tailwind CSS**: For responsive and adaptable UI styling.
- **React Awesome Reveal & Framer Motion**: For animations enhancing user experience.
- **Axios & TanStack Query**: Efficient data fetching and caching.
- **Firebase**: For user authentication and session management.
- **Additional Libraries**: Date-range picker and Stream Chat.

#### Backend
- **Node.js & Express**: Server-side logic and API route management.
- **MongoDB**: For secure and scalable data storage.

### Setup and Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/UrbanDrive.git
   cd UrbanDrive
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory with the following:
   - Firebase configuration for authentication
   - MongoDB URI for database connection
   - Any other necessary API keys

4. **Run the development server**:
   ```bash
   npm start
   ```

5. **Open the application** in your browser at `http://localhost:8000`.

### Usage

- **Explore Car Listings**: Browse through available rental cars and select your rental duration.
- **Book a Car**: Fill out the checkout form, including payment details.
- **Become a Host**: Submit a car through the multi-step hosting form.
- **Admin Access**: Approve or reject pending cars in the admin dashboard.

### Challenges

- **JSX to TSX Migration**: Transitioned from JSX to TSX, ensuring all elements and props are strongly typed for better code reliability.
- **Translatation**: Translation english to bangla
- **Dynamic Review System**: Implemented a dynamic and robust review system where user can review by categories and proveide feedback.

### Future Improvements

- **Enhanced User Experience**: Additional features for user profile management and past bookings.

### Contributions

Contributions are welcome! Feel free to open issues and suggest new features.
