const passwordValidation = {
    strength: (pass) => {

        return (pass.length < 8)
            ? false
            : true;

    },

    characters: (pass) => {

        return (pass.match(/^(\w|[\/\#\$\?\-\.])+[\/\#\$\?\-\.\_]+(\w|[\/\#\$\?\-\.])*$/gm))
            ? true
            : false

    },

    validating: (pass, vpass) => {

        return (pass === vpass) ? true : false

    },

    matchPassword: async function (pass, hashedPass) {

        const { compare } = require('bcryptjs');

        return await compare(pass, hashedPass);

    }

};

module.exports = passwordValidation;