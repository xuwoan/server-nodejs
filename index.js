'use strict';

var express = require('express');
var app = express();
var router = express.Router();
var Provincedb = require("./Province");
var Genderdb = require("./Gender");
var Jobdb = require("./Job");
var Typejobdb = require("./Typejob");
var Experiencedb = require("./Experience");
var Departmentdb = require("./Department");
var Accountdb = require("./Account");
var Userdb = require("./User");
var Postdb = require("./Post");
var Newsdb = require("./News");
var CVdb = require("./CV");
var CVtoEmployerdb = require("./CVtoEmployer");
var Registerdb = require("./RegisterCode");
var config = require('./config');
var fs = require('fs');
var cors = require('cors')
var dateFormat = require('dateformat');
var server = app.listen('3000', function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Server start at http://%s:%s', '0.0.0.0', host, 3000);
});
var imgPath = './download.png';
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');

var path = require('path');
var imgpath_male = './avatar_man.png';
var imgpath_female = './avatar_woman.png';
var imgpath_company = './default_company_logo.jpg';
const bodyParser = require('body-parser');
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var CronJob = require('cron').CronJob;

new CronJob('0 0 0 * * 0-7', function () {
    var newdate = new Date();
    var d = new Date();
    var response = {};
    Postdb.find({ $and: [{ date: { $lt: d.setDate(newdate.getDate() - 15) } }, { active: true }] }, function (err, data) {
        // This will run Mongo Query to fetch data based on ID.
        if (err) {
            console.log(err)
        } else {
            for (var i = 0; i < data.length; i++) {
                Postdb.findById(data[i]._id, function (error, post) {
                    if (error) {
                        response = { "error": true, "message": "Error fetching data" };
                    } else {
                        post.active = false;

                        // save the data
                        post.save(function (err) {
                            if (err) {
                                response = { "error": true, "message": "Error updating data" };
                            } else {
                                response = { "error": false, "message": "Data is updated for " };
                            }
                            console.log(response);
                        })
                    }
                });
            }

        }

    });
}, null, true, 'America/Los_Angeles');
router.use('/image', express.static(path.join(__dirname)));
router.route("/province/all")
    .get(function (req, res) {
        var response = {};
        Provincedb.find({}, function (err, data) {

            if (err) {
                response = { "error": true, "message": "Error fetching data" };
            } else {
                response = { "error": false, "message": data };
            }
            res.json(response);
        });
    })

// router.route("/getarrangedepartment/all")
//     .get(function (req, res) {
//         var response = {};
//         Provincedb.find({}, function (err, data) {

//             if (err) {
//                 response = { "error": true, "message": "Error fetching data" };
//             } else {
//                 response = { "error": false, "message": data };
//             }
//             res.json(response);
//         });
//     })

router.route("/province")
    .get(function (req, res) {
        var response = {};
        Provincedb.find({ key: req.query.key }, function (err, data) {
            // This will run Mongo Query to fetch data based on ID.
            if (err) {
                response = { "error": true, "message": "Error fetching data" };
            } else {
                response = { "error": false, "message": data };
            }
            res.json(response);
        });
    })

// get data gender
router.route("/gender/all")
    .get(function (req, res) {
        var response = {};
        Genderdb.find({}, function (err, data) {

            if (err) {
                response = { "error": true, "message": "Error fetching data" };
            } else {
                response = { "error": false, "message": data };
            }
            res.json(response);
        });
    })


router.route("/gender")
    .get(function (req, res) {
        var response = {};
        Genderdb.find({ key: req.query.key }, function (err, data) {
            // This will run Mongo Query to fetch data based on ID.
            if (err) {
                response = { "error": true, "message": "Error fetching data" };
            } else {
                response = { "error": false, "message": data };
            }
            res.json(response);
        });
    })
// Job  
router.route("/job/all")
    .get(function (req, res) {
        var response = {};
        Jobdb.find({}, function (err, data) {

            if (err) {
                response = { "error": true, "message": "Error fetching data" };
            } else {
                response = { "error": false, "message": data };
            }
            res.json(response);
        });
    })

router.route("/job")
    .get(function (req, res) {
        var response = {};
        Jobdb.find({ key: req.query.key }, function (err, data) {
            // This will run Mongo Query to fetch data based on ID.
            if (err) {
                response = { "error": true, "message": "Error fetching data" };
            } else {
                response = { "error": false, "message": data };
            }
            res.json(response);
        });
    })
// Job  
router.route("/job/all")
    .get(function (req, res) {
        var response = {};
        Jobdb.find({}, function (err, data) {

            if (err) {
                response = { "error": true, "message": "Error fetching data" };
            } else {
                response = { "error": false, "message": data };
            }
            res.json(response);
        });
    })

router.route("/job")
    .get(function (req, res) {
        var response = {};
        Jobdb.find({ key: req.query.key }, function (err, data) {
            // This will run Mongo Query to fetch data based on ID.
            if (err) {
                response = { "error": true, "message": "Error fetching data" };
            } else {
                response = { "error": false, "message": data };
            }
            res.json(response);
        });
    })
// TypeJob  
router.route("/typejob/all")
    .get(function (req, res) {
        var response = {};
        Typejobdb.find({}, function (err, data) {

            if (err) {
                response = { "error": true, "message": "Error fetching data" };
            } else {
                response = { "error": false, "message": data };
            }
            res.json(response);
        });
    })

router.route("/typejob")
    .get(function (req, res) {
        var response = {};
        Typejobdb.find({ key: req.query.key }, function (err, data) {
            // This will run Mongo Query to fetch data based on ID.
            if (err) {
                response = { "error": true, "message": "Error fetching data" };
            } else {
                response = { "error": false, "message": data };
            }
            res.json(response);
        });
    })
// Department  
router.route("/department/all")
    .get(function (req, res) {
        var response = {};
        Departmentdb.find({}, function (err, data) {

            if (err) {
                response = { "error": true, "message": "Error fetching data" };
            } else {
                response = { "error": false, "message": data };
            }
            res.json(response);
        });
    })

router.route("/department")
    .get(function (req, res) {
        var response = {};
        Departmentdb.find({ key: req.query.key }, function (err, data) {
            // This will run Mongo Query to fetch data based on ID.
            if (err) {
                response = { "error": true, "message": "Error fetching data" };
            } else {
                response = { "error": false, "message": data };
            }
            res.json(response);
        });
    })

// Experience
router.route("/experience/all")
    .get(function (req, res) {
        var response = {};
        Experiencedb.find({}, function (err, data) {

            if (err) {
                response = { "error": true, "message": "Error fetching data" };
            } else {
                response = { "error": false, "message": data };
            }
            res.json(response);
        });
    })

router.route("/experience")
    .get(function (req, res) {
        var response = {};
        Experiencedb.find({ key: req.query.key }, function (err, data) {
            // This will run Mongo Query to fetch data based on ID.
            if (err) {
                response = { "error": true, "message": "Error fetching data" };
            } else {
                response = { "error": false, "message": data };
            }
            res.json(response);
        });
    })


// Account
router.route("/account/all")
    .get(function (req, res) {
        var response = {};
        Accountdb.find({}, function (err, data) {

            if (err) {
                response = { "error": true, "message": "Error fetching data" };
            } else {
                response = { "error": false, "message": data };
            }
            res.json(response);
        });
    })


// LOGIN
router.route("/account")
    .get(function (req, res) {
        var response = {};

        var token = req.headers['x-access-token'];
        if (!token) return res.json({ auth: false, message: 'No token provided.' });
        console.log(token);
        jwt.verify(token, config.secret, function (err, decoded) {
            if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
            Userdb.findOne({ userid: decoded.id }, function (err, user) {

                if (err) {
                    response = { "error": true, "message": "Error somewhere" };
                } else {
                    if (user !== null)

                        response = { "error": false, "message": user, "token": token };
                    else response = { "error": true, "message": "Error Looking user" };
                }
                res.json(response);
            });

        });
    })
    .post(function (req, res) {
        console.log(req.body.username)
        var response = {};
        var deferred = Q.defer();

        //res.send(JSON.stringify(req.query));
        Accountdb.findOne({ username: req.body.username }, function (err, data) {
            // This will run Mongo Query to fetch data based on ID.
            if (err) {
                response = { "error": true, "message": "Error fetching data" };
                res.json(response);
            } else {
                console.log(data);
                if (data !== null) {
                    if (bcrypt.compareSync(req.body.password, data.hash)) {
                        Userdb.findOne({ userid: data._id }, function (err, user) {

                            if (err) {
                                response = { "error": true, "message": "Error somewhere" };
                            } else {
                                var token = jwt.sign({ id: user.userid }, config.secret, {
                                    expiresIn: 86400 // expires in 24 hours
                                });
                                console.log(token);

                                response = { "error": false, "message": user, "token": token };
                            }
                            res.json(response);
                        });
                    }
                    else {
                        return res.json({ error: false, message: "Tài khoản  mật khẩu sai" });
                    }
                } else {
                    return res.json({ error: false, message: "Tài khoản  mật khẩu sai" });
                }

            }

        });
    })

// USER

async function getjobname(keyid) {


    console.log(keyid)
    var a = await Jobdb.findOne({ key: keyid }, function (err, data) {
        // if (err) {
        //     console.log(err)
        //     return "";
        // } else {
        //     name =  data.name
        // }
    })

    return await a.name;


}
async function getcandidatename(keyid) {


    console.log("KEY", keyid)
    var a = await CVdb.findOne({ _id: keyid }, async function (err, data) {


    })
    let name = a.resume.profile.name;
    // console.log(name)

    return await name;


}

async function getcompanyname(id) {

    var name = await Userdb.findOne({ userid: id, type: 1 }, function (err, data) {

    })

    return await name.detailemployer.company.name;


}
async function getlogocompany(id) {

    // var logo = {};
    var logo = await Userdb.findOne({ userid: id, type: 1 }, function (err, data) {
        // if (err) {
        //     console.log(err)
        //     return {};
        // } else {
        //     if (data === null)
        //         return {}
        //     else logo = data.detailemployer.company.logo
        // }
    })

    return await logo.detailemployer.company.logo;


}
async function getdepartmentname(keyid) {
    if (keyid === null)
        return ""
    else {
        var a = await Departmentdb.findOne({ key: keyid }, function (err, data) {
        })

        return await a.name;
    }


}
async function gettypejobname(keyid) {


    var a = await Typejobdb.findOne({ key: keyid }, function (err, data) {

    })

    return await a.name;


}
async function getgendername(keyid) {


    var a = await Genderdb.findOne({ key: keyid }, function (err, data) {

    })

    return await a.name;


}
async function getprovincename(keyid) {


    var a = await Provincedb.findOne({ key: keyid }, function (err, data) {

    })

    return await a.name;


}

async function countjob(data) {

    var count = 0;
    for (var i = 0; i < data.length; i++) {
        count = count + data[i].job.length;
    }


    return await count;


}
async function covertdate(date) {

    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var dt = date.getDate();

    if (dt < 10) {
        dt = '0' + dt;
    }
    if (month < 10) {
        month = '0' + month;
    }
    console.log(dt + '-' + month + '-' + year)
    return await dt + '-' + month + '-' + year;




}

async function getexperiencename(keyid) {


    var a = await Experiencedb.findOne({ key: keyid }, function (err, data) {

    })

    return await a.name;


}

router.route("/recruiment")

    .post(async function (req, res) {
        var job = {
            amount: null,
            job: null,

        }
        var post = {
            id: null,
            rate: null,
            company: { userid: null, name: null, logo: null },
            active: null,
            deadline: null,
            contact: null,
            detail: null,
            job: [],

        };
        var response;
        await Postdb.findOne({ _id: req.body.id }, async function (err, data) {

            if (err) {
                console.log(err)
                response = { "error": true, "message": err };

            } else {
                post.id = data._id;
                post.title = data.title;
                post.rate = data.rate;
                post.company.userid = data.userID;
                console.log("a");
                post.company.name = await getcompanyname(data.userID);

                post.company.logo = await getlogocompany(data.userID);
                post.active = data.active;
                post.deadline = data.deadline;
                for (var i = 0; i < data.job.length; i++) {

                    post.job[i] = Object.assign({}, job);
                    post.job[i].amount = data.job[i].info.amount;

                    post.job[i].job = await getjobname(data.job[i].info.jobKey)


                    post.job[i].major = await getdepartmentname(data.job[i].info.majorKey);
                    post.job[i].typejob = await gettypejobname(data.job[i].info.typeKey);
                    post.job[i].salary = data.job[i].info.salary;
                    post.job[i].address = data.job[i].info.address.address;
                    post.job[i].experience = await getexperiencename(data.job[i].require.experienceKey);
                    post.job[i].gender = await getgendername(data.job[i].require.genderKey);
                    post.job[i].other = data.job[i].require.other;
                }
                post.contact = data.contact;
                post.detail = data.detail;




                response = { "error": true, "message": post };

            }
            await res.json(response)

        });
    });

router.route("/recruiment")

    .post(async function (req, res) {
        var job = {
            amount: null,
            job: null,

        }
        var post = {
            id: null,
            rate: null,
            company: { userid: null },
            active: null,
            deadline: null,
            job: []
        };
        var response;
        await Postdb.findOne({ _id: req.body.id }, async function (err, data) {

            if (err) {
                console.log(err)
                response = { "error": true, "message": err };

            } else {
                post.id = data._id;
                post.title = data.title;
                post.rate = data.rate;
                post.company.userid = data.userID;
                post.active = data.active;
                post.deadline = data.deadline;
                for (var i = 0; i < data.job.length; i++) {

                    post.job[i] = Object.assign({}, job);
                    post.job[i].amount = data.job[i].info.amount;
                    post.job[i].job = await getjobname(data.job[i].info.jobKey);
                    post.job[i].major = await getdepartmentname(data.job[i].info.majorKey);
                    post.job[i].typejob = await gettypejobname(data.job[i].info.typeKey);
                    post.job[i].salary = data.job[i].info.salary;
                    post.job[i].address = data.job[i].info.address.address;
                    post.job[i].experience = await getexperiencename(data.job[i].require.experienceKey);
                    post.job[i].gender = await getgendername(data.job[i].require.genderKey);
                    post.job[i].other = data.job[i].require.other;
                }
                post.contact = data.contact;
                post.deadline = data.detail;
                post.companyname = await getcompanyname(data.userID);
                post.logocompany = await getlogocompany(data.userID);



                response = await { "error": true, "message": post }

            }
            await res.json(response)

        });
    });

router.route("/gettopmajor")

    .get(async function (req, res) {
        var onedata = {
            name: null,
            department: null,
            population: null

        }
        var array = [];
        var response;
        var countpost = 0;
        await Departmentdb.find({}, async function (err, data) {

            if (err) {
                console.log(err)
                response = { "error": true, "message": err };

            } else {
                await Postdb.find({

                }, async function (error, data) {
                    if (error) {
                        response = { "error": true, "message": "Error fetching data account" };

                    } else {
                        countpost = await countjob(data);
                    }
                });

                console.log("dddd", countpost);
                for (var i = 0; i < data.length; i++) {
                    var newarray = Object.assign({}, onedata)
                    newarray.department = data[i].name;
                    var find = await Postdb.find({
                        job: {
                            $elemMatch: {
                                "info.majorKey": data[i].key
                            }
                        }
                    }, function (error, data) {
                        if (error) {
                            response = { "error": true, "message": "Error fetching data account" };

                        } else {

                        }
                    });
                    newarray.population = parseFloat((find.length / countpost * 100).toFixed(1))


                    newarray.name = String(newarray.population + "%")
                    array.push(newarray)
                }

                array.sort(function (a, b) { return b.population - a.population });
                for (var i = 9; i < array.length; i++) {
                    array[9].population = parseFloat(array[9].population) + parseFloat(array[i].population)
                }
                array[9].department = "Khác";
                array[9].name = array[9].population + "%"



                response = { "error": true, "message": array.slice(0, 10) };

            }
            await res.json(response)

        });
    });
router.route("/getavatar")
    .post(async function (req, res) {
        var img = req.body.image;
        var type = req.body.type;


        var datatype = await type.replace("image/", "")
        console.log("DATA TYPE", datatype)
        res.json({ a: datatype })

        // await fs.writeFile("./userimage/"+'image'+'.'+datatype, buf, err => {
        //     console.log(err)

        //     res.json({a:err})
        // })
    })
router.route("/user")
    .get(function (req, res) {
        var response = {};
        console.log("aaaa", req.query)


        if (req.query.type === 1) {
            Userdb.find({ _id: req.query.userid }, function (err, data) {

                if (err) {
                    response = { "error": true, "message": "Error fetching data user" };
                } else {
                    var info = { "type": req.query.type, "info": data.detailemployer }
                    response = { "error": false, "message": info };
                }
                res.json(response);
            });
        }
        else
            if (req.query.type === 0) {
                Userdb.find({ _id: req.query.userid }, function (err, data) {

                    if (err) {
                        response = { "error": true, "message": "Error fetching data user" };
                    } else {
                        var info = { "type": req.query.type, "info": data.detailcandidate }
                        response = { "error": false, "message": info };
                    }
                    res.json(response);
                });
            }
    })

    .post(function (req, res) {
        var db = new Userdb();
        var dbaccount = new Accountdb();
        var response = {};
        var checkusername = 0;
        if (req.body.type === 0) {
            dbaccount.username = req.body.username;

            dbaccount.hash = bcrypt.hashSync(req.body.password);
            var find = Accountdb.find({ username: req.body.username }, function (error, data) {
                if (error) {
                    response = { "error": true, "message": { "success": false, "message": "Error fetch data account" } };
                    res.json(response);
                } else {

                }
            })
            find.count(async function (error, count) {
                checkusername = count;


                if (checkusername >= 1) {
                    response = { "error": true, "message": { "success": false, "message": "Please choose anoter username" } };
                    res.json(response);
                }
                else {
                    var code = await Registerdb.findOne({ code: req.body.code }, function (error, data) {
                        if (error) {
                            response = { "error": true, "message": { "success": false, "message": "Error fetch code" } };
                            res.json(response);
                        } else {
                            console.log("data", data)
                        }
                    })
                    console.log("cc", code);
                    if (code !== null) {
                        dbaccount.save(function (err) {

                            if (err) {
                                response = { "error": true, "message": { "success": false, "message": { "success": false, "message": "Error adding data" } } };
                            } else {

                                //checkusername = Accountdb.find({ username: req.body.username }).count();

                                Accountdb.findOne({ username: req.body.username }, function (error, data) {

                                    if (error) {
                                        response = { "error": true, "message": { "success": false, "message": "Error adding data" } };
                                        res.json(response);
                                    } else {
                                        // var token = jwt.sign({ id: data._id }, config.secret, {
                                        //     expiresIn: 86400 // expires in 24 hours
                                        // });
                                        if (data !== null) {

                                            db.userid = data._id;
                                            db.type = 0;
                                            db.detailcandidate = req.body.detail;
                                            // db.detailcandidate.avatar.contentType = 'image/png';
                                            db.detailcandidate.avatar = "/image/userimage/" + data._id + ".png"
                                            if (req.body.detail.gender == 0)
                                            // db.detailcandidate.avatar.data = fs.readFileSync(imgpath_male);
                                            {
                                                fs.writeFile("./userimage/" + data._id + ".png", fs.readFileSync(imgpath_male), err => {
                                                    console.log(err)
                                                })
                                            }
                                            else
                                            // db.detailcandidate.avatar.data = fs.readFileSync(imgpath_female);
                                            {
                                                {
                                                    fs.writeFile("./userimage/" + data._id + ".png", fs.readFileSync(imgpath_female), err => {
                                                        console.log(err)
                                                    })
                                                }
                                            }
                                            db.detailemployer = null;
                                            db.save(function (err) {

                                                if (err) {
                                                    response = { "error": true, "message": { "success": false, "message": "Error adding data" } };
                                                } else {
                                                    response = { "error": false, "message": { "success": true, "message": "Resgister Succesfull " } };
                                                }
                                                res.json(response);


                                            });
                                        } else res.json({ "error": true, "message": { "success": false, "message": "Error adding data" } });
                                    }


                                });
                            }
                        })
                    } else {
                        res.json({ "error": true, "message": { "success": false, "message": "Code is not exist" } });
                    }
                }

            });




        } else
            if (req.body.type === 1) {
                dbaccount.username = req.body.username;
                // Hash the password using SHA1 algorithm.
                dbaccount.hash = bcrypt.hashSync(req.body.password);
                var find = Accountdb.find({ username: req.body.username }, function (error, data) {
                    if (error) {
                        response = { "error": true, "message": "Error fetching data account" };
                        res.json(response);
                    } else {
                    }
                })
                find.count(async function (error, count) {
                    checkusername = count;
                    if (checkusername >= 1) {
                        response = { "error": true, "message": { "success": false, "message": "Please choose anoter username" } };
                        res.json(response);
                    }
                    else {
                        var code = await Registerdb.findOne({ code: req.body.code }, function (error, data) {
                            if (error) {
                                response = { "error": true, "message": { "success": false, "message": "Error fetch code" } };
                                res.json(response);
                            } else {
                                console.log("data", data)
                            }
                        })
                        console.log("cc", code);
                        if (code !== null) {
                            dbaccount.save(function (err) {

                                if (err) {
                                    response = { "error": true, "message": { "success": false, "message": "Error save account" } };
                                } else {

                                    //checkusername = Accountdb.find({ username: req.body.username }).count();

                                    Accountdb.findOne({ username: req.body.username }, function (error, data) {

                                        if (error) {
                                            response = { "error": true, "message": { "success": false, "message": "Error find account" } };
                                            res.json(response);
                                        } else {
                                            if (data !== null) {
                                                var a;

                                                console.log(data)
                                                db.userid = data._id;
                                                db.type = 1;
                                                db.detailcandidate = null;
                                                db.detailemployer = req.body.detail;
                                                db.detailemployer.company.logo = "/image/userimage/" + data._id + ".jpg"
                                                // db.detailemployer.company.logo.contentType = 'image/jpg';
                                                // db.detailemployer.company.logo.data = fs.readFileSync(imgpath_company);
                                                fs.writeFile("./userimage/" + data._id + ".jpg", fs.readFileSync(imgpath_company), err => {
                                                    console.log(err)
                                                })
                                                db.save(function (err) {

                                                    if (err) {
                                                        response = { "error": true, "message": { "success": false, "message": "Error adding data" } };
                                                    } else {
                                                        response = { "error": false, "message": { "success": true, "message": "Resgister Employer Succesfull" } };
                                                    }
                                                    res.json(response);


                                                });
                                            } else res.json({ "error": true, "message": { "success": false, "message": "Error adding data" } });
                                        }


                                    });
                                }
                            })
                        } else {
                            res.json({ "error": true, "message": { "success": false, "message": "Code is not exist" } });
                        }
                    }

                });
            }

    })

router.route("/user/update")
    .post(function (req, res) {
        var response = {};
        if (req.body.type === 1) {
            Accountdb.findById(req.body.userid, function (err, data) {
                if (err) {
                    response = { "error": true, "message": "Error fetching data" };
                } else {
                    console.log(req.body.password);
                    if (bcrypt.compareSync(req.body.password, data.hash)) {

                        data.hash = bcrypt.hashSync(req.body.newpassword);
                        data.save(function (err) {
                            if (err) {
                                response = { "error": true, "message": { "message": "Error fetching data", "success": false } };
                                res.json(response);
                            } else {
                                Userdb.findOne({ userid: req.body.userid }, async function (err, data) {
                                    if (err) {
                                        response = { "error": true, "message": { "message": "Error fetching data", "success": false } };
                                    } else {
                                        response = { "error": false, "message": { "message": data, "success": true } };
                                    }
                                    res.json(response);

                                })

                            }

                        })
                    }
                    else res.json({ "error": true, "message": { "message": "Mật khẩu cũ không chính xác ", "success": false } });
                }
            });
        } else
            if (req.body.type === 2) {
                Userdb.findOne({ userid: req.body.userid }, async function (err, data) {
                    if (err) {
                        response = { "error": true, "message": { "message": "Error fetching data", "success": false } };
                    } else {
                        if (data !== null) {
                            console.log(data)
                            var a = Math.floor((Math.random() * 5000) + 1);
                            if (req.body.changeimage === true) {
                                var img = req.body.image.data;
                                var type = req.body.image.type;



                                var datatype = await type.replace("image/", "");
                                //    var datatype="";
                                console.log("DATA TYPE", datatype)
                                var buf = new Buffer(img, 'base64');

                                await fs.writeFile("./userimage/" + req.body.userid + '_' + a + '.' + datatype, buf, err => {
                                    if (err === null) {

                                    } else {
                                        res.json({ "error": true, "message": { "message": err, "success": false } })
                                    }

                                })

                            }





                            console.log("P");
                            if (req.body.usertype == 0) {
                                console.log("P2")
                                data.detailcandidate = req.body.detail;
                                if (req.body.changeimage === true) {
                                    data.detailcandidate.avatar = "/image/userimage/" + req.body.userid + '_' + a + "." + req.body.image.type.replace("image/", "");
                                }
                                data.detailemployer = null;
                            }
                            else if (req.body.usertype == 1) {
                                console.log("P3")
                                data.detailcandidate = null;

                                data.detailemployer = req.body.detail;
                                if (req.body.changeimage === true) {
                                    data.detailemployer.company.logo = "/image/userimage/" + req.body.userid + '_' + a + "." + req.body.image.type.replace("image/", "");
                                }

                            }
                            await data.save(function (err) {
                                if (err) {
                                    response = { "error": true, "message": { "message": "Error updating data", "success": false } };
                                } else {
                                    response = { "error": false, "message": { "message": data, "success": true } };
                                }
                                res.json(response);
                            })
                        } else res.json({ "error": true, "message": { "message": "Error updating data", "success": false } });
                    }
                });
            }

    })
router.route("/recruiment/getuserpost")
    .get(function (req, res) {
        var response = {};

        var post = {
            id: "",
            title: "",
            userid: "",
            active: null,
            date: null,
            job: []
        }
        //res.send(JSON.stringify(req.query));
        Postdb.find({ userID: req.query.userid }, async function (err, data) {
            // This will run Mongo Query to fetch data based on ID.
            if (err) {
                response = { "error": true, "message": "Error fetching data" };
            } else {
                await data.sort(function (b, a) { return new Date(a.date) - new Date(b.date) });
                var data1 = [];
                for (var i = 0; i < data.length; i++) {
                    var npost = Object.assign({}, post);
                    npost.id = data[i]._id;
                    console.log("abc")
                    npost.title = data[i].title;
                    npost.userid = data[i].userid;
                    npost.active = data[i].active;
                    npost.date = await covertdate(data[i].date);
                    npost.job = [];
                    for (var j = 0; j < data[i].job.length; j++) {
                        console.log("JOB LE", data[i].job.length)
                        await npost.job.push(await getjobname(data[i].job[j].info.jobKey))

                    }
                    await data1.push(npost)


                }
                response = { "error": false, "message": data1 };
            }
            res.json(response);
        });


    })
async function showlistjob(list) {
    var name = "";

    for (var i = 0; i < list.length; i++) {
        name = name + "," + await getjobname(list[i].info.jobKey)
    }


    return await name.slice(1);
}
async function showlistcity(list) {
    var name = "";

    for (var i = 0; i < list.length; i++) {
        for (var j = 0; j < list[i].info.address.cityKey.length; j++) {

            name = name + "," + await getprovincename(list[i].info.address.cityKey[j])
        }

    }


    return await name.slice(1);

}
function showlistsalary(list) {
    var name = ""

    if (list.length === 1)
        if (list[0].info.salary.salary === null)
            name = list[0].info.salary.other
        else name = list[0].info.salary.salary
    else
        name = 'Xem chi tiết';
    return name;

}


router.route("/recruiment/getallpost")
    .get(function (req, res) {
        var response = {};
        var array = [];
        var post = {
            id: null,
            title: null,
            rate: null,
            companyname: null,
            image: null,
            salary: null,
            job: null,
            location: null,
            userid: null
        }
        //res.send(JSON.stringify(req.query));
        Postdb.find({ active: true }, async function (err, data) {

            if (err) {
                response = { "error": true, "message": "Error fetching data" };
            } else {
                console.log(data)
                var array = [];
                await data.sort(function (a, b) { return new Date(a.date) - new Date(b.date) });
                for (var i = 0; i < data.length; i++) {
                    data[i].score = i * 0.2 + data[i].rate * 0.8;
                    console.log("score", data[i].score)
                }
                console.log("NUM", data.length)
                await data.sort(function (a, b) { return b.score - a.score });
                for (var a = 0; a < data.length; a++) {
                    var newarray = Object.assign({}, post)
                    newarray.id = data[a]._id;
                    newarray.title = data[a].title;
                    newarray.rate = data[a].rate;
                    newarray.companyname = await getcompanyname(data[a].userID);
                    newarray.image = await getlogocompany(data[a].userID);
                    newarray.salary = await showlistsalary(data[a].job);
                    newarray.job = await showlistjob(data[a].job);
                    newarray.location = await showlistcity(data[a].job);
                    newarray.userid = data[a].userID;
                    array.push(newarray)

                }

                response = { "error": false, "message": array };
            }
            res.json(response);
        });


    })
router.route("/recruiment/filterallpost")
    .post(function (req, res) {
        var response = {};
        var array = [];
        var post = {
            id: null,
            title: null,
            rate: null,
            companyname: null,
            image: null,
            salary: null,
            job: null,
            location: null,
            userid: null
        }
        Postdb.find({
            active: true,
            job: {
                $elemMatch: {
                    "require.experienceKey": req.body.experience !== null ? req.body.experience : { $exists: true },
                    "require.genderKey": req.body.gender !== null ? req.body.gender : { $exists: true },
                    "info.jobKey": req.body.job !== null ? req.body.job : { $exists: true },
                    "info.majorKey": req.body.major !== null ? req.body.major : { $exists: true },
                    "info.typeKey": req.body.typejob !== null ? req.body.typejob : { $exists: true },
                    "info.address.cityKey": req.body.city !== null ? req.body.city : { $exists: true },
                    "info.salary.salary": req.body.salarymax !== null ? { $gte: req.body.salarymin, $lte: req.body.salarymax } : { $exists: true },


                }
            }
        }, async function (err, data) {

            if (err) {
                response = { "error": true, "message": err };
            } else {
                data.sort(function (a, b) { return new Date(a.date) - new Date(b.date) });
                for (var i = 0; i < data.length; i++) {
                    data[i].score = i * 0.4 + data[i].rate * 0.6;
                }
                data.sort(function (a, b) { return b.score - a.score });
                console.log(data.length);
                for (var a = 0; a < data.length; a++) {
                    var newarray = Object.assign({}, post)
                    newarray.id = data[a]._id;
                    newarray.title = data[a].title;
                    newarray.rate = data[a].rate;
                    newarray.companyname = await getcompanyname(data[a].userID);
                    newarray.image = await getlogocompany(data[a].userID);
                    newarray.salary = await showlistsalary(data[a].job);
                    newarray.job = await showlistjob(data[a].job);
                    newarray.location = await showlistcity(data[a].job);
                    newarray.userid = data[a].userID;
                    array.push(newarray)

                }
                response = { "error": false, "message": array };
            }
            res.json(response);
        });

    })
router.route("/post/createpost")
    .post(function (req, res) {
        var db = new Postdb();
        var response = {};

        db.title = req.body.title;
        db.job = req.body.job;
        db.detail = req.body.detail;
        db.contact = req.body.contact;
        db.deadline = req.body.deadline;
        db.active = req.body.active;
        db.date = dateFormat(req.body.date, "yyyy-mm-dd HH:MM:ss");
        db.userID = req.body.userid
        db.rate = req.body.rate



        db.save(function (err) {
            // save() will run insert() command of MongoDB.
            // it will add new data in collection.
            if (err) {
                response = { "error": true, "message": { "message": err, "success": false } };
            } else {
                response = { "error": false, "message": { "message": "Create recruiment successful !!", "success": true } };
            }
            res.json(response);
        });

    })
router.route("/post/deletepost")
    .post(function (req, res) {

        var response = {};

        Postdb.remove({ _id: req.body.id }, function (err, result) {
            if (err) {
                response = { "error": true, "message": err };
            } else {
                response = { "error": false, "message": { "message": "Delete recruiment successful !!", "success": true } };
            }
            res.json(response);
        });


    })
router.route("/post/getdetailpost")
    .get(function (req, res) {
        var response = {};

        var text = {
            experience: "Không yêu cầu",
            major: "",
            typejob: "",
            queryjob: "",
            isfemale: true,
            ismale: true,
            salary: false,
            amount: "",
            textsalary: "0",
            textother: "Thương lượng",
        }
        //res.send(JSON.stringify(req.query));
        var listtext = [];

        Postdb.findOne({ _id: req.query.id }, async function (err, data) {

            if (err) {
                response = { "error": true, "message": { "message": "Error fetching data", "success": false } };
            } else {
                if (data !== null) {
                    for (var i = 0; i < data.job.length; i++) {
                        var t = Object.assign({}, text)
                        t.experience = await getexperiencename(data.job[i].require.experienceKey)
                        t.major = await getdepartmentname(data.job[i].info.majorKey)
                        t.typejob = await gettypejobname(data.job[i].info.typeKey)
                        t.queryjob = await getjobname(data.job[i].info.jobKey)
                        if (data.job[i].require.genderKey === 0) {
                            t.isfemale = true,
                                t.ismale = true

                        } else if (data.job[i].require.genderKey === 1) {
                            t.isfemale = false,
                                t.ismale = true

                        } else {
                            t.isfemale = true,
                                t.ismale = false
                        }
                        t.salary = data.job[i].info.salary.salary === null ? false : true
                        t.textsalary = data.job[i].info.salary.salary === null ? "" : String(data.job[i].info.salary.salary),
                            t.textother = data.job[i].info.salary.other === null ? "" : data.job[i].info.salary.other
                        t.amount = String(data.job[i].info.amount)
                        listtext.push(t)

                    }

                    response = { "error": false, "message": { "message": data, "text": listtext, "success": true } };
                }
                else response = { "error": true, "message": { "message": "Data is not found", "success": false } };
            }
            res.json(response);
        });

    })
router.route("/post/updatepost")
    .post(function (req, res) {
        var response = {};


        Postdb.findOne({ _id: req.body.id }, function (error, post) {
            if (error) {
                response = { "error": true, "message": "Error fetching data" };
            } else {
                if (post !== null) {
                    post.title = req.body.title
                    post.detail = req.body.detail,
                        post.contact = req.body.contact,
                        post.deadline = req.body.deadline,
                        post.job = req.body.job



                    // save the data
                    post.save(function (err) {
                        if (err) {
                            response = { "error": true, "message": { "message": "Error fetching data", "success": false } };
                        } else {
                            response = { "error": false, "message": { "message": "Update successful", "success": true } };
                        }
                        res.json(response);
                    })
                } else {
                    response = { "error": true, "message": { "message": "Error fetching data", "success": false } };
                    res.json(response);
                }
            }
        });

    })
router.route("/news/getallnews")
    .get(function (req, res) {
        var response = {};

        var news =
            {
                id: "",
                title: "",
                type: "",
                image: "",
                content: "",
                date: "",
                viewer: 0
            }
        //res.send(JSON.stringify(req.query));
        Newsdb.find({}, async function (err, data) {

            if (err) {
                response = { "error": true, "message": { "message": "Error fetching data", "success": false } };
            } else {
                var arraytype1 = [];
                var arraytype2 = [];

                await data.sort(function (a, b) { return new Date(a.date) - new Date(b.date) });

                for (var a = 0; a < data.length; a++) {
                    var n = Object.assign({}, news)
                    n.id = data[a]._id;
                    n.title = data[a].title;
                    n.content = data[a].content;
                    n.image = data[a].image;
                    n.viewer = data[a].viewer;
                    n.type = data[a].type;
                    n.date = await covertdate(data[a].date);

                    if (n.type === 1) {
                        arraytype1.push(n);
                    }
                    else if (n.type === 2) { arraytype2.push(n); }
                }

                if (req.query.page1 === 1)
                    arraytype1.splice(5);
                else if (req.query.page1 > 1)
                    arraytype1.splice(0, req.body.page1 * 5);
                if (req.query.page2 === 1)
                    arraytype1.splice(5);
                else if (req.query.page2 > 1)
                    arraytype2.splice(0, req.body.page2 * 5);
                response = { "error": false, "message": { "data1": arraytype1, "data2": arraytype2, "success": false } };
            }
            res.json(response);
        })
    })

router.route("/news/getnews")
    .get(function (req, res) {
        var response = {};


        //res.send(JSON.stringify(req.query));


        Newsdb.findOne({ _id: req.query.id }, function (err, data) {

            if (err) {
                response = { "error": true, "message": { "message": "Error fetching data", "success": false } };
            } else {
                if (data !== null)

                    response = { "error": false, "message": { "message": data, "success": true } };
                else response = { "error": true, "message": { "message": "Data is not found", "success": false } };
            }
            res.json(response);
        });

    })


router.route("/cv/createcv")
    .post(function (req, res) {
        var db = new CVdb();
        var response = {};

        db.cvname = req.body.cvname;
        db.userid = req.body.userid;
        db.maincv = req.body.maincv;
        db.resume = req.body.resume;



        db.date = dateFormat(req.body.date, "yyyy-mm-dd HH:MM:ss");




        db.save(function (err) {
            // save() will run insert() command of MongoDB.
            // it will add new data in collection.
            if (err) {
                response = { "error": true, "message": { "message": err, "success": false } };
            } else {
                response = { "error": false, "message": { "message": "Create cv successful !!", "success": true } };
            }
            res.json(response);
        });

    })
router.route("/cv/getusercv")
    .get(function (req, res) {
        var response = {};

        var cv = {
            id: "",
            cvname: "",
            userid: "",
            maincv: null,
            date: null,

        }
        //res.send(JSON.stringify(req.query));
        CVdb.find({ userid: req.query.userid }, async function (err, data) {
            console.log(req.query.userid)
            if (err) {
                response = { "error": true, "message": "Error fetching data" };
            } else {

                var data1 = [];
                for (var i = 0; i < data.length; i++) {
                    var ncv = Object.assign({}, cv);
                    ncv.id = data[i]._id;

                    ncv.cvname = data[i].cvname;
                    ncv.userid = data[i].userid;

                    ncv.date = await covertdate(data[i].date);
                    ncv.maincv = data[i].maincv;

                    await data1.push(ncv)


                }

                response = { "error": false, "message": { "message": data1, "success": true } };
            }
            res.json(response);
        });


    })
router.route("/cv/getdetailcv")
    .get(function (req, res) {
        var response = {};


        CVdb.find({ _id: req.query.id }, async function (err, data) {
            // This will run Mongo Query to fetch data based on ID.
            if (err) {
                response = { "error": true, "message": "Error fetching data" };
            } else {

                response = { "error": false, "message": { "message": data, "success": true } };
            }
            res.json(response);
        });


    })
router.route("/cv/deletecv")
    .post(function (req, res) {

        var response = {};

        CVdb.remove({ _id: req.body.id }, function (err, result) {
            if (err) {
                response = { "error": true, "message": err };
            } else {
                response = { "error": false, "message": { "message": "Delete cv successful !!", "success": true } };
            }
            res.json(response);
        });


    })
router.route("/cv/updatecv")
    .post(function (req, res) {
        var response = {};


        CVdb.findOne({ _id: req.body.id },async function (error, cv) {
            if (error) {
                response = { "error": true, "message": "Error fetching data" };
            } else {
                if (cv !== null) {
                    if (req.body.type === 0)
                        cv.cvname = req.body.cvname
                    else if (req.body.type === 1)
                        {
                          
                             await CVdb.findOne({ userid: req.body.userid , maincv:true },async function (error, cvdata) {
                                if (error) {
                                 
                                    response = { "error": true, "message": "FOUND" };
                                    res.json(response);
                                } else {
                                    cvdata.maincv = false;
                                  
                                    cvdata.save(function (err) {
                                        if (err) {
                                            response = { "error": true, "message": { "message": "Error save data maincv ", "success": false } };
                                            res.json(response);
                                        } else {
                                           
                                        }
                                        
                                    })

                                   
                                }
                            })
                            cv.maincv = req.body.maincv;

                        }
                    else if (req.body.type === 2)
                        cv.resume = req.body.resume



                    console.log("RE",response)
                     await cv.save( function (err) {
                        if (err) {
                            response = { "error": true, "message": { "message": "Error fetching data", "success": false } };
                        } else {
                            response = { "error": false, "message": { "message": "Update successful", "success": true } };
                        }
                        
                    })
                    res.json(response);
                } else {
                    response = { "error": true, "message": { "message": "Error fetching data", "success": false } };
                    res.json(response);
                }
            }
        });

    })
// CV to Employer
// Get Name Recruiment and Num of CV
router.route("/cvte/createcvte")
    .post(function (req, res) {
        var db = new CVtoEmployerdb();
        var response = {};

        db.cvid = req.body.cvid;
        db.candidateid = req.body.candidateid;
        db.recruimentid = req.body.recruimentid;
        db.employerid = req.body.employerid;
        db.position = req.body.position;
        db.date = dateFormat(req.body.date, "yyyy-mm-dd HH:MM:ss");




        db.save(function (err) {
            // save() will run insert() command of MongoDB.
            // it will add new data in collection.
            if (err) {
                response = { "error": true, "message": { "message": err, "success": false } };
            } else {
                response = { "error": false, "message": { "message": "Create CV to Employer successful !!", "success": true } };
            }
            res.json(response);
        });

    })

router.route("/cvte/getcvtoemployer")
    .get(function (req, res) {
        var response = {};

        var cvte = {
            recruimentid: "",
            recruimenttitle: "",
            numOfCV: 0,


        }
        Postdb.find({ userID: req.query.userid }, async function (err, data) {
            // This will run Mongo Query to fetch data based on ID.
            if (err) {
                response = { "error": true, "message": "Error fetching data" };
            } else {
                var data1 = []
                for (var i = 0; i < data.length; i++) {
                    var ncvte = Object.assign({}, cvte);
                    ncvte.recruimentid = data[i]._id;
                    ncvte.recruimenttitle = data[i].title;
                    var find = await CVtoEmployerdb.find({ recruimentid: data[i]._id }, function (error, data) {
                        if (error) {
                            response = { "error": true, "message": { "success": false, "message": "Error fetch data account" } };
                            res.json(response);
                        } else {

                        }
                    })
                    ncvte.numOfCV = find.length;

                    await data1.push(ncvte)

                }

                response = { "error": false, "message": { "message": data1, "success": true } };
            }
            res.json(response);
        });


    })

router.route("/cvte/getcvinrecruiment")
    .get(function (req, res) {
        var response = {};

        var cv = {
            id: "",
            candidatename: "",
            position: "",
            date: null,

        }
        CVtoEmployerdb.find({ recruimentid: req.query.recruimentid }, async function (err, data) {
            // This will run Mongo Query to fetch data based on ID.
            if (err) {
                response = { "error": true, "message": "Error fetching data" };
            } else {
                var data1 = []
                for (var i = 0; i < data.length; i++) {
                    var ncv = Object.assign({}, cv);
                    ncv.id = data[i].cvid
                    ncv.candidatename = await getcandidatename(data[i].cvid);
                    //       console.log("NAME ",getcandidatename(data[i].cvid))
                    ncv.position = data[i].position;
                    ncv.date = data[i].date;


                    await data1.push(ncv)

                }

                response = { "error": false, "message": { "message": data1, "success": true } };
            }
            res.json(response);
        });


    })
    
router.route("/cvte/deletecvte")
    .post(function (req, res) {

        var response = {};

        CVtoEmployerdb.remove({ _id: req.body.id }, function (err, result) {
            if (err) {
                response = { "error": true, "message": err };
            } else {
                response = { "error": false, "message": { "message": "Delete cvte successful !!", "success": true } };
            }
            res.json(response);
        });


    })
app.use('/', router);