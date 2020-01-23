var express = require('express')

var router = express.Router()

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : localhost,
  user     : 'root',
  password : '123456',
  database : 'pingjia'
});
 
connection.connect();

var addSql = 'INSERT INTO student(studentId, studentName, sex, parentsName, parentsPhone, idCard, class, grade) VALUES(?,?,?,?,?,?,?,?)'
var addSqlParams=new Array(8)
var deleteSql = 'DELETE FROM student WHERE studentId=?'
var updataSql = 'UPDATE student SET studentName=?, sex=?, parentsName=?, parentsPhone=?, idCard=?, class=?, grade=? WHERE studentId=?'
var updateSqlParams=new Array(8)
var querySql = 'SELECT * FROM `student` WHERE grade=? AND class=?'
var querySqlParams=new Array(2)


router.get('/node', function (req, res) {
  connection.query('SELECT * FROM `student`', function (error, rows) {
    if (error) throw error;
    res.render('index.html', {"data":rows})
  });  
})

router.get('/node/student/new', function (req, res) {
  addSqlParams[0] = req.query.stuId
  addSqlParams[1] = req.query.stuName
  addSqlParams[2] = req.query.stuSex 
  addSqlParams[3] = req.query.stuParName
  addSqlParams[4] = req.query.stuParPhone
  addSqlParams[5] = req.query.stuIdCard
  addSqlParams[6] = req.query.stuClass
  addSqlParams[7] = req.query.stuGrade
  
  connection.query(addSql, addSqlParams, function (err, result) {  
    if(err){
      console.log('[INSERT ERROR] - ',err.message)   
      res.end('fail')
    } else {
      res.end('增加')
    }
  })
  
})


router.get('/node/student/delete', function (req, res) { 
  var deleteId = req.query.id 
  connection.query(deleteSql, deleteId, function (err, result) {  
    if(err){
      console.log('[DELETE ERROR] - ',err.message);
    }
  })
  res.end('删除')
})

router.get('/node/student/update', function (req, res) { 
  updateSqlParams[0] = req.query.stuName
  updateSqlParams[1] = req.query.stuSex 
  updateSqlParams[2] = req.query.stuParName
  updateSqlParams[3] = req.query.stuParPhone
  updateSqlParams[4] = req.query.stuIdCard
  updateSqlParams[5] = req.query.stuClass
  updateSqlParams[6] = req.query.stuGrade
  updateSqlParams[7] = req.query.stuId
  connection.query(updataSql, updateSqlParams, function (err, result) {  
    if(err){
      console.log('[UPDATE ERROR] - ',err.message);
    }
  })
  res.end('更新')
})

router.get('/node/student/select', function (req, res) { 
  querySqlParams[0] = req.query.stuGrade
  querySqlParams[1] = req.query.stuClass
  if (req.query.stuGrade === '0' && req.query.stuClass === '0') {
    connection.query('SELECT * FROM `student`', function (err, rows) {  
      if(err)
        console.log('[SELECT ERROR] - ',err.message)
      else 
        res.json(rows)  
    })  
  } else {
    connection.query(querySql, querySqlParams, function (err, rows) {  
      if(err)
        console.log('[SELECT ERROR] - ',err.message)
      else 
        res.json(rows)  
    })  
  }
  
})

module.exports = router

