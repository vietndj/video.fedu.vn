import { sendCourseActivationEmail } from "../api/services/emailService";

const targetEmail = process.argv[2] || "vietnd7@gmail.com";
console.log(`Bắt đầu gửi email test cho: ${targetEmail}`);

sendCourseActivationEmail({
  name: "viet (Test)",
  email: targetEmail,
  phone: "0934688632",
  transactionId: "TEST_" + Date.now(),
  price: "599.000đ"
}).then(res => {
  console.log("Kết quả:", res);
});
