const express = require('express');
const sql = require('mssql');
const cors = require('cors');
const app = express();

app.use(cors());

const config = {
  user: 'sqladmin',
  password: 'YourStrongPassword123',
  server: 'hoadon-sql-server.database.windows.net',
  database: 'HoaDonDB',
  options: {
    encrypt: true,
    enableArithAbort: true
  }
};

app.get('/api/chi-tiet-hoa-dons', async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query('SELECT * FROM ChiTietHoaDons');
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send('Lỗi khi truy vấn SQL Server');
  }
});

app.listen(3000, () => {
  console.log('Server đang chạy tại http://localhost:3000');
});
