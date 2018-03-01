//add listener when device ready
document.addEventListener("deviceready", onDeviceReady, false);
var db = window.openDatabase("assb", "1.0", "assb", 200000); //will create database Dummy_DB or open it
// var db = window.sqlitePlugin.openDatabase({name: "assb.db", location: 'default'});

//function will be called when device ready
function onDeviceReady(){

}

populateDB();

//create table and insert some record
function populateDB(tx) {

    db.transaction(function(tx){
        var query = "CREATE TABLE IF NOT EXISTS user ("
            +"id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,"
            +"email varchar(255),"
            +"name varchar(255),"
            +"password varchar(255)"
            +") ";
        tx.executeSql(query,[],function(insert,result){
            insert.executeSql("INSERT INTO user (email, name, password) SELECT * FROM (SELECT 'admin@arenasibu.com', 'ADMIN', 'assb_admin') AS tmp WHERE NOT EXISTS (SELECT email FROM user WHERE email = 'admin@arenasibu.com') LIMIT 1");

            console.log('admin inserted');
        },
        function(error){
            console.log("error");
        });
        
    });
}