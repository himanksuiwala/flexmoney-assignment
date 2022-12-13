# Yoga Classes Admission Form

This project is created using :

- For client-side : React.js
- For **server-side (backend)** : Node.js + Express.js + MongoDB

---

## ER Design of DB Schema

Here I have created 3 different tables:

1. **Customer** - Stores the customer’s data, who is getting enrolled for yoga classes.
    
    Having Attributes:
    
    1. Customer_Id → System generated *Id* which acts a ***primary key*** of the table.
    2. First_name → Holds the first name of Customer
    3. Last_name → Holds the last name of Customer
    4. Sex → Holds the Gender/Sex of Customer
    5. DoB(Date of Birth) → Holds the DoB of Customer to validate whether he/she is eligible or not.
    6. Email → Holds the email address, which is used to identify uniquely & find the existing customer.
    7. Date_of_Joining → System generated timestamp which records the date on which user first enrolled for classes.
2. **Batch -** Keeps track of active batches available to Customer
    
    Having Attributes:
    
    1. Batch_Id → System generated Id acting as primary key, uniquely defining a batch.
    2. Batch_name → Holds name of the batch.
    3. Strt_time(*in hrs*) → Holds starting time of the batch.
    4. End_time(*in hrs*) → Holds ending time of the batch.
    5. Instructor_name → Holds the name of instructor teaching yoga.
3. **Subscription -** Keeps track of subscription of all customers who’ve enrolled themselves in yoga classes.
    
    Having Attributes:
    
    1. Subscription_Id → System generated unique id acting a primary key of the table.
    2. Customer_Id → Same Id from **Customer Table** to which it has been ***referred*** to.
    3. Batch_Id → Id from Batch Table.
    4. Subscription_strt → Holds the date from when customer wants to start yoga.
    5. Subscription_valid_till → Holds the date as *end of the month* in reference to *Subscription_strt**,*** as customer will avail service only till the end of the month(irrespective of start of subscription)
    
    *Moreover, This table is joined with reference to Customer_Id & Batch_Id respectively.*
    

![Database ER diagram (Yoga Classes).png](https://raw.githubusercontent.com/himanksuiwala/flexmoney-assignment/80e236ef10cf807b0e50cc80d96631db8848a643/Yoga%20Classes%20Admission%20Form%201f0c953aa9904f6691bc04d7efb6a94d/Database%20ER%20diagram%20(Yoga%20Classes)1.png)
----
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.
