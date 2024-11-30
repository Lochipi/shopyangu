# ShopYangu Admin Panel

## Description

ShopYangu is a growing e-commerce platform, and the Admin Panel is designed to help manage shops and products listed on the platform. This admin panel allows administrators to easily add, update, and delete shops and products, as well as track important metrics for platform performance.

## Features

### Core Features

1. **Shop Management**:

   - **Create New Shop**: Add new shops with details like Shop Name, Description, and Logo.
   - **Update Shop Details**: Edit existing shop details such as Shop Name, Description, and Logo.
   - **Delete Shop**: Delete shops that have no products; if the shop has products, a warning will prevent deletion until products are removed or reassigned.
   - **View Shop List**: View a list of shops, and perform actions such as updating or deleting them.

2. **Product Management**:

   - **Create New Product**: Add new products to shops with details like Product Name, Price, Stock Level, Description, and Image.
   - **Update Product Details**: Modify product details, such as Price, Stock Level, and Description.
   - **Delete Product**: Remove products from shops.
   - **View Product List**: View a list of products with details such as Name, Price, Stock Level, and Image. The list is sortable, searchable, and paginated.

3. **Search, Filter, and Pagination**:
   - Search products by name.
   - Filter products by Price, Stock Level, or Shop.
   - Paginated product list for easier browsing.

### Bonus Features (Dashboard)

1. **Overview Metrics**:

   - **Total Number of Shops**: The total number of active shops on the platform.
   - **Total Number of Products**: The total number of products listed across all shops.
   - **Total Value of Products in Shops**: Calculated based on product prices and stock levels.
   - **Total Stock Level**: Total number of items in stock across all shops.

2. **Product Stock Status**:

   - **Stock Status Distribution**: A graph showing product distribution by stock status (In Stock, Low Stock, Out of Stock).
   - **Top 5 Shops by Stock Level**: A list of the top 5 shops based on stock levels.

3. **Real-Time Data Updates**:
   - Dynamic updates when changes are made, such as adding new products or updating stock levels.

### UI/UX Requirements

- **Responsive Design**: The admin panel is fully responsive on both desktop and mobile devices.
- **Intuitive Interface**: Simple and easy navigation to access shops, products, and metrics quickly.

---

## Tech Stack

- **Frontend**: Next.js, Mantine (for components), Tailwind CSS (for styling).
- **Backend**: API integrated using tRPC.
- **Database**: Prisma with PostgreSQL on Supabase for serverless database handling.
- **Image Handling**: UploadThing (for handling images in the S3 way).
- **Form Handling**: Mantine Forms with Zod validation for form validation.
- **State Management & Caching**: React Query.

---

## Setup Instructions

To run the app locally, follow these steps:

### Prerequisites

- Node.js (preferably v16 or above)

### Steps to Set Up

1. **Clone the Repository**:

   ```bash
   // clone the repo
   git clone https://github.com/lochipi/shopyangu
   cd shopyangu

   // install deps
   npm install
   ```

2. Set Up Environment Variables: Create a .env.local file in the root directory and add the following environment variables (replace with your actual values):

Please reach out to [me](corneliuslochipi@gmail.com) for secret variables.

3. Run the Development Server:

```bash
npm run dev
```

4. Open your browser and visit `http://localhost:3000` to view the admin panel.

## Testing the Admin Panel

The admin panel provides several features that allow you to manage shops and products effectively. Here’s how to test its functionality:

### 1. Shop Management

- **Create New Shop**:  
  Use the "create Shop" button to create a new shop. Ensure that the following fields are correctly populated:

  - Shop Name
  - Description
  - Logo

- **Update Shop**:  
  Edit a shop’s details and verify that the changes are accurately reflected in the shop list.

- **Delete Shop**:
  - Attempt to delete a shop that has products and ensure that you are warned before proceeding.
  - Delete a shop without products and confirm that it is successfully removed from the list.

### 2. Product Management

- **Create New Product**:  
  Add a new product with the following details:

  - Name
  - Price
  - Stock Level
  - Image

- **Update Product**:  
  Modify product details, such as price, stock level, or description, and ensure the updates are reflected in the product list.

- **Delete Product**:  
  Remove a product and verify that it is successfully removed from the product list.

### 3. Dashboard

- **Check Metrics**:  
  Review the dashboard metrics, including:

  - Total number of shops
  - Total number of products
  - Total stock level
  - Stock status distribution graph

- **Dynamic Updates**:  
  Ensure that metrics on the dashboard update dynamically when:
  - Shops or products are added
  - Shops or products are removed
 
### snips

##### Dashboard
![image](https://github.com/user-attachments/assets/420cf607-ddd8-4603-bcce-aeae74c92edd)

##### shops
![image](https://github.com/user-attachments/assets/d47f0497-10e2-455c-9fcd-fb13ac2a2c55)

##### individual shop
![image](https://github.com/user-attachments/assets/4594b6dc-5c0b-499b-ac01-a41e072d299b)

##### edit product
![image](https://github.com/user-attachments/assets/0ff57b86-85c3-487e-bcd7-c3ec1ea3bdfe)

##### new product
![image](https://github.com/user-attachments/assets/e3b9aea3-6a48-4145-b719-ec53890004ee)

####### enjoy managing your shops
