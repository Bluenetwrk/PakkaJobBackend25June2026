const axios = require("axios");
const StudentProfileModel = require("../Schema/StudentProfileSchema")

const sendWhatsAppMessage = async (req, res) => {
    try {
        const { phoneNumber } = req.body;

        console.log("phoneNumber:", phoneNumber);

           // Find user
        let user = await StudentProfileModel.findOne({
            phoneNumber: phoneNumber
        });
        // If user doesn't exist, create one
        if (!user) {
            user = await StudentProfileModel.create({
                phoneNumber: phoneNumber
            });
        }
        const url = "https://graph.facebook.com/v25.0/1346561498537437/messages";
        let token='EAAO4sPOj5F4BSmrIxqLPX62Jj8YOoUf9Ca7lkt5OkSTt8ajTr6emAAZCMM8AKtdzDq6XmCqZAhurTNTjRjvF5cPNzmkaqmmX2xw5hvZCo5lIpy9lD6RFeEexUZCZAcjFhKZABRq4x6AbKwpZAghuc6ZA0qX8EHZAD140UQSWsUMrswRTXJ78yiIy1ZCkdZByv6RZBZCZAuhgZDZD'

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

        console.log(
            "WhatsApp response:",
            response.data
        );

        const messageId = response.data?.messages?.[0]?.id;

        return res.status(200).json({
            success: true,
            message: "WhatsApp message request accepted",
            messageId
        });

    } catch (error) {

        console.error(
            "WhatsApp Error:",
            error.response?.data || error.message
        );

        return res.status(500).json({
            success: false,
            message: "Failed to send WhatsApp message",
            error: error.response?.data || error.message
        });
    }
};


// async function checkWhatsAppNumber(phoneNumber) {
//     try {
//         const url =
//             `https://graph.facebook.com/v25.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/contacts`;

//         const response = await axios.post(
//             url,
//             {
//                 blocking: "wait",
//                 contacts: [phoneNumber],
//                 force_check: true
//             },
//             {
//                 headers: {
//                     Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
//                     "Content-Type": "application/json"
//                 }
//             }
//         );
//         const contact = response.data.contacts?.[0];
//         console.log("contact", contact)

//         if (contact?.status === "valid") {
//             return true;
//         }

//         return false;

//     } catch (error) {
//         console.error(
//             "WhatsApp number check error:",
//             error.response?.data || error.message
//         );

//         return false;
//     }
// }


module.exports = {
    sendWhatsAppMessage
};
