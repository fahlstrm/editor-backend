const config = require("../config.json");
const sgMail = require('@sendgrid/mail');
const sendgridAPI = config.sendgrid;

sgMail.setApiKey(sendgridAPI);

/**
 * jwt 
 */
 const data = {
    msg: function (reciever, title, id){
        let msg = {
            to: reciever,
            from: 'fridaahlstrom@outlook.com', 
            subject: 'You have been invited to edit a document',
            template_id: "d-d68289dbe0d04fddae226d66d07a9c1c",
            dynamic_template_data: {
                email: `${reciever}`,
                title: `${title}`,
                id: `${id}`,
            },
            html: '<strong>and easy to do anywhere, even with Node.js</strong>'
        }
        return msg;
    },
    sendEmail: async function(to, title, id) {
        try {
            let msg = this.msg(to, title, id);
            await sgMail.send(msg);
            console.log("done")
        } catch (error) {
            console.error(error);
    
            if (error.response) {
                console.error(error.response.body)
            }
        }
    }
}

module.exports = data;

