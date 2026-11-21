import { Button, Space, Select, Checkbox, Radio, DatePicker, TimePicker, Form, Input, InputNumber, Steps } from 'antd'

export default function AntdForm() {
    return (
        <Space orientation='vertical'>
            <Steps styles={{ root: { width: "100%" } }} current={1} titlePlacement="vertical" ellipsis items={[
                {
                    title: 'Личные данные',
                },
                {
                    title: 'Временной слот',
                },
                {
                    title: 'Ваш терапевт',
                },
            ]} />

            <Form layout='vertical' onFinish={(values) => {
                console.log(values)
            }}>
                <Form.Item label="Phone" name="phone" rules={[
                    { required: true, 'message': 'Заполните поле' }
                ]}>
                    <Input type="tel" />
                </Form.Item>
                <Form.Item label="Birth Date" name="birthDate" rules={[
                    { required: true, 'message': 'Заполните поле' }
                ]}>
                    <DatePicker />
                </Form.Item>
                <Form.Item label="Booking Date" name="bookingDate" rules={[
                    { required: true, 'message': 'Заполните поле' }
                ]}>
                    <DatePicker />
                </Form.Item>
                <Form.Item label="Booking Time" name="bookingTime" rules={[
                    { required: true, 'message': 'Заполните поле' }
                ]}>
                    <TimePicker />
                </Form.Item>
                <Form.Item label="Payment Type" name="paymentType" rules={[
                    { required: true, 'message': 'Заполните поле' }
                ]}>
                    <Select options={[
                        { title: "Cash", value: 'cash' },
                        { title: "Card", value: 'card' }
                    ]} />
                </Form.Item>

                <Form.Item>
                    <Button block variant='solid' type='primary' htmlType="submit">Отправить</Button>
                </Form.Item>
            </Form>
        </Space>
    )
}