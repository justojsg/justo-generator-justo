//imports
const justo = require("justo");
const catalog = justo.catalog;

//catalog
catalog.workflow({name: "task", desc: "Task description."}, function() {

});

catalog.macro({name: "default", desc: "Default task."}, []);
