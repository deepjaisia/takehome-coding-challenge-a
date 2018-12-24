# Install and run application
1. Git clone the application from the repository
2. Run `npm install` in terminal/windows powershell
3. After installation run `npm run start` in terminal/windows powershell

# Link to live website
https://ey-take-home-app.herokuapp.com/

# About App
I am proud of my project as a whole, but one thing I am especially proud of is the creating a 'Database' module that was responsible for all the functionalities in the application. Some of the main things that the module can do is:

1. Add a new target
2. Delete target
3. Updating existing targets
4. Fetching targets
5. Getting targets statuses
6. It has save and load functionalities which performs all of that on local storage. They work better with json like format(objects, arrays) and not with Javascript objects like Map in this case.

The reason why I'm really proud of this part is because it holds all the data for the application and keeps the application in sync at all times with the front-end of application. And since it is a javascript file there are usually not any async calls for adding new targets or editing them.

I'm also proud of the charting features, it doesn't get in the way by not doing a lot in the table. The view status chart updates as you add a new target, delete a target.

Other features:
-> When the add target box pops up, there are fields to enter all of your data, including a drop down list for current status. 
-> Upon saving, your new target is added with the option to edit or delete it. When the edit option is selected, the initial add target box appears again, but with all of the fields filled with the data from the target you selected.
-> When you click outside of the add target area and the pop up box closes, it neither deletes your target nor adds a new one, but the table stays exactly the same. 
-> I am very proud of this function as I think it executes each action seamlessly and it is something I would be proud to present to a client.
-> When the table is open, the action buttons at the top of the page updates accordingly to whether the table is open or closed
-> the charts in the table showing financial performance update as you update the information in the add/edit target box
