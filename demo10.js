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



// 查询用户
const selectData = async ( res) => {
  let _sql = "select * from users"
  const data = await query( _sql )
  res.end(JSON.stringify({data, success: true, errInfo: null}))
}


http.createServer((req, res) => {
 selectData(res)
}).listen(3000, () => console.log('success !'))



