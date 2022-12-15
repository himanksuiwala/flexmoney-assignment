# Yoga Classes Admission Form

This project is created using :

- For client-side : React.js
- For **server-side (backend)** : Node.js + Express.js + MongoDB


## ER Design of DB Schema

Here I have created 3 different tables & populate the tables with some data as shown below:

1. **Customer** - Stores the customer’s data, who is getting enrolled for yoga classes.
    
    Having Attributes:
    
    1. Customer_Id → System generated *Id* which acts a ***primary key*** of the table.
    2. First_name → Holds the first name of Customer
    3. Last_name → Holds the last name of Customer
    4. Sex → Holds the Gender/Sex of Customer
    5. DoB(Date of Birth) → Holds the DoB of Customer to validate whether he/she is eligible or not.
    6. Email → Holds the email address, which is used to identify uniquely & find the existing customer.
    7. Date_of_Joining → System generated timestamp which records the date on which user first enrolled for classes.
    
        ![Customer Model.png](https://raw.githubusercontent.com/himanksuiwala/flexmoney-assignment/main/Yoga%20Classes%20Admission%20Form%201f0c953aa9904f6691bc04d7efb6a94d/Screenshot_CustomerModel.png)
    
2. **Batch -** Keeps track of active batches available to Customer
    
    Having Attributes:
    
    1. Batch_Id → System generated Id acting as primary key, uniquely defining a batch.
    2. Batch_name → Holds name of the batch.
    3. Strt_time(*in hrs*) → Holds starting time of the batch.
    4. End_time(*in hrs*) → Holds ending time of the batch.
    5. Instructor_name → Holds the name of instructor teaching yoga.
    
        ![Customer Model.png](https://raw.githubusercontent.com/himanksuiwala/flexmoney-assignment/main/Yoga%20Classes%20Admission%20Form%201f0c953aa9904f6691bc04d7efb6a94d/Screenshot_BatchModel%20.png)
3. **Subscription -** Keeps track of subscription of all customers who’ve enrolled themselves in yoga classes.
    
    Having Attributes:
    
    1. Subscription_Id → System generated unique id acting a primary key of the table.
    2. Customer_Id → Same Id from **Customer Table** to which it has been ***referred*** to.
    3. Batch_Id → Id from Batch Table.
    4. Subscription_strt → Holds the date from when customer wants to start yoga.
    5. Subscription_valid_till → Holds the date as *end of the month* in reference to *Subscription_strt**,*** as customer will avail service only till the end of the month(irrespective of start of subscription)
    
        ![Customer Model.png](https://raw.githubusercontent.com/himanksuiwala/flexmoney-assignment/main/Yoga%20Classes%20Admission%20Form%201f0c953aa9904f6691bc04d7efb6a94d/Screenshot_SubscriptionModel.png)
    
    *Moreover, This table is joined with reference to Customer_Id & Batch_Id respectively.*
    

![Database ER diagram (Yoga Classes).png](https://raw.githubusercontent.com/himanksuiwala/flexmoney-assignment/80e236ef10cf807b0e50cc80d96631db8848a643/Yoga%20Classes%20Admission%20Form%201f0c953aa9904f6691bc04d7efb6a94d/Database%20ER%20diagram%20(Yoga%20Classes)1.png)

## Assumptions & Approach

I implemented the project using **Tier-3 Architecture** i.e. seperated the client-side from server-side & server-side from database. Used MongoDB as db.

Deployed the seperate Server using **Cyclic** & client-side using **Vercel**

Link for Server repository : https://github.com/himanksuiwala/flexmoney-server

I’ve create the form using vanilla CSS & HTML.

When user loads the site, on home page the first form is **Email-form.**

### 1.Email-Form

Its asks for User’s email.

***Why does it asks for email in first step ?***

As stated earlier, *email* is used to *uniquely identify* a person in DB, with the help of email first of all it will check whether user exists of not. Accordingly we will proceed further.

Case 1: If Users Exists → Load the **Subscription-Form**

Case 2: If Users does not Exists → Load the **Registration Form →** Load the **Subscription-Form.**

### 2.**Registration-Form**

After passing through Email-Form, This is used to register the Customer/ User for the first time. Although this registration is ***one-time-only.***

Customer submits various details as name, contact, DoB & others as stated in ER description.

Implemented a *customDoB validator* using RegEx which will tell whether eligible to register or not.

After getting successfull response on submission it proceeds to next Subscription-Form.

### 3.Subscription-Form

This is the final form through which the user will select across various available batches & makes final payment.

Here I’ve added listbox for list of available batches which is fetched from server itself.

User selects Mode of Payment for subscription accor. to his/her convinience.

User selects the Date to start subscription with, and calculate the *end of month* with that ref.

Moreover to **prevent user from choosing the batch in same month** we can exec. a query in db checking for a user’s subscription in dB.

**CompeletePayment** function dispatches the data to server to store data in dB & alerts the user on getting sucessful response.

## API Endpoints

Server for the project is available on [Here](https://github.com/himanksuiwala/flexmoney-server) 

Following are the used Custom scripted endpoints used to communicate with server and performs the respective operations:

1. **`/findUser` →** Passes the user’s email as user_id to check if user exists or not.
2. `/registerUser` → Used in storing the values into dB.
3. `/addBatch` → Used whenever a new batch is to be introduced.
4. `/subscribe` → Saves the subscription information when subscribed by user.
