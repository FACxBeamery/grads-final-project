# vibe@Beamery

# Overview 

vibe@Beamery is a survey tool that aims to assess employees' engagement at work, and focusses on gaining their trust by preserving anonymity when required by the People team.

# Technical Overview
The frontend was built using ReactJS, and the MaterialUI library is used for the majority of components. 

The backend server was built in Node.js and Express.

The server is hosted on Heroku, the client on Netlify, and the database is a MongoDB instance stored at MongoDB Atlas. 

Testing is run with Jest, and we make use of Travis for Continuous Integration. 

# Functionalities

### Dashboard
Once the admin has logged into the page, they are presented with the Dashboard. This is the home page of the app, and contains a summary of all active and draft surveys stored on the database. The admin can create a new Survey by selecting 'Create Survey' or 'Create From Template'.

<a href="https://ibb.co/wLLLxTm"><img src="https://i.ibb.co/b3338x9/Screenshot-2019-12-20-at-10-52-20.png" alt="Screenshot-2019-12-20-at-10-52-20" border="0"></a>

### Survey Builder/Editor

The admin can start by creating a new survey from scratch. 
The mandatory fields are: 
- survey title
- description 
- disclaimer (with regards to GDPR compliancy)
- at least one question


They can also set the survey as anonymous and a default message will be displayed to the survey recipient once they get access to the survey link. 

<a href="https://ibb.co/3yXP4HV"><img src="https://i.ibb.co/rGPXFJq/screencapture-vibe-at-beamery-netlify-admin-surveys-create-2019-12-20-10-52-34.png" alt="screencapture-vibe-at-beamery-netlify-admin-surveys-create-2019-12-20-10-52-34" border="0"></a>

#### List of Recipients
To select the recipients, the admin is presented with a list of employees at Beamery. They have the ability to filter by both department and location, as well as searching for individuals by name. 
The user does not have to select recipients when drafting a survey. That can be done later on, before making it active.  

<a href="https://ibb.co/K5rw3DX"><img src="https://i.ibb.co/MgC63fs/Screenshot-2019-12-20-at-10-53-10.png" alt="Screenshot-2019-12-20-at-10-53-10" border="0"></a>


### Survey Detail View
After creating the survey, the user can go back to their dashboard, see all existing surveys, and view them in more detail.

The detailed view of a survey consists of a page where the admin can see the title, description, recipients list and current status of the survey. 

<a href="https://ibb.co/GMs65Nf"><img src="https://i.ibb.co/vdsFjRC/screencapture-vibe-at-beamery-netlify-admin-surveys-508f1f99bcf86cd799439214-2019-12-20-10-54-28.png" alt="screencapture-vibe-at-beamery-netlify-admin-surveys-508f1f99bcf86cd799439214-2019-12-20-10-54-28" border="0"></a><br />

The survey can be:
- <strong>drafted</strong>: 
    - can be edited; 
    - new recipients can be added to the list;
    - questions can be reordered, altered, or deleted; 

- <strong>active</strong>:
    - CANNOT edit survey's content/recipients' list
    - can start sending slack invitations to ALL recipients from list
    - can see the completion rate of that specific survey

- <strong>closed</strong>: 
    - CANNOT send slack invitations
    - Can export csv results




 ### Create Survey From Template
 
 The admin can use any existing survey as a template.
 Once they perform this action, they will be able to easily edit a duplicate of that survey and keep its original recipients list. 
 
<a href="https://ibb.co/ZckhRfT"><img src="https://i.ibb.co/r51ZKQy/Screenshot-2019-12-20-at-10-54-18.png" alt="Screenshot-2019-12-20-at-10-54-18" border="0"></a>

### Sending Slack Invitations
Once a survey is made active, the admin can invite the recipients to complete the survey via Slack. Each recipient will recieve a direct message from the vibe@Beamery Slackbot, which will contain a unique link to the survey. The admin can also add a message to be sent out along with the link, which supports emojis. 

<a href="https://ibb.co/GJGFVPH"><img src="https://i.ibb.co/fSZQC0D/Screenshot-2019-12-20-at-10-55-07.png" alt="Screenshot-2019-12-20-at-10-55-07" border="0"></a>


### Receiving A Slack Message
<a href="https://ibb.co/MSy17D5"><img src="https://i.ibb.co/C8p9Q5s/Screenshot-2019-12-20-at-10-55-26.png" alt="Screenshot-2019-12-20-at-10-55-26" border="0"></a>
Each survey recipient receives a personalised link to the survey via SlackBot. If the survey is closed or they have already completed the survey, clicking on the link lands them on a page conveying this information:
<img src="https://i.imgur.com/auMat6z.png" width="30%" ><img src="https://i.imgur.com/9SlBAAg.png" width="30%" >



### Survey Recipient View
The first survey page contains the Privacy Notice and a disclaimer, as well as a statement about the anonymity of the survey.

<img src="https://i.imgur.com/AJWtTlY.png" width="40%" >

<img src="https://i.imgur.com/CsNSu5a.png" width="40%" >
<img src="https://i.imgur.com/ZISYGWo.png" width="40%" >
<img src="https://i.imgur.com/iKKZHOW.png" width="40%" >

### Export Closed Survey Results As CSV
Once the admin chooses to close the survey, they will be able to export the survey's responses as a csv, which can be done in 2 ways:
- if the survey was originally set as anonymous
    - The user can only export anonymously
- if the survey was not set as anonymous:
    - The user can export anonymously (without the recipient's name next to their answers) or with their names.
    

<a href="https://ibb.co/gPbC4X7"><img src="https://i.ibb.co/s6prWDP/Screenshot-2019-12-20-at-11-28-34.png" alt="Screenshot-2019-12-20-at-11-28-34" border="0"></a><br /><br />

# Acknowledgements

A HUGE thank you to Michael, Oliver, Kristina, Oli and the rest of Founders and Coders for facilitating our learning, to Andrew Celi for guiding the project's Agile planning and delivery, and to the People team for all the given feedback and help on iteratively progressing with the development of the app.

# Set up

To run locally:

Install:
- Node
- Docker
- NPM

Once the project is cloned, run `sh start` from the root folder. This will run `npm i` in the `client` and `server` directories, and run dockerup on all three containers. If you have already done `npm i` and want to restart the Docker containers, run `npm run dockerup`. 

To spin down the Docker containers, once you are finished, and remove the stopped containers and respective images, run `npm run dockerdown` whilst in the root folder.

To check all the tests in the project, using Travis, run `npm test` from the <strong>root</strong> folder.

To view the database schema, please click [here](https://hackmd.io/UvPhEaOgSm-ce_sFfewlqg).


# Known Bugs

