var exec = require('child_process').exec

module.exports.install = function (directories, callback) {

    var action = function () {

        var directory = directories.shift()

        console.log('installing ' + directory)

        var child = exec("npm install", { cwd: directory }, function (error, stdout, stderr) {

            if (stdout.trim().length > 0) {

                console.log(stdout)
            }

            if (stderr.trim().length > 0) {

                console.log(stderr)
            }


            if (error !== null) {

                console.log('exec error: ' + error);
            }
        })

        child.on('close', function () {

            if (directories.length > 0) {

                action()

                return
            }

            if (callback) {

                callback()
            }
        })
    }

    action()
}