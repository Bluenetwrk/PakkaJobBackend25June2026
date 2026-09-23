const axios = require("axios");
const StudentProfileModel = require("../Schema/StudentProfileSchema")
const secretKey = "abcde";
const jwt = require("jsonwebtoken")


const sendWhatsAppMessage = async (req, res) => {
    try {
        const { phoneNumber } = req.body;
        const url = "https://graph.facebook.com/v25.0/1346561498537437/messages";
        let token = 'EAAO4sPOj5F4BSmrIxqLPX62Jj8YOoUf9Ca7lkt5OkSTt8ajTr6emAAZCMM8AKtdzDq6XmCqZAhurTNTjRjvF5cPNzmkaqmmX2xw5hvZCo5lIpy9lD6RFeEexUZCZAcjFhKZABRq4x6AbKwpZAghuc6ZA0qX8EHZAD140UQSWsUMrswRTXJ78yiIy1ZCkdZByv6RZBZCZAuhgZDZD'

        const response = await axios.post(
            url,
            {
                messaging_product: "whatsapp",
                to: phoneNumber,
                type: "template",
                template: {
                    name: "3p_direct_integration_test_template",
                    language: {
                        code: "en_US"
                    }
                }
            },
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`,

                    "Content-Type":
                        "application/json"
                }
            }
        );

        const messageId = response.data?.messages?.[0]?.id;

        return res.status(200).json({
            success: true,
            message: "WhatsApp message request accepted",
            messageId
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Failed to send WhatsApp message",
            error: error.response?.data || error.message
        });
    }
};

const loginWithOtp = async (req, res) => {

    const { phoneNumber, name } = req.body;

    let user = await StudentProfileModel.findOne({
        phoneNumber: phoneNumber
    });
    if (!user) {
        user = await StudentProfileModel.create({
            phoneNumber: phoneNumber, name: name
        });
    }
    let gtoken = jwt.sign({ id: user._id }, secretKey)
    res.send({ status: "success", token: gtoken, id: user._id, action: "registered" })
}
module.exports = {
    sendWhatsAppMessage, loginWithOtp
};
