import { NoticeContainer, NoticeMessage } from "./empty-notice.styles";

const EmptyNotice = (props) => {
  return (
    <NoticeContainer>
      <NoticeMessage>{props.message}</NoticeMessage>
    </NoticeContainer>
  );
};

export default EmptyNotice;
