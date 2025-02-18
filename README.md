
# SimpleSearch Chrome Browser Extension

A simple pop up extension that enables you to browse faster and easier on the web using shortcuts and remove the need for using a computer mouse.


## Opening the extension

The inteded way of opening the extension is by pressing a desired keybind combination on your keyboard.  The other way is by simply clicking on it in the Extensions tab.  

Default shortcut: **```Ctrl + Shift + Y```**  
Custom shortcut: **```Chrome Extensions tab -> Keyboard shortcuts -> Simple Search Extension Input 1.0 -> Activate the extension```**
*[Requires enabled developer mode]*  


## Usage instructions
Upon opening the extension you can simply browse the web by inputing the desired text and pressing Enter.  This will trigger a simple Google search with the text.   

You can also browse the web with the extension by using the shorcuts.  
All shortcuts start with a **```/```** before the text.  
There are 6 pre-made popular shortcuts that redirect you to the desired website.

### Default shortcuts
*/yt* -> https://www.youtube.com  
*/fb* -> https://www.facebook.com  
*/insta* -> https://www.instagram.com  
*/gmail* -> https://mail.google.com  
*/discord* -> https://discord.com  
*/amazon* -> https://www.amazon.com  
*/spotify* -> https://open.spotify.com  

### Creating your own shortcut
To add a custom command that opens a specific URL:  
**```/make-command: <command-name> <URL>```**

Example:  
**```/make-command: /mySite https://example.com```** 

### Removing a Custom Command
To delete a previously saved custom command:  
**```/delete-command: <command-name>```**  

Example:  
**```/delete-command: /mySite```**

## UI Explanation
Usual extension appearence without the extended Commands list.

![image](https://github.com/user-attachments/assets/30ca9580-b047-4322-bce7-5fbe059ab332)  

**Sensitive checkbox**  
If checked, the inputed commands need to be exact to the made shortcuts in order for them to work, meaning case sensetive etc.

Left unchecked, enables a room of error for the intended shortcuts to work with minor errors.

**Commands list** 

![image](https://github.com/user-attachments/assets/c12789ea-b2f3-41b9-97fb-6f086c2a9c29)

Displays all of the made shortcuts, including the pre-made and self made commands.  
Also features an Onclick event on the commands that redirect to desired websites.



