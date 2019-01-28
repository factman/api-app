/**
 * @description The mail template controller
 * @author Odewale Ifeoluwa
 */
import Mail from "email-templates";
import ejs from "ejs";
import path from "path";
import fs from "fs";
import MailTemplate from "../../models/mailTemplate";


exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      message: "Mail name can not be empty",
    });
  }

  const dataPath = fs.readFileSync(path.join(__dirname, "../../emails", req.body.template), { encoding: "UTF8" });
  // Check if the mail already exist
  MailTemplate.findOne({ name: req.body.name })
    .then((tempName) => {
      let mailTemplate;
      if (!tempName) {
        mailTemplate = new MailTemplate({
          name: req.body.name,
          template: dataPath,
        });
      } else {
        mailTemplate = tempName;
        mailTemplate.template = dataPath;
      }
      // Save the new or updated template
      mailTemplate.save()
        .then((templateMail) => {
          res.status(200)
            .send(templateMail);
        })
        .catch((err) => {
          res.status(500)
            .send({
              message: err.message || "Mail template was not created",
            });
        });
    })
    .catch((err) => {
      res.status(503)
        .send({
          message: err.message || "There was an error fetching the template",
        });
    });
};

// Fetch all mail templates
exports.findAll = (req, res) => {
  MailTemplate.find({}, { template: false })
    .then((mailTemplates) => {
      res.status(200)
        .send(mailTemplates);
    })
    .catch((err) => {
      res.status(500)
        .send({
          message: err.message || "There was an error fecting all mail templates",
        });
    });
};

// fetch only one mail template
exports.findOne = (req, res) => {
  MailTemplate.findById(req.params.mailTemplateId)
    .then((mailTemplate) => {
      if (!mailTemplate) {
        res.status(404)
          .send({
            message: `Mail template not found with id ${req.params.mailTemplateId}`,
          });
      }
      res.status(200)
        .send(mailTemplate);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        res.status(404).send({
          message: `Mail template not found with id ${req.params.mailTemplateId}`,
        });
      }
      res.status(500)
        .send({
          message: err.message || "There was an error fecting all mail templates",
        });
    });
};

// Delete mail template
exports.delete = (req, res) => {
  MailTemplate.remove({ _id: req.params.mailTemplateId })
    .then(() => {
      res.status(200)
        .send({
          message: `You have successfully delete mail template with ID: ${req.params.mailTemplateId}`,
        });
    })
    .catch((err) => {
      res.status(500)
        .send({
          message: err.message || `There was an error delete mail template with ID ${req.params.mailTemplateId}`,
        });
    });
};

// The mail Configuration
exports.mailConfiguration = () => {
  const mailEngine = new Mail({
    juice: true,
    juiceResources: {
      preserveImportant: true,
      webResources: {
        // the path to where all mail css stylesheets are stored
        relativeTo: path.join(__dirname, "../../emails/assets"),
      },
    },
    message: {
      from: "\"AGBM Newly Selected\" agmbhr@agmbresourceful.online",
    },
    views: {
      options: {
        extension: "ejs",
      },
    },
    send: true,
    transport: {
      host: "smtp.mailtrap.io",
      port: 2525,
      // secure: true, // true for 465, false for other ports
      auth: {
        user: "96b9ecbaaaaf71", // generated ethereal user
        pass: "20ce42e9fd054e", // generated ethereal password
      },
      tls: {
        rejectUnauthorized: false,
      },
    },

    render: (view, locals) => new Promise((resolve, reject) => {
      // This clean any name attached to the name of the template that will be used
      const templateName = view.replace(/\/.*/, "");
      // fetch template using the name of template name
      MailTemplate.findOne({ name: templateName })
        .then((ejsTemplate) => {
          // Check if the template exist
          if (!ejsTemplate) {
            return reject(new Error("Template not found"));
          }
          let html = ejs.render(ejsTemplate.template, locals);
          html = mailEngine.juiceResources(html);
          return resolve(html);
        })
        .then(err => reject(err));
    }),
  });

  return mailEngine;
};
