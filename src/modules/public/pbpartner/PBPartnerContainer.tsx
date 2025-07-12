"use client";

import { useState } from "react";
import { Modal, Button, Input, Form, App } from "antd";
import Image from "next/image";
import { ASSET_URL } from "@/assets";
import { $Enums } from "@prisma/client";
import { createPartner } from "@/app/action";
import TextArea from "antd/es/input/TextArea";

export default function PBPartnerContainer() {
    const { notification } = App.useApp()
    const [open, setOpen] = useState(false);
    const [selectedType, setSelectedType] = useState<$Enums.PartnerType | null>(null);

    const [form] = Form.useForm();

    const handleOpenModal = (type: "Volunteer" | "Partner") => {
        setSelectedType(type);
        setOpen(true);
    };

    const handleFinish = async (values: { fullname: string; email: string, message: string }) => {
        notification.info({ message: "Thank you! Your download will begin shortly.", key: "123" });
        try {
            const res = await createPartner({...values, type: selectedType!})
            if (res?.error) notification.error({ message: res?.message, key: "123" })
        else {
            notification.success({ message: res?.message, key: "123" })
            // const fileUrl = selectedType === "Volunteer"
            //     ? "/ANYA-GIRLCHILD-FOUNDATION-VOLUNTEER-FORM.docx"
            //     : "/ANYA-GIRLCHILD-FOUNDATION-PARTNERSHIP-PROPOSAL-LETTER.docx";
            // const link = document.createElement("a");
            // link.href = fileUrl;
            // link.setAttribute("download", "");
            // document.body.appendChild(link);
            // link.click();
            // document.body.removeChild(link);
            form.resetFields();
        }
    }
        catch (error) {
        console.log('error', error)
        notification.error({ message: `Something went wrong. Please check your internet connection and try again.`, key: "123" })
    }
    finally {
        setOpen(false);
    }
};

return (
    <section className="container mx-auto pt-12 pb-24 px-4 md:px-16 bg-gray-50">
        <h2 className="text-3xl md:text-4xl text-center text-secondary font-bold font-grotesk mt-8 mb-4">Join the Movement</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">Together, we can change lives. Become a volunteer or a partner today and help empower the girl child.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Volunteer Section */}
            <div className="bg-white shadow-[0px_0px_12px_-2px_#0004] hover:shadow-[0px_0px_16px_-2px_#0005] rounded-lg p-6 flex flex-col items-center text-center">
                <Image src={ASSET_URL['anya_girlchild_group']} alt="Volunteer" className="w-full h-48 object-cover rounded-md border-2 border-backdrop mb-4" />
                <h3 className="text-2xl text-secondary font-semibold font-grotesk mb-2">Volunteer with Us</h3>
                <p className="text-text mb-4">Share your time and skills to create lasting impact.</p>
                <Button type="primary" size="middle" onClick={() => handleOpenModal("Volunteer")}>
                    Join as Volunteer
                </Button>
            </div>

            {/* Partner Section */}
            <div className="bg-white shadow-[0px_0px_12px_-2px_#0004] hover:shadow-[0px_0px_16px_-2px_#0005] rounded-lg p-6 flex flex-col items-center text-center">
                <Image src={ASSET_URL['donation_personnel']} alt="Partner" className="w-full h-48 object-cover rounded-md border-2 border-backdrop mb-4" />
                <h3 className="text-2xl text-danger font-semibold mb-2">Partner with Us</h3>
                
                <p className="text-text mb-4">Support our work by providing resources or expertise.</p>
                <Button type="primary" size="middle" onClick={() => handleOpenModal("Partner")}>
                    Partner with Us
                </Button>
            </div>
        </div>

        {/* Modal */}
        <Modal
            title={<h3 className="text-2xl text-secondary font-semibold my-4">Join as {selectedType === "Volunteer" ? "Volunteer" : "Partner"}</h3>}
            open={open}
            onCancel={() => setOpen(false)}
            footer={null}
        >
            <Form form={form} layout="vertical" onFinish={handleFinish} className="flex flex-col gap-0 py-4">
                <Form.Item
                    className="p-2"
                    label="Full Name"
                    name="fullname"
                    rules={[{ required: true, message: "Please enter your name" }]}
                >
                    <Input placeholder="Your Name" />
                </Form.Item>
                <Form.Item
                    className="p-2 mt-2"
                    label="Email Address"
                    name="email"
                    rules={[
                        { required: true, message: "Please enter your email" },
                        { type: "email", message: "Please enter a valid email address" },
                    ]}
                >
                    <Input placeholder="you@validemail.com" />
                </Form.Item>
                <Form.Item
                    className="p-2 mt-2"
                    label="Message (optional but recommended)"
                    name="message"
                >
                    <TextArea rows={5} placeholder="We would like to hear your motivation and driving force...if you're feeling up to it." />
                </Form.Item>
                <Button type="primary" htmlType="submit" className="-mt-2">
                    Download {selectedType === "Volunteer" ? "Volunteer" : "Partner"} Form
                </Button>
            </Form>
        </Modal>
    </section>
);
}
