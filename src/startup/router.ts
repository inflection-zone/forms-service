import express from 'express';
import { register as form } from '../api/form.submission/form.router';
import { register as formTemplate } from '../api/form.template/form.template.router';
import { register as user } from '../api/user/user.router';
import { register as formSection } from '../api/form.section/form.section.router'
import { register as question }  from '../api/question/question.router';
import { register as Response }  from '../api/question.response/question.response.router';
import { register as registerFileResourceRoutes } from '../api/file.resource/file.resource.routes';
///////////////////////////////////////////////////////////////////////////////////////

export class Router {

    private _app: express.Application;

    constructor(app: express.Application) {
        this._app = app;
    }
    public init = async (): Promise<boolean> => {
        return new Promise((resolve, reject) => {
            try {
                this._app.get("/api/v1", (req, res) => {
                    res.send({ message: "Demo api service" })
                })
                form(this._app);
                formTemplate(this._app);
                user(this._app);
                formSection(this._app);
                question(this._app);
                Response(this._app);
                registerFileResourceRoutes(this._app);
            } catch (error) {
                console.log("Error initilizing the routes")
            }
        });
    }
}
