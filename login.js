const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Địa chỉ callback url của ứng dụng
const CALLBACK_URL = 'https://your-app.com/zalo/callback';

// Xử lý các thông báo từ Zalo API
app.post('/zalo/callback', (req, res) => {
  const data = req.body;
  
  // Kiểm tra xem thông báo có phải từ Zalo API không
  if (data.app_id == '398735144457400578') {
    // Xử lý các thông báo
    switch (data.event_name) {
      case 'user_scan_qr':
        // Người dùng quét mã QR code của ứng dụng của bạn
        console.log(`User ${data.user_id} scanned QR code`);
        break;
      case 'user_send_text':
        // Người dùng gửi tin nhắn văn bản cho ứng dụng của bạn
        console.log(`User ${data.user_id} sent message: ${data.message.text}`);
        break;
      // Xử lý các thông báo khác
      default:
        console.log(`Received event ${data.event_name}`);
    }
    
    // Trả về mã 200 để thông báo cho Zalo API rằng bạn đã nhận được thông báo thành công
    res.sendStatus(200);
  }
});

// Khởi động server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});