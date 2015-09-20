module.exports = {


  friendlyName: 'Get current user',


  description: 'Get the GitHub profile data for a user by access token.',


  cacheable: true,


  inputs: {

    credentials: require('../structs/credentials.required-input')

  },


  exits: {

    success: {
      example: {
        login: "octocat",
        id: 1,
        avatar_url: "https://github.com/images/error/octocat_happy.gif",
        gravatar_id: "",
        url: "https://api.github.com/users/octocat",
        html_url: "https://github.com/octocat",
        followers_url: "https://api.github.com/users/octocat/followers",
        following_url: "https://api.github.com/users/octocat/following{/other_user}",
        gists_url: "https://api.github.com/users/octocat/gists{/gist_id}",
        starred_url: "https://api.github.com/users/octocat/starred{/owner}{/repo}",
        subscriptions_url: "https://api.github.com/users/octocat/subscriptions",
        organizations_url: "https://api.github.com/users/octocat/orgs",
        repos_url: "https://api.github.com/users/octocat/repos",
        events_url: "https://api.github.com/users/octocat/events{/privacy}",
        received_events_url: "https://api.github.com/users/octocat/received_events",
        type: "User",
        site_admin: false,
        name: "monalisa octocat",
        company: "GitHub",
        blog: "https://github.com/blog",
        location: "San Francisco",
        email: "octocat@github.com",
        hireable: false,
        bio: "There once was...",
        public_repos: 2,
        public_gists: 1,
        followers: 20,
        following: 0,
        created_at: "2008-01-14T04:33:35Z",
        updated_at: "2008-01-14T04:33:35Z"
      }
    }
  },


  fn: function(inputs, exits) {

    var Helpers = require('../helpers');


    // Send an HTTP request and receive the response.
    Helpers.sendGithubApiRequest({
      method: 'get',
      url: '/user',
      credentials: inputs.credentials
    }).exec({

      error: exits.error,

      success: function(githubApiResponse) {
        return exits.success(githubApiResponse.body);
      },
    });
  }


};
