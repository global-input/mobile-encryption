import React, { useState } from 'react';
import { useMobile } from '../mobile';
import { FormFooter, TextButton, DisplayErrorMessage, AppContainer, MessageContainer, FormContainer } from '../app-layout';

interface Props {
    content: string;
    contentOnComputer: (content: string) => void;
    showOnComputer: (content: string) => void;
    domain: string;
}

const DecryptContent: React.FC<Props> = ({ content, contentOnComputer, showOnComputer, domain }) => {
    const [errorMessage, setErrorMessage] = useState('');
    const initData = {
        form: {
            title: "Mobile Decryption",
            fields: [{ ...FIELDS.content, value: content }, FIELDS.info, FIELDS.back]
        }
    }
    const mobile = useMobile(initData);
    const back = () => {
        contentOnComputer(content);
    };
    mobile.setOnFieldChange((field) => {
        switch (field.id) {
            case FIELDS.content.id:
                if (field.value) {
                    showOnComputer(field.value as string)
                }
                else {
                    setErrorMessage("Failed to decrypt!");
                    mobile.sendValue(FIELDS.info.id, { style: { color: "red" }, content: "Failed to decrypt!" });
                }
                break;
            case FIELDS.back.id:
                back();
                break;
        }
    });
    return (
        <AppContainer title="Mobile Decryption" domain={domain}>
            <mobile.ConnectQR />
            <FormContainer>
                <DisplayErrorMessage errorMessage={errorMessage} />
                {mobile.isConnected && (<MessageContainer title="Decrypting Content">
                    Follow the instruction on your mobile to decrypt content.
                </MessageContainer>)}
            </FormContainer>
            <FormFooter>
                <TextButton onClick={back} label='Back' />
            </FormFooter>
        </AppContainer>
    );

};

const FIELDS = {
    content: {
        id: "decryptContent",
        label: "Content",
        type: 'decrypt',
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

export default DecryptContent;
