const Permission = require('../models/permission_model');
const Role = require('../models/role_model');
const User = require('../models/user_model');
const ErrorHandler = require('../utils/errorHandler')
const { _response } = require("../utils/response");
const { default: mongoose } = require("mongoose");


//create new permission => /api/permission/add
exports.addPermission = async (req, res, next) => {

    const {
        label,
        value
    } = req.body;

    const exitingPermissionValueData = await Permission.findOne({ value });

    if (exitingPermissionValueData) {
        return res.status(400).json({
            message: _response.alreadyAddedPermission
        });
    } else {
        try {
            const permissionAdd = await Permission.create({
                label,
                value: value.toUpperCase()
            });

            res.status(200).json({
                currentDate: new Date().toUTCString(),
                status: 200,
                message: _response.success,
                data: { permission: permissionAdd }
            });
        } catch (err) {
            //Error message response
            return res.status(500).json({
                message: _response.internalError,
            });
        }
    }
};

//Get all permission as a list view => /api/permission/list
exports.getPermission = async (req, res, next) => {

    try {
        //data find All from permission table
        const permission = await Permission.find();

        //success response json data
        res.status(200).json({
            currentDate: new Date().toUTCString(),
            status: 200,
            message: _response.getSuccessDatasList,
            data: { permissions: permission }
        });
    } catch (err) {
        //Error message response
        return res.status(500).json({
            message: _response.internalError,
        });
    }
}



//Update permision by permission id => /api/permission/:id
exports.updatePermission = async (req, res, next) => {

    try {
        let isValidId = mongoose.Types.ObjectId.isValid(req.params.id);

        // //Param valid check
        if (!isValidId) {
            return res.status(400).json({
                message: _response.isNotValidId,
            });
        }

        // data find by ID from Permission Collection
        let data = await Permission.findById(req.params.id);

        //condition check
        if (!data) {
            return res.status(404).json({
                message: _response.notFound,
            });
        }


        const permission = await Permission.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        });

        res.status(200).json({
            currentDate: new Date().toUTCString(),
            status: 200,
            message: _response.update,
            data: { permission }
        });
    } catch (err) {
        //Error message response
        return res.status(500).json({
            message: _response.internalError,
        });
    }
}

//find by id from Permission collection and details data
exports.getPermissionDetails = async (req, res, next) => {

    let isValidId = mongoose.Types.ObjectId.isValid(req.params.id);

    // Mongoose ID validation check
    if (!isValidId) {
        return res.status(400).json({
            message: _response.isNotValidId,
        });
    }

    ////collection data find
    let data = await Permission.findById(req.params.id);

    //// condition check
    if (!data) {
        return res.status(404).json({
            message: _response.notFound,
        });
    }

    try {
        //find by id from field collection
        const permission = await Permission.findOne({
            _id: req.params.id,
        });

        //success response json data
        res.status(200).json({
            currentDate: new Date().toUTCString(),
            status: 200,
            message: _response.getSuccessDatasList,
            data: { permission }
        });
    } catch (err) {
        //Error message response
        return res.status(500).json({
            message: _response.internalError,
        });
    }
};


// Delete Permission based on Permission id
exports.deletePermission = async (req, res, next) => {
    try {
        let isValidId = mongoose.Types.ObjectId.isValid(req.params.id);

        ////Param valid check
        if (!isValidId) {
            return res.status(400).json({
                message: _response.isNotValidId,
            });
        }

        ////collection data find
        let permission = await Permission.findById(req.params.id);

        //// condition check
        if (!permission) {
            return res.status(404).json({
                message: _response.notFound,
            });
        }

        //product delete  by product id
        await permission.remove();


        res.status(200).json({
            currentDate: new Date().toUTCString(),
            status: 200,
            message: _response.delete,
            data: { permission }
        });

    } catch (err) {
        //Error message response
        return res.status(500).json({
            message: _response.internalError,
        });
    }
};



//------------------------Role Controller List-----------------------//

//create new Role 
exports.addRole = async (req, res, next) => {

    const {
        roleName,
        permissions
    } = req.body;


    const exitingRoleValueData = await Role.findOne({ roleName });

    if (exitingRoleValueData) {
        return res.status(400).json({
            message: _response.alreadyAdded    // role exit message
        });
    } else {
        try {
            // created role data...
            const roleAdd = await Role.create({
                roleName,
                permissions
            });

            res.status(200).json({
                currentDate: new Date().toUTCString(),
                status: 200,
                message: _response.success,
                data: { role: roleAdd }
            });
        } catch (err) {
            console.log(err)
            //Error message response
            return res.status(500).json({
                message: _response.internalError,
            });
        }
    }
};

//Get all Role as a list view => /api/role
exports.getRole = async (req, res, next) => {

    try {
        //data find All from Role table and populate to permission table 
        const roles = await Role.find().populate("permissions", " -__v");

        //success response json data
        res.status(200).json({
            currentDate: new Date().toUTCString(),
            status: 200,
            message: _response.getSuccessDatasList,
            data: { roles }
        });
    } catch (err) {
        //Error message response
        return res.status(500).json({
            message: _response.internalError,
        });
    }
}


//Update Role table by role id...
exports.updateRole = async (req, res, next) => {

    try {
        let isValidId = mongoose.Types.ObjectId.isValid(req.params.id);

        // //Param valid check
        if (!isValidId) {
            return res.status(400).json({
                message: _response.isNotValidId,
            });
        }

        // data find by ID from Permission Collection
        let data = await Role.findById(req.params.id);

        //condition check
        if (!data) {
            return res.status(404).json({
                message: _response.notFound,
            });
        }

        const role = await Role.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        });

        res.status(200).json({
            currentDate: new Date().toUTCString(),
            status: 200,
            message: _response.update,
            data: { role }
        });
    } catch (err) {
        console.log(err)
        //Error message response
        return res.status(500).json({
            message: _response.internalError,
        });
    }
}


//find by id from Role collection and will show details data 
//Data populate from Permission collection...
exports.getRoleDetails = async (req, res, next) => {

    let isValidId = mongoose.Types.ObjectId.isValid(req.params.id);

    // Mongoose ID validation check
    if (!isValidId) {
        return res.status(400).json({
            message: _response.isNotValidId,
        });
    }

    ////collection data find
    let data = await Role.findById(req.params.id);

    //// condition check
    if (!data) {
        return res.status(404).json({
            message: _response.notFound,
        });
    }

    try {
        //find by id from field collection
        const role = await Role.findOne({
            _id: req.params.id,
        }).populate("permissions", " -__v");

        //success response json data
        res.status(200).json({
            currentDate: new Date().toUTCString(),
            status: 200,
            message: _response.getSuccessDatasList,
            data: { role }
        });
    } catch (err) {
        //Error message response
        return res.status(500).json({
            message: _response.internalError,
        });
    }
};


// Delete Role based on Role id
exports.deleteRole = async (req, res, next) => {
    try {
        let isValidId = mongoose.Types.ObjectId.isValid(req.params.id);

        ////Param valid check
        if (!isValidId) {
            return res.status(400).json({
                message: _response.isNotValidId,
            });
        }

        ////collection data find
        let role = await Role.findById(req.params.id);

        //// condition check
        if (!role) {
            return res.status(404).json({
                message: _response.notFound,
            });
        }

        //product delete  by product id
        await role.remove();


        res.status(200).json({
            currentDate: new Date().toUTCString(),
            status: 200,
            message: _response.delete,
            data: { role }
        });

    } catch (err) {
        //Error message response
        return res.status(500).json({
            message: _response.internalError,
        });
    }
};




//Update User's Role => /api/accounts/v1/user/role 
exports.addUserRole = async (req, res, next) => {

    let isValidId = mongoose.Types.ObjectId.isValid(req.params.id);

    // Mongoose ID validation check
    if (!isValidId) {
        return res.status(400).json({
            message: _response.isNotValidId,
        });
    }

    ////collection data find
    let data = await User.findById(req.params.id);

    //// condition check
    if (!data) {
        return res.status(404).json({
            message: _response.notFound,
        });
    }

    try {
        const user = await User.findByIdAndUpdate(
            { _id: req.params.id },
            { $addToSet: { roles: req.body.roles } },
            { new: true })

        res.status(200).json({
            currentDate: new Date().toUTCString(),
            status: 200,
            message: _response.update,
            data: { user }
        });
    } catch (err) {
        return res.status(500).json({
            message: _response.internalError
        });
    }
}


exports.hasPermission = async (req, res, next) => {
    const id = "62f352b80889b50421947ed0";

    try {
        const user = await User.findById(id)
            .populate({
                path: 'roles',
                model: 'Role',
                populate: [{
                    path: 'permissions',
                    model: 'Permission'
                }]
            })

        res.status(200).json({
            currentDate: new Date().toUTCString(),
            status: 200,
            // message: _response.update,
            data: { user }
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: _response.internalError
        });
    }
}