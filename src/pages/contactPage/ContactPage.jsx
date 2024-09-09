import { Form, Input, Button, message } from "antd";

export default function ContactPage() {
	const [form] = Form.useForm();

	const handleSubmit = async (values) => {
		try {
			console.log("Received values: ", values);
			message.success("Your message has been sent successfully!");
			form.resetFields();
		} catch (error) {
			console.error("Error sending message: ", error);
			message.error("Failed to send your message. Please try again later.");
		}
	};

	return (
		<main className="max-w-screen-2xl mx-auto px-20 py-12 flex ">
			<div className="mt-12 w-1/2">
				<h2 className="text-2xl font-semibold mb-4">Our Location</h2>
				<div className="w-full h-64">
					<iframe
						src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.7255792278324!2d106.60602897585616!3d10.755620089391881!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752c34243673c3%3A0x7cee7a38de34ef98!2zMTM4IMSQxrDhu51uZyBT4buRIDI5LCBCw6xuaCBUcuG7iyDEkMO0bmcgQiwgQsOsbmggVMOibiwgSOG7kyBDaMOtIE1pbmgsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1725857866606!5m2!1svi!2s"
						width="600"
						height="450"
						style={{ border: 0 }}
						allowFullScreen
						loading="lazy"
						referrerPolicy="no-referrer-when-downgrade"
					></iframe>
				</div>
			</div>
			<div className="w-1/2 flex flex-col gap-6 shadow-md p-6 rounded-lg">
				<h1 className="text-3xl font-bold mb-6">Contact Us</h1>
				<p className="text-lg mb-6">
					If you have any complaints or feedback, please fill out the form
					below. We value your input and will get back to you as soon as
					possible.
				</p>
				<Form form={form} layout="vertical" onFinish={handleSubmit}>
					<Form.Item
						name="name"
						label="Name"
						rules={[{ required: true, message: "Please input your name!" }]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						name="email"
						label="Email"
						rules={[
							{ required: true, message: "Please input your email!" },
							{ type: "email", message: "Please enter a valid email!" },
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						name="message"
						label="Message"
						rules={[{ required: true, message: "Please input your message!" }]}
					>
						<Input.TextArea rows={4} />
					</Form.Item>
					<Form.Item>
						<Button type="primary" htmlType="submit">
							Send Message
						</Button>
					</Form.Item>
				</Form>
			</div>
		</main>
	);
}
