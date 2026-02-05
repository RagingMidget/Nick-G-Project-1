import { Modal } from "react-native";

export default (props) => {
  return (
    <Modal
      visible={props.visible}
      onRequestClose={props.onRequestClose}
      backdropColor={"#ffffff01"}
    ></Modal>
  );
};
