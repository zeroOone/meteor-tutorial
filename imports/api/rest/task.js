import {Tasks} from "../tasks";

if (Meteor.isServer) {
    Router.route('/users',{where: 'server'})
        .get(function(){
            var response = Tasks.find().fetch();
            this.response.setHeader('Content-Type','application/json');
            this.response.end(JSON.stringify(response));
        }).post(function () {
            let response;
            if (this.request.body.userName === undefined || this.request.body.userPassword === undefined) {
                response = {
                    "error":true,
                    "message": "invalid data"
                };
                this.response.setHeader('Content-Type','application/json');
                this.response.end(JSON.stringify(response));
            } else {
                let response = {
                    "userName": this.request.body.userName,
                    "password": this.request.body.userPassword
                }
                this.response.setHeader('Content-Type','application/json');
                this.response.end(JSON.stringify(response));
            }
        });

}