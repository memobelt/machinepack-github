module.exports = {


  friendlyName: 'Build GitHub search string',


  description: 'Build a GitHub search string (the \'q\' parameter for use with the GitHub Search API).',


  cacheable: true,


  sync: true,


  inputs: {

    repo: {
      description: 'The name of the Github repo (i.e. as it appears in the URL on GitHub)',
      example: 'sails'
    },

    owner: {
      description: 'The name of the organization or user that owns the repo (i.e. as it appears in the URL on GitHub)',
      example: 'balderdashy'
    },

    state: {
      description: 'The state to filter issues by (either "open" or "closed".',
      example: 'open',
    },

    lastUpdatedBefore: {
      description: 'A JS timestamp.',
      extendedDescription: 'Issues that have been updated _since_ this timestamp will be excluded from the results.',
      example: 1442710858715
    }

  },


  exits: {

    success: {
      variableName: 'githubSearchStr',
      example: 'repo:balderdashy/sails state:open'
    },

  },


  fn: function (inputs,exits) {
    var util = require('util');
    var _ = require('lodash');
    var Datetime = require('machinepack-datetime');

    // The local variable `q` will be used to build up the search string
    // iteratively in the code below.  We'll start by building it as an
    // array of strings, then mash it together at the end using `.join()`.
    var q = [];

    // Filter on owner+repo
    if (inputs.owner && inputs.repo) {
      q.push( util.format( 'repo:%s/%s', inputs.owner, inputs.repo) );
    }
    // or just owner
    else if (inputs.owner) {
      q.push( util.format( 'user:%s', inputs.owner) );
    }

    // Filter on issue state (open vs. closed)
    if (!_.isUndefined(inputs.state)) {
      q.push( 'state:'+inputs.state );
    }

    // Filter issues based on when they were last updated.
    if (!_.isUndefined(inputs.lastUpdatedBefore)) {
      var dateInstance = Datetime.parseTimestamp({
        timestamp: inputs.lastUpdatedBefore,
        timezone: 'America/Chicago'
      }).execSync();
      var formattedDateStr = util.format('%s-%s-%s',
        dateInstance.year,
        (dateInstance.month<10?'0':'')+dateInstance.month,
        (dateInstance.date<10?'0':'')+dateInstance.date
      );
      q.push( 'updated:<'+formattedDateStr );
    }

    // Now smash the strings together, separating them w/ spaces...
    q = q.join(' ');

    // and we're done!
    return exits.success(q);
  },



};
