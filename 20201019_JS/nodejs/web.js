import http from 'http'
const server = http.createServer((request,response)=>{
  response.writeHead(200)
  response.write('<h1>Hi</h1>')
  response.end()
})

server.listen(3000, ()=>{
  console.log('http://localhost:3000');
})