## Description

This project is about showing widgets.
A widgets show data personalized by user that are stocked in databases. 
There is actually 2 widget. (Cats and League of Legends widgets)

## Usage

> ./sudo docker-compose up --build


## Warning

Due to recent changes to league of legends API, the profile widget that target a player don't work. However the widget to get the rank One work but you must had your League API KEY

## Create another widget 

(Its recommended to look at an existing widget to inspire your code from)
How to add a widget :
  # server/ :
    - Create a a folder in src named $widget that contain a a controller, a module and a service. Inside create a model/ folder
    - Use the Nest command to create them (nest g module $widget for exemple)
      src/$widget/$widget.controller.js :
        - In constructor, UserRepository, JwtService and $widget.Service
        - Add the needed route for add, delete from id, update from id , get the data to show
        - Add the AuthGards identifier
      src/$widget/$widget.service.js :
        - Must extends AbstractWidgetService
        - In constructor, $widgetRepository, HttpService
        - Code the function that performs api request
      src/$widget/$widget.module.js :
        - Must import TypeOrmModule for [$widget.Entity, User]
        - Must control $widget.Controller
        - Must provide [$widget.Entity, HttpModule]
      src/$widget/model/$widget.Entity.js :
        - Add your table field
        - Id as primary key and a User ManyToOne Relation + title as a string and refresh as a number
     src/$widget/model/$widget.Valdation.dto.js :
        - All field that the client will communicate
        - All fileds with @NotEmpty() tag
     src/user/model/$widget.Valdation.dto.js :
        - Update the getWidget() function
  
  # client/ :
    - Create a file $widgetInstaller.tsx in src/windows/misc/ and a file $widget.tsx in src/windows/widgets/
    - In the client all the components that you code must be wrapped arround a <WindowWrapper> tag. It need multiple props to work properly.
    src/windows/misc/widget.Installer.tsx :
      - Code the installer components. It must perform create request to the database 
      - The user should fill a front before register
    src/windows/widget/$widget.tsx (create one for each widgets. A service can have multiple widget):
      - This is the window shown in the dashboard. It contains 2 components
      - Describe how the widget should be shown
      - With the help with useState and setInterval perform request to the database
      - Use the Title gave with props
      - The second components is the update components, return it at the end of the first components. With style display to $style
    src/pages/Home.js :
      - Add a value to modals with {"$widget.WindowIdentifier" : $widget.Type}
      - Create a loadWidget() that return a Win[]>([])
      - Load the window on another functiun and call it on useState
      

## Preview 
![image](https://github.com/TrueMordecai/EPITECH_appdev/assets/60859370/8b68957d-0e6a-43b1-8760-8e1f10a471f2)
![image](https://github.com/TrueMordecai/EPITECH_appdev/assets/60859370/629af1cf-acc7-4c7b-bd75-a45ee046c99b)

