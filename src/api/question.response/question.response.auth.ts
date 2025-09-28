import {
    AuthOptions,
    RequestType,
    ResourceOwnership,
    ActionScope,
    DefaultAuthOptions
} from '../../auth.u/auth.types';

///////////////////////////////////////////////////////////////////////////////////////

export class QuestionResponseAuth {

    static readonly _baseContext = `QuestionResponse`;

    static readonly create: AuthOptions = {
        ...DefaultAuthOptions,
        Context     : `${this._baseContext}.Create`,
        Ownership   : ResourceOwnership.Owner,
        ActionScope : ActionScope.Owner,
        RequestType : RequestType.CreateOne,
    };

    static readonly update: AuthOptions = {
        ...DefaultAuthOptions,
        Context     : `${this._baseContext}.Update`,
        Ownership   : ResourceOwnership.Owner,
        ActionScope : ActionScope.Owner,
        RequestType : RequestType.UpdateOne,
    };

    static readonly delete: AuthOptions = {
        ...DefaultAuthOptions,
        Context     : `${this._baseContext}.Delete`,
        Ownership   : ResourceOwnership.Owner,
        ActionScope : ActionScope.Owner,
        RequestType : RequestType.DeleteOne,
    };

    static readonly search: AuthOptions = {
        ...DefaultAuthOptions,
        Context     : `${this._baseContext}.Search`,
        Ownership   : ResourceOwnership.System,
        ActionScope : ActionScope.Tenant,
        RequestType : RequestType.Search,
    };

    static readonly getById: AuthOptions = {
        ...DefaultAuthOptions,
        Context     : `${this._baseContext}.GetById`,
        Ownership   : ResourceOwnership.Owner,
        ActionScope : ActionScope.Owner,
        RequestType : RequestType.GetOne,
    };

    static readonly save: AuthOptions = {
        ...DefaultAuthOptions,
        Context     : `${this._baseContext}.Save`,
        Ownership   : ResourceOwnership.Owner,
        ActionScope : ActionScope.Owner,
        RequestType : RequestType.CreateOne,
    };

}
