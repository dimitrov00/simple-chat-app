import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
    username: z.string().min(0),
    message: z.string().min(0),
});

type ChatInputData = z.infer<typeof schema>;

interface Props {
    sendMessage: (username: string, message: string) => void;
}

const ChatInput = ({ sendMessage }: Props) => {
    const {
        handleSubmit,
        register,
        formState: { isValid },
    } = useForm<ChatInputData>({
        mode: "onBlur",
        resolver: zodResolver(schema),
    });

    function processForm({ username, message }: ChatInputData) {
        sendMessage(username, message);
    }

    return (
        <form onSubmit={handleSubmit(processForm)}>
            <label>
                Username: <input type="text" {...register("username")} />
            </label>
            <label>
                Message: <input type="text" {...register("message")} />
            </label>
            <button disabled={!isValid}>Send</button>
        </form>
    );
};

export default ChatInput;
