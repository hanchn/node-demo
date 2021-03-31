import { createConnection } from 'mysql2'
import http from 'http'
import fs from 'fs'

const connection = createConnection({
    host: 'localhost',
    user: 'root',
    password: 'HanChn123',
    database: 'test',
    port: 3306
})



let query = ( sql, values = []) => {
  
  return new Promise(( resolve, reject ) => {
    connection.query(sql, values, ( err, rows) => {
        if ( err ) {
        reject( err )
        } else {
        resolve( rows )
        }
    })
  })

}


// schemma 
const schema = {
    CREATE_USER_TABLE: `create table if not exists users(
      id INT NOT NULL AUTO_INCREMENT,
      name VARCHAR(100) NOT NULL COMMENT '用户名',
      pass VARCHAR(100) NOT NULL COMMENT '密码',
      avator VARCHAR(100) NOT NULL COMMENT '头像',
      moment VARCHAR(100) NOT NULL COMMENT '注册时间',
      PRIMARY KEY ( id )
    );`
}

// create table 
let createTable = sql => {
  return query( sql, [] )
}

createTable(schema.CREATE_USER_TABLE)


// 注册用户
const insertData = ( value ) => {
  let _sql = "insert into users set name=?,pass=?,avator=?,moment=?;"
  return query( _sql, value )
}

// 查询用户
const selectData = async ( res) => {
  let _sql = "select * from users"
  const data = await query( _sql )
  let table = ''
  data.map(v => {
    const {id, name, pass, avator, moment} = v
    table += `<tr><td>id: ${id}</td><td>id: ${name}</td><td>id: ${pass}</td><td>id: ${avator}</td><td>id: ${moment}</td></tr>`
  })
  res.end(`<html><body><table>${table}</table></body></html>`)
}


http.createServer((req, res) => {
  
  const { method, url } = req
  console.log('url ', url)
  if(url === '/'){
    res.end(fs.readFileSync('./register.html'))
    if(method === 'POST'){
      req.on('data', (chuck) => {
        const { name, pass, avator, moment} = JSON.parse(new Buffer(chuck).toString())
        insertData(name, pass, avator, moment)
      })    
    }
  } else if(url === '/show') {
    selectData(res)
  } else return

  
}).listen(3000, () => console.log('success !'))



