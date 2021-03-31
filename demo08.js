import { createConnection } from 'mysql2'

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
const selectData = async ( ) => {
  let _sql = "select * from users"
  const data = await query( _sql )
  console.log(data)
}



insertData(['sanri', '123', '', new Date()])
selectData()
