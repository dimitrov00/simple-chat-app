import { IChatMessage } from "../../interfaces/IChatMessage";
import Message from "../Message";

interface Props {
    messages: IChatMessage[];
}
const ChatWindow = ({ messages }: Props) => {
    console.log({ messages });
    const Chat = messages.map((m, i) => (
        <Message key={i} user={m.user} message={m.message} />
    ));

    return <div>{Chat}</div>;
};

export default ChatWindow;
