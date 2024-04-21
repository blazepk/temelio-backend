// MockEmailClient.js

class MockEmailClient {
  constructor() {
    // Initialize any necessary variables or configurations
  }

  sendEmail(recipient, subject, content) {
    // Instead of actually sending the email, log the email content
    console.log("Mock email sent to:", recipient);
    console.log("Subject:", subject);
    console.log("Content:", content);
  }
}

module.exports = MockEmailClient;
