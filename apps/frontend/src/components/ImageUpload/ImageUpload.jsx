import { useRef, useState } from "react";
import classes from "./ImageUpload.module.css";

const ImageUpload = ({ onImagePick, onError }) => {
  const filePickerRef = useRef();
  const [fileName, setFileName] = useState("No file chosen");
  const [error, setError] = useState(null);

  function pickImageHandler() {
    filePickerRef.current.click();
  }

  function pickedHandler(event) {
    if (event.target.files && event.target.files.length === 1) {
      const pickedFile = event.target.files[0];

      const validTypes = ["image/jpeg", "image/png", "image/jpg"];

      if (!validTypes.includes(pickedFile.type)) {
        const errorMessage = "Arquivo inválido. Envie JPG ou PNG.";
        setError(errorMessage);
        setFileName("No file chosen");
        if (onError) onError(errorMessage);
        return;
      }

      setError(null);
      setFileName(pickedFile.name);

      if (onImagePick) onImagePick(pickedFile);
    }
  }

  return (
    <div className={classes.buttonWrapper}>
      <input
        ref={filePickerRef}
        type="file"
        style={{ display: "none" }}
        accept=".jpg,.png,.jpeg"
        onChange={pickedHandler}
      />

      <button
        type="button"
        onClick={pickImageHandler}
        className={classes.uploadButton}
      >
        Add Image
      </button>

      <span className={classes.fileName}>{fileName}</span>

      {error && <span className={classes.errorText}>{error}</span>}
    </div>
  );
};

export default ImageUpload;
