# Jurnal 3rd Party Sample App Loan
Jurnal has created a new feature called Jurnal AppStore which 3rd party developers can create applications inside Jurnal to integrate their platform with Jurnal.

This is a sample app for Jurnal addons which Jurnal's user must install it from Jurnal application to have access. This project meant to help Jurnal user to apply a loan from Jurnal addons to a loan company. User can fill out a form that already contain some of user data, which retrieved with Jurnal api.

<h2>System Depencies</h2>
- Ruby v.2.3.1 (recommended)
- Framework : Ruby on Rails v.5.0.0
- Database : Mysql2

<h2>Getting Started</h2>
Either clone , fork or download this repo, then install Ruby , Ruby on Rails and Mysql2. 
To start the application, open your terminal , do this steps :<br><br>
1. Change your directory location, then move to this project directory with 
<code>cd jurnal-3rd-party-sample-app-master</code>
<br>
2. Install this project gem dependencies <code>bundle install</code>
<br>
3. Setup this project database with <code>rake db:setup</code>
<br>
4. Start the application <code>rails s</code>
<br>
<br>
This app works by retrieving Jurnal user access token, which you can get by registering your app to Jurnal application list as addons, then install the addons in Jurnal application. When you open the addons, Jurnal will send access token to that specific user with browser session storage or you can retrieve with [Jurnal javascript library](https://github.com/squadronjurnal/Jurnal-Integration-Library), which access token currently have unlimited expires time.
<br>
<br>
To access this project, open your browser developer console and type <code>sessionStorage.setItem("jurnal_access_token","[your_access_token_number]")</code>. Don't forget to add environment variables needed, such as <code>JURNAL_BASE_PATH=https://api.jurnal.id</code>
<br>
After all setup is done, access this sample project at localhost:3000.
  
