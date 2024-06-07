## About This Project
This is a car rental service in which user can provide details like name, email, choose car, duration etc. After providing all the details the user can print or download the invoice.

## How To Operate
The User have to provide the customer details and select a duration must . There are 3 number input fields which are week, day, hour in the duration section. For example if the user want to rent the car for 9 days and 3 hours the value of the week field will be 1 , day will be 2 and hour will be 3 after providing these information correctly the system will calculate the price according to the pricing details from the api for different vehicles. The discount will be applied on the overall price but not in the damage or tax. There are options to select the vehicle. For this the user must select the vehicle type first. I have indentified the unique types from the api. After selecting the vehicle type the user can select available models for that specific type.

## Invoice
After providing all the necessary data the user can simply print or download the invoice by clickig on the print/download button at the right-top of the screen.

## Used Tech
I have used React js, React router and Tailwind Css for this project.

## Bonus
Problem:  Let's say you have a Tesla in your system that charges $10 per hour and $50 per day. What occurs now if the car is rented for six hours? Is the customer willing to pay more than the daily rate for one-fourth of the period? Regarding the hourly, daily, and weekly rate systems, how do you handle this issue? Describe your solution in the readme file of your project.

Solution:
We can compare the daily rate with the hourly rate. If the hourly rate gets more expensive than the daily rate than the system automatically calculates the cost using both the hourly rate and the daily rate. The system will choose the lower cost between the two calculations and applies that amount to the final rental fee. For example if the daily rate is $100 and hourly rate is $10 the system will calculate the usual daily rate till 10 hours but if the user chooses more than 10 hours than the system will grant him/her the daily rate to satisfy the user. I haven't implemented this system in this project but I can do this 
