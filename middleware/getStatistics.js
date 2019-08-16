const execSync = require('child_process').execSync;
const Boom = require('boom');

module.exports = async (req, res, next) => {

    // Execute a command to get a JSON output from vnStat
    const interfaceData = execSync('/usr/bin/vnstat --json');

    // Parse the JSON blob into an array
    const parsedInterfaceData = JSON.parse(interfaceData);

    const timePeriod = req.params.timeperiod;
    const selectedInterface = req.params.interface;

    // Create an empty placeholder for the index of the interface
    var interfaceIndex = null;

    // Iterate through the interfaces until we find the one we want
    for (i = 0; i < (parsedInterfaceData.interfaces).length; i++) {
        var interface = parsedInterfaceData.interfaces[i];

        if (interface.id === selectedInterface) {
            interfaceIndex = i;
            break;
        }
    }

    if (interfaceIndex == null) {
        res.json(Boom.badRequest('Interface supplied does not exist'));
    } else {
        switch(timePeriod) {
            case 'hour':
                res.json(parsedInterfaceData.interfaces[interfaceIndex].traffic.hours);
                break;
            case 'day':
                res.json(parsedInterfaceData.interfaces[interfaceIndex].traffic.days);
                break;
            case 'month':
                res.json(parsedInterfaceData.interfaces[interfaceIndex].traffic.months);
                break;
            default:
                res.json(Boom.badRequest('Invalid time period supplied'));
        }
    }

}
