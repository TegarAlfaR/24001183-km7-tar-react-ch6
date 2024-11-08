export const Button = ({ children, handerAction }) => {
    return (
      <div>
        <button onClick={handerAction}>{children}</button>
      </div>
    );
  };