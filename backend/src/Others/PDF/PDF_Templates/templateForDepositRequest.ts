const templateForDepositRequest = (resultValue: any) => {
  const { title, amount, date, data } = resultValue;

  return ` <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Deposit Request</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
              }
                .container {
                    padding: 20px;
                }
                .header {
                    background-color: #f8f9fa;
                    padding: 10px;
                    text-align: center;
                }
                .content {
                    padding: 20px;
                }
                .footer {
                    background-color: #f8f9fa;
                    padding: 10px;
                    text-align: center;
                }
            </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>${title}</h2>
            </div>
            <div class="content">
              <p>Deposit Amount: ${amount}</p>
              <p>Deposit Type: ${data?.depositType}</p>
              <p>Deposit Transaction ID: ${data?.deposit_transaction_id}</p>
              <p>Date: ${date}</p>
              <p>Please wait for the admin to confirm your deposit.</p>
              <p>Best regards,</p>
              <p>ByteBridge It Solutions.</p>
            </div>
            <div class="footer">
              <p>ByteBridge It Solutions. &copy; ${new Date().getFullYear()}</p>
            </div>
          </div>
        </body>
      </html>
      `;
};

export default templateForDepositRequest;
