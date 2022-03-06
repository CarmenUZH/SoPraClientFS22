import "styles/ui/ApplyButton.scss";

export const ApplyButton = props => (
    <button
        {...props}
        style={{width: props.width, ...props.style}}
        className={`secondary-button ${props.className}`}>
        {props.children}
    </button>
);
