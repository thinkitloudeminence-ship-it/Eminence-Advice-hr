const axios = require('axios');
const crypto = require('crypto');

// PhonePe Configuration (Get these from PhonePe dashboard)
const PHONEPE_MERCHANT_ID = 'YOUR_MERCHANT_ID';  // Replace with actual
const PHONEPE_SALT_KEY = 'YOUR_SALT_KEY';        // Replace with actual
const PHONEPE_SALT_INDEX = 1;
const PHONEPE_API_URL = 'https://api.phonepe.com/apis/hermes/pg/v1/pay';

exports.createOrder = async (req, res) => {
  try {
    const { amount, name, email, phone, plan } = req.body;
    
    const orderId = 'ORDER_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
    
    // PhonePe Payload
    const payload = {
      merchantId: PHONEPE_MERCHANT_ID,
      merchantTransactionId: orderId,
      merchantUserId: email,
      amount: Math.round(amount * 100),
      redirectUrl: `${process.env.FRONTEND_URL}/payment/status`,
      redirectMode: 'REDIRECT',
      mobileNumber: phone,
      paymentInstrument: {
        type: 'PAY_PAGE'
      }
    };
    
    const base64Payload = Buffer.from(JSON.stringify(payload)).toString('base64');
    const string = base64Payload + '/pg/v1/pay' + PHONEPE_SALT_KEY;
    const sha256 = crypto.createHash('sha256').update(string).digest('hex');
    const checksum = sha256 + '###' + PHONEPE_SALT_INDEX;
    
    const response = await axios.post(PHONEPE_API_URL, {
      request: base64Payload
    }, {
      headers: {
        'Content-Type': 'application/json',
        'X-VERIFY': checksum
      }
    });
    
    const paymentUrl = response.data.data.instrumentResponse.redirectInfo.url;
    
    res.json({
      success: true,
      orderId,
      paymentUrl
    });
    
  } catch (error) {
    console.error('Payment error:', error.response?.data || error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};