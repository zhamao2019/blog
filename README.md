# Blog Application
This blog application is developed with Django backend, Angular frontend and PostgresSQL.
The features implemented currently are:
* Display blogs and a live weather of Ottawa
* Login/Register
* View/Edit/Delete blog
* View/Edit user profile
* Notification prompts after user successful actions.

## Demo
### Home Page
* Listing all the blogs and displaying the live weather of Ottawa by external API
* User can Login / Register

<img width="1120" alt="image" src="https://user-images.githubusercontent.com/48576566/153674659-85cef73a-20a0-4794-94e5-f9103add1ef8.png">

### Login and Register Page
* Login and register with frontend validation and token validation
* Implement password reset function. A simulate reset password email will display in Django console.

![image](https://user-images.githubusercontent.com/48576566/153676293-06dc4d66-063a-4071-986a-92e80411a06b.png)
![image](https://user-images.githubusercontent.com/48576566/153676538-9987c5bf-37a3-47a2-aa2d-543dc3a6ebf5.png)
![image](https://user-images.githubusercontent.com/48576566/153676626-c872fecf-2593-44a3-814d-05fbd6b2759b.png)
![image](https://user-images.githubusercontent.com/48576566/153676819-9b4b235b-383d-4c53-a572-12ef9f44c1d6.png)
![image](https://user-images.githubusercontent.com/48576566/153676891-b6059543-43ab-4ad6-aebd-1565fb68321d.png)

### Blog detail page
* Displaying the content and comments of a blog, the content is a rich text API. Only author can edit/delete the blog.
* User can add comments after login. Only the author of the comment have permission to delete the author's comments.
* User can creat/edit blog with rich text.
* Ater update/create, a notification will be displayed.

![image](https://user-images.githubusercontent.com/48576566/153677953-23bf55fa-57e6-4370-a162-bfa4719e434e.png)
![image](https://user-images.githubusercontent.com/48576566/153677254-2e8e2cbc-7fe3-45c1-adcf-d06d12328688.png)
![image](https://user-images.githubusercontent.com/48576566/153678053-aef6760e-5d3a-488c-9e70-e4b38b74dc4f.png)

### User Profile Page
* Displaying an user's account info and post history.

![image](https://user-images.githubusercontent.com/48576566/153678751-7a1d23a7-551c-4047-876e-aeeb571e587f.png)
