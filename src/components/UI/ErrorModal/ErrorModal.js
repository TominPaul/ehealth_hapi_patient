import Card from "../Card/Card";
import Button from "../Button/Button";
import styles from "./ErrorModal.module.css";

const ErrorModal = (props) => {
  return (
    <div>
      <div className={styles.backdrop} onClick={props.onConfirm} />
      <Card className={styles.modal}>
        <header className={styles.header}>
          <h2>ERROR - {props.errorData.response.status}</h2>
        </header>
        <div className={styles.content}>
          <p>{props.errorData.message}</p>
        </div>
        <footer className={styles.actions}>
          <Button onClick={props.onConfirm}>OK</Button>
        </footer>
      </Card>
    </div>
  );
};

export default ErrorModal;
