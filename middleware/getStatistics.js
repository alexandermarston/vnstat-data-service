const execSync = require('child_process').execSync;
const Boom = require('boom');

module.exports = async (req, res, next) => {

    // Execute a command to get a JSON output from vnStat
    const interfaceData = execSync('/usr/bin/vnstat --json');

    //Determine the JSON version
    const jsonVersion = JSON.parse(interfaceData).jsonversion;

    // Parse the JSON blob into an array
    const parsedInterfaceData = JSON.parse(interfaceData);

    // Parse request parameters
    const timePeriod = req.params.timeperiod;
    const selectedInterface = req.params.interface;

    // Create an empty placeholder for the index of the interface
    var interfaceIndex = null;

    // Iterate through the interfaces until we find the one we want
    for (i = 0; i < (parsedInterfaceData.interfaces).length; i++) {
        var interface = parsedInterfaceData.interfaces[i];

        if (((jsonVersion == 1) ? interface.id : interface.name) === selectedInterface) {
            interfaceIndex = i;
            break;
        }
    }

    if (interfaceIndex == null) {
        res.json(Boom.badRequest('Interface supplied does not exist'));
    } else {
        switch(timePeriod) {
            case 'hour':
                var hourlyData = ((jsonVersion == 1) ? parsedInterfaceData.interfaces[interfaceIndex].traffic.hours : parsedInterfaceData.interfaces[interfaceIndex].traffic.hour);
                res.json(hourlyData);
                break;
            case 'day':
                var dailyData = ((jsonVersion == 1) ? parsedInterfaceData.interfaces[interfaceIndex].traffic.days : parsedInterfaceData.interfaces[interfaceIndex].traffic.day);
                res.json(dailyData);
                break;
            case 'month':
                var monthlyData = ((jsonVersion == 1) ? parsedInterfaceData.interfaces[interfaceIndex].traffic.months : parsedInterfaceData.interfaces[interfaceIndex].traffic.month);
                res.json(monthlyData);
                break;
            default:
                res.json(Boom.badRequest('Invalid time period supplied'));
        }
    }

}
