import {
  FileInputContainer,
  FileUploaderContainer,
} from "./file-uploader.styles";

const FileUploader = (props) => {
  const handleFileInput = (e) => {
    e.preventDefault();
    props.onFileSelect(e.target.files[0]);
  };

  return (
    <FileUploaderContainer>
      <FileInputContainer
        type="file"
        accept={props.accepted}
        onChange={handleFileInput}
      />
    </FileUploaderContainer>
  );
};

export default FileUploader;
