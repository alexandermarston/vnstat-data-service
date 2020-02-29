const execSync = require('child_process').execSync;

module.exports = async (req, res, next) => {

    // Execute a command to get a JSON output from vnStat
    const interfaceData = execSync('/usr/bin/vnstat --json');

    // Determine the JSON version
    const jsonVersion = JSON.parse(interfaceData).jsonversion;

    // Parse the JSON blob into an array
    const parsedInterfaces = JSON.parse(interfaceData).interfaces;

    // Placeholder for interfaces
    var interfaces = [];

    // Iterate through each interface
    parsedInterfaces.forEach(function(element) {
        // Only push the id, nick, created and updated elements
        interfaces.push({
            id: ((jsonVersion == 1) ? element.id : element.name),
            nick: ((jsonVersion == 1) ? element.nick : element.alias),
            created: element.created,
            updated: element.updated
        });
    });

    // Send the response to the client
    res.json(interfaces);

}
