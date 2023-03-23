import { message } from 'ant-design-vue';
import { MessageInstance } from 'ant-design-vue/lib/message';
interface ConfigOptions {
	top?: string;
	duration?: number;
	prefixCls?: string;
	getContainer?: () => HTMLElement;
	transitionName?: string;
	maxCount?: number;
	rtl?: boolean;
}
class Message {
	private static instance: MessageInstance;
	private static Config: ConfigOptions = {
		maxCount: 3,
	};
	public static getInstance(): MessageInstance {
		if (Message.instance) {
			return Message.instance;
		}
		new Message(Message.Config);
		return Message.instance;
	}
	constructor(config: ConfigOptions) {
		message.config(config);
		Message.instance = message;
	}
}
export default Message;
