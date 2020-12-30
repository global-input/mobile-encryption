import React, { useState } from 'react';
import styled from 'styled-components';
import { useMobile,ConnectWidget} from '../../mobile';
import {AppContainer,Error,Footer, DarkButton,Title,ConnectedInstruction} from '../../elements';

import encryptImage from './images/encrypt-icon.png';
import showImage from './images/show-icon.png';
import sendImage from './images/send-icon.png';




interface Props {
    content: string;
    contentOnComputer: (content: string) => void;
    showOnComputer: (content: string) => void;
    domain: string;
}

export const EncryptContent: React.FC<Props> = ({ domain, content, contentOnComputer, showOnComputer }) => {
    const [errorMessage, setErrorMessage] = useState('');
    const initData = () => ({
        form: {
            title: "Mobile Encryption",
            fields: [{ ...FIELDS.content, value: content }, FIELDS.info, FIELDS.back]
        }
    });
    const mobile = useMobile(initData, true);
    const back = () => {
        contentOnComputer(content);
    }
    mobile.setOnchange(({ field }) => {
        switch (field.id) {
            case FIELDS.content.id:
                if (field.value) {
                    showOnComputer(field.value as string)
                }
                else {
                    setErrorMessage("Failed to encrypt!");
                    mobile.sendValue(FIELDS.info.id, { style: { color: "red" }, content: "Failed to encrypt!" });
                }
                break;
            case FIELDS.back.id:
                back();
                break;
        }
    });
    return (
        <AppContainer>
            <ConnectWidget mobile={mobile}/>
            <Title>Encrypting Content On your Mobile</Title>
            {errorMessage && (<Error>{errorMessage}</Error>)}
            <ConnectedInstruction mobile={mobile}>
                    The content is now sent to your mobile app. On your mobile, you can press <ShowIcon/>
                    to see the content that mobile app has received. You can press <EncryptIcon/> to start encrypting the content.
                    Then, in the next screen, you can press <ShowIcon/> again to see encrypted content, or you can press <SendIcon/> to send the encrypted content to this application.
    </ConnectedInstruction>

            <Footer>
                <DarkButton onClick={back}>Back</DarkButton>
            </Footer>
        </AppContainer>
    );

};

const FIELDS = {
    content: {
        id: "encryptContent",
        label: "Content",
        type: 'encrypt',
        value: ''
    },
    info: {
        id: "info",
        type: "info",
        value: "",
    },
    back: {
        id: "backToContent",
        label: "Back",
        type: "button",
        viewId: "row1"
    }
};
const EncryptIcon = styled.img.attrs({
    src: encryptImage,
    alt: 'Encrypt'
})``;
const ShowIcon = styled.img.attrs({
    src: showImage,
    alt: 'Encrypt'
})``;
const SendIcon = styled.img.attrs({
    src: sendImage,
    alt: 'Send'
})``;
