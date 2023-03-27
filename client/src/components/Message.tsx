interface Props {
    user: string;
    message: string;
}
const Message = ({ user: username, message }: Props) => {
    return (
        <div>
            <h4>{username} says:</h4>
            <p>{message}</p>
        </div>
    );
};

export default Message;
