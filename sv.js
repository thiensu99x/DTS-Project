const os = require('os');
const http = require('http');

// Lấy địa chỉ IP nội bộ
const ip = os.networkInterfaces()['eth0'][0].address;

// Lấy cổng từ file cấu hình hoặc đặt mặc định
const port = process.env.PORT || 8080;

// Tạo một server đơn giản
const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Server is running');
});

// Lắng nghe trên địa chỉ IP và cổng đã chỉ định
server.listen(port, ip, () => {
  console.log(`Server is running at http://${ip}:${port}/`);
});