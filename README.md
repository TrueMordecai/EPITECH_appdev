# B-SYN-500-NAN-5-1-appdev-mathias.blanchard

# <Your-Project-Title>

## Description

This project is about showing widgets.<br />
A widgets show data personalized by user<br />

## Usage

(Its recommended to look at an existing widget to inspire your code from)<br />
How to add a widget : <br />
  # server/ : <br />
    - Create a a folder in src named $widget that contain a a controller, a module and a service. Inside create a model/ folder<br />
    - Use the Nest command to create them (nest g module $widget for exemple)<br />
      src/$widget/$widget.controller.js : <br />
        - In constructor, UserRepository, JwtService and $widget.Service<br />
        - Add the needed route for add, delete from id, update from id , get the data to show<br />
        - Add the AuthGards identifier<br />
      src/$widget/$widget.service.js :<br />
        - Must extends AbstractWidgetService<br />
        - In constructor, $widgetRepository, HttpService<br />
        - Code the function that performs api request<br />
      src/$widget/$widget.module.js :<br />
        - Must import TypeOrmModule for [$widget.Entity, User]<br />
        - Must control $widget.Controller<br />
        - Must provide [$widget.Entity, HttpModule]<br />
      src/$widget/model/$widget.Entity.js :<br />
        - Add your table field<br />
        - Id as primary key and a User ManyToOne Relation + title as a string and refresh as a number<br />
     src/$widget/model/$widget.Valdation.dto.js :<br />
        - All field that the client will communicate<br />
        - All fileds with @NotEmpty() tag<br />
     src/user/model/$widget.Valdation.dto.js :<br />
        - Update the getWidget() function<br />
  
  # client/ :<br />
    - Create a file $widgetInstaller.tsx in src/windows/misc/ and a file $widget.tsx in src/windows/widgets/<br />
    - In the client all the components that you code must be wrapped arround a <WindowWrapper> tag. It need multiple props to work properly.<br />
    src/windows/misc/widget.Installer.tsx :<br />
      - Code the installer components. It must perform create request to the database <br />
      - The user should fill a front before register<br />
    src/windows/widget/$widget.tsx (create one for each widgets. A service can have multiple widget):<br />
      - This is the window shown in the dashboard. It contains 2 components<br />
      - Describe how the widget should be shown<br />
      - With the help with useState and setInterval perform request to the database<br />
      - Use the Title gave with props<br />
      - The second components is the update components, return it at the end of the first components. With style display to $style<br />
    src/pages/Home.js :<br />
      - Add a value to modals with {"$widget.WindowIdentifier" : $widget.Type}<br />
      - Create a loadWidget() that return a Win[]>([])<br />
      - Load the window on another functiun and call it on useState<br />
      
## Credits

Me !
