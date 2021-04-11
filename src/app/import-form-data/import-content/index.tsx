import React, { useState } from 'react';
import styled from 'styled-components';
import { useMobile,ConnectWidget} from '../../mobile';
import {AppContainer,Error,Footer, DarkButton,Title,ConnectedInstruction,DecryptIcon,
    ShowIcon,SendIcon} from '../../components';

    const FIELDS = {
        content: {
            id: "contentToImport",
            label: "Content",
            type: 'import-form',
            nLines:5,
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
const initData =(content:string) => {
    return {
        form: {
            title: "Import Form Data",
            fields: [{...FIELDS.content, value:content}, FIELDS.info, FIELDS.back]
        }
    };
}
interface Props {
    content: string;    
    domain: string;
    cancel: () =>void;
    finish:() =>void;
}

export const StartImport: React.FC<Props> = ({ cancel,domain, content, finish }) => {
    const [errorMessage, setErrorMessage] = useState('');
    
    
    
    const mobile = useMobile(()=>initData(content), true);
    
    mobile.setOnchange(({ field }) => {
        switch (field.id) {            
            case FIELDS.back.id:
                cancel();
                break;
        }
    });
    return (
        <AppContainer>
            <ConnectWidget mobile={mobile}/>
            <Title>Importing Content</Title>
            {errorMessage && (<Error>{errorMessage}</Error>)}
            <ConnectedInstruction mobile={mobile}>
                    The content is now sent to your mobile app for decryption.
                    On your mobile, you can press <ShowIcon/>
                    to inspect the content received. Then, press <DecryptIcon/> to start decrypting it.
                    In the next screen on your mobile, you will be presented with the decrypted content,
                    you can press <ShowIcon/> to inspect the decrypted content before pressing <SendIcon/> to send it to this application.
    </ConnectedInstruction>

            <Footer>
                <DarkButton onClick={cancel}>Cancel</DarkButton>
            </Footer>
        </AppContainer>
    );

};

