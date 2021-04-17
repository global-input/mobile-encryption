import React, { useState } from 'react';
import styled from 'styled-components';
import { useMobile,ConnectWidget} from '../../mobile';
import {AppContainer,Error,Footer, DarkButton,Title,ConnectedInstruction, ExportIcon} from '../../components';



const FIELDS = {
    content: {
        id: "exportedContent",
        label: "Exported Content",
        type: 'export-form',
        value: ''
    },
    info: {
        id: "info",
        type: "info",
        value: {
            content:['The application is requesting all the form data stored in your mobile app. The data will be exported in its encrypted form, and the application can only store it for backup purposes and will not be able to decrypt them. The data can only be decrypted when they are imported back into this mobile app. ',
            'Press the "Export" button at the bottom of the screen to export.' ]
        },
    },
    back: {
        id: "backToContent",
        label: "Back",
        type: "button",
        viewId: "row1"
    }
};
const initData = {
    form: {
        title: "Exporting Form Data",
        fields: Object.values(FIELDS)
    }
};

interface Props {    
    onExported: (content: string) => void;    
    domain: string;
    back:()=>void;
}

export const ExportingContent: React.FC<Props> = ({ domain,onExported, back }) => {
    const [errorMessage, setErrorMessage] = useState('');    
    const mobile = useMobile(initData, true);    
    mobile.setOnchange(({ field }) => {
        switch (field.id) {
            case FIELDS.content.id:
                if (field.value) {
                    onExported(field.value as string)
                }
                else {
                    setErrorMessage("Empty data is received!");                    
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
            <Title>Exporting Form Data</Title>
            {errorMessage && (<Error>{errorMessage}</Error>)}
            <ConnectedInstruction mobile={mobile}>
                Press <ExportIcon/> on your mobile to export the form data on your mobile app to this application.
                
    </ConnectedInstruction>

            <Footer>
                <DarkButton onClick={back}>Back</DarkButton>
            </Footer>
        </AppContainer>
    );

};


